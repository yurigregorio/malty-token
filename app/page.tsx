"use client";

import { useState } from "react";

const MINT = "6ZhVVH2KwbiVg6HJjrPg2YC5SWomBFA5qGmz57pknMpz";
const TOKEN_IMAGE = "https://arweave.net/w-TXbk_hQOw1mC5vA9YrVmClKzz_Avjfiq5coE1AYec";

const allocations = [
  ["Liquidity", "50%", "500M"],
  ["Ecosystem", "20%", "200M"],
  ["Community", "15%", "150M"],
  ["Treasury", "7.5%", "75M"],
  ["Team", "7.5%", "75M"],
] as const;

const reserveWallets = [
  ["Liquidity", "8zMNiAh2uH1MoKh9eRjewSrgRjU4WQAYVV2u4SKSiRfU"],
  ["Ecosystem", "44Ha31Tj911xtFcNv5e4RTD7f3NxhULtcUygBJm8on1g"],
  ["Community", "BFYWFeqf8uJ4BvD6dfySCkdMVdtDPvxFe5hmSzuCCbhg"],
  ["Treasury", "6gkNMy3342qVUKSatW27zUAK22ops5Fu7G5J148MQZK6"],
  ["Team", "CvASopxtFapEhJ8r75UcHiisPVCfxv5ApGAqbwNagXmw"],
] as const;

type Language = "en" | "pt";

const copy = {
  en: {
    nav: ["Token", "Tokenomics", "Transparency", "FAQ"],
    badge: "SOLANA MAINNET · OFFICIAL MALTY",
    eyebrow: "TRANSPARENT BY DESIGN",
    headline: "Small Dog. Big Community.",
    intro:
      "A community token inspired by Charlotte, built on Solana with a fixed issued supply, public architecture and verifiable token facts.",
    explore: "Explore MALTY",
    verify: "Verify on Solana",
    tokenTitle: "The essentials, without the noise.",
    tokenText: "Official Mainnet facts in one place: mint, supply, authorities and transfer tax.",
    tokenomicsTitle: "Simple, visible tokenomics.",
    tokenomicsText:
      "Canonical allocation of the 1B MALTY issued supply. Allocation is a project plan, not proof of circulation or distribution.",
    transparencyTitle: "Trust through verifiable facts.",
    transparencyText:
      "MALTY publishes what can be verified and keeps planned allocations separate from observed on-chain state.",
    reserves: "View reserve wallets",
    roadmap: "Project status",
    faq: "Quick answers",
    current: "Documented: 0 MALTY",
    copy: "Copy mint",
    copied: "Copied",
    planned: "Planned allocation",
    risk:
      "MALTY is a memecoin. Project information is provided for transparency and does not promise price, returns, liquidity or future value.",
  },
  pt: {
    nav: ["Token", "Tokenomics", "Transparência", "FAQ"],
    badge: "SOLANA MAINNET · MALTY OFICIAL",
    eyebrow: "TRANSPARÊNCIA POR DESIGN",
    headline: "Cão pequeno. Grande comunidade.",
    intro:
      "Um token comunitário inspirado na Charlotte, construído na Solana com supply emitido definido, arquitetura pública e dados verificáveis.",
    explore: "Conhecer MALTY",
    verify: "Verificar na Solana",
    tokenTitle: "O essencial, sem ruído.",
    tokenText: "Dados oficiais da Mainnet num só lugar: mint, supply, autoridades e taxa de transferência.",
    tokenomicsTitle: "Tokenomics simples e visível.",
    tokenomicsText:
      "Alocação canónica do supply emitido de 1B MALTY. Alocação é um plano do projeto, não prova de circulação ou distribuição.",
    transparencyTitle: "Confiança através de dados verificáveis.",
    transparencyText:
      "O MALTY publica o que pode ser verificado e mantém as alocações planeadas separadas do estado observado on-chain.",
    reserves: "Ver wallets de reserva",
    roadmap: "Estado do projeto",
    faq: "Respostas rápidas",
    current: "Documentado: 0 MALTY",
    copy: "Copiar mint",
    copied: "Copiado",
    planned: "Alocação planeada",
    risk:
      "MALTY é uma memecoin. As informações do projeto são publicadas por transparência e não prometem preço, retorno, liquidez ou valor futuro.",
  },
} as const;

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [copied, setCopied] = useState(false);
  const t = copy[language];

  async function copyMint() {
    await navigator.clipboard.writeText(MINT);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#080a0d] text-[#f7f1e5] selection:bg-[#d9a53d] selection:text-black">
      <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#080a0d]/80 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <a href="#top" className="group flex items-center gap-3" aria-label="MALTY home">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-[#d9a53d]/20 opacity-0 blur transition group-hover:opacity-100" />
              <img src={TOKEN_IMAGE} alt="MALTY" className="relative h-9 w-9 rounded-full border border-[#d9a53d]/40 object-cover" />
            </div>
            <div className="leading-none">
              <p className="text-base font-black tracking-[-0.03em] text-[#e9b949]">MALTY</p>
              <p className="mt-1 text-[9px] uppercase tracking-[0.22em] text-white/35">Solana</p>
            </div>
          </a>

          <nav className="hidden items-center gap-5 text-xs font-semibold text-white/50 md:flex">
            {t.nav.map((item, i) => (
              <a key={item} href={`#${["token", "tokenomics", "transparency", "faq"][i]}`} className="transition hover:text-[#e9b949]">
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center rounded-full border border-white/10 bg-white/[0.035] p-1 text-[11px] font-bold shadow-inner shadow-white/[0.03]">
            {(["en", "pt"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                aria-pressed={language === lang}
                className={`rounded-full px-3 py-1.5 transition ${language === lang ? "bg-[#e9b949] text-black shadow-[0_4px_16px_rgba(233,185,73,0.25)]" : "text-white/45 hover:text-white"}`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </header>

      <section id="top" className="relative border-b border-white/[0.07]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_42%,rgba(217,165,61,0.16),transparent_29%),radial-gradient(circle_at_18%_12%,rgba(95,71,190,0.09),transparent_24%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#e9b949]/40 to-transparent" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 sm:px-8 sm:py-14 lg:grid-cols-[1.08fr_0.92fr] lg:py-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e9b949]/20 bg-[#e9b949]/[0.045] px-3 py-1.5 text-[10px] font-black tracking-[0.15em] text-[#e9b949] shadow-[0_0_30px_rgba(233,185,73,0.05)]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" /> {t.badge}
            </div>

            <p className="mt-6 text-[10px] font-black tracking-[0.28em] text-white/35">{t.eyebrow}</p>
            <h1 className="mt-2 text-5xl font-black leading-[0.92] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
              MALTY<span className="text-[#e9b949]">.</span>
            </h1>
            <p className="mt-4 text-xl font-bold tracking-[-0.02em] text-white sm:text-2xl">{t.headline}</p>
            <p className="mt-4 max-w-xl text-sm leading-6 text-white/55 sm:text-base">{t.intro}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#token" className="rounded-xl bg-gradient-to-b from-[#f0c45e] to-[#d8a13a] px-4 py-2.5 text-sm font-black text-[#161006] shadow-[0_10px_30px_rgba(217,165,61,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(217,165,61,0.26)]">
                {t.explore}
              </a>
              <a href={`https://explorer.solana.com/address/${MINT}`} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-white/12 bg-white/[0.035] px-4 py-2.5 text-sm font-bold text-white/80 transition hover:-translate-y-0.5 hover:border-[#e9b949]/40 hover:text-white">
                {t.verify} ↗
              </a>
            </div>

            <div className="mt-7 grid max-w-xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-4">
              <HeroMetric label="Supply" value="1B" />
              <HeroMetric label="Tax" value="0%" />
              <HeroMetric label="Decimals" value="6" />
              <HeroMetric label="Network" value="Solana" />
            </div>
          </div>

          <div className="relative flex min-h-[320px] items-center justify-center sm:min-h-[360px]">
            <div className="absolute h-72 w-72 rounded-full bg-[#e9b949]/10 blur-[70px] sm:h-80 sm:w-80" />
            <div className="absolute h-64 w-64 rounded-full border border-[#e9b949]/10 sm:h-72 sm:w-72" />
            <div className="absolute h-72 w-72 rounded-full border border-white/[0.04] sm:h-80 sm:w-80" />
            <div className="relative rotate-[-2deg] transition duration-500 hover:rotate-0 hover:scale-[1.025]">
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-[#f6d77d]/20 via-transparent to-[#a76d18]/20 blur-lg" />
              <div className="relative flex h-64 w-64 items-center justify-center rounded-full border-[7px] border-[#b87d21] bg-gradient-to-br from-[#ffe59a] via-[#d9a53d] to-[#6f4210] p-2 shadow-[0_34px_90px_rgba(0,0,0,0.48),0_18px_55px_rgba(217,165,61,0.18)] sm:h-72 sm:w-72">
                <div className="h-full w-full overflow-hidden rounded-full border-4 border-black/25 bg-[#111318] shadow-inner shadow-black/30">
                  <img src={TOKEN_IMAGE} alt="Official MALTY coin" className="h-full w-full object-cover" />
                </div>
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-[#0d1015]/95 px-4 py-1.5 shadow-2xl backdrop-blur">
                <p className="whitespace-nowrap text-[9px] font-black tracking-[0.22em] text-[#e9b949]">OFFICIAL MALTY TOKEN</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="token" className="border-b border-white/[0.07] bg-[#0c0f13]">
        <div className="mx-auto max-w-6xl px-5 py-11 sm:px-8">
          <div className="grid gap-7 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <Eyebrow>OFFICIAL TOKEN</Eyebrow>
              <h2 className="mt-2 max-w-lg text-3xl font-black tracking-[-0.04em]">{t.tokenTitle}</h2>
              <p className="mt-3 max-w-lg text-sm leading-6 text-white/50">{t.tokenText}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              <Stat label="Supply" value="1B MALTY" />
              <Stat label="Transfer tax" value="0%" />
              <Stat label="Decimals" value="6" />
              <Stat label="Mint Authority" value="Revoked" accent />
              <Stat label="Freeze Authority" value="None" accent />
              <Stat label="Network" value="Solana" />
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-[#e9b949]/18 bg-gradient-to-r from-[#e9b949]/[0.055] to-transparent p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#e9b949]">Official Mint</p>
              <p className="mt-1 break-all font-mono text-xs text-white/62">{MINT}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button onClick={copyMint} className="rounded-lg border border-white/12 bg-white/[0.025] px-3 py-2 text-xs font-bold text-white/70 transition hover:border-[#e9b949]/45 hover:text-white">
                {copied ? t.copied : t.copy}
              </button>
              <a href={`https://explorer.solana.com/address/${MINT}`} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-[#e9b949] px-3 py-2 text-xs font-black text-black transition hover:bg-[#f2c65f]">Explorer ↗</a>
            </div>
          </div>
        </div>
      </section>

      <section id="tokenomics" className="border-b border-black/10 bg-[#f2ecdf] text-[#17130d]">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-11 sm:px-8 lg:grid-cols-[1.03fr_0.97fr] lg:items-stretch">
          <div>
            <Eyebrow dark>TOKENOMICS</Eyebrow>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">{t.tokenomicsTitle}</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-black/55">{t.tokenomicsText}</p>

            <div className="mt-5 overflow-hidden rounded-2xl border border-black/[0.08] bg-white/55 shadow-sm">
              <div className="flex h-2 w-full">
                <span className="w-1/2 bg-[#a96f1d]" />
                <span className="w-1/5 bg-[#c68e33]" />
                <span className="w-[15%] bg-[#e0b457]" />
                <span className="w-[7.5%] bg-[#7e5a29]" />
                <span className="w-[7.5%] bg-[#4d3c24]" />
              </div>
              {allocations.map(([name, share, amount], i) => (
                <div key={name} className={`flex items-center justify-between px-4 py-2.5 text-sm ${i ? "border-t border-black/[0.07]" : ""}`}>
                  <span className="font-semibold text-black/70">{name}</span>
                  <span className="font-black text-[#8f5c13]">{share} <span className="ml-2 font-medium text-black/35">{amount}</span></span>
                </div>
              ))}
            </div>
          </div>

          <div id="transparency" className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0f1217] p-6 text-[#f8f3e7] shadow-[0_24px_60px_rgba(0,0,0,0.16)]">
            <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#e9b949]/8 blur-3xl" />
            <div className="relative">
              <Eyebrow>TRANSPARENCY</Eyebrow>
              <h2 className="mt-2 text-2xl font-black tracking-[-0.03em]">{t.transparencyTitle}</h2>
              <p className="mt-3 text-sm leading-6 text-white/50">{t.transparencyText}</p>

              <div className="mt-5 grid grid-cols-2 gap-2">
                <Status title="Mainnet deployed" />
                <Status title="Metadata configured" />
                <Status title="Mint authority revoked" />
                <Status title="Freeze authority none" />
              </div>

              <details className="group mt-4 rounded-xl border border-white/[0.09] bg-white/[0.025] p-4">
                <summary className="cursor-pointer list-none text-sm font-bold text-[#e9b949] marker:hidden">
                  <span className="flex items-center justify-between gap-3">{t.reserves}<span className="text-white/35 transition group-open:rotate-45">＋</span></span>
                </summary>
                <div className="mt-3 space-y-3">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-white/30">{t.planned}</p>
                  {reserveWallets.map(([name, wallet]) => (
                    <div key={name} className="border-t border-white/[0.08] pt-3 first:border-0 first:pt-0">
                      <div className="flex items-center justify-between gap-3 text-xs"><span className="font-bold">{name}</span><span className="text-white/35">{t.current}</span></div>
                      <p className="mt-1 break-all font-mono text-[10px] text-white/30">{wallet}</p>
                    </div>
                  ))}
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.07] bg-[#080a0d]">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-2">
          <div>
            <Eyebrow>ROADMAP</Eyebrow>
            <h2 className="mt-2 text-2xl font-black tracking-[-0.03em]">{t.roadmap}</h2>
            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              <Milestone state="DONE" title={language === "pt" ? "Token Mainnet" : "Mainnet token"} />
              <Milestone state="DONE" title={language === "pt" ? "Transparência" : "Transparency"} />
              <Milestone state="NEXT" title={language === "pt" ? "Comunidade pública" : "Public community"} />
            </div>
          </div>

          <div id="faq">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-2 text-2xl font-black tracking-[-0.03em]">{t.faq}</h2>
            <div className="mt-4 space-y-2">
              <Faq q={language === "pt" ? "Qual é o contrato oficial?" : "What is the official contract?"} a={MINT} />
              <Faq q={language === "pt" ? "Podem criar mais MALTY?" : "Can more MALTY be minted?"} a={language === "pt" ? "Não através da autoridade original: a Mint Authority foi revogada." : "Not through the original authority: the Mint Authority has been revoked."} />
              <Faq q={language === "pt" ? "Existe taxa de transferência?" : "Is there a transfer tax?"} a="0%" />
              <Faq q={language === "pt" ? "As reservas já foram distribuídas?" : "Have the reserves been distributed?"} a={language === "pt" ? "Não. As alocações planeadas são separadas do estado on-chain observado." : "No. Planned allocations are kept separate from observed on-chain state."} />
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#080a0d] px-5 py-7 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-3">
            <img src={TOKEN_IMAGE} alt="MALTY" className="h-8 w-8 rounded-full border border-[#e9b949]/25 object-cover" />
            <div><p className="font-black text-[#e9b949]">MALTY</p><p className="text-[10px] text-white/30">Small Dog. Big Community.</p></div>
          </div>
          <p className="max-w-2xl text-center text-[10px] leading-5 text-white/27 sm:text-right">{t.risk}</p>
        </div>
      </footer>
    </main>
  );
}

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return <p className={`text-[10px] font-black tracking-[0.22em] ${dark ? "text-[#986515]" : "text-[#e9b949]"}`}>{children}</p>;
}

function HeroMetric({ label, value }: { label: string; value: string }) {
  return <div className="bg-[#0d1014]/92 px-3 py-3"><p className="text-[9px] uppercase tracking-[0.14em] text-white/28">{label}</p><p className="mt-1 text-sm font-black text-white/90">{value}</p></div>;
}

function Stat({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return <div className="rounded-xl border border-white/[0.08] bg-white/[0.022] p-3 transition hover:border-white/[0.13] hover:bg-white/[0.035]"><p className="text-[10px] text-white/30">{label}</p><p className={`mt-1 text-sm font-black ${accent ? "text-[#e9b949]" : "text-white/90"}`}>{value}</p></div>;
}

function Status({ title }: { title: string }) {
  return <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.022] p-3 text-xs font-semibold text-white/75"><span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400/10 text-[10px] text-emerald-400">✓</span>{title}</div>;
}

function Milestone({ state, title }: { state: "DONE" | "NEXT"; title: string }) {
  return <div className="rounded-xl border border-white/[0.08] bg-white/[0.022] p-4"><p className={`text-[9px] font-black tracking-[0.16em] ${state === "DONE" ? "text-emerald-400" : "text-[#e9b949]"}`}>{state}</p><p className="mt-2 text-sm font-bold text-white/80">{title}</p></div>;
}

function Faq({ q, a }: { q: string; a: string }) {
  return <details className="group rounded-xl border border-white/[0.08] bg-white/[0.022] px-4 py-3"><summary className="cursor-pointer list-none text-sm font-bold text-white/80"><span className="flex items-center justify-between gap-3">{q}<span className="text-white/30 transition group-open:rotate-45">＋</span></span></summary><p className="mt-2 break-all text-xs leading-5 text-white/45">{a}</p></details>;
}
