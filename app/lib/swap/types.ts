import type { SwapTokenSymbol } from "./tokens";

/**
 * `exact-in`: the user fixes the amount they pay (swap-base-in).
 * `exact-out`: the user (or the game) fixes the amount they must receive
 * (swap-base-out) — this is the mode the future Shop uses, e.g. "player
 * needs exactly 760 more MALTY".
 */
export type SwapAmountMode = "exact-in" | "exact-out";

/** Where a swap was opened from — carried through to analytics and `SwapResult`. */
export type SwapSource = "website" | "game" | "shop";

/** Visual/layout mode for `<MaltySwap />`. `compact` is the future in-game embed. */
export type MaltySwapUiMode = "full" | "compact";

/** The full UX state machine described in the product brief. */
export type SwapStep =
  | "connect-wallet"
  | "enter-amount"
  | "fetching-quote"
  | "quote-ready"
  | "review"
  | "awaiting-signature"
  | "submitted"
  | "confirming"
  | "confirmed"
  | "failed";

export type SwapQuoteRoute = {
  poolId?: string;
  feePct?: number;
};

/** A validated, normalized quote — never a guessed or hardcoded price. */
export type SwapQuote = {
  mode: SwapAmountMode;
  inputMint: SwapTokenSymbol;
  outputMint: SwapTokenSymbol;
  /** Base units of the input token. */
  inputAmount: bigint;
  /** Base units of the output token. */
  outputAmount: bigint;
  /** Worst-case amount the wallet is protected to, in the "fixed" token's base units. */
  otherAmountThreshold: bigint;
  slippageBps: number;
  priceImpactPercent: number;
  routes: SwapQuoteRoute[];
  /** Epoch ms when this quote should no longer be trusted for signing. */
  expiresAt: number;
  /** Opaque payload Raydium needs back to build the transaction from this exact quote. */
  raw: unknown;
};

export type SwapErrorKind =
  | "wallet-not-installed"
  | "wallet-rejected"
  | "insufficient-balance"
  | "insufficient-sol-for-fee"
  | "insufficient-liquidity"
  | "no-route"
  | "quote-expired"
  | "slippage-exceeded"
  | "rpc-failure"
  | "raydium-unavailable"
  | "transaction-failed"
  | "transaction-timeout"
  | "malformed-response"
  | "unsupported-token"
  | "wrong-network"
  | "invalid-amount"
  | "unknown";

export class SwapError extends Error {
  readonly kind: SwapErrorKind;
  readonly cause_?: unknown;

  constructor(kind: SwapErrorKind, message: string, cause?: unknown) {
    super(message);
    this.name = "SwapError";
    this.kind = kind;
    this.cause_ = cause;
  }
}

/**
 * Typed result of a confirmed (or attempted) swap. This is the contract the
 * future Game/Shop integration consumes — see README "Game integration".
 */
export type SwapResult = {
  signatures: string[];
  inputMint: SwapTokenSymbol;
  outputMint: SwapTokenSymbol;
  inputAmount: bigint;
  outputAmount: bigint;
  confirmed: boolean;
  timestamp: number;
  source: SwapSource;
};

/** Public props for `<MaltySwap />` — see README "Reusing MaltySwap". */
export type MaltySwapProps = {
  mode?: MaltySwapUiMode;
  defaultInputMint?: SwapTokenSymbol;
  defaultOutputMint?: SwapTokenSymbol;
  /** When true, the output token selector is hidden/disabled (Shop flow). */
  lockOutputToken?: boolean;
  /** Pre-fills the input amount (exact-in mode only). */
  initialAmount?: string;
  /** Requests an exact output amount (base-token decimal string) — enables exact-out mode. */
  exactOutputAmount?: string;
  source?: SwapSource;
  /** Internal path to return to after a confirmed swap (validated — see `url-params.ts`). */
  returnTo?: string;
  onSuccess?: (result: SwapResult) => void;
  onError?: (error: SwapError) => void;
};
