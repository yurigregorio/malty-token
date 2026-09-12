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
    headline: "Small Dog. Big Community.",
    intro:
      "A transparent community token inspired by Charlotte and built on Solana with a fixed issued supply and public project architecture.",
    explore: "Explore token",
    verify: "Verify on Solana",
    tokenTitle: "One token. Clear facts.",
    tokenText:
      "The essentials are visible upfront: official mint, supply, authorities and transfer tax.",
    tokenomicsTitle: "Simple tokenomics",
    tokenomicsText:
      "Canonical allocation of the 1B MALTY issued supply. Allocation is a project plan, not proof of circulation or distribution.",
    transparencyTitle: "Transparency by default",
    transparencyText:
      "MALTY publishes reserve addresses and clearly separates planned allocations from observed on-chain state.",
    reserves: "Reserve wallets",
    roadmap: "Current build status",
    faq: "Quick answers",
    current: "Documented balance: 0 MALTY",
    copy: "Copy mint",
    copied: "Copied",
    risk:
      "MALTY is a memecoin. Project information is provided for transparency and does not promise price, returns, liquidity or future value.",
  },
  pt: {
    nav: ["Token", "Tokenomics", "Transparência", "FAQ"],
    badge: "SOLANA MAINNET · MALTY OFICIAL",
    headline: "Cão pequeno. Grande comunidade.",
    intro:
      "Um token comunitário transparente inspirado na Charlotte e construído na Solana, com supply emitido definido e arquitetura pública do projeto.",
    explore: "Conhecer o token",
    verify: "Verificar na Solana",
    tokenTitle: "Um token. Dados claros.",
    tokenText:
      "O essencial aparece logo de início: mint oficial, supply, autoridades e taxa de transferência.",
    tokenomicsTitle: "Tokenomics simples",
    tokenomicsText:
      "Alocação canónica do supply emitido de 1B MALTY. Alocação é um plano do projeto, não prova de circulação ou distribuição.",
    transparencyTitle: "Transparência por padrão",
    transparencyText:
      "O MALTY publica os endereços de reserva e separa claramente alocações planeadas do estado observado on-chain.",
    reserves: "Wallets de reserva",
    roadmap: "Estado atual do projeto",
    faq: "Respostas rápidas",
    current: "Saldo documentado: 0 MALTY",
    copy: "Copiar mint",
    copied: "Copiado",
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
    <main className="min-h-screen bg-[#090b0f] text-[#f8f3e7] selection:bg-[#e9b949] selection:text-black">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#090b0f]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <a href="#top" className="flex items-center gap-3">
            <img src={TOKEN_IMAGE} alt="MALTY" className="h-9 w-9 rounded-full border border-[#e9b949]/50 object-cover" />
            <div className="leading-none">
              <p className="text-base font-black tracking-tight text-[#f4c35b]">MALTY</p>
              <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-white/40">Solana</p>
            </div>
          </a>

          <nav className="hidden items-center gap-5 text-xs font-semibold text-white/55 md:flex">
            {t.nav.map((item, i) => (
              <a key={item} href={`#${["token", "tokenomics", "transparency", "faq"][i]}`} className="transition hover:text-[#f4c35b]">
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center rounded-full border border-white/10 bg-white/[0.03] p-1 text-[11px] font-bold">
            {(["en", "pt"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`rounded-full px-3 py-1.5 transition ${language === lang ? "bg-[#e9b949] text-black" : "text-white/50 hover:text-white"}`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </header>

      <section id="top" className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_35%,rgba(233,185,73,0.15),transparent_28%),radial-gradient(circle_at_18%_15%,rgba(93,63,211,0.08),transparent_25%)]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:py-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e9b949]/25 bg-[#e9b949]/5 px-3 py-1.5 text-[10px] font-bold tracking-[0.16em] text-[#f4c35b]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> {t.badge}
            </div>
            <h1 className="mt-5 text-5xl font-black leading-none tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              MALTY<span className="text-[#e9b949]">.</span>
            </h1>
            <p className="mt-3 text-xl font-bold tracking-tight sm:text-2xl">{t.headline}</p>
            <p className="mt-4 max-w-xl text-sm leading-6 text-white/60 sm:text-base">{t.intro}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#token" className="rounded-xl bg-[#e9b949] px-4 py-2.5 text-sm font-bold text-black transition hover:bg-[#f4c35b]">{t.explore}</a>
              <a href={`https://explorer.solana.com/address/${MINT}`} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2.5 text-sm font-bold transition hover:border-[#e9b949]/50">{t.verify} ↗</a>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-bold uppercase tracking-[0.12em] text-white/35">
              <span>1B MALTY</span><span>0% Tax</span><span>6 Decimals</span><span>Solana Mainnet</span>
            </div>
          </div>

          <div className="relative flex items-center justify-center py-4">
            <div className="absolute h-72 w-72 rounded-full bg-[#e9b949]/10 blur-3xl" />
            <div className="relative flex h-64 w-64 items-center justify-center rounded-full border-[8px] border-[#b77d21] bg-gradient-to-br from-[#f9db84] via-[#dca83b] to-[#754814] p-2 shadow-[0_25px_80px_rgba(233,185,73,0.22)] sm:h-72 sm:w-72">
              <img src={TOKEN_IMAGE} alt="Official MALTY coin" className="h-full w-full rounded-full border-4 border-black/30 object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section id="token" className="border-b border-white/10 bg-[#0d1015]">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <Eyebrow>OFFICIAL TOKEN</Eyebrow>
              <h2 className="mt-2 text-3xl font-black tracking-tight">{t.tokenTitle}</h2>
              <p className="mt-3 max-w-lg text-sm leading-6 text-white/55">{t.tokenText}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              <Stat label="Supply" value="1B MALTY" />
              <Stat label="Tax" value="0%" />
              <Stat label="Decimals" value="6" />
              <Stat label="Mint Authority" value="Revoked" accent />
              <Stat label="Freeze Authority" value="None" accent />
              <Stat label="Network" value="Solana" />
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-[#e9b949]/20 bg-[#e9b949]/[0.04] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#f4c35b]">Official mint</p>
              <p className="mt-1 break-all font-mono text-xs text-white/65">{MINT}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button onClick={copyMint} className="rounded-lg border border-white/15 px-3 py-2 text-xs font-bold hover:border-[#e9b949]/50">{copied ? t.copied : t.copy}</button>
              <a href={`https://explorer.solana.com/address/${MINT}`} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-[#e9b949] px-3 py-2 text-xs font-bold text-black">Explorer ↗</a>
            </div>
          </div>
        </div>
      </section>

      <section id="tokenomics" className="border-b border-black/10 bg-[#f4efe4] text-[#17130d]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow dark>TOKENOMICS</Eyebrow>
            <h2 className="mt-2 text-3xl font-black tracking-tight">{t.tokenomicsTitle}</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-black/55">{t.tokenomicsText}</p>
            <div className="mt-5 overflow-hidden rounded-2xl border border-black/10 bg-white/60">
              {allocations.map(([name, share, amount], i) => (
                <div key={name} className={`flex items-center justify-between px-4 py-3 text-sm ${i ? "border-t border-black/10" : ""}`}>
                  <span className="font-semibold">{name}</span>
                  <span className="font-black text-[#9a6517]">{share} <span className="ml-2 font-medium text-black/40">{amount}</span></span>
                </div>
              ))}
            </div>
          </div>

          <div id="transparency" className="rounded-3xl bg-[#101319] p-6 text-[#f8f3e7] shadow-2xl shadow-black/10">
            <Eyebrow>TRANSPARENCY</Eyebrow>
            <h2 className="mt-2 text-2xl font-black">{t.transparencyTitle}</h2>
            <p className="mt-3 text-sm leading-6 text-white/55">{t.transparencyText}</p>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <Status title="Mainnet deployed" />
              <Status title="Metadata configured" />
              <Status title="Mint authority revoked" />
              <Status title="Freeze authority none" />
            </div>
            <details className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <summary className="cursor-pointer text-sm font-bold text-[#f4c35b]">{t.reserves}</summary>
              <div className="mt-3 space-y-3">
                {reserveWallets.map(([name, wallet]) => (
                  <div key={name} className="border-t border-white/10 pt-3 first:border-0 first:pt-0">
                    <div className="flex items-center justify-between gap-3 text-xs"><span className="font-bold">{name}</span><span className="text-white/40">{t.current}</span></div>
                    <p className="mt-1 break-all font-mono text-[10px] text-white/35">{wallet}</p>
                  </div>
                ))}
              </div>
            </details>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#090b0f]">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-2">
          <div>
            <Eyebrow>ROADMAP</Eyebrow>
            <h2 className="mt-2 text-2xl font-black">{t.roadmap}</h2>
            <div className="mt-5 grid gap-2 sm:grid-cols-3">
              <Milestone state="DONE" title={language === "pt" ? "Token Mainnet" : "Mainnet token"} />
              <Milestone state="DONE" title={language === "pt" ? "Transparência" : "Transparency"} />
              <Milestone state="NEXT" title={language === "pt" ? "Comunidade pública" : "Public community"} />
            </div>
          </div>

          <div id="faq">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-2 text-2xl font-black">{t.faq}</h2>
            <div className="mt-5 space-y-2">
              <Faq q={language === "pt" ? "Qual é o contrato oficial?" : "What is the official contract?"} a={MINT} />
              <Faq q={language === "pt" ? "Podem criar mais MALTY?" : "Can more MALTY be minted?"} a={language === "pt" ? "A Mint Authority foi revogada." : "The Mint Authority has been revoked."} />
              <Faq q={language === "pt" ? "Existe taxa de transferência?" : "Is there a transfer tax?"} a="0%" />
              <Faq q={language === "pt" ? "As reservas já foram distribuídas?" : "Have the reserves been distributed?"} a={language === "pt" ? "Não. As alocações planeadas são separadas do estado on-chain observado." : "No. Planned allocations are kept separate from observed on-chain state."} />
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#090b0f] px-5 py-7 text-center sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row sm:text-left">
          <div className="flex items-center gap-3">
            <img src={TOKEN_IMAGE} alt="MALTY" className="h-8 w-8 rounded-full object-cover" />
            <div><p className="font-black text-[#f4c35b]">MALTY</p><p className="text-[10px] text-white/35">Small Dog. Big Community.</p></div>
          </div>
          <p className="max-w-2xl text-[10px] leading-5 text-white/30">{t.risk}</p>
        </div>
      </footer>
    </main>
  );
}

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return <p className={`text-[10px] font-black tracking-[0.22em] ${dark ? "text-[#9a6517]" : "text-[#f4c35b]"}`}>{children}</p>;
}

function Stat({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return <div className="rounded-xl border border-white/10 bg-white/[0.025] p-3"><p className="text-[10px] text-white/35">{label}</p><p className={`mt-1 text-sm font-black ${accent ? "text-[#f4c35b]" : "text-white"}`}>{value}</p></div>;
}

function Status({ title }: { title: string }) {
  return <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] p-3 text-xs font-semibold"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-400">✓</span>{title}</div>;
}

function Milestone({ state, title }: { state: "DONE" | "NEXT"; title: string }) {
  return <div className="rounded-xl border border-white/10 bg-white/[0.025] p-4"><p className={`text-[9px] font-black tracking-[0.16em] ${state === "DONE" ? "text-emerald-400" : "text-[#f4c35b]"}`}>{state}</p><p className="mt-2 text-sm font-bold">{title}</p></div>;
}

function Faq({ q, a }: { q: string; a: string }) {
  return <details className="rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3"><summary className="cursor-pointer text-sm font-bold">{q}</summary><p className="mt-2 break-all text-xs leading-5 text-white/50">{a}</p></details>;
}
