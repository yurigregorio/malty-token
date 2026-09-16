const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Formats a USD amount for normal display, e.g. "$21.36". */
export function formatUsd(value: number): string {
  return usdFormatter.format(value);
}

/**
 * Formats a per-token USD *price* (not an amount), which for a low-price
 * token like MALTY can be a tiny fraction of a cent — a fixed 2-decimal
 * formatter would just show "$0.00". Shows enough significant digits to be
 * meaningful, e.g. "$0.0001234".
 */
export function formatUsdPrice(value: number): string {
  if (value <= 0) return "$0";
  if (value >= 1) return usdFormatter.format(value);

  // Enough decimals to show ~4 significant figures for sub-$1 prices.
  const magnitude = Math.floor(Math.log10(value));
  const decimals = Math.min(12, Math.max(2, -magnitude + 3));
  return `$${value.toFixed(decimals)}`;
}
