import { address, type Address } from "@solana/kit";
import { MALTY_PUBLIC_MINT, MALTY_TOKEN } from "../malty-token";

/**
 * The full set of tokens the Malty Swap UI is willing to trade. This is a
 * closed allowlist by design — a mint coming from anywhere outside this file
 * (a query param, an API response, etc.) must never be executable as a swap
 * leg. See `resolveSwapToken` in `url-params.ts`.
 */
export type SwapTokenSymbol = "MALTY" | "SOL" | "USDC";

export type SwapToken = {
  symbol: SwapTokenSymbol;
  name: string;
  mint: Address;
  decimals: number;
  /** True for native SOL, which Raydium wraps/unwraps around the swap. */
  isNative: boolean;
  logoUri?: string;
};

const WSOL_MINT = "So11111111111111111111111111111111111111112";
const USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";

export const SWAP_TOKENS: Record<SwapTokenSymbol, SwapToken> = {
  SOL: {
    symbol: "SOL",
    name: "Solana",
    mint: address(WSOL_MINT),
    decimals: 9,
    isNative: true,
  },
  USDC: {
    symbol: "USDC",
    name: "USD Coin",
    mint: address(USDC_MINT),
    decimals: 6,
    isNative: false,
  },
  MALTY: {
    symbol: "MALTY",
    name: MALTY_TOKEN.name,
    mint: address(MALTY_PUBLIC_MINT),
    decimals: MALTY_TOKEN.decimals,
    isNative: false,
    logoUri: MALTY_TOKEN.imageUri,
  },
};

export const SWAP_TOKEN_LIST: readonly SwapToken[] = [
  SWAP_TOKENS.SOL,
  SWAP_TOKENS.USDC,
  SWAP_TOKENS.MALTY,
];

/** The token pairs Malty Swap actually routes today (both directions). */
export const SWAP_PAIRS: readonly [SwapTokenSymbol, SwapTokenSymbol][] = [
  ["SOL", "MALTY"],
  ["USDC", "MALTY"],
];

export function isSwapTokenSymbol(value: unknown): value is SwapTokenSymbol {
  return value === "MALTY" || value === "SOL" || value === "USDC";
}

export function getSwapToken(symbol: SwapTokenSymbol): SwapToken {
  return SWAP_TOKENS[symbol];
}

/** Whether a direct route between the two tokens is supported by this app. */
export function isSupportedPair(
  input: SwapTokenSymbol,
  output: SwapTokenSymbol
): boolean {
  if (input === output) return false;
  return SWAP_PAIRS.some(
    ([a, b]) => (a === input && b === output) || (a === output && b === input)
  );
}

/** The other token allowed to pair with a given (usually locked) token. */
export function counterpartsFor(
  symbol: SwapTokenSymbol
): readonly SwapTokenSymbol[] {
  const others = new Set<SwapTokenSymbol>();
  for (const [a, b] of SWAP_PAIRS) {
    if (a === symbol) others.add(b);
    if (b === symbol) others.add(a);
  }
  return [...others];
}
