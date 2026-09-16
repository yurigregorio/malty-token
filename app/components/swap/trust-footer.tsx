"use client";

import { useState } from "react";
import { MALTY_PUBLIC_MINT, MALTY_SOLSCAN_TOKEN_URL } from "../../lib/malty-token";
import { ellipsify } from "../../lib/explorer";
import { useSwapCopy } from "../../lib/swap/swap-copy";

export function SwapTrustFooter() {
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
    <div className="mt-3 space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 text-[11px]">
        <div className="flex min-w-0 items-center gap-1.5">
          <span className="shrink-0 font-semibold tracking-[0.08em] text-white/40">
            {t.contractLabel}
          </span>
          <span className="truncate font-mono text-white/70">{ellipsify(MALTY_PUBLIC_MINT, 6)}</span>
          <button
            onClick={copyMint}
            className="shrink-0 rounded border border-white/[0.12] px-1.5 py-0.5 font-semibold text-white/70 transition-colors hover:border-[#e9b949]/40 hover:text-[#e9b949]"
          >
            {copyState === "copied" ? t.copied : copyState === "error" ? t.copyFailed : t.copy}
          </button>
        </div>
        <a
          href={MALTY_SOLSCAN_TOKEN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 font-semibold text-white/50 hover:text-white"
        >
          {t.viewOnSolscan}
        </a>
      </div>

      <p className="text-center text-[10.5px] leading-4 text-white/30">{t.disclosure}</p>
    </div>
  );
}
