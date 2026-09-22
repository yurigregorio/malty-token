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

const TURBO_UNSIGNED_UPLOAD_URL =
  "https://upload.ardrive.io/x402/upload/unsigned";
const ARWEAVE_GATEWAY_URL = "https://arweave.net";
const FREE_UPLOAD_LIMIT_BYTES = 100 * 1024;

type TurboUploadResponse = {
  id?: string;
  [key: string]: unknown;
};

type PublishedMetadata = {
  imageUri: string;
  metadataUri: string;
};

async function uploadSmallPermanentBlob(
  blob: Blob,
  contentType: string,
  fileName: string
): Promise<string> {
  if (blob.size >= FREE_UPLOAD_LIMIT_BYTES) {
    throw new Error(
      `${fileName} is too large for the guarded free Arweave upload path.`
    );
  }

  const response = await fetch(TURBO_UNSIGNED_UPLOAD_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/octet-stream",
      "x-data-item-tags": JSON.stringify([
        { name: "Content-Type", value: contentType },
        { name: "App-Name", value: "MALTY" },
        { name: "App-Version", value: "1.0" },
        { name: "Title", value: fileName },
      ]),
    },
    body: blob,
  });

  const raw = await response.text();

  if (!response.ok) {
    throw new Error(
      `Arweave upload failed (${response.status}): ${raw.slice(0, 240)}`
    );
  }

  let result: TurboUploadResponse;

  try {
    result = JSON.parse(raw) as TurboUploadResponse;
  } catch {
    throw new Error("Arweave upload returned an invalid response");
  }

  if (!result.id || typeof result.id !== "string") {
    throw new Error("Arweave upload did not return a permanent data ID");
  }

  return `${ARWEAVE_GATEWAY_URL}/${result.id}`;
}

function buildPermanentMetadata(imageUri: string) {
  return {
    name: MALTY_TOKEN.name,
    symbol: MALTY_TOKEN.symbol,
    description: MALTY_TOKEN.description,
    image: imageUri,
    external_url: "https://malty-token.vercel.app",
    properties: {
      files: [{ uri: imageUri, type: "image/png" }],
      category: "image",
    },
    extensions: {
      website: "https://malty-token.vercel.app",
      twitter: "https://x.com/MaltyCoin",
      telegram: "https://t.me/MaltyCoinCommunity",
    },
  };
}

export function MetadataMaintenanceCard() {
  const [isPublishing, setIsPublishing] = useState(false);
  const [status, setStatus] = useState(
    "Ready to verify the Update Authority."
  );
  const [published, setPublished] = useState<PublishedMetadata | null>(
    null
  );

  async function handlePublishAndUpdate() {
    setIsPublishing(true);
    setPublished(null);

    try {
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

      setStatus("Publishing the approved MALTY icon to Arweave...");

      const iconResponse = await fetch("/malty-official.png", {
        cache: "no-store",
      });

      if (!iconResponse.ok) {
        throw new Error("Could not load the approved MALTY icon");
      }

      const iconBlob = await iconResponse.blob();
      const imageUri = await uploadSmallPermanentBlob(
        iconBlob,
        "image/png",
        "malty-official.png"
      );

      setStatus("Publishing the MALTY metadata JSON to Arweave...");

      const metadataJson = JSON.stringify(
        buildPermanentMetadata(imageUri),
        null,
        2
      );
      const metadataBlob = new Blob([metadataJson], {
        type: "application/json",
      });
      const metadataUri = await uploadSmallPermanentBlob(
        metadataBlob,
        "application/json",
        "malty-metadata.json"
      );

      setPublished({ imageUri, metadataUri });
      setStatus(
        "Permanent files published. Confirm the Metaplex update in Phantom..."
      );

      await updateV1(umi, {
        mint,
        authority: umi.identity,
        data: some({
          ...currentMetadata,
          name: MALTY_TOKEN.name,
          symbol: MALTY_TOKEN.symbol,
          uri: metadataUri,
        }),
      }).sendAndConfirm(umi);

      setStatus(
        "MALTY metadata updated on Mainnet. Save the permanent URI below."
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
      setIsPublishing(false);
    }
  }

  return (
    <div className="rounded-2xl border border-amber-400/25 bg-amber-400/[0.04] p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
        One-time metadata maintenance
      </p>
      <h2 className="mt-2 text-lg font-bold">
        Publish permanent metadata and update Mainnet
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        This guarded flow first verifies the connected Phantom as the current
        Metadata Update Authority, publishes the approved icon and JSON to
        permanent Arweave storage, then asks Phantom to sign the Metaplex URI
        update. It does not change supply or restore the revoked Mint Authority.
      </p>

      <div className="mt-4 rounded-xl border border-border-low bg-background p-3 text-xs leading-relaxed text-muted">
        <strong className="text-foreground">Status:</strong> {status}
      </div>

      <button
        type="button"
        onClick={handlePublishAndUpdate}
        disabled={isPublishing}
        className="mt-4 w-full cursor-pointer rounded-xl bg-amber-400 px-4 py-3 text-sm font-semibold text-black transition hover:bg-amber-300 disabled:pointer-events-none disabled:opacity-50"
      >
        {isPublishing
          ? "Publishing official metadata..."
          : "Publish to Arweave & update MALTY"}
      </button>

      {published && (
        <div className="mt-4 space-y-3 rounded-xl border border-border-low bg-background p-4 text-xs">
          <div>
            <p className="font-semibold text-foreground">
              Permanent image URI
            </p>
            <a
              href={published.imageUri}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block break-all text-amber-300 underline"
            >
              {published.imageUri}
            </a>
          </div>
          <div>
            <p className="font-semibold text-foreground">
              Permanent metadata URI
            </p>
            <a
              href={published.metadataUri}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block break-all text-amber-300 underline"
            >
              {published.metadataUri}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
