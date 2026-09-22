"use client";

import { useState } from "react";
import { publicKey, some } from "@metaplex-foundation/umi";
import {
  fetchMetadataFromSeeds,
  updateV1,
} from "@metaplex-foundation/mpl-token-metadata";
import { toast } from "sonner";

import {
  MALTY_PUBLIC_MINT,
  MALTY_TOKEN,
} from "../../lib/malty-token";
import { createPhantomUmi } from "../../lib/umi-client";
import { getClusterUrl } from "../../lib/solana-client";

export function MetadataMaintenanceCard() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [status, setStatus] = useState(
    "Ready to verify the Update Authority."
  );

  async function handleUpdate() {
    setIsUpdating(true);

    try {
      setStatus("Verifying the official hosted metadata...");

      const [metadataResponse, imageResponse] = await Promise.all([
        fetch(MALTY_TOKEN.metadataTemplateUri, { cache: "no-store" }),
        fetch(MALTY_TOKEN.imageUri, { cache: "no-store" }),
      ]);

      if (!metadataResponse.ok) {
        throw new Error(
          `Official metadata endpoint returned ${metadataResponse.status}`
        );
      }

      if (!imageResponse.ok) {
        throw new Error(
          `Official MALTY icon endpoint returned ${imageResponse.status}`
        );
      }

      const hostedMetadata = (await metadataResponse.json()) as {
        name?: string;
        symbol?: string;
        image?: string;
      };

      if (
        hostedMetadata.name !== MALTY_TOKEN.name ||
        hostedMetadata.symbol !== MALTY_TOKEN.symbol ||
        hostedMetadata.image !== MALTY_TOKEN.imageUri
      ) {
        throw new Error(
          "Hosted metadata does not match the approved MALTY configuration"
        );
      }

      setStatus("Checking the current Metaplex Update Authority...");

      const umi = createPhantomUmi(getClusterUrl("mainnet"));
      const mint = publicKey(MALTY_PUBLIC_MINT);
      const currentMetadata = await fetchMetadataFromSeeds(umi, { mint });

      if (!currentMetadata.isMutable) {
        throw new Error("MALTY metadata is immutable and cannot be updated");
      }

      if (
        currentMetadata.updateAuthority.toString() !==
        umi.identity.publicKey.toString()
      ) {
        throw new Error(
          "Connected Phantom is not the MALTY Metadata Update Authority"
        );
      }

      setStatus(
        "Metadata verified. Confirm the Metaplex URI update in Phantom..."
      );

      await updateV1(umi, {
        mint,
        authority: umi.identity,
        data: some({
          ...currentMetadata,
          name: MALTY_TOKEN.name,
          symbol: MALTY_TOKEN.symbol,
          uri: MALTY_TOKEN.metadataTemplateUri,
        }),
      }).sendAndConfirm(umi);

      setStatus(
        "MALTY metadata updated on Mainnet. The official URI is now the project metadata endpoint."
      );
      toast.success("Official MALTY metadata updated on Mainnet");
    } catch (error) {
      console.error("Official metadata maintenance error:", error);
      const message =
        error instanceof Error
          ? error.message
          : "Failed to update official MALTY metadata";
      setStatus(message);
      toast.error(message);
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <div className="rounded-2xl border border-amber-400/25 bg-amber-400/[0.04] p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
        One-time metadata maintenance
      </p>
      <h2 className="mt-2 text-lg font-bold">
        Update official MALTY metadata on Mainnet
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        This guarded flow verifies the official MALTY icon and metadata hosted
        by the project, checks that the connected Phantom is the current
        Metadata Update Authority, then asks Phantom to sign only the Metaplex
        metadata URI update. Supply and the revoked Mint Authority are not
        changed.
      </p>

      <div className="mt-4 rounded-xl border border-border-low bg-background p-3 text-xs leading-relaxed text-muted">
        <strong className="text-foreground">Metadata URI:</strong>{" "}
        <span className="break-all">{MALTY_TOKEN.metadataTemplateUri}</span>
      </div>

      <div className="mt-3 rounded-xl border border-border-low bg-background p-3 text-xs leading-relaxed text-muted">
        <strong className="text-foreground">Status:</strong> {status}
      </div>

      <button
        type="button"
        onClick={handleUpdate}
        disabled={isUpdating}
        className="mt-4 w-full cursor-pointer rounded-xl bg-amber-400 px-4 py-3 text-sm font-semibold text-black transition hover:bg-amber-300 disabled:pointer-events-none disabled:opacity-50"
      >
        {isUpdating
          ? "Updating official MALTY metadata..."
          : "Verify & update MALTY on Mainnet"}
      </button>

      <p className="mt-3 text-xs leading-relaxed text-muted">
        Arweave uploads from the previous flow now return HTTP 402 because the
        bundler requires payment. This update therefore uses the project-owned
        HTTPS metadata endpoint without initiating a separate storage payment.
        The URI can still be migrated to paid permanent Arweave storage later.
      </p>
    </div>
  );
}
