"use client";

import { useCallback, useMemo, useState } from "react";
import type { SwapResult } from "./types";
import type { SwapTokenSymbol } from "./tokens";

/**
 * Local (per-browser, per-wallet) record of swaps completed through Malty
 * Swap. This is not an on-chain history query — it only remembers swaps this
 * app itself submitted, from this device. That's a deliberate first cut:
 * the architecture (a single `HistoryEntry` shape, one storage key per
 * wallet) is ready to be swapped for a real on-chain query later (e.g.
 * `getSignaturesForAddress` filtered to the Raydium program) without
 * touching any call site — see `RecentSwaps`.
 */
export type SwapHistoryEntry = {
  signature: string;
  inputMint: SwapTokenSymbol;
  outputMint: SwapTokenSymbol;
  /** Base units, serialized as a decimal string (bigint isn't JSON-safe). */
  inputAmount: string;
  outputAmount: string;
  confirmed: boolean;
  timestamp: number;
};

const MAX_ENTRIES = 20;

function storageKey(walletAddress: string): string {
  // Mainnet-only feature (swap only operates on Mainnet), so no cluster
  // namespacing is needed the way `solana-cluster` does elsewhere.
  return `malty-swap-history:${walletAddress}`;
}

function readEntries(walletAddress: string): SwapHistoryEntry[] {
  try {
    const raw = window.localStorage.getItem(storageKey(walletAddress));
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as SwapHistoryEntry[]) : [];
  } catch {
    return [];
  }
}

export function getSwapHistory(walletAddress: string): SwapHistoryEntry[] {
  return readEntries(walletAddress);
}

export function recordSwapHistory(walletAddress: string, result: SwapResult): void {
  try {
    const signature = result.signatures[result.signatures.length - 1];
    if (!signature) return;

    const entry: SwapHistoryEntry = {
      signature,
      inputMint: result.inputMint,
      outputMint: result.outputMint,
      inputAmount: result.inputAmount.toString(),
      outputAmount: result.outputAmount.toString(),
      confirmed: result.confirmed,
      timestamp: result.timestamp,
    };

    const next = [entry, ...readEntries(walletAddress).filter((e) => e.signature !== signature)].slice(
      0,
      MAX_ENTRIES
    );
    window.localStorage.setItem(storageKey(walletAddress), JSON.stringify(next));
  } catch {
    // Best-effort only — a full/unavailable localStorage must never break a swap.
  }
}

/** Reactive read of a wallet's local swap history; call `refresh()` after recording a new entry. */
export function useSwapHistory(walletAddress: string | undefined): {
  entries: SwapHistoryEntry[];
  refresh: () => void;
} {
  const [nonce, setNonce] = useState(0);
  const entries = useMemo(
    () => (walletAddress ? getSwapHistory(walletAddress) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `nonce` is the refresh signal, localStorage itself isn't reactive
    [walletAddress, nonce]
  );
  const refresh = useCallback(() => setNonce((n) => n + 1), []);
  return { entries, refresh };
}
