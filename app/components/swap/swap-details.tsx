import { formatTokenAmount, fromBaseUnits } from "../../lib/swap/amount";
import { bpsToPercentLabel } from "../../lib/swap/slippage";
import { getSwapToken } from "../../lib/swap/tokens";
import type { SwapQuote } from "../../lib/swap/types";
import { PriceImpactBadge } from "./price-impact-badge";
import { InfoTooltip } from "./info-tooltip";
import { SLIPPAGE_EXPLANATION } from "./slippage-copy";

function Row({
  label,
  value,
  tooltip,
}: {
  label: string;
  value: React.ReactNode;
  tooltip?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="flex items-center gap-1.5 text-white/45">
        {label}
        {tooltip && <InfoTooltip label={`What is ${label.toLowerCase()}?`}>{tooltip}</InfoTooltip>}
      </span>
      <span className="font-semibold text-white/85">{value}</span>
    </div>
  );
}

export function SwapDetails({
  quote,
  isStale,
}: {
  quote: SwapQuote;
  isStale: boolean;
}) {
  const inputMeta = getSwapToken(quote.inputMint);
  const outputMeta = getSwapToken(quote.outputMint);

  // fromBaseUnits gives a plain (non-grouped) decimal string — formatTokenAmount's
  // "12,430" grouping would make Number(...) parse to NaN here.
  const rate =
    quote.inputAmount > 0n
      ? Number(fromBaseUnits(quote.outputAmount, outputMeta.decimals)) /
        Number(fromBaseUnits(quote.inputAmount, inputMeta.decimals))
      : 0;

  const isExactIn = quote.mode === "exact-in";
  const thresholdMeta = isExactIn ? outputMeta : inputMeta;

  return (
    <div className="space-y-1.5 rounded-xl border border-white/[0.08] bg-black/15 p-3">
      {isStale && (
        <p className="flex items-center gap-1.5 text-[11px] font-semibold text-[#e9b949]/90">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#e9b949]" />
          Refreshing quote…
        </p>
      )}
      <Row
        label="Rate"
        value={`1 ${inputMeta.symbol} ≈ ${rate.toLocaleString("en-US", { maximumFractionDigits: 6 })} ${outputMeta.symbol}`}
      />
      <Row
        label={isExactIn ? "Minimum received" : "Maximum you pay"}
        value={
          quote.otherAmountThreshold != null
            ? `${formatTokenAmount(quote.otherAmountThreshold, thresholdMeta.decimals)} ${thresholdMeta.symbol}`
            : "—"
        }
      />
      <Row
        label="Slippage tolerance"
        value={bpsToPercentLabel(quote.slippageBps)}
        tooltip={SLIPPAGE_EXPLANATION}
      />
      <Row label="Price impact" value={<PriceImpactBadge percent={quote.priceImpactPercent} />} />
      <Row
        label="Route"
        value={
          quote.routes.length > 0
            ? `Raydium · ${quote.routes.length} pool${quote.routes.length > 1 ? "s" : ""}`
            : "Raydium"
        }
      />
    </div>
  );
}
