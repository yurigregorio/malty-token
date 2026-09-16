/**
 * Price-impact severity levels. MALTY still has thin liquidity, so these
 * thresholds are deliberately conservative compared to a typical blue-chip
 * pair — never hide impact, never auto-raise slippage, always require extra
 * confirmation once impact crosses the "extreme" threshold.
 *
 *  < 1%   normal
 *  1–5%   attention (moderate)
 *  > 5%   high (strong visual warning)
 *  > 15%  extreme — the review screen requires an explicit acknowledgement
 *         checkbox before the swap can be confirmed.
 */
export type PriceImpactLevel = "normal" | "attention" | "high";

export const PRICE_IMPACT_ATTENTION_PCT = 1;
export const PRICE_IMPACT_HIGH_PCT = 5;
/** Above this, the review screen blocks confirmation until the user acknowledges the risk. */
export const PRICE_IMPACT_ACK_REQUIRED_PCT = 15;

export function classifyPriceImpact(percent: number): PriceImpactLevel {
  if (percent >= PRICE_IMPACT_HIGH_PCT) return "high";
  if (percent >= PRICE_IMPACT_ATTENTION_PCT) return "attention";
  return "normal";
}

export function requiresExtraConfirmation(percent: number): boolean {
  return percent >= PRICE_IMPACT_ACK_REQUIRED_PCT;
}
