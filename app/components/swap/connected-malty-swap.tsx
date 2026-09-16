"use client";

import { useSignAndSendTransactions } from "@solana/react";
import type { useConnectedWallet } from "@solana/kit-plugin-wallet/react";
import { fromBaseUnits, formatTokenAmount } from "../../lib/swap/amount";
import { getSwapToken, counterpartsFor } from "../../lib/swap/tokens";
import { useMaltySwapEngine } from "../../lib/swap/use-malty-swap-engine";
import type { MaltySwapProps } from "../../lib/swap/types";
import { TokenAmountPanel } from "./token-amount-panel";
import { SwapDetails } from "./swap-details";
import { SlippageSelector } from "./slippage-selector";
import { ReviewSwap } from "./review-swap";
import { SwapInFlightStatus, SwapConfirmedStatus, SwapFailedStatus } from "./swap-status";
import { SwapTrustFooter } from "./trust-footer";
import { InfoTooltip } from "./info-tooltip";
import { SLIPPAGE_EXPLANATION } from "./slippage-copy";

type ConnectedWallet = NonNullable<ReturnType<typeof useConnectedWallet>>;

export function ConnectedMaltySwap({
  account,
  chain,
  ...props
}: MaltySwapProps & { account: ConnectedWallet["account"]; chain: `solana:${string}` }) {
  const signAndSendTransactions = useSignAndSendTransactions(account, chain);

  const engine = useMaltySwapEngine({
    ...props,
    account,
    chain,
    signAndSendTransactions,
  });

  const {
    step,
    inputToken,
    outputToken,
    amount,
    amountMode,
    canFlip,
    lockOutputToken,
    quote,
    quoteStatus,
    quoteErrorMessage,
    amountError,
    slippageBps,
    priceImpactAck,
    balances,
    canReview,
    isSubmitting,
    result,
    submitError,
    lastSignatures,
    returnTo,
    getExplorerUrl,
    setFromToken,
    setToToken,
    setAmountValue,
    flip,
    setSlippageBps,
    setPriceImpactAck,
    openReview,
    backToEdit,
    confirmSwap,
    reset,
    maxInputAmount,
  } = engine;

  const inputOptions = counterpartsFor(outputToken);
  const outputOptions = lockOutputToken || amountMode === "exact-out" ? [outputToken] : counterpartsFor(inputToken);

  function balanceFor(symbol: typeof inputToken) {
    if (symbol === "SOL") return balances.sol.lamports;
    if (symbol === "USDC") return balances.usdc.amount;
    return balances.malty.amount;
  }

  function isBalanceLoading(symbol: typeof inputToken) {
    if (symbol === "SOL") return balances.sol.isLoading;
    if (symbol === "USDC") return balances.usdc.isLoading;
    return balances.malty.isLoading;
  }

  function balanceErrorFor(symbol: typeof inputToken) {
    if (symbol === "SOL") return balances.sol.error;
    if (symbol === "USDC") return balances.usdc.error;
    return balances.malty.error;
  }

  // SOL balance is a live subscription with no manual refetch; SPL balances
  // (USDC/MALTY) are polled and expose one.
  function retryBalanceFor(symbol: typeof inputToken) {
    if (symbol === "USDC") return balances.usdc.refetch;
    if (symbol === "MALTY") return balances.malty.refetch;
    return undefined;
  }

  if (step === "review" && quote) {
    return (
      <div>
        <ReviewSwap
          quote={quote}
          priceImpactAck={priceImpactAck}
          onPriceImpactAckChange={setPriceImpactAck}
          onBack={backToEdit}
          onConfirm={confirmSwap}
          isSubmitting={isSubmitting}
        />
        <SwapTrustFooter />
      </div>
    );
  }

  if (step === "awaiting-signature" || step === "submitted" || step === "confirming") {
    return <SwapInFlightStatus step={step} />;
  }

  if (step === "confirmed" && result) {
    const signature = lastSignatures[lastSignatures.length - 1];
    return (
      <SwapConfirmedStatus
        result={result}
        signature={signature}
        explorerUrl={signature ? getExplorerUrl(`/tx/${signature}`) : undefined}
        returnTo={returnTo}
        onSwapAgain={reset}
      />
    );
  }

  if (step === "failed") {
    return <SwapFailedStatus message={submitError?.message ?? "Something went wrong."} onRetry={reset} />;
  }

  const outputDisplay =
    quote && quote.outputMint === outputToken
      ? formatTokenAmount(quote.outputAmount, getSwapToken(outputToken).decimals)
      : amountMode === "exact-out"
        ? amount
        : "0.00";

  const inputDisplay =
    quote && quote.inputMint === inputToken
      ? fromBaseUnits(quote.inputAmount, getSwapToken(inputToken).decimals)
      : "0.00";

  return (
    <div className="space-y-2.5">
      {amountMode === "exact-out" && (
        <p className="rounded-lg border border-[#e9b949]/25 bg-[#e9b949]/[0.06] px-3 py-2 text-center text-[12px] font-bold text-[#e9b949]">
          Buying exactly {amount} {outputToken}
        </p>
      )}

      <TokenAmountPanel
        label="You pay"
        token={inputToken}
        tokenOptions={inputOptions.length > 0 ? inputOptions : [inputToken]}
        onTokenChange={setFromToken}
        amount={amountMode === "exact-in" ? amount : inputDisplay}
        onAmountChange={amountMode === "exact-in" ? setAmountValue : undefined}
        displayValue={amountMode === "exact-out" ? inputDisplay : undefined}
        balance={balanceFor(inputToken)}
        isLoadingBalance={isBalanceLoading(inputToken)}
        balanceError={balanceErrorFor(inputToken)}
        onRetryBalance={retryBalanceFor(inputToken)}
        onMax={amountMode === "exact-in" ? () => { const max = maxInputAmount(); if (max != null) setAmountValue(max); } : undefined}
        error={amountMode === "exact-in" ? amountError : null}
      />

      <div className="flex justify-center">
        <button
          type="button"
          onClick={flip}
          disabled={!canFlip}
          aria-label="Flip tokens"
          className="-my-2 flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.1] bg-[#0c0f13] text-white/70 transition-transform hover:border-[#e9b949]/35 hover:text-[#e9b949] disabled:cursor-not-allowed disabled:opacity-30"
        >
          ⇅
        </button>
      </div>

      <TokenAmountPanel
        label="You receive"
        token={outputToken}
        tokenOptions={outputOptions.length > 0 ? outputOptions : [outputToken]}
        onTokenChange={lockOutputToken || amountMode === "exact-out" ? undefined : setToToken}
        amount={amountMode === "exact-out" ? amount : outputDisplay}
        onAmountChange={undefined}
        displayValue={outputDisplay}
        balance={balanceFor(outputToken)}
        isLoadingBalance={isBalanceLoading(outputToken)}
        balanceError={balanceErrorFor(outputToken)}
        onRetryBalance={retryBalanceFor(outputToken)}
      />

      {quoteErrorMessage && (
        <p className="rounded-lg border border-red-400/25 bg-red-400/[0.06] px-3 py-2 text-xs text-red-300" role="alert">
          {quoteErrorMessage}
        </p>
      )}

      {quote && (quoteStatus === "ready" || quoteStatus === "stale") && (
        <SwapDetails quote={quote} isStale={quoteStatus === "stale"} />
      )}

      {quoteStatus === "loading" && !quote && (
        <p className="flex items-center gap-1.5 px-1 text-[11px] font-semibold text-white/40">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/40" />
          Fetching quote…
        </p>
      )}

      <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-3">
        <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.08em] text-white/45">
          SLIPPAGE
          <InfoTooltip label="What is slippage?">{SLIPPAGE_EXPLANATION}</InfoTooltip>
        </p>
        <SlippageSelector slippageBps={slippageBps} onChange={setSlippageBps} />
      </div>

      <button
        type="button"
        onClick={openReview}
        disabled={!canReview}
        className="w-full rounded-xl bg-[#e9b949] px-4 py-3.5 text-sm font-black text-black transition-transform hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-40"
      >
        {quoteStatus === "loading"
          ? "Fetching quote…"
          : amount.trim() === ""
            ? "Enter an amount"
            : "Review Swap"}
      </button>

      <SwapTrustFooter />
    </div>
  );
}
