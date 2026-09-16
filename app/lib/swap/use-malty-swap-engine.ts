"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { address as toAddress } from "@solana/kit";
import { useAction } from "@solana/react";
import type { useConnectedWallet } from "@solana/kit-plugin-wallet/react";
import { useAppClient } from "../client-provider";
import { useCluster } from "../../components/cluster-context";
import { useLanguage } from "../language";
import { useBalance } from "../hooks/use-balance";
import { useTokenBalance } from "../hooks/use-token-balance";
import { buildSwapTransactions } from "./raydium";
import {
  confirmSwapSignatures,
  decodeSwapTransactions,
  signAndSendSwapTransactions,
} from "./swap-transaction";
import { useSwapQuote } from "./use-swap-quote";
import { mapSwapError } from "./swap-errors";
import { getAmountError, toBaseUnits } from "./amount";
import {
  counterpartsFor,
  getSwapToken,
  isSupportedPair,
  type SwapTokenSymbol,
} from "./tokens";
import {
  DEFAULT_SLIPPAGE_BPS,
  validateSlippageBps,
} from "./slippage";
import { requiresExtraConfirmation } from "./price-impact";
import { trackSwapEvent } from "./analytics";
import type {
  MaltySwapProps,
  SwapQuote,
  SwapResult,
  SwapStep,
} from "./types";
import { SwapError } from "./types";

type ConnectedWallet = NonNullable<ReturnType<typeof useConnectedWallet>>;

export type MaltySwapEngineProps = MaltySwapProps & {
  account: ConnectedWallet["account"];
  chain: `solana:${string}`;
  signAndSendTransactions: (
    ...inputs: readonly { transaction: Uint8Array }[]
  ) => Promise<readonly { signature: Uint8Array }[]>;
};

function resolveDefaultTokens(props: MaltySwapProps): {
  input: SwapTokenSymbol;
  output: SwapTokenSymbol;
} {
  const output = props.defaultOutputMint ?? "MALTY";
  const preferredInput = props.defaultInputMint;

  if (preferredInput && isSupportedPair(preferredInput, output)) {
    return { input: preferredInput, output };
  }

  const fallback = counterpartsFor(output)[0];
  return { input: fallback ?? "SOL", output };
}

export function useMaltySwapEngine(props: MaltySwapEngineProps) {
  const {
    account,
    signAndSendTransactions,
    mode: uiMode = "full",
    lockOutputToken = false,
    initialAmount,
    exactOutputAmount,
    source = "website",
    returnTo,
    onSuccess,
    onError,
  } = props;

  const client = useAppClient();
  const { cluster, setCluster, getExplorerUrl } = useCluster();
  const { language } = useLanguage();

  const amountMode = exactOutputAmount != null ? "exact-out" : "exact-in";
  const defaults = useMemo(() => resolveDefaultTokens(props), [props]);

  const [inputToken, setInputToken] = useState<SwapTokenSymbol>(defaults.input);
  const [outputToken, setOutputToken] = useState<SwapTokenSymbol>(defaults.output);
  const [amount, setAmount] = useState(
    amountMode === "exact-out" ? exactOutputAmount! : (initialAmount ?? "")
  );
  const [slippageBps, setSlippageBps] = useState(DEFAULT_SLIPPAGE_BPS);
  const [priceImpactAck, setPriceImpactAck] = useState(false);
  // Only ever holds "enter-amount" (the resting state) or a step from
  // "review" onward — the "fetching-quote" / "quote-ready" distinction is
  // derived from `quoteStatus` at render time below, not tracked here.
  const [workflowStep, setWorkflowStep] = useState<SwapStep>("enter-amount");
  const [result, setResult] = useState<SwapResult | null>(null);
  const [submitError, setSubmitError] = useState<{ message: string } | null>(null);
  const [lastSignatures, setLastSignatures] = useState<string[]>([]);

  const walletAddress = useMemo(() => toAddress(account.address), [account.address]);
  const isMainnet = cluster === "mainnet";

  const solBalance = useBalance(walletAddress);
  const usdcBalance = useTokenBalance(walletAddress, getSwapToken("USDC").mint);
  const maltyBalance = useTokenBalance(walletAddress, getSwapToken("MALTY").mint);

  function balanceFor(symbol: SwapTokenSymbol) {
    if (symbol === "SOL") return solBalance.lamports;
    if (symbol === "USDC") return usdcBalance.amount;
    return maltyBalance.amount;
  }

  function refetchBalances() {
    usdcBalance.refetch();
    maltyBalance.refetch();
  }

  const LOCKED_STEPS: readonly SwapStep[] = [
    "awaiting-signature",
    "submitted",
    "confirming",
    "confirmed",
    "failed",
  ];
  const quoteEnabled =
    isMainnet && amount.trim() !== "" && !LOCKED_STEPS.includes(workflowStep);

  const {
    status: quoteStatus,
    quote,
    errorMessage: quoteErrorMessage,
    amountError,
    refresh: refreshQuote,
  } = useSwapQuote({
    mode: amountMode,
    inputToken,
    outputToken,
    amount,
    slippageBps,
    enabled: quoteEnabled,
    language,
  });

  // Derived, not stored: while resting at "enter-amount", the visible step
  // tracks the live quote status instead of being synced into state.
  const step: SwapStep =
    workflowStep === "enter-amount" && isMainnet
      ? quoteStatus === "loading"
        ? "fetching-quote"
        : quoteStatus === "ready" || quoteStatus === "stale"
          ? "quote-ready"
          : "enter-amount"
      : workflowStep;

  const quoteReceivedTracked = useRef<string | null>(null);
  useEffect(() => {
    if (quoteStatus !== "ready") return;
    const key = `${inputToken}:${outputToken}:${amount}`;
    if (quoteReceivedTracked.current === key) return;
    quoteReceivedTracked.current = key;
    trackSwapEvent({ name: "swap_quote_received", source, inputToken, outputToken });
  }, [quoteStatus, source, inputToken, outputToken, amount]);

  const setFromToken = useCallback((symbol: SwapTokenSymbol) => {
    // The input/pay token is always free to change, in both exact-in and
    // exact-out mode — only the output token can be locked (see setToToken).
    setInputToken(symbol);
    setPriceImpactAck(false);
  }, []);

  const setToToken = useCallback(
    (symbol: SwapTokenSymbol) => {
      if (lockOutputToken || amountMode === "exact-out") return;
      setOutputToken(symbol);
      setPriceImpactAck(false);
    },
    [lockOutputToken, amountMode]
  );

  const setAmountValue = useCallback(
    (next: string) => {
      if (amountMode === "exact-out") return; // fixed by the caller (e.g. the Shop)
      setAmount(next);
      setPriceImpactAck(false);
      if (workflowStep === "review") setWorkflowStep("enter-amount");
    },
    [amountMode, workflowStep]
  );

  const flip = useCallback(() => {
    if (lockOutputToken || amountMode === "exact-out") return;
    if (!isSupportedPair(outputToken, inputToken)) return;
    setInputToken(outputToken);
    setOutputToken(inputToken);
    setAmount("");
    setPriceImpactAck(false);
    setWorkflowStep("enter-amount");
  }, [inputToken, outputToken, lockOutputToken, amountMode]);

  const applySlippageBps = useCallback((bps: number) => {
    if (validateSlippageBps(bps) == null) setSlippageBps(bps);
  }, []);

  const canReview =
    quote != null &&
    quoteStatus === "ready" &&
    amountError == null &&
    (!requiresExtraConfirmation(quote.priceImpactPercent) || priceImpactAck);

  const openReview = useCallback(() => {
    if (!canReview || !quote) return;
    setWorkflowStep("review");
    trackSwapEvent({
      name: "swap_reviewed",
      source,
      inputToken,
      outputToken,
      priceImpactLevel: requiresExtraConfirmation(quote.priceImpactPercent) ? "high" : "normal",
    });
  }, [canReview, quote, source, inputToken, outputToken]);

  const backToEdit = useCallback(() => {
    setWorkflowStep("enter-amount");
  }, []);

  const runSwap = useCallback(
    async (_signal: AbortSignal, activeQuote: SwapQuote) => {
      if (!isMainnet) {
        throw new SwapError("wrong-network", "Switch to Mainnet to swap MALTY.");
      }
      if (Date.now() > activeQuote.expiresAt) {
        throw new SwapError("quote-expired", "This quote expired. Refreshing…");
      }

      setWorkflowStep("awaiting-signature");

      const transactionsBase64 = await buildSwapTransactions(
        {
          mode: activeQuote.mode,
          walletAddress: account.address,
          quoteResponse: activeQuote.raw as Record<string, unknown>,
          inputToken: activeQuote.inputMint,
          outputToken: activeQuote.outputMint,
        }
      );

      const transactions = decodeSwapTransactions(transactionsBase64);

      trackSwapEvent({ name: "swap_submitted", source, inputToken, outputToken });

      const signatures = await signAndSendSwapTransactions(
        transactions,
        signAndSendTransactions
      );
      setLastSignatures(signatures);
      setWorkflowStep("submitted");

      setWorkflowStep("confirming");
      await confirmSwapSignatures(client.rpc, signatures);

      const swapResult: SwapResult = {
        signatures,
        inputMint: activeQuote.inputMint,
        outputMint: activeQuote.outputMint,
        inputAmount: activeQuote.inputAmount,
        outputAmount: activeQuote.outputAmount,
        confirmed: true,
        timestamp: Date.now(),
        source,
      };

      setResult(swapResult);
      setWorkflowStep("confirmed");
      refetchBalances();
      trackSwapEvent({ name: "swap_confirmed", source, inputToken, outputToken });
      onSuccess?.(swapResult);
      return swapResult;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- refetchBalances/balanceFor close over hook state intentionally, not deps of this action
    [isMainnet, account.address, signAndSendTransactions, client.rpc, source, inputToken, outputToken, onSuccess]
  );

  const action = useAction(
    async (signal: AbortSignal, activeQuote: SwapQuote) => {
      setSubmitError(null);
      try {
        return await runSwap(signal, activeQuote);
      } catch (error) {
        const mapped = mapSwapError(error, language);
        setSubmitError({ message: mapped.message });
        setWorkflowStep("failed");
        trackSwapEvent({ name: "swap_failed", source, reason: mapped.kind });
        const swapError =
          error instanceof SwapError ? error : new SwapError(mapped.kind, mapped.message, error);
        onError?.(swapError);
        throw error;
      }
    }
  );

  const confirmSwap = useCallback(() => {
    if (!quote) return;
    action.dispatch(quote);
  }, [quote, action]);

  const reset = useCallback(() => {
    setWorkflowStep("enter-amount");
    setResult(null);
    setSubmitError(null);
    setLastSignatures([]);
    action.reset();
    if (amountMode === "exact-in") {
      setAmount("");
    }
    refreshQuote();
  }, [amountMode, action, refreshQuote]);

  const amountToken = amountMode === "exact-in" ? inputToken : outputToken;
  const rawAmountValidation =
    amount.trim() === "" ? null : getAmountError(amount, getSwapToken(amountToken).decimals, language);

  const maxInputAmount = useCallback((): string | null => {
    const balance = balanceFor(inputToken);
    if (balance == null) return null;
    const token = getSwapToken(inputToken);
    if (!token.isNative) {
      return balance === 0n ? "0" : formatBaseUnitsPlain(balance, token.decimals);
    }
    // Reserve a small SOL buffer for network fees / rent — never sweep 100% of SOL.
    const RESERVE_LAMPORTS = 5_000_000n; // 0.005 SOL
    const spendable = balance > RESERVE_LAMPORTS ? balance - RESERVE_LAMPORTS : 0n;
    return formatBaseUnitsPlain(spendable, token.decimals);
  }, [inputToken, solBalance.lamports, usdcBalance.amount, maltyBalance.amount]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    step,
    uiMode,
    isMainnet,
    cluster,
    setCluster,
    inputToken,
    outputToken,
    amount,
    amountMode,
    slippageBps,
    priceImpactAck,
    quote,
    quoteStatus,
    quoteErrorMessage,
    amountError: amountError ?? rawAmountValidation,
    lockOutputToken,
    canFlip: !lockOutputToken && amountMode === "exact-in",
    canEditAmount: amountMode === "exact-in",
    canReview,
    result,
    submitError,
    isSubmitting: action.isRunning,
    lastSignatures,
    returnTo,
    source,
    balances: {
      sol: solBalance,
      usdc: usdcBalance,
      malty: maltyBalance,
    },
    getExplorerUrl,
    setFromToken,
    setToToken,
    setAmountValue,
    flip,
    setSlippageBps: applySlippageBps,
    setPriceImpactAck,
    openReview,
    backToEdit,
    confirmSwap,
    reset,
    maxInputAmount,
  };
}

function formatBaseUnitsPlain(units: bigint, decimals: number): string {
  const divisor = 10n ** BigInt(decimals);
  const whole = units / divisor;
  const fraction = units % divisor;
  if (decimals === 0) return whole.toString();
  const fractionStr = fraction.toString().padStart(decimals, "0").replace(/0+$/, "");
  return fractionStr ? `${whole}.${fractionStr}` : whole.toString();
}

// Re-export for callers that only need base-unit parsing without the full engine.
export { toBaseUnits };
