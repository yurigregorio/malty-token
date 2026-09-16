import { useSwapCopy } from "../../lib/swap/swap-copy";
import { BarChartIcon, ShieldIcon, ZapIcon } from "./icons";

export function SwapTrustBadges() {
  const t = useSwapCopy();

  const badges = [
    { icon: ShieldIcon, title: t.badgeSecureTitle, text: t.badgeSecureText },
    { icon: ZapIcon, title: t.badgeLiquidityTitle, text: t.badgeLiquidityText },
    { icon: BarChartIcon, title: t.badgeSpeedTitle, text: t.badgeSpeedText },
  ];

  return (
    <div className="mx-auto mt-5 flex max-w-xl flex-wrap items-center justify-center gap-x-6 gap-y-2.5">
      {badges.map(({ icon: Icon, title, text }) => (
        <div key={title} className="flex items-center gap-2 text-left">
          <Icon className="h-4 w-4 shrink-0 text-[#e9b949]" />
          <div className="leading-tight">
            <p className="text-[11.5px] font-bold text-white/85">{title}</p>
            <p className="text-[10.5px] text-white/40">{text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
