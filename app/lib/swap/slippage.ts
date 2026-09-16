import type { Language } from "../language";

/** Slippage tolerance, expressed in basis points (1 bps = 0.01%). */

export const SLIPPAGE_PRESETS_BPS: readonly number[] = [50, 100, 200];

/** Conservative default: 1%. */
export const DEFAULT_SLIPPAGE_BPS = 100;

export const MIN_SLIPPAGE_BPS = 1;
/** 50% — anything above this is almost certainly a typo, not intent. */
export const MAX_SLIPPAGE_BPS = 5000;

/** Slippage above this is flagged as unusually high in the UI (still allowed). */
export const HIGH_SLIPPAGE_WARNING_BPS = 300;

export function bpsToPercentLabel(bps: number): string {
  const pct = bps / 100;
  return `${Number.isInteger(pct) ? pct : pct.toFixed(2)}%`;
}

export function percentToBps(percent: number): number {
  return Math.round(percent * 100);
}

export function validateSlippageBps(bps: number, language: Language = "en"): string | null {
  const max = bpsToPercentLabel(MAX_SLIPPAGE_BPS);

  if (!Number.isFinite(bps) || Number.isNaN(bps)) {
    return language === "pt" ? "Digite um valor de slippage válido" : "Enter a valid slippage value";
  }
  if (!Number.isInteger(bps)) {
    return language === "pt"
      ? "O slippage deve ser um número inteiro de pontos-base"
      : "Slippage must be a whole number of basis points";
  }
  if (bps < MIN_SLIPPAGE_BPS) {
    return language === "pt" ? "O slippage deve ser maior que 0%" : "Slippage must be greater than 0%";
  }
  if (bps > MAX_SLIPPAGE_BPS) {
    return language === "pt" ? `O slippage não pode passar de ${max}` : `Slippage cannot exceed ${max}`;
  }
  return null;
}

export function isHighSlippage(bps: number): boolean {
  return bps >= HIGH_SLIPPAGE_WARNING_BPS;
}
