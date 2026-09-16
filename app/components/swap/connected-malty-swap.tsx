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
import { SwapContractInfo } from "./trust-footer";
import { PoolInfo } from "./pool-info";
import { RecentSwaps } from "./recent-swaps";
import { SwapShell } from "./swap-shell";
import { SwapIcon } from "./icons";
import { useSwapCopy } from "../../lib/swap/swap-copy";

type ConnectedWallet = NonNullable<ReturnType<typeof useConnectedWallet>>;

const IN_FLIGHT_STEPS = ["preparing", "awaiting-signature", "submitted", "confirming"] as const;

export function ConnectedMaltySwap({
  account,
  chain,
  shell,
  ...props
}: MaltySwapProps & {
  account: ConnectedWallet["account"];
  chain: `solana:${string}`;
  shell: "full" | "compact";
}) {
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
    refreshQuote,
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

  const isFull = shell === "full";
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
      <SwapShell shell={shell}>
        <ReviewSwap
          quote={quote}
          priceImpactAck={priceImpactAck}
          onPriceImpactAckChange={setPriceImpactAck}
          onBack={backToEdit}
          onConfirm={confirmSwap}
          isSubmitting={isSubmitting}
        />
      </SwapShell>
    );
  }

  if ((IN_FLIGHT_STEPS as readonly string[]).includes(step)) {
    return (
      <SwapShell shell={shell}>
        <SwapInFlightStatus step={step} />
      </SwapShell>
    );
  }

  if (step === "confirmed" && result) {
    const signature = lastSignatures[lastSignatures.length - 1];
    return (
      <SwapShell shell={shell}>
        <SwapConfirmedStatus
          result={result}
          signature={signature}
          explorerUrl={signature ? getExplorerUrl(`/tx/${signature}`) : undefined}
          returnTo={returnTo}
          onSwapAgain={reset}
        />
      </SwapShell>
    );
  }

  if (step === "failed") {
    return (
      <SwapShell shell={shell}>
        <SwapFailedStatus message={submitError?.message ?? t.genericFailure} onRetry={reset} />
      </SwapShell>
    );
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
    <>
      <SwapShell shell={shell}>
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
              className="group -my-2 flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.12] bg-[#0c0f13] text-white/70 shadow-[0_0_0_4px_#0c0f13] transition-all hover:border-[#e9b949]/40 hover:text-[#e9b949] disabled:cursor-not-allowed disabled:opacity-30"
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
            <SwapDetails
              quote={quote}
              isStale={quoteStatus === "stale"}
              usdPrices={usdPrices}
              poolId={poolId}
              onRefresh={refreshQuote}
            />
          )}

          {quoteStatus === "loading" && !quote && <SwapDetailsSkeleton />}

          <SlippageSelector slippageBps={slippageBps} onChange={setSlippageBps} />

          <button
            type="button"
            onClick={openReview}
            disabled={!canReview}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-[#f4d385] to-[#e9b949] px-4 py-3.5 text-sm font-black text-black transition-transform hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-40"
          >
            {quote && amount.trim() !== "" && <SwapIcon className="h-4 w-4" />}
            {swapCtaLabel}
          </button>

          {isFull && (
            <>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <SwapContractInfo />
                <PoolInfo inputMint={inputToken} outputMint={outputToken} poolId={poolId} />
              </div>

              <p className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-white/35">
                <span className="text-[#e9b949]">⚡</span> {t.poweredByRaydium}
              </p>
            </>
          )}
        </div>
      </SwapShell>

      {isFull && <RecentSwaps entries={recentSwaps} getExplorerUrl={getExplorerUrl} />}
    </>
  );
}
