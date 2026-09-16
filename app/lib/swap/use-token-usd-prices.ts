"use client";

import { useEffect, useState } from "react";
import { fromBaseUnits } from "./amount";
import { fetchMintUsdPrices } from "./price-feed";
import { getSwapToken, type SwapTokenSymbol } from "./tokens";
import type { SwapQuote } from "./types";

/** How often the SOL/USDC USD price is refreshed in the background. */
const REFRESH_INTERVAL_MS = 45_000;

export type UsdPrices = {
  /** USD price for a token, or null while unknown/unfetched. MALTY is derived, not fetched. */
  priceFor: (symbol: SwapTokenSymbol) => number | null;
  /** USD value of a base-unit amount of a token, or null when the price isn't known yet. */
  valueFor: (symbol: SwapTokenSymbol, baseUnits: bigint | null) => number | null;
};

/**
 * SOL and USDC USD prices come from Raydium's price feed (real, fetched,
 * cached). MALTY has no independent price feed entry, so its USD price is
 * derived from the live quote's own rate against whichever real-priced
 * token it's paired with — still a real, sourced number, never guessed.
 */
export function useTokenUsdPrices(quote: SwapQuote | null): UsdPrices {
  const [prices, setPrices] = useState<{ SOL: number | null; USDC: number | null }>({
    SOL: null,
    USDC: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    async function load() {
      try {
        const result = await fetchMintUsdPrices(
          [getSwapToken("SOL").mint, getSwapToken("USDC").mint],
          controller.signal
        );
        if (cancelled) return;
        setPrices({
          SOL: result[getSwapToken("SOL").mint.toString()] ?? null,
          USDC: result[getSwapToken("USDC").mint.toString()] ?? null,
        });
      } catch {
        // Leave the last known prices in place; USD display is best-effort.
      }
    }

    load();
    const interval = setInterval(load, REFRESH_INTERVAL_MS);
    return () => {
      cancelled = true;
      controller.abort();
      clearInterval(interval);
    };
  }, []);

  const maltyUsdPrice = deriveMaltyUsdPrice(quote, prices);

  function priceFor(symbol: SwapTokenSymbol): number | null {
    if (symbol === "MALTY") return maltyUsdPrice;
    return prices[symbol];
  }

  function valueFor(symbol: SwapTokenSymbol, baseUnits: bigint | null): number | null {
    if (baseUnits == null) return null;
    const price = priceFor(symbol);
    if (price == null) return null;
    const decimals = getSwapToken(symbol).decimals;
    const amount = Number(fromBaseUnits(baseUnits, decimals));
    return amount * price;
  }

  return { priceFor, valueFor };
}

function deriveMaltyUsdPrice(
  quote: SwapQuote | null,
  prices: { SOL: number | null; USDC: number | null }
): number | null {
  if (!quote) return null;

  const counterpart =
    quote.inputMint === "MALTY" ? quote.outputMint : quote.outputMint === "MALTY" ? quote.inputMint : null;
  if (!counterpart || counterpart === "MALTY") return null;

  const counterpartUsd = prices[counterpart as "SOL" | "USDC"];
  if (counterpartUsd == null) return null;

  const maltyAmount = quote.inputMint === "MALTY" ? quote.inputAmount : quote.outputAmount;
  const counterpartAmount = quote.inputMint === "MALTY" ? quote.outputAmount : quote.inputAmount;
  if (maltyAmount <= 0n) return null;

  const maltyDecimal = Number(fromBaseUnits(maltyAmount, getSwapToken("MALTY").decimals));
  const counterpartDecimal = Number(fromBaseUnits(counterpartAmount, getSwapToken(counterpart).decimals));
  if (maltyDecimal <= 0) return null;

  return (counterpartDecimal * counterpartUsd) / maltyDecimal;
}
