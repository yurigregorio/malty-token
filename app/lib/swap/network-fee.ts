/**
 * Solana's base fee per required transaction signature — a protocol
 * constant (5,000 lamports), not a guess. Used only for the upfront,
 * clearly-"≈"-labeled network fee estimate shown before a transaction
 * exists; the wallet always shows the real, final fee at signing time.
 */
export const SOLANA_BASE_FEE_LAMPORTS = 5000n;

/**
 * Estimates the network fee for a swap, in lamports. Most swaps are a
 * single transaction (one signature); pass a higher count when the route is
 * already known to need extra setup transactions (e.g. ATA creation).
 */
export function estimateNetworkFeeLamports(transactionCount = 1): bigint {
  return SOLANA_BASE_FEE_LAMPORTS * BigInt(Math.max(1, transactionCount));
}
