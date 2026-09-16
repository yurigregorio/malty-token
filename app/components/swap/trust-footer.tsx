"use client";

import { useState } from "react";
import { MALTY_PUBLIC_MINT } from "../../lib/malty-token";

export function SwapTrustFooter() {
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
    <div className="mt-5 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/[0.08] bg-black/15 px-4 py-3">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold tracking-[0.14em] text-white/40">
            $MALTY CONTRACT
          </p>
          <p className="mt-0.5 truncate font-mono text-xs text-white/80">
            {MALTY_PUBLIC_MINT}
          </p>
        </div>
        <button
          onClick={copyMint}
          className="shrink-0 rounded-lg border border-white/[0.1] bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold text-white/85 transition-colors hover:border-[#e9b949]/35"
        >
          {copyState === "copied" ? "Copied!" : copyState === "error" ? "Copy failed" : "Copy"}
        </button>
      </div>

      <p className="flex items-center gap-1.5 text-[11px] font-semibold text-white/45">
        <span className="text-[#e9b949]">⚡</span> Powered by Raydium
      </p>

      <p className="text-[11px] leading-5 text-white/35">
        Swaps are executed on Solana using decentralized liquidity. Rates and price impact
        may change before confirmation. Always review the transaction in your wallet.
      </p>
    </div>
  );
}
