/**
 * Price-impact severity levels. MALTY still has thin liquidity, so these
 * thresholds are deliberately conservative compared to a typical blue-chip
 * pair — see AGENTS/product brief: never hide impact, never auto-raise
 * slippage, always require extra confirmation once impact is "high".
 */
export type PriceImpactLevel = "normal" | "attention" | "high";

export const PRICE_IMPACT_ATTENTION_PCT = 1;
export const PRICE_IMPACT_HIGH_PCT = 3;

export function classifyPriceImpact(percent: number): PriceImpactLevel {
  if (percent >= PRICE_IMPACT_HIGH_PCT) return "high";
  if (percent >= PRICE_IMPACT_ATTENTION_PCT) return "attention";
  return "normal";
}

export function requiresExtraConfirmation(percent: number): boolean {
  return classifyPriceImpact(percent) === "high";
}
