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
  const [selectedIcon, setSelectedIcon] = useState<File | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [status, setStatus] = useState(
    "Ready to verify the Update Authority."
  );
  const [published, setPublished] = useState<PublishedMetadata | null>(
    null
  );

  async function handlePublishAndUpdate() {
    if (!selectedIcon) {
      toast.error("Select the approved MALTY PNG first");
      return;
    }

    if (selectedIcon.type !== "image/png") {
      toast.error("The official MALTY icon must be a PNG file");
      return;
    }

    if (selectedIcon.size >= FREE_UPLOAD_LIMIT_BYTES) {
      toast.error("The selected PNG must be smaller than 100 KiB");
      return;
    }

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

      const imageUri = await uploadSmallPermanentBlob(
        selectedIcon,
        "image/png",
        selectedIcon.name || "malty-official.png"
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

      <label className="mt-4 block rounded-xl border border-dashed border-amber-400/30 bg-background p-4">
        <span className="block text-xs font-semibold text-foreground">
          Official MALTY icon (PNG, under 100 KiB)
        </span>
        <input
          type="file"
          accept="image/png"
          disabled={isPublishing}
          onChange={(event) => {
            const file = event.target.files?.[0] ?? null;
            setSelectedIcon(file);
            setPublished(null);
            setStatus(
              file
                ? `Selected: ${file.name} (${Math.ceil(file.size / 1024)} KiB)`
                : "Ready to verify the Update Authority."
            );
          }}
          className="mt-3 block w-full text-xs text-muted file:mr-3 file:rounded-lg file:border-0 file:bg-amber-400 file:px-3 file:py-2 file:font-semibold file:text-black"
        />
      </label>

      <div className="mt-4 rounded-xl border border-border-low bg-background p-3 text-xs leading-relaxed text-muted">
        <strong className="text-foreground">Status:</strong> {status}
      </div>

      <button
        type="button"
        onClick={handlePublishAndUpdate}
        disabled={isPublishing || !selectedIcon}
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
