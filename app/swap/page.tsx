import type { Metadata } from "next";
import { Suspense } from "react";
import { SwapContent } from "./swap-content";

export const metadata: Metadata = {
  title: "Swap $MALTY | MALTY",
  description: "Swap SOL or USDC for $MALTY (and back) directly from your Solana wallet, using real Raydium liquidity. Non-custodial — you always sign your own transaction.",
  openGraph: {
    title: "Swap $MALTY",
    description: "Swap SOL or USDC for $MALTY directly from your wallet, using real Raydium liquidity.",
    images: ["/opengraph-image"],
  },
};

export default function SwapPage() {
  return (
    <Suspense fallback={<SwapFallback />}>
      <SwapContent />
    </Suspense>
  );
}

function SwapFallback() {
  return (
    <main className="min-h-screen bg-[#080a0d] text-[#f7f1e5]">
      <div className="mx-auto max-w-md px-5 py-10 sm:px-8">
        <div className="mx-auto h-[420px] animate-pulse rounded-2xl border border-white/[0.08] bg-white/[0.02]" />
      </div>
    </main>
  );
}
