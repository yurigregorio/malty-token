import { formatTokenAmount, fromBaseUnits } from "../../lib/swap/amount";
import { bpsToPercentLabel } from "../../lib/swap/slippage";
import { getSwapToken } from "../../lib/swap/tokens";
import { estimateNetworkFeeLamports } from "../../lib/swap/network-fee";
import { formatUsd } from "../../lib/swap/format-usd";
import type { SwapQuote } from "../../lib/swap/types";
import type { UsdPrices } from "../../lib/swap/use-token-usd-prices";
import { PriceImpactBadge } from "./price-impact-badge";
import { InfoTooltip } from "./info-tooltip";
import { useSwapCopy } from "../../lib/swap/swap-copy";

function Row({
  label,
  value,
  tooltip,
  tooltipTitle,
}: {
  label: string;
  value: React.ReactNode;
  tooltip?: React.ReactNode;
  tooltipTitle?: string;
}) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="flex items-center gap-1.5 text-white/45">
        {label}
        {tooltip && <InfoTooltip label={tooltipTitle ?? label}>{tooltip}</InfoTooltip>}
      </span>
      <span className="font-semibold text-white/85">{value}</span>
    </div>
  );
}

export function SwapDetails({
  quote,
  isStale,
  usdPrices,
}: {
  quote: SwapQuote;
  isStale: boolean;
  usdPrices: UsdPrices;
}) {
  const t = useSwapCopy();
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
  const inputUsd = usdPrices.valueFor(quote.inputMint, quote.inputAmount);
  const networkFeeLamports = estimateNetworkFeeLamports();

  return (
    <div className="space-y-1.5 rounded-xl border border-white/[0.08] bg-black/15 p-3">
      {isStale && (
        <p className="flex items-center gap-1.5 text-[11px] font-semibold text-[#e9b949]/90">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#e9b949]" />
          {t.refreshingQuote}
        </p>
      )}
      <Row
        label={t.rate}
        value={`1 ${inputMeta.symbol} ≈ ${rate.toLocaleString("en-US", { maximumFractionDigits: 6 })} ${outputMeta.symbol}`}
      />
      {inputUsd != null && <Row label={t.estimatedValue} value={`≈ ${formatUsd(inputUsd)}`} />}
      <Row
        label={isExactIn ? t.minimumReceived : t.maximumYouPay}
        value={
          quote.otherAmountThreshold != null
            ? `${formatTokenAmount(quote.otherAmountThreshold, thresholdMeta.decimals)} ${thresholdMeta.symbol}`
            : "—"
        }
      />
      <Row
        label={t.slippageTolerance}
        value={bpsToPercentLabel(quote.slippageBps)}
        tooltip={t.slippageExplanation}
        tooltipTitle={t.whatIsSlippage}
      />
      <Row label={t.priceImpact} value={<PriceImpactBadge percent={quote.priceImpactPercent} />} />
      <Row
        label={t.estimatedNetworkFee}
        value={`≈ ${fromBaseUnits(networkFeeLamports, 9)} SOL`}
      />
      <Row
        label={t.route}
        value={`${inputMeta.symbol} → ${outputMeta.symbol} ${t.viaRaydium}`}
      />
    </div>
  );
}

/** Discreet loading placeholder shown while the first quote for a new amount is in flight. */
export function SwapDetailsSkeleton() {
  return (
    <div className="space-y-2 rounded-xl border border-white/[0.08] bg-black/15 p-3" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="flex items-center justify-between">
          <span className="h-2.5 w-16 animate-pulse rounded-full bg-white/[0.08]" />
          <span className="h-2.5 w-20 animate-pulse rounded-full bg-white/[0.08]" />
        </div>
      ))}
    </div>
  );
}
