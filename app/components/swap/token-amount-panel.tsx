"use client";

import { useState } from "react";
import { formatTokenAmount } from "../../lib/swap/amount";
import { getSwapToken, type SwapTokenSymbol } from "../../lib/swap/tokens";

export function TokenAmountPanel({
  label,
  token,
  tokenOptions,
  onTokenChange,
  amount,
  onAmountChange,
  displayValue,
  balance,
  isLoadingBalance,
  balanceError,
  onRetryBalance,
  onMax,
  error,
}: {
  label: string;
  token: SwapTokenSymbol;
  /** Selectable alternatives; omit or pass a single-item list to lock the token. */
  tokenOptions: readonly SwapTokenSymbol[];
  onTokenChange?: (symbol: SwapTokenSymbol) => void;
  /** The editable amount string (exact-in input, or exact-out fixed output). */
  amount: string;
  onAmountChange?: (value: string) => void;
  /** When the amount is computed (not user-typed), the formatted string to show instead. */
  displayValue?: string;
  balance: bigint | null;
  isLoadingBalance: boolean;
  /** Set when the balance fetch itself failed (e.g. RPC unavailable) — shown instead of going blank. */
  balanceError?: unknown;
  onRetryBalance?: () => void;
  onMax?: () => void;
  error?: string | null;
}) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const meta = getSwapToken(token);
  const canPickToken = onTokenChange != null && tokenOptions.length > 1;
  const editable = onAmountChange != null;

  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-3.5">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold tracking-[0.08em] text-white/45">
          {label}
        </span>
        {balance != null && (
          <span className="text-[11px] text-white/45">
            Balance: {formatTokenAmount(balance, meta.decimals)}
            {onMax && (
              <button
                type="button"
                onClick={onMax}
                className="ml-1.5 rounded border border-white/[0.12] px-1.5 py-0.5 text-[10px] font-bold text-[#e9b949] hover:border-[#e9b949]/40"
              >
                MAX
              </button>
            )}
          </span>
        )}
        {balance == null && isLoadingBalance && (
          <span className="text-[11px] text-white/30">Loading balance…</span>
        )}
        {balance == null && !isLoadingBalance && balanceError != null && (
          <span className="text-[11px] text-[#e9b949]/80">
            Balance unavailable
            {onRetryBalance && (
              <button
                type="button"
                onClick={onRetryBalance}
                className="ml-1.5 rounded border border-white/[0.12] px-1.5 py-0.5 text-[10px] font-bold text-[#e9b949] hover:border-[#e9b949]/40"
              >
                Retry
              </button>
            )}
          </span>
        )}
      </div>

      <div className="mt-2 flex items-center gap-3">
        <div className="relative">
          <button
            type="button"
            disabled={!canPickToken}
            onClick={() => setPickerOpen((v) => !v)}
            className={`flex items-center gap-2 rounded-xl border border-white/[0.1] bg-black/20 px-3 py-2 text-sm font-black text-white/90 ${
              canPickToken ? "cursor-pointer hover:border-[#e9b949]/35" : "cursor-default opacity-90"
            }`}
          >
            {meta.symbol}
            {canPickToken && <span className="text-[10px] text-white/40">▾</span>}
          </button>

          {pickerOpen && canPickToken && (
            <div className="absolute left-0 top-full z-20 mt-1.5 w-32 rounded-xl border border-white/[0.1] bg-[#0c0f13] p-1.5 shadow-lg">
              {tokenOptions.map((symbol) => (
                <button
                  key={symbol}
                  type="button"
                  onClick={() => {
                    onTokenChange?.(symbol);
                    setPickerOpen(false);
                  }}
                  className={`block w-full rounded-lg px-3 py-2 text-left text-sm font-bold transition-colors ${
                    symbol === token ? "text-[#e9b949]" : "text-white/80 hover:bg-white/[0.05]"
                  }`}
                >
                  {symbol}
                </button>
              ))}
            </div>
          )}
        </div>

        {editable ? (
          <input
            inputMode="decimal"
            autoComplete="off"
            value={amount}
            onChange={(e) => onAmountChange?.(e.target.value)}
            placeholder="0.00"
            aria-label={`${label} amount`}
            aria-invalid={error != null}
            className="w-full min-w-0 bg-transparent text-right text-2xl font-black text-white/95 outline-none placeholder:text-white/20"
          />
        ) : (
          <span className="w-full min-w-0 truncate text-right text-2xl font-black text-white/95">
            {displayValue ?? "0.00"}
          </span>
        )}
      </div>

      {error && (
        <p className="mt-2 text-[11px] text-red-300" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
