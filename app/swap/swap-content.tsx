"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SiteHeader } from "../components/site-header";
import { MaltySwap } from "../components/swap/malty-swap";
import { parseSwapSearchParams } from "../lib/swap/url-params";
import { isSupportedPair } from "../lib/swap/tokens";
import { MALTY_RAYDIUM_SWAP_URL } from "../lib/malty-token";

export function SwapContent() {
  const searchParams = useSearchParams();

  const parsed = useMemo(() => parseSwapSearchParams(searchParams), [searchParams]);

  const outputToken = parsed.outputToken ?? "MALTY";
  const inputToken =
    parsed.inputToken && isSupportedPair(parsed.inputToken, outputToken)
      ? parsed.inputToken
      : undefined;

  return (
    <main className="min-h-screen bg-[#080a0d] text-[#f7f1e5]">
      <SiteHeader />

      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-md text-center">
          <p className="text-[11px] font-black tracking-[0.22em] text-[#e9b949]">MALTY SWAP</p>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
            Trade $MALTY.
          </h1>
          <p className="mt-4 text-sm leading-6 text-white/55">
            Swap SOL or USDC for MALTY — and back — using real Raydium liquidity, straight
            from your own wallet. Nothing is custodied, and every transaction is signed by you.
          </p>
        </div>

        <div className="mt-9">
          <MaltySwap
            mode="full"
            defaultInputMint={inputToken}
            defaultOutputMint={outputToken}
            initialAmount={parsed.exactOutputAmount == null ? (parsed.initialAmount ?? undefined) : undefined}
            exactOutputAmount={parsed.exactOutputAmount ?? undefined}
            returnTo={parsed.returnTo ?? undefined}
            source={parsed.source}
          />
        </div>

        <div className="mx-auto mt-8 flex max-w-md flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[12px] text-white/40">
          <Link href="/how-to-buy" className="font-semibold text-white/60 hover:text-white">
            New to crypto? Read the guide →
          </Link>
          <a
            href={MALTY_RAYDIUM_SWAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/70"
          >
            Open on Raydium ↗
          </a>
        </div>
      </div>
    </main>
  );
}
