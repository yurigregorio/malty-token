"use client";

import { useState } from "react";
import { formatTokenAmount } from "../../lib/swap/amount";
import { getSwapToken, type SwapToken, type SwapTokenSymbol } from "../../lib/swap/tokens";
import { useSwapCopy } from "../../lib/swap/swap-copy";
import { formatUsd } from "../../lib/swap/format-usd";

export function TokenIcon({ token }: { token: SwapToken }) {
  const [failed, setFailed] = useState(false);

  if (!token.logoUri || failed) {
    return (
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e9b949]/15 text-[9px] font-black text-[#e9b949]">
        {token.symbol.slice(0, 1)}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- external token logos, not a first-party asset
    <img
      src={token.logoUri}
      alt=""
      className="h-5 w-5 shrink-0 rounded-full bg-black/20 object-cover"
      onError={() => setFailed(true)}
    />
  );
}

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
  usdValue,
  priceLabel,
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
  /** Real USD value of the entered/quoted amount, when a price is known. */
  usdValue?: number | null;
  /** Discreet "1 TOKEN ≈ $X" line, shown below the token selector (e.g. for MALTY). */
  priceLabel?: string | null;
}) {
  const t = useSwapCopy();
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
            {t.balance}: {formatTokenAmount(balance, meta.decimals)}
            {onMax && (
              <button
                type="button"
                onClick={onMax}
                className="ml-1.5 rounded border border-white/[0.12] px-1.5 py-0.5 text-[10px] font-bold text-[#e9b949] hover:border-[#e9b949]/40"
              >
                {t.max}
              </button>
            )}
          </span>
        )}
        {balance == null && isLoadingBalance && (
          <span className="text-[11px] text-white/30">{t.loadingBalance}</span>
        )}
        {balance == null && !isLoadingBalance && balanceError != null && (
          <span className="text-[11px] text-[#e9b949]/80">
            {t.balanceUnavailable}
            {onRetryBalance && (
              <button
                type="button"
                onClick={onRetryBalance}
                className="ml-1.5 rounded border border-white/[0.12] px-1.5 py-0.5 text-[10px] font-bold text-[#e9b949] hover:border-[#e9b949]/40"
              >
                {t.retry}
              </button>
            )}
          </span>
        )}
      </div>

      <div className="mt-2 flex items-start gap-3">
        <div className="relative shrink-0">
          <button
            type="button"
            disabled={!canPickToken}
            onClick={() => setPickerOpen((v) => !v)}
            className={`flex items-center gap-2 rounded-xl border border-white/[0.1] bg-black/20 px-3 py-2 text-sm font-black text-white/90 transition-colors ${
              canPickToken ? "cursor-pointer hover:border-[#e9b949]/35" : "cursor-default opacity-90"
            }`}
          >
            <TokenIcon token={meta} />
            {meta.symbol}
            {canPickToken && <span className="text-[10px] text-white/40">▾</span>}
          </button>

          {priceLabel && (
            <p className="mt-1 truncate px-0.5 text-[10px] text-white/35">{priceLabel}</p>
          )}

          {pickerOpen && canPickToken && (
            <div className="absolute left-0 top-full z-20 mt-1.5 w-36 rounded-xl border border-white/[0.1] bg-[#0c0f13] p-1.5 shadow-lg">
              {tokenOptions.map((symbol) => (
                <button
                  key={symbol}
                  type="button"
                  onClick={() => {
                    onTokenChange?.(symbol);
                    setPickerOpen(false);
                  }}
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-bold transition-colors ${
                    symbol === token ? "text-[#e9b949]" : "text-white/80 hover:bg-white/[0.05]"
                  }`}
                >
                  <TokenIcon token={getSwapToken(symbol)} />
                  {symbol}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1 text-right">
          {editable ? (
            <input
              inputMode="decimal"
              autoComplete="off"
              value={amount}
              onChange={(e) => onAmountChange?.(e.target.value)}
              placeholder="0.00"
              aria-label={`${label} ${t.amountFieldSuffix}`}
              aria-invalid={error != null}
              className="w-full min-w-0 bg-transparent text-right text-[28px] font-black leading-tight text-white/95 outline-none transition-colors placeholder:text-white/20 focus:text-[#f4d385]"
            />
          ) : (
            <span className="block w-full min-w-0 truncate text-right text-[28px] font-black leading-tight text-white/95">
              {displayValue ?? "0.00"}
            </span>
          )}
          {usdValue != null && (
            <p className="mt-0.5 text-[11px] text-white/40">≈ {formatUsd(usdValue)}</p>
          )}
        </div>
      </div>

      {error && (
        <p className="mt-2 text-[11px] text-red-300" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
