"use client";

import { useState } from "react";
import {
  MAX_SLIPPAGE_BPS,
  SLIPPAGE_PRESETS_BPS,
  bpsToPercentLabel,
  isHighSlippage,
  percentToBps,
  validateSlippageBps,
} from "../../lib/swap/slippage";
import { useSwapCopy } from "../../lib/swap/swap-copy";
import { useLanguage } from "../../lib/language";

export function SlippageSelector({
  slippageBps,
  onChange,
}: {
  slippageBps: number;
  onChange: (bps: number) => void;
}) {
  const t = useSwapCopy();
  const { language } = useLanguage();
  const isPreset = SLIPPAGE_PRESETS_BPS.includes(slippageBps);
  const [customOpen, setCustomOpen] = useState(!isPreset);
  const [customValue, setCustomValue] = useState(
    isPreset ? "" : (slippageBps / 100).toString()
  );
  const customError = customOpen && customValue !== ""
    ? validateSlippageBps(percentToBps(Number(customValue)), language)
    : null;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-1.5">
        {SLIPPAGE_PRESETS_BPS.map((bps) => (
          <button
            key={bps}
            type="button"
            onClick={() => {
              setCustomOpen(false);
              setCustomValue("");
              onChange(bps);
            }}
            className={`rounded-lg border px-2.5 py-1.5 text-xs font-bold transition-colors ${
              !customOpen && slippageBps === bps
                ? "border-[#e9b949]/50 bg-[#e9b949]/15 text-[#e9b949]"
                : "border-white/[0.1] text-white/60 hover:border-white/25"
            }`}
          >
            {bpsToPercentLabel(bps)}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setCustomOpen(true)}
          className={`rounded-lg border px-2.5 py-1.5 text-xs font-bold transition-colors ${
            customOpen
              ? "border-[#e9b949]/50 bg-[#e9b949]/15 text-[#e9b949]"
              : "border-white/[0.1] text-white/60 hover:border-white/25"
          }`}
        >
          {t.custom}
        </button>
        {customOpen && (
          <div className="flex items-center gap-1">
            <input
              inputMode="decimal"
              value={customValue}
              onChange={(e) => {
                const next = e.target.value;
                setCustomValue(next);
                const bps = percentToBps(Number(next));
                if (next !== "" && validateSlippageBps(bps, language) == null) {
                  onChange(bps);
                }
              }}
              placeholder="1.0"
              aria-label={t.custom}
              className="w-16 rounded-lg border border-white/[0.1] bg-black/20 px-2 py-1.5 text-xs text-white/90 outline-none focus:border-[#e9b949]/40"
            />
            <span className="text-xs text-white/50">%</span>
          </div>
        )}
      </div>
      {customError && (
        <p className="mt-1.5 text-[11px] text-red-300" role="alert">
          {customError}
        </p>
      )}
      {!customError && isHighSlippage(slippageBps) && (
        <p className="mt-1.5 text-[11px] text-[#e9b949]/90">
          {t.highSlippageWarning}
        </p>
      )}
      <p className="mt-1 text-[10px] text-white/30">
        {t.maxSlippagePrefix} {bpsToPercentLabel(MAX_SLIPPAGE_BPS)}.
      </p>
    </div>
  );
}
