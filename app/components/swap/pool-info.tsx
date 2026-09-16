import { MALTY_RAYDIUM_POOL_ID } from "../../lib/malty-token";
import { useSwapCopy } from "../../lib/swap/swap-copy";
import type { SwapTokenSymbol } from "../../lib/swap/tokens";

/**
 * Shows which Raydium pool actually backs the current quote. Prefers the
 * pool id Raydium's own quote response named for the route; falls back to
 * the project's verified official MALTY/SOL pool (never a guessed address).
 */
export function PoolInfo({
  inputMint,
  outputMint,
  poolId,
}: {
  inputMint: SwapTokenSymbol;
  outputMint: SwapTokenSymbol;
  poolId?: string;
}) {
  const t = useSwapCopy();
  const effectivePoolId = poolId ?? MALTY_RAYDIUM_POOL_ID;
  const counterpart = inputMint === "MALTY" ? outputMint : inputMint;
  const pairLabel = `MALTY / ${counterpart}`;

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/[0.08] bg-black/15 px-3.5 py-2.5">
      <div className="min-w-0">
        <p className="text-[10px] font-semibold tracking-[0.1em] text-white/40">{t.poolInfoTitle}</p>
        <p className="mt-0.5 text-xs font-bold text-white/80">{pairLabel}</p>
      </div>
      <a
        href={`https://solscan.io/account/${effectivePoolId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 rounded-lg border border-white/[0.1] bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold text-white/85 transition-colors hover:border-[#e9b949]/35"
      >
        {t.viewPool}
      </a>
    </div>
  );
}
