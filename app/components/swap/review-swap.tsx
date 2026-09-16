import { formatTokenAmount } from "../../lib/swap/amount";
import { bpsToPercentLabel } from "../../lib/swap/slippage";
import { requiresExtraConfirmation } from "../../lib/swap/price-impact";
import { getSwapToken } from "../../lib/swap/tokens";
import type { SwapQuote } from "../../lib/swap/types";
import { PriceImpactBadge } from "./price-impact-badge";

export function ReviewSwap({
  quote,
  priceImpactAck,
  onPriceImpactAckChange,
  onBack,
  onConfirm,
  isSubmitting,
}: {
  quote: SwapQuote;
  priceImpactAck: boolean;
  onPriceImpactAckChange: (checked: boolean) => void;
  onBack: () => void;
  onConfirm: () => void;
  isSubmitting: boolean;
}) {
  const inputMeta = getSwapToken(quote.inputMint);
  const outputMeta = getSwapToken(quote.outputMint);
  const thresholdMeta = quote.mode === "exact-in" ? outputMeta : inputMeta;
  const needsAck = requiresExtraConfirmation(quote.priceImpactPercent);
  const canConfirm = !needsAck || priceImpactAck;

  return (
    <div className="space-y-3">
      <p className="text-sm font-black tracking-[-0.01em] text-white/95">Review Swap</p>

      <div className="rounded-xl border border-white/[0.08] bg-black/15 p-3.5 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/45">You pay</span>
          <span className="text-sm font-black text-white/95">
            {formatTokenAmount(quote.inputAmount, inputMeta.decimals)} {inputMeta.symbol}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/45">You receive approximately</span>
          <span className="text-sm font-black text-white/95">
            {formatTokenAmount(quote.outputAmount, outputMeta.decimals)} {outputMeta.symbol}
          </span>
        </div>
        <div className="h-px bg-white/[0.08]" />
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/45">
            {quote.mode === "exact-in" ? "Minimum received" : "Maximum you pay"}
          </span>
          <span className="text-xs font-bold text-white/80">
            {quote.otherAmountThreshold != null
              ? `${formatTokenAmount(quote.otherAmountThreshold, thresholdMeta.decimals)} ${thresholdMeta.symbol}`
              : "—"}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/45">Price impact</span>
          <PriceImpactBadge percent={quote.priceImpactPercent} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/45">Slippage</span>
          <span className="text-xs font-bold text-white/80">{bpsToPercentLabel(quote.slippageBps)}</span>
        </div>
      </div>

      {needsAck && (
        <label className="flex cursor-pointer items-start gap-2.5 rounded-xl border border-red-400/25 bg-red-400/[0.06] p-3.5 text-xs leading-5 text-red-200">
          <input
            type="checkbox"
            checked={priceImpactAck}
            onChange={(e) => onPriceImpactAckChange(e.target.checked)}
            className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-red-400"
          />
          This swap has a high price impact ({quote.priceImpactPercent.toFixed(2)}%) due to MALTY&apos;s
          current liquidity. I understand I may receive significantly less value than I pay, and I want to
          continue.
        </label>
      )}

      <p className="text-center text-[11px] font-semibold text-white/35">Powered by Raydium</p>

      <div className="flex gap-2.5">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="flex-1 rounded-xl border border-white/[0.12] px-4 py-3 text-sm font-bold text-white/75 transition-colors hover:border-white/25 disabled:opacity-50"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={!canConfirm || isSubmitting}
          className="flex-[2] rounded-xl bg-[#e9b949] px-4 py-3 text-sm font-black text-black transition-transform hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-50"
        >
          {isSubmitting ? "Confirm in wallet…" : "Confirm Swap"}
        </button>
      </div>
    </div>
  );
}
