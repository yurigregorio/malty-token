import type { SwapTokenSymbol } from "./tokens";
import type { SwapSource } from "./types";

/**
 * Internal analytics seam for Malty Swap. The project has no third-party
 * analytics provider wired up today, so this only logs in development and
 * notifies any in-app listener — never sends data off-device. When a real
 * provider is added, wire it up inside `emit()` only; every call site in the
 * swap code stays unchanged.
 *
 * Never pass: wallet addresses, balances, amounts, seed/private key material,
 * or signed-transaction bytes. Event payloads are intentionally limited to
 * token symbols, `source`, and coarse state — see each event's payload type.
 */
export type SwapAnalyticsEvent =
  | { name: "swap_opened"; source: SwapSource }
  | { name: "wallet_connected"; source: SwapSource }
  | { name: "swap_quote_received"; source: SwapSource; inputToken: SwapTokenSymbol; outputToken: SwapTokenSymbol }
  | { name: "swap_reviewed"; source: SwapSource; inputToken: SwapTokenSymbol; outputToken: SwapTokenSymbol; priceImpactLevel: string }
  | { name: "swap_submitted"; source: SwapSource; inputToken: SwapTokenSymbol; outputToken: SwapTokenSymbol }
  | { name: "swap_confirmed"; source: SwapSource; inputToken: SwapTokenSymbol; outputToken: SwapTokenSymbol }
  | { name: "swap_failed"; source: SwapSource; reason: string };

type Listener = (event: SwapAnalyticsEvent) => void;

const listeners = new Set<Listener>();

export function onSwapAnalyticsEvent(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function trackSwapEvent(event: SwapAnalyticsEvent): void {
  if (process.env.NODE_ENV !== "production") {
    console.debug("[swap-analytics]", event.name, event);
  }
  for (const listener of listeners) listener(event);
}
