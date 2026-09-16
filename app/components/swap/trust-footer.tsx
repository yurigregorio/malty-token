"use client";

import { useState } from "react";
import { MALTY_PUBLIC_MINT, MALTY_SOLSCAN_TOKEN_URL } from "../../lib/malty-token";
import { ellipsify } from "../../lib/explorer";
import { useSwapCopy } from "../../lib/swap/swap-copy";
import { CopyIcon, ExternalLinkIcon } from "./icons";

/** Compact "MALTY contract" row — pairs with `<PoolInfo />` in a two-column layout. */
export function SwapContractInfo() {
  const t = useSwapCopy();
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  async function copyMint() {
    try {
      await navigator.clipboard.writeText(MALTY_PUBLIC_MINT);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
    window.setTimeout(() => setCopyState("idle"), 1600);
  }

  return (
    <div className="rounded-xl border border-white/[0.08] bg-black/15 px-3.5 py-2.5">
      <p className="text-[10px] font-semibold tracking-[0.1em] text-white/40">{t.contractLabel}</p>
      <div className="mt-1 flex items-center justify-between gap-2">
        <span className="truncate font-mono text-xs text-white/75">{ellipsify(MALTY_PUBLIC_MINT, 6)}</span>
        <button
          onClick={copyMint}
          aria-label={t.copy}
          className="shrink-0 text-white/50 transition-colors hover:text-[#e9b949]"
        >
          <CopyIcon className="h-3.5 w-3.5" />
        </button>
      </div>
      <a
        href={MALTY_SOLSCAN_TOKEN_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1.5 flex items-center gap-1 text-[11px] font-semibold text-white/50 hover:text-[#e9b949]"
      >
        {copyState === "copied" ? t.copied : copyState === "error" ? t.copyFailed : t.viewOnSolscan.replace(" ↗", "")}
        <ExternalLinkIcon className="h-3 w-3" />
      </a>
    </div>
  );
}

export function SwapDisclosure() {
  const t = useSwapCopy();
  return <p className="text-center text-[10.5px] leading-4 text-white/30">{t.disclosure}</p>;
}
