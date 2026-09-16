import { isCustomProgramError, parseTransactionError } from "../errors";
import type { Language } from "../language";
import { SwapError, type SwapErrorKind } from "./types";

const TOKEN_PROGRAM_ERROR__INSUFFICIENT_FUNDS = 1;

const ERROR_MESSAGES = {
  en: {
    cancelled: "Cancelled.",
    walletRejected: "Transaction was rejected in your wallet.",
    walletNotInstalled:
      "No compatible Solana wallet was found. Install Phantom, Solflare, Backpack, or another Wallet Standard wallet.",
    insufficientBalance: "Insufficient balance to complete this swap.",
    insufficientSolForFee:
      "Not enough SOL to cover network fees. Keep a small SOL balance for transaction costs.",
    slippageExceeded: "Price moved past your slippage tolerance. Try again or increase slippage slightly.",
    transactionTimeout:
      "The transaction timed out before it was confirmed. It may not have gone through — check your wallet activity before retrying.",
    rpcFailure: "Network error while reaching Solana. Please try again.",
    genericFailure: "Something went wrong. Please try again.",
  },
  pt: {
    cancelled: "Cancelado.",
    walletRejected: "A transação foi rejeitada na sua carteira.",
    walletNotInstalled:
      "Nenhuma carteira Solana compatível foi encontrada. Instale a Phantom, Solflare, Backpack ou outra carteira compatível com Wallet Standard.",
    insufficientBalance: "Saldo insuficiente para concluir este swap.",
    insufficientSolForFee:
      "SOL insuficiente para cobrir as taxas de rede. Mantenha um saldo pequeno de SOL para custos de transação.",
    slippageExceeded: "O preço mudou além da sua tolerância de slippage. Tente novamente ou aumente um pouco o slippage.",
    transactionTimeout:
      "A transação demorou demais para ser confirmada. Ela pode não ter sido concluída — verifique a atividade da sua carteira antes de tentar de novo.",
    rpcFailure: "Erro de rede ao acessar a Solana. Tente novamente.",
    genericFailure: "Algo deu errado. Tente novamente.",
  },
} as const satisfies Record<Language, Record<string, string>>;

/**
 * Turns any error thrown while quoting, building, signing or sending a swap
 * into a friendly, user-facing message plus a stable `kind` for UI branching
 * (and analytics). Never surfaces `[object Object]`, a raw stack trace, or a
 * bare RPC error code — the technical detail stays in `console.error` only.
 */
export function mapSwapError(
  err: unknown,
  language: Language = "en"
): { kind: SwapErrorKind; message: string } {
  const m = ERROR_MESSAGES[language];

  if (err instanceof SwapError) {
    return { kind: err.kind, message: err.message };
  }

  if (isAbortLike(err)) {
    return { kind: "unknown", message: m.cancelled };
  }

  if (errorChainIncludes(err, /user (?:rejected|declined)|rejected by user/i)) {
    return { kind: "wallet-rejected", message: m.walletRejected };
  }

  if (errorChainIncludes(err, /no wallet|wallet.*not.*(found|installed|available)/i)) {
    return { kind: "wallet-not-installed", message: m.walletNotInstalled };
  }

  if (isCustomProgramError(err, TOKEN_PROGRAM_ERROR__INSUFFICIENT_FUNDS)) {
    return { kind: "insufficient-balance", message: m.insufficientBalance };
  }

  if (errorChainIncludes(err, /insufficient.*(lamports|sol).*fee|insufficient funds for rent/i)) {
    return { kind: "insufficient-sol-for-fee", message: m.insufficientSolForFee };
  }

  if (errorChainIncludes(err, /slippage/i)) {
    return { kind: "slippage-exceeded", message: m.slippageExceeded };
  }

  if (errorChainIncludes(err, /blockhash not found|block height exceeded|timed?\s?out/i)) {
    return { kind: "transaction-timeout", message: m.transactionTimeout };
  }

  if (errorChainIncludes(err, /fetch failed|network ?error|failed to fetch/i)) {
    return { kind: "rpc-failure", message: m.rpcFailure };
  }

  if (err instanceof Error) {
    // The deepest RPC/wallet message — inherently technical and hard to
    // localize well (it's often a raw Solana runtime string), so this one
    // stays in whatever language the underlying error already used.
    return { kind: "unknown", message: parseTransactionError(err) };
  }

  // A non-Error, non-SwapError throw (a raw object, string, etc.) has no safe
  // message to surface — never fall through to `String(err)` here, which
  // would show the user a bare "[object Object]".
  return { kind: "unknown", message: m.genericFailure };
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
