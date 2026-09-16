import { formatTokenAmount } from "../../lib/swap/amount";
import { getSwapToken } from "../../lib/swap/tokens";
import type { SwapResult, SwapStep } from "../../lib/swap/types";

const IN_FLIGHT_COPY: Partial<Record<SwapStep, { title: string; text: string }>> = {
  "awaiting-signature": {
    title: "Confirm in your wallet",
    text: "Approve the transaction in your wallet to continue. Malty never signs on your behalf.",
  },
  submitted: {
    title: "Transaction submitted",
    text: "Your swap was sent to the network.",
  },
  confirming: {
    title: "Confirming…",
    text: "Waiting for the Solana network to confirm your swap. This is usually quick.",
  },
};

export function SwapInFlightStatus({ step }: { step: SwapStep }) {
  const copy = IN_FLIGHT_COPY[step];
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
  const outputMeta = getSwapToken(result.outputMint);

  return (
    <div className="flex flex-col items-center gap-3 py-4 text-center">
      <p className="text-2xl">🐾</p>
      <p className="text-lg font-black text-white/95">Swap complete!</p>
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
            Return to Game
          </a>
        )}
        <button
          type="button"
          onClick={onSwapAgain}
          className={`flex-1 rounded-xl border border-white/[0.12] px-4 py-3 text-sm font-bold text-white/80 transition-colors hover:border-white/25 ${returnTo ? "" : "sm:flex-none"}`}
        >
          Swap again
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
  return (
    <div className="flex flex-col items-center gap-3 py-6 text-center">
      <p className="text-2xl">⚠️</p>
      <p className="text-sm font-black text-white/95">Swap didn&apos;t go through</p>
      <p className="max-w-xs text-xs leading-5 text-white/55">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-2 rounded-xl border border-white/[0.12] px-5 py-2.5 text-sm font-bold text-white/85 transition-colors hover:border-[#e9b949]/35"
      >
        Try again
      </button>
    </div>
  );
}
