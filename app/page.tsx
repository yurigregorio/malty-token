"use client";

import { useState } from "react";

const MINT = "6ZhVVH2KwbiVg6HJjrPg2YC5SWomBFA5qGmz57pknMpz";
const TOKEN_IMAGE = "https://arweave.net/w-TXbk_hQOw1mC5vA9YrVmClKzz_Avjfiq5coE1AYec";
type Language = "en" | "pt";

const copy = {
  en: {
    nav: ["Project", "Token", "Gives", "Roadmap", "FAQ"],
    badge: "COMMUNITY-POWERED · PET-FOCUSED",
    headline: "Small Dog. Big Community.",
    intro: "MALTY is a community-driven Solana project built around transparency, a recognizable identity and a long-term mission to turn community growth into visible, verifiable impact for animals.",
    explore: "Discover MALTY",
    impact: "Explore MALTY Gives",
    storyEyebrow: "THE MALTY MISSION",
    storyTitle: "Community with a purpose.",
    storyText: "MALTY connects four parts of one project: a transparent token, a strong brand, an open community and MALTY Gives — a planned initiative designed to support animal-welfare projects with public evidence of real-world impact.",
    tokenTitle: "Clear facts. Publicly verifiable.",
    tokenText: "The essentials of the official MALTY token, presented openly and without hiding the project structure behind marketing.",
    givesTitle: "Community-powered. Pet-focused.",
    givesText: "MALTY Gives is being designed as the impact layer of the project. The goal is to let the community help surface meaningful animal-welfare initiatives, support selected projects responsibly and publish clear evidence of what was achieved.",
    givesStatus: "PLANNED INITIATIVE",
    givesNote: "The program is not active yet. Funding rules, beneficiary criteria and reporting standards will be published before the first initiative begins.",
    roadmapTitle: "Build the community. Create impact. Prove it.",
    faqTitle: "Quick answers",
    transparency: "Transparency center",
    copy: "Copy mint",
    copied: "Copied",
    risk: "MALTY is a community-driven digital token on Solana. Project information is provided for transparency and does not promise price, returns, liquidity or future value. MALTY Gives is a planned social-impact initiative and is not currently an active donation program."
  },
  pt: {
    nav: ["Projeto", "Token", "Gives", "Roadmap", "FAQ"],
    badge: "MOVIDO PELA COMUNIDADE · FOCO EM PETS",
    headline: "Cão pequeno. Grande comunidade.",
    intro: "MALTY é um projeto comunitário na Solana construído sobre transparência, identidade própria e uma missão de longo prazo: transformar o crescimento da comunidade em impacto visível e verificável para animais.",
    explore: "Conhecer MALTY",
    impact: "Conhecer MALTY Gives",
    storyEyebrow: "A MISSÃO MALTY",
    storyTitle: "Comunidade com propósito.",
    storyText: "MALTY conecta quatro partes de um mesmo projeto: token transparente, marca forte, comunidade aberta e MALTY Gives — uma iniciativa planejada para apoiar projetos de bem-estar animal com evidências públicas do impacto gerado.",
    tokenTitle: "Dados claros. Verificáveis publicamente.",
    tokenText: "O essencial sobre o token oficial MALTY, apresentado de forma aberta e sem esconder a estrutura do projeto atrás do marketing.",
    givesTitle: "Movido pela comunidade. Focado em pets.",
    givesText: "MALTY Gives está sendo estruturado como a frente de impacto do projeto. A ideia é permitir que a comunidade ajude a identificar iniciativas relevantes para animais, apoiar projetos selecionados de forma responsável e publicar evidências claras do resultado alcançado.",
    givesStatus: "INICIATIVA PLANEJADA",
    givesNote: "O programa ainda não está ativo. As regras de financiamento, critérios de beneficiários e padrões de prestação de contas serão publicados antes da primeira iniciativa.",
    roadmapTitle: "Construir a comunidade. Gerar impacto. Comprovar.",
    faqTitle: "Respostas rápidas",
    transparency: "Central de transparência",
    copy: "Copiar mint",
    copied: "Copiado",
    risk: "MALTY é um token digital comunitário construído na Solana. As informações do projeto são publicadas por transparência e não prometem preço, retorno, liquidez ou valor futuro. MALTY Gives é uma iniciativa de impacto social planejada e ainda não é um programa ativo de doações."
  }
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

  return <main className="min-h-screen overflow-x-hidden bg-[#080a0d] text-[#f7f1e5] selection:bg-[#d9a53d] selection:text-black">
    <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#080a0d]/85 backdrop-blur-2xl"><div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8"><a href="#top" className="flex items-center gap-3"><img src={TOKEN_IMAGE} alt="MALTY" className="h-9 w-9 rounded-full border border-[#d9a53d]/45 object-cover"/><div className="leading-none"><p className="text-base font-black text-[#e9b949]">MALTY</p><p className="mt-1 text-[9px] uppercase tracking-[0.22em] text-white/35">Solana</p></div></a><nav className="hidden items-center gap-5 text-xs font-semibold text-white/50 md:flex">{t.nav.map((x,i)=><a key={x} href={`#${["story","token","gives","roadmap","faq"][i]}`} className="hover:text-[#e9b949]">{x}</a>)}</nav><div className="flex rounded-full border border-white/10 bg-white/[0.035] p-1 text-[11px] font-bold">{(["en","pt"] as const).map(l=><button key={l} onClick={()=>setLanguage(l)} className={`rounded-full px-3 py-1.5 ${language===l?"bg-[#e9b949] text-black":"text-white/45"}`}>{l.toUpperCase()}</button>)}</div></div></header>

    <section id="top" className="relative border-b border-white/[0.07]"><div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_76%_42%,rgba(217,165,61,0.17),transparent_28%)]"/><div className="relative mx-auto grid max-w-6xl items-center gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:py-16"><div><div className="inline-flex items-center gap-2 rounded-full border border-[#e9b949]/20 bg-[#e9b949]/[0.045] px-3 py-1.5 text-[10px] font-black tracking-[0.15em] text-[#e9b949]"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400"/>{t.badge}</div><h1 className="mt-6 text-5xl font-black leading-[.92] tracking-[-.06em] sm:text-6xl lg:text-7xl">MALTY<span className="text-[#e9b949]">.</span></h1><p className="mt-4 text-xl font-bold sm:text-2xl">{t.headline}</p><p className="mt-4 max-w-xl text-sm leading-6 text-white/55 sm:text-base">{t.intro}</p><div className="mt-6 flex flex-wrap gap-3"><a href="#story" className="rounded-xl bg-[#e9b949] px-4 py-2.5 text-sm font-black text-black">{t.explore}</a><a href="/gives" className="rounded-xl border border-[#e9b949]/30 bg-[#e9b949]/[0.04] px-4 py-2.5 text-sm font-bold text-[#e9b949]">🐾 {t.impact}</a></div><div className="mt-7 grid max-w-xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[.08] bg-white/[.08] sm:grid-cols-4"><Metric label="Supply" value="1B"/><Metric label="Tax" value="0%"/><Metric label="Decimals" value="6"/><Metric label="Network" value="Solana"/></div></div><div className="relative flex min-h-[310px] items-center justify-center"><div className="absolute h-72 w-72 rounded-full bg-[#e9b949]/10 blur-[70px]"/><div className="relative h-64 w-64 rounded-full border-[7px] border-[#b87d21] bg-gradient-to-br from-[#ffe59a] via-[#d9a53d] to-[#6f4210] p-2 shadow-2xl sm:h-72 sm:w-72"><img src={TOKEN_IMAGE} alt="Official MALTY coin" className="h-full w-full rounded-full border-4 border-black/25 object-cover"/></div></div></div></section>

    <section id="story" className="border-b border-black/10 bg-[#f2ecdf] text-[#17130d]"><div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><div><p className="text-[10px] font-black tracking-[.22em] text-[#9a6517]">{t.storyEyebrow}</p><h2 className="mt-2 text-3xl font-black sm:text-4xl">{t.storyTitle}</h2><p className="mt-4 text-sm leading-6 text-black/55">{t.storyText}</p><a href="/about" className="mt-5 inline-flex text-sm font-bold text-[#9a6517]">About MALTY →</a></div><div className="grid grid-cols-2 gap-2 sm:grid-cols-4"><Pillar title="MALTY Token" text={language==="pt"?"Transparência":"Transparency"}/><Pillar title="MALTY Community" text={language==="pt"?"Participação":"Participation"}/><Pillar title="MALTY Gives" text={language==="pt"?"Apoio a pets":"Pet support"}/><Pillar title="MALTY Impact" text={language==="pt"?"Prova pública":"Public proof"}/></div></div></section>

    <section id="token" className="border-b border-white/[.07] bg-[#0c0f13]"><div className="mx-auto max-w-6xl px-5 py-11 sm:px-8"><Eyebrow>OFFICIAL TOKEN</Eyebrow><h2 className="mt-2 text-3xl font-black">{t.tokenTitle}</h2><p className="mt-3 text-sm text-white/50">{t.tokenText}</p><div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3"><Stat label="Supply" value="1B MALTY"/><Stat label="Transfer tax" value="0%"/><Stat label="Decimals" value="6"/><Stat label="Mint Authority" value="Revoked"/><Stat label="Freeze Authority" value="None"/><Stat label="Network" value="Solana"/></div><div className="mt-4 rounded-xl border border-[#e9b949]/20 p-4"><p className="break-all font-mono text-xs text-white/60">{MINT}</p><button onClick={copyMint} className="mt-3 text-xs font-bold text-[#e9b949]">{copied?t.copied:t.copy}</button></div></div></section>

    <section id="gives" className="border-b border-black/10 bg-[#f2ecdf] text-[#17130d]"><div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:items-center"><div><div className="inline-flex rounded-full bg-[#9a6517]/10 px-3 py-1 text-[10px] font-black tracking-[.18em] text-[#9a6517]">🐾 MALTY GIVES · {t.givesStatus}</div><h2 className="mt-4 text-3xl font-black sm:text-4xl">{t.givesTitle}</h2><p className="mt-4 text-sm leading-6 text-black/60">{t.givesText}</p><p className="mt-4 rounded-xl border border-[#9a6517]/15 bg-white/50 p-3 text-xs text-black/50">{t.givesNote}</p><a href="/gives" className="mt-5 inline-flex text-sm font-bold text-[#9a6517]">MALTY Gives →</a></div><div className="grid grid-cols-2 gap-2"><Impact n="01" title={language==="pt"?"Comunidade indica":"Community surfaces"}/><Impact n="02" title={language==="pt"?"Projeto seleciona":"Project selects"}/><Impact n="03" title={language==="pt"?"Ação apoia":"Initiative supports"}/><Impact n="04" title={language==="pt"?"MALTY comprova":"MALTY proves"}/></div></div></section>

    <section id="roadmap" className="border-b border-white/[.07]"><div className="mx-auto max-w-6xl px-5 py-11 sm:px-8"><Eyebrow>ROADMAP</Eyebrow><h2 className="mt-2 text-3xl font-black">{t.roadmapTitle}</h2><div className="mt-6 grid gap-2 md:grid-cols-4"><Road state="DONE" title="Foundation"/><Road state="NEXT" title="MALTY Community"/><Road state="PLANNED" title={language==="pt"?"Primeira iniciativa pet":"First pet initiative"}/><Road state="FUTURE" title="Impact Dashboard"/></div><a href="/updates" className="mt-5 inline-flex text-sm font-bold text-[#e9b949]">Project updates →</a></div></section>

    <section id="faq" className="bg-[#0c0f13]"><div className="mx-auto grid max-w-6xl gap-8 px-5 py-11 sm:px-8 lg:grid-cols-[.7fr_1.3fr]"><div><Eyebrow>FAQ</Eyebrow><h2 className="mt-2 text-3xl font-black">{t.faqTitle}</h2><div className="mt-5 flex flex-col items-start gap-2"><a href="/transparency" className="text-sm font-bold text-[#e9b949]">{t.transparency} →</a><a href="/docs" className="text-sm font-bold text-white/55 hover:text-[#e9b949]">Public documentation →</a></div></div><div className="space-y-2"><Faq q={language==="pt"?"O que é MALTY?":"What is MALTY?"} a={language==="pt"?"MALTY é um projeto comunitário na Solana que reúne token, marca, comunidade e uma missão de longo prazo de gerar impacto positivo para animais.":"MALTY is a community-driven Solana project connecting a token, brand, community and a long-term mission to create positive impact for animals."}/><Faq q={language==="pt"?"Podem criar mais MALTY?":"Can more MALTY be minted?"} a={language==="pt"?"A Mint Authority foi revogada.":"The Mint Authority has been revoked."}/><Faq q={language==="pt"?"Como o MALTY pretende ajudar pets?":"How does MALTY plan to help pets?"} a={language==="pt"?"Por meio do MALTY Gives: a comunidade poderá ajudar a identificar iniciativas, o projeto definirá critérios antes da ativação e cada ação concluída deverá ter prestação de contas pública.":"Through MALTY Gives: the community can help surface initiatives, the project will define criteria before activation, and completed actions should have public reporting."}/></div></div></section>

    <footer className="border-t border-white/[.07] px-5 py-7"><div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><p className="font-black text-[#e9b949]">MALTY · Small Dog. Big Community.</p><p className="max-w-2xl text-[10px] leading-5 text-white/30">{t.risk}</p></div></footer>
  </main>;
}

function Eyebrow({children}:{children:React.ReactNode}){return <p className="text-[10px] font-black tracking-[.22em] text-[#e9b949]">{children}</p>}
function Metric({label,value}:{label:string;value:string}){return <div className="bg-[#0d1014] p-3"><p className="text-[9px] text-white/30">{label}</p><p className="mt-1 text-sm font-black">{value}</p></div>}
function Stat({label,value}:{label:string;value:string}){return <div className="rounded-xl border border-white/[.08] p-3"><p className="text-[10px] text-white/32">{label}</p><p className="mt-1 text-sm font-black">{value}</p></div>}
function Pillar({title,text}:{title:string;text:string}){return <div className="rounded-2xl border border-black/10 bg-white/55 p-4"><p className="text-sm font-black text-[#9a6517]">{title}</p><p className="mt-2 text-[11px] text-black/45">{text}</p></div>}
function Impact({n,title}:{n:string;title:string}){return <div className="rounded-2xl bg-[#101319] p-4 text-white"><p className="text-[10px] text-[#e9b949]">{n}</p><p className="mt-5 text-sm font-black">{title}</p></div>}
function Road({state,title}:{state:string;title:string}){return <div className="rounded-2xl border border-white/[.08] p-4"><p className="text-[9px] font-black text-[#e9b949]">{state}</p><p className="mt-3 text-sm font-black">{title}</p></div>}
function Faq({q,a}:{q:string;a:string}){return <details className="rounded-xl border border-white/[.08] px-4 py-3"><summary className="cursor-pointer text-sm font-bold">{q}</summary><p className="mt-2 text-xs leading-5 text-white/48">{a}</p></details>}
