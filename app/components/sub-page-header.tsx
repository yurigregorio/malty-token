"use client";

import Link from "next/link";
import { useLanguage } from "../lib/language";

export function SubPageHeader() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center justify-between gap-3">
      <Link href="/" className="text-xs font-bold text-[#e9b949]">
        ← MALTY
      </Link>
      <div className="flex rounded-full border border-white/[0.08] bg-white/[0.025] p-1 text-[11px] font-semibold">
        {(["en", "pt"] as const).map((l) => (
          <button
            key={l}
            onClick={() => setLanguage(l)}
            aria-pressed={language === l}
            className={`rounded-full px-3 py-1.5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#e9b949] ${
              language === l ? "bg-[#e9b949] text-black" : "text-white/55 hover:text-white"
            }`}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
