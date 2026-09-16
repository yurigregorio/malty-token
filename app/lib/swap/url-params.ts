import { isSwapTokenSymbol, type SwapTokenSymbol } from "./tokens";
import type { SwapSource } from "./types";

/**
 * Internal paths the Swap page is allowed to redirect back to via `returnTo`.
 * This must stay a closed allowlist of literal prefixes — never accept an
 * arbitrary path, and never an absolute/external URL. This is what lets the
 * future Game safely deep-link `/swap?output=MALTY&returnTo=/game/shop`.
 */
const RETURN_TO_ALLOWED_PREFIXES = ["/", "/game", "/how-to-buy", "/swap"];

export function isAllowedReturnTo(value: string | null | undefined): boolean {
  if (!value) return false;
  // Must be a same-origin, root-relative path: no protocol, no scheme-relative
  // ("//evil.com"), no backslashes browsers may normalize into a host.
  if (!value.startsWith("/") || value.startsWith("//")) return false;
  if (value.includes("\\")) return false;
  if (/^\/[a-z]+:/i.test(value)) return false;

  let pathname: string;
  try {
    pathname = new URL(value, "https://malty.internal").pathname;
  } catch {
    return false;
  }

  return RETURN_TO_ALLOWED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export function sanitizeReturnTo(value: string | null | undefined): string | null {
  return isAllowedReturnTo(value) ? (value as string) : null;
}

const SOURCES: readonly SwapSource[] = ["website", "game", "shop"];

function parseSource(value: string | null): SwapSource {
  return SOURCES.includes(value as SwapSource) ? (value as SwapSource) : "website";
}

function parseToken(value: string | null): SwapTokenSymbol | null {
  if (!value) return null;
  const upper = value.trim().toUpperCase();
  return isSwapTokenSymbol(upper) ? upper : null;
}

/** Positive decimal amount string, bounded in length to reject garbage input early. */
function parseAmount(value: string | null): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (trimmed.length === 0 || trimmed.length > 32) return null;
  return /^\d+(\.\d+)?$/.test(trimmed) ? trimmed : null;
}

export type ParsedSwapParams = {
  inputToken: SwapTokenSymbol | null;
  outputToken: SwapTokenSymbol | null;
  exactOutputAmount: string | null;
  initialAmount: string | null;
  returnTo: string | null;
  source: SwapSource;
};

/**
 * Validates every `/swap` query parameter. Never trusts a mint address from
 * the URL — only the fixed `SwapTokenSymbol` allowlist — and never allows an
 * external `returnTo` redirect.
 */
export function parseSwapSearchParams(
  searchParams: URLSearchParams
): ParsedSwapParams {
  return {
    inputToken: parseToken(searchParams.get("input")),
    outputToken: parseToken(searchParams.get("output")),
    exactOutputAmount: parseAmount(searchParams.get("exactOutput")),
    initialAmount: parseAmount(searchParams.get("amount")),
    returnTo: sanitizeReturnTo(searchParams.get("returnTo")),
    source: parseSource(searchParams.get("source")),
  };
}
