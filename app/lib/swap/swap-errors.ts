import { isCustomProgramError, parseTransactionError } from "../errors";
import { SwapError, type SwapErrorKind } from "./types";

const TOKEN_PROGRAM_ERROR__INSUFFICIENT_FUNDS = 1;

/**
 * Turns any error thrown while quoting, building, signing or sending a swap
 * into a friendly, user-facing message plus a stable `kind` for UI branching
 * (and analytics). Never surfaces `[object Object]`, a raw stack trace, or a
 * bare RPC error code — the technical detail stays in `console.error` only.
 */
export function mapSwapError(err: unknown): { kind: SwapErrorKind; message: string } {
  if (err instanceof SwapError) {
    return { kind: err.kind, message: err.message };
  }

  if (isAbortLike(err)) {
    return { kind: "unknown", message: "Cancelled." };
  }

  if (errorChainIncludes(err, /user (?:rejected|declined)|rejected by user/i)) {
    return { kind: "wallet-rejected", message: "Transaction was rejected in your wallet." };
  }

  if (errorChainIncludes(err, /no wallet|wallet.*not.*(found|installed|available)/i)) {
    return {
      kind: "wallet-not-installed",
      message: "No compatible Solana wallet was found. Install Phantom, Solflare, Backpack, or another Wallet Standard wallet.",
    };
  }

  if (isCustomProgramError(err, TOKEN_PROGRAM_ERROR__INSUFFICIENT_FUNDS)) {
    return {
      kind: "insufficient-balance",
      message: "Insufficient balance to complete this swap.",
    };
  }

  if (errorChainIncludes(err, /insufficient.*(lamports|sol).*fee|insufficient funds for rent/i)) {
    return {
      kind: "insufficient-sol-for-fee",
      message: "Not enough SOL to cover network fees. Keep a small SOL balance for transaction costs.",
    };
  }

  if (errorChainIncludes(err, /slippage/i)) {
    return {
      kind: "slippage-exceeded",
      message: "Price moved past your slippage tolerance. Try again or increase slippage slightly.",
    };
  }

  if (errorChainIncludes(err, /blockhash not found|block height exceeded|timed?\s?out/i)) {
    return {
      kind: "transaction-timeout",
      message: "The transaction timed out before it was confirmed. It may not have gone through — check your wallet activity before retrying.",
    };
  }

  if (errorChainIncludes(err, /fetch failed|network ?error|failed to fetch/i)) {
    return {
      kind: "rpc-failure",
      message: "Network error while reaching Solana. Please try again.",
    };
  }

  if (err instanceof Error) {
    return { kind: "unknown", message: parseTransactionError(err) };
  }

  // A non-Error, non-SwapError throw (a raw object, string, etc.) has no safe
  // message to surface — never fall through to `String(err)` here, which
  // would show the user a bare "[object Object]".
  return { kind: "unknown", message: "Something went wrong. Please try again." };
}

function isAbortLike(err: unknown): boolean {
  return (
    (err instanceof DOMException && err.name === "AbortError") ||
    (err instanceof Error && err.name === "AbortError")
  );
}

function errorChainIncludes(err: unknown, pattern: RegExp): boolean {
  let current: unknown = err;
  while (current instanceof Error) {
    if (pattern.test(current.message)) return true;
    current = current.cause;
  }
  return false;
}
