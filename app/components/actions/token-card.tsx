"use client";

import { useState } from "react";
import { address, generateKeyPairSigner, type Address } from "@solana/kit";
import { useConnectedWallet } from "@solana/kit-plugin-wallet/react";
import { AuthorityType } from "@solana-program/token";
import { toast } from "sonner";

import { publicKey } from "@metaplex-foundation/umi";
import { createMetadataAccountV3 } from "@metaplex-foundation/mpl-token-metadata";

import { useAppClient } from "../../lib/client-provider";
import { createPhantomUmi } from "../../lib/umi-client";
import { getClusterUrl } from "../../lib/solana-client";

import { useCluster } from "../cluster-context";
import { useSend } from "../../lib/hooks/use-send";
import { ellipsify } from "../../lib/explorer";
import { isCustomProgramError } from "../../lib/errors";

const DECIMALS = 6;

const TOKEN_NAME = "Malty";
const TOKEN_SYMBOL = "MALTY";

const TOKEN_URI =
  "https://turbo-gateway.com/rLzUMFUoqgYI04MijeVjLDriWACUApJo2BKK6ycB5MU";

// Mint que já criamos na DEVNET.
const DEVNET_TEST_MINT =
  "6DJRHJMAhgjZjCxBktySxoLcDMtDyMBYCSqVQQCoUHd9";

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

  // Carrega automaticamente o Mint que já criamos na Devnet.
  const [mint, setMint] = useState<Address | null>(
    address(DEVNET_TEST_MINT)
  );

  // Os 1 bilhão já foram emitidos nesse Mint.
  const [hasMinted, setHasMinted] = useState(true);

  const [mintAuthorityRevoked, setMintAuthorityRevoked] =
    useState(false);

  const [mintAmount] = useState("1000000000");

  const [recipient, setRecipient] = useState("");
  const [transferAmount, setTransferAmount] = useState("10");

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

    if (cluster !== "devnet") {
      toast.error("Mint creation is enabled only on Devnet for now");
      return;
    }

    const newMint = await generateKeyPairSigner();

    const signature = await run(
      () =>
        client.token.instructions
          .createMint({
            newMint,
            decimals: DECIMALS,
            mintAuthority: signer.address,
            freezeAuthority: null,
          })
          .sendTransaction(),

      "Token mint created"
    );

    if (signature) {
      setMint(newMint.address);
      setHasMinted(false);
      setMintAuthorityRevoked(false);
    }
  };

  // -------------------------------------------------------
  // MINT 1 BILLION MALTY
  // -------------------------------------------------------

  const handleMint = async () => {
    const signer = connected?.signer;

    if (!signer || !mint) {
      return;
    }

    if (mintAuthorityRevoked) {
      toast.error("Mint Authority has already been revoked");
      return;
    }

    if (hasMinted) {
      toast.error("The 1 billion MALTY supply has already been minted");
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
            decimals: DECIMALS,
          })
          .sendTransaction(),

      "Tokens minted to your wallet"
    );

    if (signature) {
      setHasMinted(true);
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

    if (cluster !== "devnet") {
      toast.error("Metadata creation is enabled only on Devnet for now");
      return;
    }

    try {
      const umi = createPhantomUmi(getClusterUrl(cluster));

      await createMetadataAccountV3(umi, {
        mint: publicKey(mint),

        mintAuthority: umi.identity,

        updateAuthority: umi.identity.publicKey,

        data: {
          name: TOKEN_NAME,
          symbol: TOKEN_SYMBOL,
          uri: TOKEN_URI,

          sellerFeeBasisPoints: 0,

          creators: null,
          collection: null,
          uses: null,
        },

        isMutable: true,

        collectionDetails: null,
      }).sendAndConfirm(umi);

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
  // REVOKE MINT AUTHORITY
  // -------------------------------------------------------

  const handleRevokeMintAuthority = async () => {
    const signer = connected?.signer;

    if (!signer || !mint) {
      toast.error("Wallet or mint not found");
      return;
    }

    if (cluster !== "devnet") {
      toast.error(
        "Mint Authority can only be revoked on Devnet for now"
      );
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
      setMintAuthorityRevoked(true);
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
            decimals: DECIMALS,
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

  return (
    <div className="rounded-2xl border border-border-low bg-card p-6">
      <h2 className="text-sm font-semibold">MALTY Token</h2>

      <p className="mt-1 text-xs text-muted">
        Devnet test for MALTY SPL token, metadata and authorities.
      </p>

      {!mint ? (
        <button
          onClick={handleCreateMint}
          disabled={isSending || cluster !== "devnet"}
          className="mt-4 w-full cursor-pointer rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-xs transition hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
        >
          {isSending
            ? "Creating..."
            : `Create mint (${DECIMALS} decimals)`}
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
                hasMinted
              }
              className="w-full cursor-pointer rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-xs transition hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
            >
              {mintAuthorityRevoked
                ? "Mint Authority revoked"
                : hasMinted
                  ? "1B MALTY already minted"
                  : isSending
                    ? "Working..."
                    : "Mint 1B MALTY"}
            </button>

            <button
              onClick={handleAddMetadata}
              disabled={cluster !== "devnet" || isSending}
              className="w-full cursor-pointer rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-xs transition hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
            >
              Add MALTY metadata
            </button>

            <button
              onClick={handleRevokeMintAuthority}
              disabled={
                isSending ||
                mintAuthorityRevoked ||
                !hasMinted ||
                cluster !== "devnet"
              }
              className="w-full cursor-pointer rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-xs transition hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
            >
              {mintAuthorityRevoked
                ? "Mint Authority revoked"
                : "Revoke Mint Authority"}
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
                onChange={(e) =>
                  setRecipient(e.target.value)
                }
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
                onChange={(e) =>
                  setTransferAmount(e.target.value)
                }
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
                {isSending
                  ? "Working..."
                  : "Transfer MALTY"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}