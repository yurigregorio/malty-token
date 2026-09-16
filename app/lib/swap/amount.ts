import type { Language } from "../language";

/**
 * Decimal <-> base-unit conversion for arbitrary SPL token decimals, plus
 * display formatting. Mirrors the pattern already used for MALTY in
 * `app/components/actions/token-card.tsx`, generalized to any decimals count
 * so it can serve every swap leg (SOL, USDC, MALTY).
 */

const MAX_BASE_UNITS = (1n << 64n) - 1n;

const AMOUNT_MESSAGES = {
  en: {
    wholeNumber: "Enter a whole number amount",
    decimalPlaces: (decimals: number) => `Enter an amount with up to ${decimals} decimal places`,
    tooLarge: "Amount exceeds the maximum supported amount",
    mustBePositive: "Amount must be greater than zero",
    invalid: "Invalid amount",
  },
  pt: {
    wholeNumber: "Digite um valor inteiro",
    decimalPlaces: (decimals: number) => `Digite um valor com até ${decimals} casas decimais`,
    tooLarge: "O valor excede o máximo suportado",
    mustBePositive: "O valor deve ser maior que zero",
    invalid: "Valor inválido",
  },
} as const satisfies Record<Language, Record<string, string | ((n: number) => string)>>;

export function amountPattern(decimals: number): RegExp {
  return new RegExp(`^(\\d+)(?:\\.(\\d{1,${decimals}}))?$`);
}

/** Parses a user-entered decimal amount into base units. Throws on invalid input. */
export function toBaseUnits(amount: string, decimals: number, language: Language = "en"): bigint {
  const messages = AMOUNT_MESSAGES[language];
  const normalized = amount.trim();
  const match = amountPattern(decimals).exec(normalized);

  if (!match) {
    throw new Error(decimals === 0 ? messages.wholeNumber : messages.decimalPlaces(decimals));
  }

  const [, whole, fraction = ""] = match;
  const normalizedWhole = whole.replace(/^0+(?=\d)/, "");

  if (normalizedWhole.length > 20) {
    throw new Error(messages.tooLarge);
  }

  const units =
    BigInt(normalizedWhole) * 10n ** BigInt(decimals) +
    BigInt(fraction.padEnd(decimals, "0") || "0");

  if (units <= 0n) {
    throw new Error(messages.mustBePositive);
  }

  if (units > MAX_BASE_UNITS) {
    throw new Error(messages.tooLarge);
  }

  return units;
}

/** Returns a validation error message for a raw amount string, or null when valid. */
export function getAmountError(
  amount: string,
  decimals: number,
  language: Language = "en"
): string | null {
  if (amount.trim() === "") return null;
  try {
    toBaseUnits(amount, decimals, language);
    return null;
  } catch (error) {
    return error instanceof Error ? error.message : AMOUNT_MESSAGES[language].invalid;
  }
}

/** Formats base units back into a plain decimal string (no grouping). */
export function fromBaseUnits(units: bigint, decimals: number): string {
  if (units < 0n) throw new Error("Amount must not be negative");

  const divisor = 10n ** BigInt(decimals);
  const whole = units / divisor;
  const fraction = units % divisor;

  if (decimals === 0) return whole.toString();

  const fractionStr = fraction.toString().padStart(decimals, "0");
  return `${whole}.${fractionStr}`.replace(/0+$/, "").replace(/\.$/, "");
}

const displayFormatters = new Map<number, Intl.NumberFormat>();

function displayFormatter(maxFractionDigits: number): Intl.NumberFormat {
  const clamped = Math.max(0, Math.min(20, maxFractionDigits));
  let formatter = displayFormatters.get(clamped);
  if (!formatter) {
    formatter = new Intl.NumberFormat("en-US", {
      maximumFractionDigits: clamped,
    });
    displayFormatters.set(clamped, formatter);
  }
  return formatter;
}

/** Formats base units for human display, e.g. "12,430.5" (up to `maxFractionDigits`). */
export function formatTokenAmount(
  units: bigint,
  decimals: number,
  maxFractionDigits = Math.min(decimals, 6)
): string {
  const decimalString = fromBaseUnits(units, decimals);
  return displayFormatter(maxFractionDigits).format(Number(decimalString));
}
