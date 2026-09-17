"use client";

import { useEffect, useRef, useState } from "react";
import { getAmountError, toBaseUnits } from "./amount";
import { fetchSwapQuote } from "./raydium";
import { getSwapToken, type SwapTokenSymbol } from "./tokens";
import { mapSwapError } from "./swap-errors";
import type { SwapAmountMode, SwapQuote } from "./types";
import type { Language } from "../language";

export type SwapQuoteStatus = "idle" | "loading" | "ready" | "stale" | "error";

export type UseSwapQuoteParams = {
  mode: SwapAmountMode;
  inputToken: SwapTokenSymbol;
  outputToken: SwapTokenSymbol;
  /** Decimal string. For exact-in this is the input amount; for exact-out, the desired output amount. */
  amount: string;
  slippageBps: number;
  enabled: boolean;
  /** UI language for validation/error messages surfaced by this hook. Defaults to "en". */
  language?: Language;
};

export type UseSwapQuoteResult = {
  status: SwapQuoteStatus;
  quote: SwapQuote | null;
  errorMessage: string | null;
  /** The amount validation error, if the typed amount itself is invalid (no request is made). */
  amountError: string | null;
  refresh: () => void;
};

/**
 * How long a fetched quote is trusted before it must be refreshed. Raydium's
 * own Trade API documents quotes as valid for ~30s; staying a little under
 * that means we never try to build a transaction from a quote Raydium's own
 * backend would already consider stale.
 */
const QUOTE_TTL_MS = 28_000;
/** Debounce window so a fast-typing user doesn't fire a request per keystroke. */
const DEBOUNCE_MS = 350;

export function useSwapQuote(params: UseSwapQuoteParams): UseSwapQuoteResult {
  const { mode, inputToken, outputToken, amount, slippageBps, enabled, language = "en" } = params;

  const [status, setStatus] = useState<SwapQuoteStatus>("idle");
  const [quote, setQuote] = useState<SwapQuote | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);

  const abortRef = useRef<AbortController | null>(null);
  const staleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const amountToken = mode === "exact-in" ? inputToken : outputToken;
  const amountError = enabled ? getAmountError(amount, getSwapToken(amountToken).decimals, language) : null;

  const disabled = !enabled || amount.trim() === "" || amountError != null;

  useEffect(() => {
    abortRef.current?.abort();
    if (staleTimerRef.current) clearTimeout(staleTimerRef.current);

    // Nothing to fetch — the hook's return value masks status/quote to
    // idle/null in this case (see below), so there's no state to reset here.
    if (disabled) return;

    const debounce = setTimeout(() => {
      const controller = new AbortController();
      abortRef.current = controller;
      setStatus((prev) => (prev === "ready" ? "stale" : "loading"));

      let amountUnits: bigint;
      try {
        amountUnits = toBaseUnits(amount, getSwapToken(amountToken).decimals, language);
      } catch (error) {
        setStatus("error");
        setErrorMessage(mapSwapError(error, language).message);
        return;
      }

      fetchSwapQuote(
        mode,
        { inputToken, outputToken, amount: amountUnits, slippageBps },
        controller.signal
      )
        .then((result) => {
          if (controller.signal.aborted) return;

          const inputAmount = mode === "exact-in" ? amountUnits : result.inputAmount;
          const outputAmount = mode === "exact-in" ? result.outputAmount : amountUnits;

          const next: SwapQuote = {
            mode,
            inputMint: inputToken,
            outputMint: outputToken,
            inputAmount,
            outputAmount,
            otherAmountThreshold: result.otherAmountThreshold ?? deriveThreshold(mode, inputAmount, outputAmount, slippageBps),
            slippageBps,
            priceImpactPercent: result.priceImpactPercent,
            routes: result.routes,
            expiresAt: Date.now() + QUOTE_TTL_MS,
            raw: result.raw,
          };

          setQuote(next);
          setStatus("ready");
          setErrorMessage(null);

          // Once the quote ages past Raydium's own documented lifetime, pull
          // a fresh one automatically rather than leaving the user stuck on
          // a disabled button — "Refreshing quote…" should be literally true,
          // not a dead end that only a manual refresh-icon click resolves.
          staleTimerRef.current = setTimeout(() => {
            setNonce((n) => n + 1);
          }, QUOTE_TTL_MS);
        })
        .catch((error: unknown) => {
          if (controller.signal.aborted) return;
          setStatus("error");
          setErrorMessage(mapSwapError(error, language).message);
        });
    }, DEBOUNCE_MS);

    return () => {
      clearTimeout(debounce);
    };
  }, [mode, inputToken, outputToken, amount, amountToken, slippageBps, disabled, nonce, language]);

  useEffect(
    () => () => {
      abortRef.current?.abort();
      if (staleTimerRef.current) clearTimeout(staleTimerRef.current);
    },
    []
  );

  return {
    status: disabled ? "idle" : status,
    quote: disabled ? null : quote,
    errorMessage: disabled ? null : errorMessage,
    amountError,
    refresh: () => setNonce((n) => n + 1),
  };
}

function deriveThreshold(
  mode: SwapAmountMode,
  inputAmount: bigint,
  outputAmount: bigint,
  slippageBps: number
): bigint {
  const bps = BigInt(slippageBps);
  if (mode === "exact-in") {
    // Minimum received, applying the disclosed slippage to the real quoted output.
    return (outputAmount * (10_000n - bps)) / 10_000n;
  }
  // Maximum to pay, applying the disclosed slippage to the real quoted input.
  return (inputAmount * (10_000n + bps)) / 10_000n;
}
