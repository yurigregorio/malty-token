"use client";

import Link from "next/link";
import { useLanguage } from "./lib/language";

const copy = {
  en: {
    eyebrow: "404 · MALTY",
    title: "This page wandered off.",
    text: "The page you requested does not exist or may have moved. The MALTY project pages are still available below.",
    back: "Back to MALTY",
    transparency: "Transparency",
    gives: "MALTY Gives",
  },
  pt: {
    eyebrow: "404 · MALTY",
    title: "Esta página se perdeu por aí.",
    text: "A página que você acessou não existe ou pode ter mudado de endereço. As páginas do projeto MALTY continuam disponíveis abaixo.",
    back: "Voltar ao MALTY",
    transparency: "Transparência",
    gives: "MALTY Gives",
  },
} as const;

export function NotFoundContent() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#080a0d] px-5 text-[#f7f1e5]">
      <div className="max-w-xl text-center">
        <p className="text-[11px] font-black tracking-[0.24em] text-[#e9b949]">{t.eyebrow}</p>
        <h1 className="mt-4 text-4xl font-black tracking-[-0.05em] sm:text-6xl">{t.title}</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/45">{t.text}</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/" className="rounded-xl bg-[#e9b949] px-4 py-2.5 text-sm font-black text-black">{t.back}</Link>
          <Link href="/transparency" className="rounded-xl border border-white/12 px-4 py-2.5 text-sm font-bold">{t.transparency}</Link>
          <Link href="/gives" className="rounded-xl border border-white/12 px-4 py-2.5 text-sm font-bold">{t.gives}</Link>
        </div>
      </div>
    </main>
  );
}
