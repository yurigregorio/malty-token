"use client";

import { useState } from "react";
import { address, generateKeyPairSigner, type Address } from "@solana/kit";
import { useConnectedWallet } from "@solana/kit-plugin-wallet/react";
import { AuthorityType } from "@solana-program/token";
import { toast } from "sonner";

import { publicKey } from "@metaplex-foundation/umi";
import {
  createMetadataAccountV3,
  fetchMetadataFromSeeds,
  updateV1,
} from "@metaplex-foundation/mpl-token-metadata";

import { useAppClient } from "../../lib/client-provider";
import { MALTY_CONFIG } from "../../lib/malty-config";
import {
  MALTY_PRODUCTION_POLICY,
  MALTY_TOKEN,
} from "../../lib/malty-token";
import { createPhantomUmi } from "../../lib/umi-client";
import { getClusterUrl } from "../../lib/solana-client";

import { useCluster } from "../cluster-context";
import { useSend } from "../../lib/hooks/use-send";
import { ellipsify } from "../../lib/explorer";
import { isCustomProgramError } from "../../lib/errors";

const DECIMALS = MALTY_TOKEN.decimals;
const BASE_UNITS_PER_TOKEN = 10n ** BigInt(DECIMALS);
const MAX_TOKEN_AMOUNT = (1n << 64n) - 1n;

const TOKEN_AMOUNT_PATTERN = new RegExp(
  `^(\\d+)(?:\\.(\\d{1,${DECIMALS}}))?$`
);

const TOKEN_PROGRAM_ERROR__INSUFFICIENT_FUNDS = 1;

function toBaseUnits(amount: string): bigint {
  const normalizedAmount = amount.trim();
  const match = TOKEN_AMOUNT_PATTERN.exec(normalizedAmount);

  if (!match) {
    throw new Error(
      `Enter an amount with up to ${DECIMALS} decimal places`
    );
  }

  const [, whole, fraction = ""] = match;
  const normalizedWhole = whole.replace(/^0+(?=\d)/, "");

  if (normalizedWhole.length > 20) {
    throw new Error("Amount exceeds the maximum token amount");
  }

  const units =
    BigInt(normalizedWhole) * BASE_UNITS_PER_TOKEN +
    BigInt(fraction.padEnd(DECIMALS, "0"));

  if (units <= 0n) {
    throw new Error("Amount must be greater than zero");
  }

  if (units > MAX_TOKEN_AMOUNT) {
    throw new Error("Amount exceeds the maximum token amount");
  }

  return units;
}

function getTokenAmountError(amount: string): string | null {
  try {
    toBaseUnits(amount);
    return null;
  } catch (error) {
    return error instanceof Error ? error.message : "Invalid amount";
  }
}

export function TokenCard() {
  const client = useAppClient();
  const connected = useConnectedWallet(client);

  const { cluster, getExplorerUrl } = useCluster();
  const { run, isSending } = useSend();

  const maltyConfig =
    cluster === "devnet"
      ? MALTY_CONFIG.devnet
      : cluster === "mainnet"
        ? MALTY_CONFIG.mainnet
        : null;

  // Session state is isolated by cluster so a token from one network can never
  // be accidentally reused after switching networks in the UI.
  const [sessionMints, setSessionMints] = useState<
    Record<string, Address | null>
  >({});

  const [sessionMinted, setSessionMinted] = useState<
    Record<string, boolean>
  >({});

  const [sessionMetadataCreated, setSessionMetadataCreated] = useState<
    Record<string, boolean>
  >({});

  const [sessionAuthorityRevoked, setSessionAuthorityRevoked] =
    useState<Record<string, boolean>>({});

  const mint = maltyConfig?.mint ?? sessionMints[cluster] ?? null;

  // Persisted deployment state comes from the network config; session state
  // covers actions completed during the current browser session.
  const hasMinted =
    maltyConfig?.supplyMinted === true || sessionMinted[cluster] === true;

  const metadataCreated =
    maltyConfig?.metadataCreated === true ||
    sessionMetadataCreated[cluster] === true;

  const mintAuthorityRevoked =
    maltyConfig?.mintAuthorityRevoked === true ||
    sessionAuthorityRevoked[cluster] === true;

  const mintAmount = MALTY_TOKEN.totalSupplyTokens.toString();

  const [recipient, setRecipient] = useState("");
  const [transferAmount, setTransferAmount] = useState("10");
  const [isUpdatingMetadata, setIsUpdatingMetadata] = useState(false);

  const metadataMaintenanceEnabled =
    cluster === "mainnet" &&
    process.env.NEXT_PUBLIC_ENABLE_MALTY_METADATA_MAINTENANCE === "true";

  const mintAmountError = getTokenAmountError(mintAmount);
  const transferAmountError = getTokenAmountError(transferAmount);

  // -------------------------------------------------------
  // CREATE SPL MINT
  // -------------------------------------------------------

  const handleCreateMint = async () => {
    const signer = connected?.signer;

    if (!signer) {
      toast.error("Connect your wallet first");
      return;
    }

    if (!maltyConfig?.allowCreateMint) {
      toast.error("MALTY mint creation is locked on this network");
      return;
    }

    const newMint = await generateKeyPairSigner();

    const signature = await run(
      () =>
        client.token.instructions
          .createMint({
            newMint,
            decimals: MALTY_TOKEN.decimals,
            mintAuthority: signer.address,
            freezeAuthority: MALTY_PRODUCTION_POLICY.freezeAuthority,
          })
          .sendTransaction(),
      "Token mint created"
    );

    if (signature) {
      setSessionMints((current) => ({
        ...current,
        [cluster]: newMint.address,
      }));

      setSessionMinted((current) => ({
        ...current,
        [cluster]: false,
      }));

      setSessionMetadataCreated((current) => ({
        ...current,
        [cluster]: false,
      }));

      setSessionAuthorityRevoked((current) => ({
        ...current,
        [cluster]: false,
      }));
    }
  };

  // -------------------------------------------------------
  // MINT FIXED MALTY SUPPLY
  // -------------------------------------------------------

  const handleMint = async () => {
    const signer = connected?.signer;

    if (!signer || !mint) {
      return;
    }

    if (!maltyConfig?.allowMintSupply) {
      toast.error("MALTY supply minting is locked on this network");
      return;
    }

    if (mintAuthorityRevoked) {
      toast.error("Mint Authority has already been revoked");
      return;
    }

    if (hasMinted) {
      toast.error("The MALTY supply has already been minted");
      return;
    }

    let amount: bigint;

    try {
      amount = toBaseUnits(mintAmount);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Invalid amount"
      );
      return;
    }

    const signature = await run(
      () =>
        client.token.instructions
          .mintToATA({
            mint,
            owner: signer.address,
            mintAuthority: signer,
            amount,
            decimals: MALTY_TOKEN.decimals,
          })
          .sendTransaction(),
      "Tokens minted to your wallet"
    );

    if (signature) {
      setSessionMinted((current) => ({
        ...current,
        [cluster]: true,
      }));
    }
  };

  // -------------------------------------------------------
  // ADD METAPLEX METADATA
  // -------------------------------------------------------

  const handleAddMetadata = async () => {
    if (!mint) {
      toast.error("Mint not found");
      return;
    }

    if (!maltyConfig?.allowMetadata) {
      toast.error("MALTY metadata creation is locked on this network");
      return;
    }

    try {
      const umi = createPhantomUmi(getClusterUrl(cluster));

      await createMetadataAccountV3(umi, {
        mint: publicKey(mint),
        mintAuthority: umi.identity,
        updateAuthority: umi.identity.publicKey,
        data: {
          name: MALTY_TOKEN.name,
          symbol: MALTY_TOKEN.symbol,
          uri: MALTY_TOKEN.metadataUri,
          sellerFeeBasisPoints: 0,
          creators: null,
          collection: null,
          uses: null,
        },
        isMutable: MALTY_PRODUCTION_POLICY.metadataMutableAtCreation,
        collectionDetails: null,
      }).sendAndConfirm(umi);

      setSessionMetadataCreated((current) => ({
        ...current,
        [cluster]: true,
      }));

      toast.success("MALTY metadata created");
    } catch (error) {
      console.error("Metadata error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create MALTY metadata"
      );
    }
  };

  // -------------------------------------------------------
  // UPDATE OFFICIAL METAPLEX METADATA
  // -------------------------------------------------------

  const handleUpdateMetadata = async () => {
    if (!mint || cluster !== "mainnet") {
      toast.error("Official MALTY metadata maintenance is Mainnet-only");
      return;
    }

    if (!metadataMaintenanceEnabled) {
      toast.error("Metadata maintenance is disabled");
      return;
    }

    setIsUpdatingMetadata(true);

    try {
      const umi = createPhantomUmi(getClusterUrl(cluster));
      const currentMetadata = await fetchMetadataFromSeeds(umi, {
        mint: publicKey(mint),
      });

      if (
        currentMetadata.updateAuthority.toString() !==
        umi.identity.publicKey.toString()
      ) {
        toast.error(
          "Connected Phantom is not the MALTY metadata update authority"
        );
        return;
      }

      await updateV1(umi, {
        mint: publicKey(mint),
        authority: umi.identity,
        data: {
          ...currentMetadata,
          name: MALTY_TOKEN.name,
          symbol: MALTY_TOKEN.symbol,
          uri: MALTY_TOKEN.metadataUri,
        },
      }).sendAndConfirm(umi);

      toast.success("Official MALTY metadata updated");
    } catch (error) {
      console.error("Metadata update error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update MALTY metadata"
      );
    } finally {
      setIsUpdatingMetadata(false);
    }
  };

  // -------------------------------------------------------
  // REVOKE MINT AUTHORITY
  // -------------------------------------------------------

  const handleRevokeMintAuthority = async () => {
    const signer = connected?.signer;

    if (!signer || !mint) {
      toast.error("Wallet or mint not found");
      return;
    }

    if (!maltyConfig?.allowRevokeMintAuthority) {
      toast.error("Mint Authority changes are locked on this network");
      return;
    }

    if (!hasMinted) {
      toast.error(
        "Mint the full supply before revoking the Mint Authority"
      );
      return;
    }

    if (mintAuthorityRevoked) {
      toast.error("Mint Authority has already been revoked");
      return;
    }

    const signature = await run(
      () =>
        client.token.instructions
          .setAuthority({
            owned: mint,
            owner: signer,
            authorityType: AuthorityType.MintTokens,
            newAuthority: null,
          })
          .sendTransaction(),
      "Mint Authority revoked"
    );

    if (signature) {
      setSessionAuthorityRevoked((current) => ({
        ...current,
        [cluster]: true,
      }));

      toast.success(
        "Mint Authority revoked. MALTY supply is now fixed."
      );
    }
  };

  // -------------------------------------------------------
  // TRANSFER MALTY
  // -------------------------------------------------------

  const handleTransfer = async () => {
    const signer = connected?.signer;
    const normalizedRecipient = recipient.trim();

    if (!signer || !mint || !normalizedRecipient) {
      return;
    }

    let destination: Address;

    try {
      destination = address(normalizedRecipient);
    } catch {
      toast.error("Invalid recipient address");
      return;
    }

    let amount: bigint;

    try {
      amount = toBaseUnits(transferAmount);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Invalid amount"
      );
      return;
    }

    await run(
      () =>
        client.token.instructions
          .transferToATA({
            mint,
            authority: signer,
            recipient: destination,
            amount,
            decimals: MALTY_TOKEN.decimals,
          })
          .sendTransaction(),
      "Tokens transferred",
      (error) =>
        isCustomProgramError(
          error,
          TOKEN_PROGRAM_ERROR__INSUFFICIENT_FUNDS
        )
          ? "Insufficient balance. Make sure you have enough tokens to transfer and enough SOL for transaction fees and recipient account creation."
          : undefined
    );
  };

  const networkActionsLocked =
    maltyConfig == null ||
    (!maltyConfig.allowCreateMint &&
      !maltyConfig.allowMintSupply &&
      !maltyConfig.allowMetadata &&
      !maltyConfig.allowRevokeMintAuthority);

  return (
    <div className="rounded-2xl border border-border-low bg-card p-6">
      <h2 className="text-sm font-semibold">MALTY Token</h2>

      <p className="mt-1 text-xs text-muted">
        MALTY SPL token controls for {cluster}.
      </p>

      {networkActionsLocked && (
        <p className="mt-3 rounded-lg border border-border-low bg-background px-3 py-2 text-xs text-muted">
          Creation and authority actions are locked on this network.
        </p>
      )}

      {metadataMaintenanceEnabled && mint && (
        <div className="mt-3 rounded-lg border border-amber-400/25 bg-amber-400/5 p-3">
          <p className="text-xs leading-relaxed text-muted">
            One-time Mainnet metadata maintenance is enabled. Only the current
            Metaplex Update Authority can sign this transaction. This does not
            restore or change the revoked SPL Mint Authority.
          </p>
          <button
            onClick={handleUpdateMetadata}
            disabled={isUpdatingMetadata}
            className="mt-3 w-full cursor-pointer rounded-lg bg-amber-400 px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-amber-300 disabled:pointer-events-none disabled:opacity-50"
          >
            {isUpdatingMetadata
              ? "Updating official metadata..."
              : "Update official MALTY metadata"}
          </button>
        </div>
      )}

      {!mint ? (
        <button
          onClick={handleCreateMint}
          disabled={isSending || !maltyConfig?.allowCreateMint}
          className="mt-4 w-full cursor-pointer rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-xs transition hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
        >
          {isSending
            ? "Creating..."
            : maltyConfig?.allowCreateMint
              ? `Create mint (${MALTY_TOKEN.decimals} decimals)`
              : "MALTY mint creation locked"}
        </button>
      ) : (
        <div className="mt-4 space-y-5">
          <p className="text-xs text-muted">
            Mint:{" "}
            <a
              href={getExplorerUrl(`/address/${mint}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono underline"
            >
              {ellipsify(mint)}
            </a>
          </p>

          <div className="space-y-3">
            <label
              htmlFor="token-mint-amount"
              className="block text-xs font-medium"
            >
              MALTY total supply
            </label>

            <input
              id="token-mint-amount"
              value={mintAmount}
              readOnly
              type="number"
              min="0"
              step="0.000001"
              className="w-full rounded-lg border border-border-low bg-background px-3 py-2 text-sm outline-none"
            />

            <button
              onClick={handleMint}
              disabled={
                isSending ||
                mintAmountError != null ||
                mintAuthorityRevoked ||
                hasMinted ||
                !maltyConfig?.allowMintSupply
              }
              className="w-full cursor-pointer rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-xs transition hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
            >
              {mintAuthorityRevoked
                ? "Mint Authority revoked"
                : hasMinted
                  ? "MALTY supply already minted"
                  : maltyConfig?.allowMintSupply
                    ? isSending
                      ? "Working..."
                      : `Mint ${mintAmount} MALTY`
                    : "Supply minting locked"}
            </button>

            <button
              onClick={handleAddMetadata}
              disabled={
                isSending ||
                metadataCreated ||
                !maltyConfig?.allowMetadata
              }
              className="w-full cursor-pointer rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-xs transition hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
            >
              {metadataCreated
                ? "MALTY metadata created"
                : maltyConfig?.allowMetadata
                  ? "Add MALTY metadata"
                  : "Metadata creation locked"}
            </button>

            <button
              onClick={handleRevokeMintAuthority}
              disabled={
                isSending ||
                mintAuthorityRevoked ||
                !hasMinted ||
                !maltyConfig?.allowRevokeMintAuthority
              }
              className="w-full cursor-pointer rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-xs transition hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
            >
              {mintAuthorityRevoked
                ? "Mint Authority revoked"
                : maltyConfig?.allowRevokeMintAuthority
                  ? "Revoke Mint Authority"
                  : "Mint Authority changes locked"}
            </button>
          </div>

          {hasMinted && (
            <div className="space-y-3 border-t border-border-low pt-5">
              <label
                htmlFor="token-recipient"
                className="block text-xs font-medium"
              >
                Recipient address
              </label>

              <input
                id="token-recipient"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Recipient address"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                className="w-full rounded-lg border border-border-low bg-background px-3 py-2 font-mono text-xs outline-none focus:border-ring"
              />

              <label
                htmlFor="token-transfer-amount"
                className="block text-xs font-medium"
              >
                MALTY amount to transfer
              </label>

              <input
                id="token-transfer-amount"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                type="number"
                min="0"
                step="0.000001"
                placeholder="Amount to transfer"
                aria-describedby={
                  transferAmountError
                    ? "token-transfer-amount-error"
                    : undefined
                }
                aria-invalid={transferAmountError != null}
                className="w-full rounded-lg border border-border-low bg-background px-3 py-2 text-sm outline-none focus:border-ring"
              />

              {transferAmountError && (
                <p
                  id="token-transfer-amount-error"
                  className="text-xs text-destructive"
                >
                  {transferAmountError}
                </p>
              )}

              <button
                onClick={handleTransfer}
                disabled={
                  isSending ||
                  !recipient.trim() ||
                  transferAmountError != null
                }
                className="w-full cursor-pointer rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-xs transition hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
              >
                {isSending ? "Working..." : "Transfer MALTY"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}