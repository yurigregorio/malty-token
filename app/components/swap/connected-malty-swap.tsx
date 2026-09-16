"use client";

import { useSignAndSendTransactions } from "@solana/react";
import type { useConnectedWallet } from "@solana/kit-plugin-wallet/react";
import { fromBaseUnits, formatTokenAmount } from "../../lib/swap/amount";
import { getSwapToken, counterpartsFor } from "../../lib/swap/tokens";
import { useMaltySwapEngine } from "../../lib/swap/use-malty-swap-engine";
import { formatUsdPrice } from "../../lib/swap/format-usd";
import type { MaltySwapProps } from "../../lib/swap/types";
import { TokenAmountPanel } from "./token-amount-panel";
import { SwapDetails, SwapDetailsSkeleton } from "./swap-details";
import { SlippageSelector } from "./slippage-selector";
import { ReviewSwap } from "./review-swap";
import { SwapInFlightStatus, SwapConfirmedStatus, SwapFailedStatus } from "./swap-status";
import { SwapTrustFooter } from "./trust-footer";
import { PoolInfo } from "./pool-info";
import { RecentSwaps } from "./recent-swaps";
import { InfoTooltip } from "./info-tooltip";
import { useSwapCopy } from "../../lib/swap/swap-copy";

type ConnectedWallet = NonNullable<ReturnType<typeof useConnectedWallet>>;

const IN_FLIGHT_STEPS = ["preparing", "awaiting-signature", "submitted", "confirming"] as const;

export function ConnectedMaltySwap({
  account,
  chain,
  ...props
}: MaltySwapProps & { account: ConnectedWallet["account"]; chain: `solana:${string}` }) {
  const t = useSwapCopy();
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
    usdPrices,
    recentSwaps,
    poolId,
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

  if ((IN_FLIGHT_STEPS as readonly string[]).includes(step)) {
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
    return <SwapFailedStatus message={submitError?.message ?? t.genericFailure} onRetry={reset} />;
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

  // Real USD values, only once the live quote actually matches the tokens
  // currently shown (avoids flashing a stale value for a token just switched to).
  const inputUsdValue =
    quote && quote.inputMint === inputToken ? usdPrices.valueFor(inputToken, quote.inputAmount) : null;
  const outputUsdValue =
    quote && quote.outputMint === outputToken ? usdPrices.valueFor(outputToken, quote.outputAmount) : null;

  const maltyPrice = usdPrices.priceFor("MALTY");
  const maltyPriceLabel = maltyPrice != null ? `1 MALTY ≈ ${formatUsdPrice(maltyPrice)}` : null;

  const swapCtaLabel =
    amount.trim() === ""
      ? t.enterAnAmount
      : quoteStatus === "loading"
        ? t.fetchingQuote
        : quote
          ? `${t.swapCtaPrefix} ${inputToken} ${t.forWord} ${outputToken}`
          : quoteErrorMessage
            ? t.quoteUnavailable
            : t.reviewSwapCta;

  return (
    <div className="space-y-2.5">
      {amountMode === "exact-out" && (
        <p className="rounded-lg border border-[#e9b949]/25 bg-[#e9b949]/[0.06] px-3 py-2 text-center text-[12px] font-bold text-[#e9b949]">
          {t.buyingExactly} {amount} {outputToken}
        </p>
      )}

      <TokenAmountPanel
        label={t.youPay}
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
        usdValue={inputUsdValue}
        priceLabel={inputToken === "MALTY" ? maltyPriceLabel : null}
      />

      <div className="flex justify-center">
        <button
          type="button"
          onClick={flip}
          disabled={!canFlip}
          aria-label={t.flipTokens}
          className="group -my-2 flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.1] bg-[#0c0f13] text-white/70 transition-all hover:border-[#e9b949]/40 hover:text-[#e9b949] disabled:cursor-not-allowed disabled:opacity-30"
        >
          <span className="inline-block transition-transform duration-300 group-hover:rotate-180">⇅</span>
        </button>
      </div>

      <TokenAmountPanel
        label={t.youReceive}
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
        usdValue={outputUsdValue}
        priceLabel={outputToken === "MALTY" ? maltyPriceLabel : null}
      />

      {quoteErrorMessage && (
        <p className="rounded-lg border border-red-400/25 bg-red-400/[0.06] px-3 py-2 text-xs text-red-300" role="alert">
          {quoteErrorMessage}
        </p>
      )}

      {quote && (quoteStatus === "ready" || quoteStatus === "stale") && (
        <SwapDetails quote={quote} isStale={quoteStatus === "stale"} usdPrices={usdPrices} />
      )}

      {quoteStatus === "loading" && !quote && <SwapDetailsSkeleton />}

      <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-3">
        <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.08em] text-white/45">
          SLIPPAGE
          <InfoTooltip label={t.whatIsSlippage}>{t.slippageExplanation}</InfoTooltip>
        </p>
        <SlippageSelector slippageBps={slippageBps} onChange={setSlippageBps} />
      </div>

      <button
        type="button"
        onClick={openReview}
        disabled={!canReview}
        className="w-full rounded-xl bg-[#e9b949] px-4 py-3.5 text-sm font-black text-black transition-transform hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-40"
      >
        {swapCtaLabel}
      </button>

      {quote && <PoolInfo inputMint={inputToken} outputMint={outputToken} poolId={poolId} />}

      <SwapTrustFooter />

      <RecentSwaps entries={recentSwaps} getExplorerUrl={getExplorerUrl} />
    </div>
  );
}
