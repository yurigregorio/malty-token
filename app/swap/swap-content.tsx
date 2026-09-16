"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SiteHeader } from "../components/site-header";
import { MaltySwap } from "../components/swap/malty-swap";
import { parseSwapSearchParams } from "../lib/swap/url-params";
import { isSupportedPair } from "../lib/swap/tokens";
import { useSwapCopy } from "../lib/swap/swap-copy";
import { MALTY_RAYDIUM_SWAP_URL } from "../lib/malty-token";

export function SwapContent() {
  const searchParams = useSearchParams();
  const t = useSwapCopy();

  const parsed = useMemo(() => parseSwapSearchParams(searchParams), [searchParams]);

  const outputToken = parsed.outputToken ?? "MALTY";
  const inputToken =
    parsed.inputToken && isSupportedPair(parsed.inputToken, outputToken)
      ? parsed.inputToken
      : undefined;

  return (
    <main className="min-h-screen bg-[#080a0d] text-[#f7f1e5]">
      <SiteHeader />

      <div className="relative">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(217,165,61,0.12),transparent_55%)]" />

        <div className="relative mx-auto max-w-md px-5 py-8 sm:px-8 sm:py-10">
          <div className="text-center">
            <p className="text-[11px] font-black tracking-[0.2em] text-[#e9b949]">{t.pageEyebrow}</p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-[-0.02em] sm:text-4xl">{t.pageTitle}</h1>
            <p className="mx-auto mt-2.5 max-w-sm text-[13px] leading-5 text-white/50">
              {t.pageSubtitle}
            </p>
          </div>

          <div className="mt-6">
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

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[12px] text-white/40">
            <Link href="/how-to-buy" className="font-semibold text-white/60 hover:text-white">
              {t.guideLink}
            </Link>
            <a
              href={MALTY_RAYDIUM_SWAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/70"
            >
              {t.openOnRaydium}
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
