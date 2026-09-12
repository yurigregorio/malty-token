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

type Language = "en" | "pt";

const copy = {
  en: {
    nav: ["Story", "Token", "Gives", "Roadmap", "FAQ"],
    badge: "SOLANA MAINNET · OFFICIAL MALTY",
    headline: "Small Dog. Big Community.",
    intro: "Inspired by Charlotte. Built transparently on Solana. MALTY brings community, a recognizable identity and a long-term vision for positive animal impact together.",
    explore: "Discover MALTY",
    verify: "Verify token",
    storyEyebrow: "WHY MALTY",
    storyTitle: "More than a token identity.",
    storyText: "Charlotte is the story behind MALTY. The project is being built around four simple pillars: a transparent token, a memorable brand, an open community and a future initiative to support animal welfare.",
    tokenTitle: "Clear facts. Publicly verifiable.",
    tokenText: "The essentials of the official MALTY token, without hiding them behind marketing.",
    givesTitle: "Small Dog. Bigger Impact.",
    givesText: "MALTY Gives is a planned initiative to turn the story behind Charlotte into positive impact for animals. Before any contribution program starts, the project intends to publish its policy, selection criteria and how contributions will be evidenced.",
    givesStatus: "PLANNED INITIATIVE",
    givesNote: "No charity contribution program is active yet. No amount or percentage is being promised at this stage.",
    roadmapTitle: "Build first. Prove what we build.",
    faqTitle: "Quick answers",
    transparency: "Transparency center",
    copy: "Copy mint",
    copied: "Copied",
    risk: "MALTY is a memecoin. Project information is provided for transparency and does not promise price, returns, liquidity or future value. MALTY Gives is a planned social-impact initiative and is not currently an active donation program.",
  },
  pt: {
    nav: ["História", "Token", "Gives", "Roadmap", "FAQ"],
    badge: "SOLANA MAINNET · MALTY OFICIAL",
    headline: "Cão pequeno. Grande comunidade.",
    intro: "Inspirado na Charlotte. Construído com transparência na Solana. MALTY une comunidade, uma identidade própria e uma visão de longo prazo para gerar impacto positivo para animais.",
    explore: "Conhecer MALTY",
    verify: "Verificar token",
    storyEyebrow: "POR QUE MALTY",
    storyTitle: "Mais do que a identidade de um token.",
    storyText: "Charlotte é a história por trás do MALTY. O projeto está sendo construído sobre quatro pilares simples: token transparente, marca reconhecível, comunidade aberta e uma futura iniciativa de apoio ao bem-estar animal.",
    tokenTitle: "Dados claros. Verificáveis publicamente.",
    tokenText: "O essencial sobre o token oficial MALTY, sem esconder os dados atrás do marketing.",
    givesTitle: "Cão pequeno. Impacto maior.",
    givesText: "MALTY Gives é uma iniciativa planejada para transformar a história da Charlotte em impacto positivo para animais. Antes de qualquer programa de contribuição começar, o projeto pretende publicar sua política, critérios de seleção e como cada contribuição será comprovada.",
    givesStatus: "INICIATIVA PLANEJADA",
    givesNote: "Ainda não existe um programa de contribuição para caridade ativo. Nenhum valor ou percentual está sendo prometido nesta fase.",
    roadmapTitle: "Construir primeiro. Comprovar o que construímos.",
    faqTitle: "Respostas rápidas",
    transparency: "Central de transparência",
    copy: "Copiar mint",
    copied: "Copiado",
    risk: "MALTY é uma memecoin. As informações do projeto são publicadas por transparência e não prometem preço, retorno, liquidez ou valor futuro. MALTY Gives é uma iniciativa de impacto social planejada e ainda não é um programa ativo de doações.",
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
      <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#080a0d]/85 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <a href="#top" className="flex items-center gap-3" aria-label="MALTY home">
            <img src={TOKEN_IMAGE} alt="MALTY" className="h-9 w-9 rounded-full border border-[#d9a53d]/45 object-cover" />
            <div className="leading-none"><p className="text-base font-black tracking-[-0.03em] text-[#e9b949]">MALTY</p><p className="mt-1 text-[9px] uppercase tracking-[0.22em] text-white/35">Solana</p></div>
          </a>
          <nav className="hidden items-center gap-5 text-xs font-semibold text-white/50 md:flex">
            {t.nav.map((item, i) => <a key={item} href={`#${["story","token","gives","roadmap","faq"][i]}`} className="transition hover:text-[#e9b949]">{item}</a>)}
          </nav>
          <div className="flex items-center rounded-full border border-white/10 bg-white/[0.035] p-1 text-[11px] font-bold">
            {(["en","pt"] as const).map((lang) => <button key={lang} onClick={() => setLanguage(lang)} aria-pressed={language === lang} className={`rounded-full px-3 py-1.5 transition ${language === lang ? "bg-[#e9b949] text-black" : "text-white/45 hover:text-white"}`}>{lang.toUpperCase()}</button>)}
          </div>
        </div>
      </header>

      <section id="top" className="relative border-b border-white/[0.07]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_76%_42%,rgba(217,165,61,0.17),transparent_28%),radial-gradient(circle_at_18%_12%,rgba(95,71,190,0.08),transparent_24%)]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:py-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e9b949]/20 bg-[#e9b949]/[0.045] px-3 py-1.5 text-[10px] font-black tracking-[0.15em] text-[#e9b949]"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />{t.badge}</div>
            <h1 className="mt-6 text-5xl font-black leading-[0.92] tracking-[-0.06em] sm:text-6xl lg:text-7xl">MALTY<span className="text-[#e9b949]">.</span></h1>
            <p className="mt-4 text-xl font-bold tracking-[-0.02em] sm:text-2xl">{t.headline}</p>
            <p className="mt-4 max-w-xl text-sm leading-6 text-white/55 sm:text-base">{t.intro}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#story" className="rounded-xl bg-gradient-to-b from-[#f0c45e] to-[#d8a13a] px-4 py-2.5 text-sm font-black text-[#161006] shadow-[0_10px_30px_rgba(217,165,61,0.18)] transition hover:-translate-y-0.5">{t.explore}</a>
              <a href={`https://explorer.solana.com/address/${MINT}`} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-white/12 bg-white/[0.035] px-4 py-2.5 text-sm font-bold text-white/80 transition hover:border-[#e9b949]/40">{t.verify} ↗</a>
            </div>
            <div className="mt-7 grid max-w-xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] sm:grid-cols-4"><Metric label="Supply" value="1B"/><Metric label="Tax" value="0%"/><Metric label="Decimals" value="6"/><Metric label="Network" value="Solana"/></div>
          </div>
          <div className="relative flex min-h-[310px] items-center justify-center">
            <div className="absolute h-72 w-72 rounded-full bg-[#e9b949]/10 blur-[70px]" />
            <div className="relative flex h-64 w-64 items-center justify-center rounded-full border-[7px] border-[#b87d21] bg-gradient-to-br from-[#ffe59a] via-[#d9a53d] to-[#6f4210] p-2 shadow-[0_34px_90px_rgba(0,0,0,0.48),0_18px_55px_rgba(217,165,61,0.18)] sm:h-72 sm:w-72"><img src={TOKEN_IMAGE} alt="Official MALTY coin" className="h-full w-full rounded-full border-4 border-black/25 object-cover" /></div>
          </div>
        </div>
      </section>

      <section id="story" className="border-b border-black/10 bg-[#f2ecdf] text-[#17130d]">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div><p className="text-[10px] font-black tracking-[0.22em] text-[#9a6517]">{t.storyEyebrow}</p><h2 className="mt-2 text-3xl font-black tracking-[-0.04em] sm:text-4xl">{t.storyTitle}</h2><p className="mt-4 max-w-xl text-sm leading-6 text-black/55">{t.storyText}</p></div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4"><Pillar icon="◈" title="Token" text={language === "pt" ? "Transparência" : "Transparency"}/><Pillar icon="C" title="Charlotte" text={language === "pt" ? "Nossa história" : "Our story"}/><Pillar icon="◎" title="Community" text={language === "pt" ? "Construída aberta" : "Built openly"}/><Pillar icon="♥" title="MALTY Gives" text={language === "pt" ? "Impacto animal" : "Animal impact"}/></div>
          </div>
        </div>
      </section>

      <section id="token" className="border-b border-white/[0.07] bg-[#0c0f13]">
        <div className="mx-auto max-w-6xl px-5 py-11 sm:px-8">
          <div className="grid gap-7 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div><Eyebrow>OFFICIAL TOKEN</Eyebrow><h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">{t.tokenTitle}</h2><p className="mt-3 max-w-lg text-sm leading-6 text-white/50">{t.tokenText}</p></div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3"><Stat label="Supply" value="1B MALTY"/><Stat label="Transfer tax" value="0%"/><Stat label="Decimals" value="6"/><Stat label="Mint Authority" value="Revoked" accent/><Stat label="Freeze Authority" value="None" accent/><Stat label="Network" value="Solana"/></div>
          </div>
          <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-[#e9b949]/20 bg-[#e9b949]/[0.04] p-4 sm:flex-row sm:items-center sm:justify-between"><div className="min-w-0"><p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#e9b949]">Official Mint</p><p className="mt-1 break-all font-mono text-xs text-white/62">{MINT}</p></div><div className="flex shrink-0 gap-2"><button onClick={copyMint} className="rounded-lg border border-white/12 px-3 py-2 text-xs font-bold">{copied ? t.copied : t.copy}</button><a href={`https://explorer.solana.com/address/${MINT}`} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-[#e9b949] px-3 py-2 text-xs font-black text-black">Explorer ↗</a></div></div>
        </div>
      </section>

      <section id="gives" className="border-b border-black/10 bg-[#f2ecdf] text-[#17130d]">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div><div className="inline-flex rounded-full bg-[#9a6517]/10 px-3 py-1 text-[10px] font-black tracking-[0.18em] text-[#9a6517]">🐾 MALTY GIVES · {t.givesStatus}</div><h2 className="mt-4 text-3xl font-black tracking-[-0.04em] sm:text-4xl">{t.givesTitle}</h2><p className="mt-4 max-w-2xl text-sm leading-6 text-black/60">{t.givesText}</p><p className="mt-4 max-w-2xl rounded-xl border border-[#9a6517]/15 bg-white/50 p-3 text-xs leading-5 text-black/50">{t.givesNote}</p></div>
          <div className="grid grid-cols-3 gap-2"><Impact number="01" title={language === "pt" ? "Construir" : "Build"} text={language === "pt" ? "Estrutura e política" : "Structure & policy"}/><Impact number="02" title={language === "pt" ? "Apoiar" : "Support"} text={language === "pt" ? "Projetos animais" : "Animal projects"}/><Impact number="03" title={language === "pt" ? "Comprovar" : "Prove"} text={language === "pt" ? "Publicar evidências" : "Publish evidence"}/></div>
        </div>
      </section>

      <section id="roadmap" className="border-b border-white/[0.07] bg-[#090b0f]">
        <div className="mx-auto max-w-6xl px-5 py-11 sm:px-8"><Eyebrow>ROADMAP</Eyebrow><h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">{t.roadmapTitle}</h2><div className="mt-6 grid gap-2 md:grid-cols-4"><Road state="DONE" title="Foundation" text={language === "pt" ? "Mainnet, metadata e segurança" : "Mainnet, metadata & security"}/><Road state="NEXT" title="Community" text={language === "pt" ? "Canais e conteúdo oficiais" : "Official channels & content"}/><Road state="PLANNED" title="MALTY Gives" text={language === "pt" ? "Política e primeira iniciativa" : "Policy & first initiative"}/><Road state="FUTURE" title="Ecosystem" text={language === "pt" ? "Parcerias e experiências" : "Partnerships & experiences"}/></div></div>
      </section>

      <section id="faq" className="bg-[#0c0f13]">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-11 sm:px-8 lg:grid-cols-[0.7fr_1.3fr]">
          <div><Eyebrow>FAQ</Eyebrow><h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">{t.faqTitle}</h2><a href="/transparency" className="mt-5 inline-flex text-sm font-bold text-[#e9b949] hover:underline">{t.transparency} →</a></div>
          <div className="space-y-2"><Faq q={language === "pt" ? "O que é MALTY?" : "What is MALTY?"} a={language === "pt" ? "Uma memecoin comunitária na Solana inspirada na Charlotte, construída com foco em transparência, identidade e comunidade." : "A Solana community memecoin inspired by Charlotte, built around transparency, identity and community."}/><Faq q={language === "pt" ? "Podem criar mais MALTY?" : "Can more MALTY be minted?"} a={language === "pt" ? "A Mint Authority foi revogada." : "The Mint Authority has been revoked."}/><Faq q="MALTY Gives" a={language === "pt" ? "É uma iniciativa planejada de apoio ao bem-estar animal. Ainda não existe programa ativo nem percentual de contribuição definido." : "It is a planned animal-welfare initiative. There is no active program or defined contribution percentage yet."}/></div>
        </div>
      </section>

      <footer className="border-t border-white/[0.07] bg-[#080a0d] px-5 py-7 sm:px-8"><div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-3"><img src={TOKEN_IMAGE} alt="MALTY" className="h-8 w-8 rounded-full object-cover"/><div><p className="font-black text-[#e9b949]">MALTY</p><p className="text-[10px] text-white/30">Small Dog. Big Community.</p></div></div><p className="max-w-2xl text-[10px] leading-5 text-white/28">{t.risk}</p></div></footer>
    </main>
  );
}

function Eyebrow({children}:{children:React.ReactNode}){return <p className="text-[10px] font-black tracking-[0.22em] text-[#e9b949]">{children}</p>}
function Metric({label,value}:{label:string;value:string}){return <div className="bg-[#0d1014] px-3 py-3"><p className="text-[9px] uppercase tracking-[0.14em] text-white/30">{label}</p><p className="mt-1 text-sm font-black">{value}</p></div>}
function Stat({label,value,accent=false}:{label:string;value:string;accent?:boolean}){return <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-3"><p className="text-[10px] text-white/32">{label}</p><p className={`mt-1 text-sm font-black ${accent?"text-[#e9b949]":"text-white"}`}>{value}</p></div>}
function Pillar({icon,title,text}:{icon:string;title:string;text:string}){return <div className="rounded-2xl border border-black/10 bg-white/55 p-4"><span className="text-lg font-black text-[#9a6517]">{icon}</span><p className="mt-4 text-sm font-black">{title}</p><p className="mt-1 text-[11px] text-black/45">{text}</p></div>}
function Impact({number,title,text}:{number:string;title:string;text:string}){return <div className="rounded-2xl bg-[#101319] p-4 text-white"><p className="text-[10px] font-black text-[#e9b949]">{number}</p><p className="mt-5 text-sm font-black">{title}</p><p className="mt-1 text-[10px] leading-4 text-white/40">{text}</p></div>}
function Road({state,title,text}:{state:string;title:string;text:string}){return <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4"><p className={`text-[9px] font-black tracking-[0.16em] ${state==="DONE"?"text-emerald-400":"text-[#e9b949]"}`}>{state}</p><p className="mt-3 text-sm font-black">{title}</p><p className="mt-1 text-[11px] leading-4 text-white/38">{text}</p></div>}
function Faq({q,a}:{q:string;a:string}){return <details className="rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-3"><summary className="cursor-pointer text-sm font-bold">{q}</summary><p className="mt-2 text-xs leading-5 text-white/48">{a}</p></details>}
