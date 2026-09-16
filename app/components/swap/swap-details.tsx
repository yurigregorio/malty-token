import { formatTokenAmount, fromBaseUnits } from "../../lib/swap/amount";
import { getSwapToken } from "../../lib/swap/tokens";
import { estimateNetworkFeeLamports } from "../../lib/swap/network-fee";
import { formatUsd, formatUsdPrice } from "../../lib/swap/format-usd";
import { MALTY_RAYDIUM_POOL_ID } from "../../lib/malty-token";
import type { SwapQuote } from "../../lib/swap/types";
import type { UsdPrices } from "../../lib/swap/use-token-usd-prices";
import { PriceImpactBadge } from "./price-impact-badge";
import { InfoTooltip } from "./info-tooltip";
import { useSwapCopy } from "../../lib/swap/swap-copy";
import { CardIcon, ExternalLinkIcon, ReceiptIcon, RefreshIcon, ShieldIcon, SwapIcon } from "./icons";

function DetailRow({
  icon: Icon,
  label,
  value,
  tooltip,
  tooltipTitle,
}: {
  icon: (props: { className?: string }) => React.ReactNode;
  label: string;
  value: React.ReactNode;
  tooltip?: React.ReactNode;
  tooltipTitle?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-2 text-xs">
      <span className="flex items-center gap-1.5 text-white/50">
        <Icon className="h-3.5 w-3.5 shrink-0 text-[#e9b949]/70" />
        {label}
        {tooltip && <InfoTooltip label={tooltipTitle ?? label}>{tooltip}</InfoTooltip>}
      </span>
      <span className="text-right font-semibold text-white/85">{value}</span>
    </div>
  );
}

export function SwapDetails({
  quote,
  isStale,
  usdPrices,
  poolId,
  onRefresh,
}: {
  quote: SwapQuote;
  isStale: boolean;
  usdPrices: UsdPrices;
  poolId?: string;
  onRefresh?: () => void;
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
  const maltyPrice = usdPrices.priceFor("MALTY");
  const networkFeeLamports = estimateNetworkFeeLamports();
  const poolUrl = `https://solscan.io/account/${poolId ?? MALTY_RAYDIUM_POOL_ID}`;

  return (
    <div className="space-y-2">
      {isStale && (
        <p className="flex items-center gap-1.5 px-1 text-[11px] font-semibold text-[#e9b949]/90">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#e9b949]" />
          {t.refreshingQuote}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 px-0.5 text-[11.5px]">
        <span className="flex items-center gap-1.5 text-white/60">
          1 {inputMeta.symbol} ≈{" "}
          {rate.toLocaleString("en-US", { maximumFractionDigits: 6 })} {outputMeta.symbol}
          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              aria-label={t.refreshingQuote}
              className="text-white/35 transition-colors hover:text-[#e9b949]"
            >
              <RefreshIcon className="h-3 w-3" />
            </button>
          )}
        </span>
        {maltyPrice != null && (
          <span className="text-white/40">
            1 MALTY ≈ {formatUsdPrice(maltyPrice)}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <div className="space-y-2 rounded-xl border border-white/[0.08] bg-black/15 p-3">
          <DetailRow
            icon={ShieldIcon}
            label={t.priceImpact}
            value={<PriceImpactBadge percent={quote.priceImpactPercent} />}
          />
          <DetailRow
            icon={CardIcon}
            label={isExactIn ? t.minimumReceived : t.maximumYouPay}
            value={
              quote.otherAmountThreshold != null
                ? `${formatTokenAmount(quote.otherAmountThreshold, thresholdMeta.decimals)} ${thresholdMeta.symbol}`
                : "—"
            }
          />
          <DetailRow
            icon={ReceiptIcon}
            label={t.estimatedNetworkFee}
            value={`≈ ${fromBaseUnits(networkFeeLamports, 9)} SOL`}
          />
        </div>

        <div className="space-y-2 rounded-xl border border-white/[0.08] bg-black/15 p-3">
          <div>
            <span className="flex items-center gap-1.5 text-xs text-white/50">
              <SwapIcon className="h-3.5 w-3.5 shrink-0 text-[#e9b949]/70" />
              {t.route}
            </span>
            <p className="mt-1 text-xs font-bold text-white/85">
              {inputMeta.symbol} → {outputMeta.symbol}
            </p>
            <a
              href={poolUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-0.5 flex items-center gap-1 text-[11px] text-white/45 hover:text-[#e9b949]"
            >
              {t.viaRaydium} <ExternalLinkIcon className="h-3 w-3" />
            </a>
          </div>
          {inputUsd != null && <DetailRow icon={ShieldIcon} label={t.estimatedValue} value={`≈ ${formatUsd(inputUsd)}`} />}
        </div>
      </div>
    </div>
  );
}

/** Discreet loading placeholder shown while the first quote for a new amount is in flight. */
export function SwapDetailsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2" aria-hidden="true">
      {[0, 1].map((col) => (
        <div key={col} className="space-y-2.5 rounded-xl border border-white/[0.08] bg-black/15 p-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="h-2.5 w-16 animate-pulse rounded-full bg-white/[0.08]" />
              <span className="h-2.5 w-14 animate-pulse rounded-full bg-white/[0.08]" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
