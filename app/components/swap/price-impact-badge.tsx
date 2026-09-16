import { classifyPriceImpact } from "../../lib/swap/price-impact";

const STYLES: Record<ReturnType<typeof classifyPriceImpact>, string> = {
  normal: "border-emerald-400/25 bg-emerald-400/10 text-emerald-300",
  attention: "border-[#e9b949]/30 bg-[#e9b949]/10 text-[#e9b949]",
  high: "border-red-400/30 bg-red-400/10 text-red-300",
};

export function PriceImpactBadge({ percent }: { percent: number }) {
  const level = classifyPriceImpact(percent);
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-bold ${STYLES[level]}`}
    >
      {level === "high" && "⚠ "}
      {percent < 0.01 ? "<0.01" : percent.toFixed(2)}%
    </span>
  );
}
