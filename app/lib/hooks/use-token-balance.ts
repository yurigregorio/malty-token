"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { TOKEN_PROGRAM_ADDRESS } from "@solana-program/token";
import { findAssociatedTokenPda } from "@solana-program/token";
import type { Address } from "@solana/kit";
import { useAppClient } from "../client-provider";

export type TokenBalanceState = {
  /** Base units (raw, pre-decimals), or null while unresolved. Zero when the wallet has no ATA yet. */
  amount: bigint | null;
  isLoading: boolean;
  error: unknown;
  refetch: () => void;
};

/**
 * SPL token balance for a given owner + mint, resolved via the deterministic
 * associated token account. A wallet with no ATA for this mint yet reads as
 * a `0n` balance (not an error) — that's the common case for a token a user
 * has never held.
 */
export function useTokenBalance(
  owner: Address | undefined,
  mint: Address,
  refreshIntervalMs = 15_000
): TokenBalanceState {
  const client = useAppClient();
  const [amount, setAmount] = useState<bigint | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [nonce, setNonce] = useState(0);
  const generation = useRef(0);

  const refetch = useCallback(() => setNonce((n) => n + 1), []);

  useEffect(() => {
    // No owner (wallet disconnected): nothing to fetch. The hook's return
    // value already masks amount/error to null in that case below, so the
    // effect just skips scheduling a fetch — no state to reset here.
    if (!owner) return;

    const myGeneration = ++generation.current;
    let cancelled = false;

    (async () => {
      setIsLoading(true);
      try {
        const [ata] = await findAssociatedTokenPda({
          owner,
          mint,
          tokenProgram: TOKEN_PROGRAM_ADDRESS,
        });

        const balance = await client.rpc
          .getTokenAccountBalance(ata, { commitment: "confirmed" })
          .send()
          .then(
            (result) => BigInt(result.value.amount),
            (rpcError: unknown) => {
              // The RPC returns an error when the account doesn't exist yet
              // (the wallet has simply never held this token) — treat as 0.
              if (isAccountNotFound(rpcError)) return 0n;
              throw rpcError;
            }
          );

        if (cancelled || generation.current !== myGeneration) return;
        setAmount(balance);
        setError(null);
      } catch (err) {
        if (cancelled || generation.current !== myGeneration) return;
        // Logged so a real failure (rate limit, RPC hiccup, an unrecognized
        // error shape from a given provider) is inspectable from devtools
        // instead of just showing "Balance unavailable" with no detail.
        console.error("[malty-swap] token balance fetch failed", { mint, err });
        setError(err);
      } finally {
        if (!cancelled && generation.current === myGeneration) {
          setIsLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [client, owner, mint, nonce]);

  useEffect(() => {
    if (!owner || refreshIntervalMs <= 0) return;
    const interval = setInterval(refetch, refreshIntervalMs);
    return () => clearInterval(interval);
  }, [owner, refreshIntervalMs, refetch]);

  return owner
    ? { amount, isLoading, error, refetch }
    : { amount: null, isLoading: false, error: null, refetch };
}

export function isAccountNotFound(err: unknown): boolean {
  const message = err instanceof Error ? err.message : String(err);
  // Different RPC providers word this differently for the same condition
  // (an ATA that was never created) — e.g. Helius returns "Invalid param:
  // not a Token account" rather than "could not find account".
  return /could not find account|invalid param.*could not find|account.*not.*found|not a token account/i.test(
    message
  );
}
