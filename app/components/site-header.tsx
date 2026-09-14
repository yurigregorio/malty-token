"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MALTY_TOKEN } from "../lib/malty-token";
import { useLanguage } from "../lib/language";

const TOKEN_IMAGE = MALTY_TOKEN.imageUri;

const nav = {
  en: { items: ["Project", "How to Buy", "Token", "Gives", "Roadmap", "FAQ"], hrefs: ["/#story", "/how-to-buy", "/#token", "/#gives", "/#roadmap", "/#faq"], menu: "Menu", close: "Close" },
  pt: { items: ["Projeto", "Como Comprar", "Token", "Gives", "Roadmap", "FAQ"], hrefs: ["/#story", "/how-to-buy", "/#token", "/#gives", "/#roadmap", "/#faq"], menu: "Menu", close: "Fechar" },
} as const;

export function SiteHeader() {
  const { language, setLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const t = nav[language];

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#080a0d]/90 backdrop-blur-2xl">
      <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-5 px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e9b949]">
          <Image src={TOKEN_IMAGE} alt="MALTY" width={38} height={38} priority className="h-9.5 w-9.5 rounded-full border border-[#d9a53d]/40 bg-[#2a2013] object-cover" />
          <div className="leading-tight">
            <p className="text-[15px] font-extrabold tracking-[-0.02em] text-[#e9b949]">MALTY</p>
            <p className="text-[11px] font-medium tracking-[0.12em] text-white/45">SOLANA</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-7 text-[13px] font-medium text-white/60 md:flex">
          {t.items.map((x, i) => (
            <Link key={x} href={t.hrefs[i]} className="rounded-sm transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e9b949]">
              {x}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href="https://t.me/MaltyCoinOfficial" target="_blank" rel="noopener noreferrer" aria-label="MALTY on Telegram" className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.025] text-white/60 transition-colors hover:border-[#e9b949]/35 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#e9b949]">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor"><path d="M21.05 3.16 2.42 10.6c-1.24.5-1.23 1.2-.23 1.51l4.76 1.49L18.6 6.63c.5-.33.96-.15.58.21L10 15.03h-.01l.35 5.08c.5 0 .73-.23.99-.5l2.4-2.33 4.98 3.68c.92.51 1.58.25 1.81-.85l3.27-15.4c.34-1.35-.5-1.96-1.34-1.55Z" /></svg>
          </a>
          <a href="https://x.com/MaltyCoin" target="_blank" rel="noopener noreferrer" aria-label="MALTY on X" className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.025] text-white/60 transition-colors hover:border-[#e9b949]/35 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#e9b949]">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor"><path d="M13.3174 10.7749L19.1457 4H17.7646L12.7852 9.88256L8.80309 4H4.21053L10.3186 12.8955L4.21053 20H5.59183L10.6337 13.7899L14.7942 20H19.3893L13.3174 10.7749ZM11.5116 12.9776L10.7118 11.8656L6.09846 5.05078H8.03556L11.7852 10.4988L12.5849 11.6109L17.7658 19.1489H15.8288L11.5116 12.9776Z" /></svg>
          </a>
          <div className="flex rounded-full border border-white/[0.08] bg-white/[0.025] p-1 text-[11px] font-semibold">
            {(["en", "pt"] as const).map((l) => (
              <button key={l} onClick={() => setLanguage(l)} aria-pressed={language === l} className={`rounded-full px-3 py-1.5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#e9b949] ${language === l ? "bg-[#e9b949] text-black" : "text-white/55 hover:text-white"}`}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} className="rounded-xl border border-white/[0.08] px-3.5 py-2 text-xs font-semibold text-white/75 md:hidden">
            {menuOpen ? t.close : t.menu}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="border-t border-white/[0.06] px-5 py-3 md:hidden">
          <nav className="mx-auto grid max-w-6xl gap-1">
            {t.items.map((x, i) => (
              <Link key={x} href={t.hrefs[i]} onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-3 text-sm font-semibold text-white/70 hover:bg-white/[0.04] hover:text-white">
                {x}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
