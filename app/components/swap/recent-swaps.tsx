"use client";

import { useState } from "react";
import { formatTokenAmount } from "../../lib/swap/amount";
import { getSwapToken } from "../../lib/swap/tokens";
import type { SwapHistoryEntry } from "../../lib/swap/swap-history";
import { useSwapCopy } from "../../lib/swap/swap-copy";
import { useLanguage } from "../../lib/language";
import { TokenIcon } from "./token-amount-panel";
import { CheckCircleIcon, ExternalLinkIcon } from "./icons";

const COLLAPSED_COUNT = 3;

function formatRelativeTime(timestamp: number, language: "en" | "pt"): string {
  const seconds = Math.max(0, Math.round((Date.now() - timestamp) / 1000));
  const rtf = new Intl.RelativeTimeFormat(language === "pt" ? "pt-BR" : "en-US", { numeric: "always" });

  if (seconds < 60) return rtf.format(-seconds, "second");
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return rtf.format(-minutes, "minute");
  const hours = Math.round(minutes / 60);
  if (hours < 24) return rtf.format(-hours, "hour");
  const days = Math.round(hours / 24);
  return rtf.format(-days, "day");
}

export function RecentSwaps({
  entries,
  getExplorerUrl,
}: {
  entries: SwapHistoryEntry[];
  getExplorerUrl: (path: string) => string;
}) {
  const t = useSwapCopy();
  const { language } = useLanguage();
  const [expanded, setExpanded] = useState(false);

  const visible = expanded ? entries : entries.slice(0, COLLAPSED_COUNT);

  return (
    <div className="mx-auto mt-4 w-full max-w-lg">
      <div className="mb-2 flex items-center justify-between px-0.5">
        <p className="text-[11px] font-semibold tracking-[0.08em] text-white/40">
          {t.recentSwapsTitle}
        </p>
        {entries.length > COLLAPSED_COUNT && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="text-[11px] font-semibold text-[#e9b949]/90 hover:text-[#e9b949]"
          >
            {expanded ? t.back : t.viewAll}
          </button>
        )}
      </div>

      {entries.length === 0 ? (
        <p className="rounded-xl border border-white/[0.08] bg-white/[0.02] px-3.5 py-3 text-xs text-white/40">
          {t.recentSwapsEmpty}
        </p>
      ) : (
        <ul className="space-y-1.5">
          {visible.map((entry) => {
            const inputMeta = getSwapToken(entry.inputMint);
            const outputMeta = getSwapToken(entry.outputMint);
            return (
              <li
                key={entry.signature}
                className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] px-3.5 py-2.5"
              >
                <TokenIcon token={inputMeta} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-bold text-white/85">
                    {formatTokenAmount(BigInt(entry.inputAmount), inputMeta.decimals)} {inputMeta.symbol}
                    {" → "}
                    {formatTokenAmount(BigInt(entry.outputAmount), outputMeta.decimals)} {outputMeta.symbol}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-white/40">
                    {formatRelativeTime(entry.timestamp, language)}
                    <span className="flex items-center gap-0.5 text-emerald-300">
                      <CheckCircleIcon className="h-3 w-3" />
                      {t.confirmedLabel}
                    </span>
                  </p>
                </div>
                <a
                  href={getExplorerUrl(`/tx/${entry.signature}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex shrink-0 items-center gap-1 text-[11px] font-semibold text-white/50 hover:text-white"
                >
                  {t.viewTransaction}
                  <ExternalLinkIcon className="h-3 w-3" />
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
