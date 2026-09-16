import { formatTokenAmount } from "../../lib/swap/amount";
import { getSwapToken } from "../../lib/swap/tokens";
import type { SwapResult, SwapStep } from "../../lib/swap/types";
import { useSwapCopy } from "../../lib/swap/swap-copy";

export function SwapInFlightStatus({ step }: { step: SwapStep }) {
  const t = useSwapCopy();

  const inFlightCopy: Partial<Record<SwapStep, { title: string; text: string }>> = {
    "awaiting-signature": { title: t.awaitingSignatureTitle, text: t.awaitingSignatureText },
    submitted: { title: t.submittedTitle, text: t.submittedText },
    confirming: { title: t.confirmingTitle, text: t.confirmingText },
  };

  const copy = inFlightCopy[step];
  if (!copy) return null;

  return (
    <div className="flex flex-col items-center gap-3 py-6 text-center">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-[#e9b949]/30 border-t-[#e9b949]" />
      <p className="text-sm font-black text-white/95">{copy.title}</p>
      <p className="max-w-xs text-xs leading-5 text-white/50">{copy.text}</p>
    </div>
  );
}

export function SwapConfirmedStatus({
  result,
  signature,
  explorerUrl,
  returnTo,
  onSwapAgain,
}: {
  result: SwapResult;
  signature: string | undefined;
  explorerUrl: string | undefined;
  returnTo: string | null | undefined;
  onSwapAgain: () => void;
}) {
  const t = useSwapCopy();
  const outputMeta = getSwapToken(result.outputMint);

  return (
    <div className="flex flex-col items-center gap-3 py-4 text-center">
      <p className="text-2xl">🐾</p>
      <p className="text-lg font-black text-white/95">{t.swapCompleteTitle}</p>
      <p className="text-2xl font-black text-emerald-300">
        +{formatTokenAmount(result.outputAmount, outputMeta.decimals)} {outputMeta.symbol}
      </p>

      {signature && explorerUrl && (
        <a
          href={explorerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 font-mono text-[11px] text-white/45 underline decoration-white/20 underline-offset-2 hover:text-white/70"
        >
          {signature.slice(0, 8)}…{signature.slice(-8)} ↗
        </a>
      )}

      <div className="mt-3 flex w-full flex-col gap-2.5 sm:flex-row">
        {returnTo && (
          <a
            href={returnTo}
            className="flex-1 rounded-xl bg-[#e9b949] px-4 py-3 text-center text-sm font-black text-black transition-transform hover:-translate-y-0.5"
          >
            {t.returnToGame}
          </a>
        )}
        <button
          type="button"
          onClick={onSwapAgain}
          className={`flex-1 rounded-xl border border-white/[0.12] px-4 py-3 text-sm font-bold text-white/80 transition-colors hover:border-white/25 ${returnTo ? "" : "sm:flex-none"}`}
        >
          {t.swapAgain}
        </button>
      </div>
    </div>
  );
}

export function SwapFailedStatus({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  const t = useSwapCopy();

  return (
    <div className="flex flex-col items-center gap-3 py-6 text-center">
      <p className="text-2xl">⚠️</p>
      <p className="text-sm font-black text-white/95">{t.swapFailedTitle}</p>
      <p className="max-w-xs text-xs leading-5 text-white/55">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-2 rounded-xl border border-white/[0.12] px-5 py-2.5 text-sm font-bold text-white/85 transition-colors hover:border-[#e9b949]/35"
      >
        {t.tryAgain}
      </button>
    </div>
  );
}
