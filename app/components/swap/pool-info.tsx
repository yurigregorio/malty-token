import { MALTY_RAYDIUM_POOL_ID } from "../../lib/malty-token";
import { useSwapCopy } from "../../lib/swap/swap-copy";
import type { SwapTokenSymbol } from "../../lib/swap/tokens";
import { ExternalLinkIcon, ZapIcon } from "./icons";

/**
 * Shows which Raydium pool actually backs the current quote. Prefers the
 * pool id Raydium's own quote response named for the route; falls back to
 * the project's verified official MALTY/SOL pool (never a guessed address).
 * Pairs with `<SwapContractInfo />` in a two-column layout.
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
    <div className="rounded-xl border border-white/[0.08] bg-black/15 px-3.5 py-2.5">
      <p className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.1em] text-white/40">
        <ZapIcon className="h-3 w-3 text-[#e9b949]/70" />
        {t.poolInfoTitle}
      </p>
      <p className="mt-1 text-xs font-bold text-white/85">{pairLabel}</p>
      <a
        href={`https://solscan.io/account/${effectivePoolId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1.5 flex items-center gap-1 text-[11px] font-semibold text-white/50 hover:text-[#e9b949]"
      >
        {t.viewPool.replace(" ↗", "")}
        <ExternalLinkIcon className="h-3 w-3" />
      </a>
    </div>
  );
}
