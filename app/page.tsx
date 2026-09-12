"use client";

import Image from "next/image";
import { useState } from "react";

const MINT = "6ZhVVH2KwbiVg6HJjrPg2YC5SWomBFA5qGmz57pknMpz";
const TOKEN_IMAGE = "https://arweave.net/w-TXbk_hQOw1mC5vA9YrVmClKzz_Avjfiq5coE1AYec";
const PUBLIC_STATUS_DATE = "12 Sep 2026";
type Language = "en" | "pt";

const allocation = [
  ["Liquidity", "50%", "500M", 50],
  ["Ecosystem", "20%", "200M", 20],
  ["Community", "15%", "150M", 15],
  ["Treasury", "7.5%", "75M", 7.5],
  ["Team", "7.5%", "75M", 7.5],
] as const;

const copy = {
  en: {
    nav: ["Project", "Token", "Gives", "Roadmap", "FAQ"],
    navIds: ["story", "token", "gives", "roadmap", "faq"],
    menu: "Menu", close: "Close",
    badge: "COMMUNITY-POWERED · PET-FOCUSED",
    headline: "Small Dog. Big Community.",
    intro: "MALTY is a community-driven Solana project built around transparency, a recognizable identity and a long-term mission to build a community capable of creating visible, verifiable impact for animals.",
    primaryCta: "Explore MALTY", secondaryCta: "Transparency",
    statusEyebrow: "PROJECT STATUS", publicStatus: `Public status · ${PUBLIC_STATUS_DATE}`,
    verifyTransparency: "Verify transparency", changeHistory: "View change history",
    storyEyebrow: "THE MALTY MISSION", storyTitle: "Community with a purpose.",
    storyText: "MALTY connects four parts of one project: a transparent token, a strong identity, an open community and MALTY Gives — a planned initiative designed to support animal-welfare projects with public evidence of real-world impact.",
    about: "About MALTY",
    verifiedEyebrow: "PROOF, NOT PROMISES", verifiedTitle: "What is verified today?", nextTitle: "What comes next?",
    verifiedItems: ["1B fixed supply", "Mint Authority revoked", "No Freeze Authority", "0% transfer tax", "Public reserve architecture", "Mainnet deployment verified"],
    nextItems: ["Grow the MALTY community", "Publish MALTY Gives operating criteria", "Complete the first pet initiative", "Publish verifiable impact evidence"],
    tokenEyebrow: "OFFICIAL TOKEN", tokenTitle: "Clear facts. Publicly verifiable.", tokenText: "The essentials of the official MALTY token, presented openly and without hiding the project structure behind marketing.",
    allocationEyebrow: "TOKENOMICS", allocationTitle: "Published allocation plan", allocationNote: "These are planned allocations, not claims that reserve balances have already been distributed.", reserveArchitecture: "Full reserve architecture",
    givesTitle: "Community-powered. Pet-focused.", givesText: "MALTY Gives is being designed as the impact layer of the project. The community can help surface meaningful animal-welfare initiatives, while selection rules and completed actions are documented publicly.",
    givesStatus: "PLANNED INITIATIVE", givesNote: "The program is not active yet. Funding rules, beneficiary criteria and reporting standards will be published before the first initiative begins.",
    givesTimeline: ["Planned", "Selection criteria", "First initiative", "Public evidence", "Impact dashboard"],
    roadmapEyebrow: "ROADMAP", roadmapTitle: "Build the community. Create impact. Prove it.", updates: "Project updates",
    faqTitle: "Quick answers", transparency: "Transparency center", docs: "Public documentation",
    copyMint: "Copy mint", copied: "Copied", copyFailed: "Copy failed",
    risk: "MALTY is a community-driven digital token on Solana. Project information is provided for transparency and does not promise price, returns, liquidity or future value. MALTY Gives is planned and is not currently an active donation program.",
    footerProject: "Project", footerVerify: "Verify", footerStatus: "Status", footerMint: "Official mint",
  },
  pt: {
    nav: ["Projeto", "Token", "Gives", "Roadmap", "FAQ"],
    navIds: ["story", "token", "gives", "roadmap", "faq"],
    menu: "Menu", close: "Fechar",
    badge: "MOVIDO PELA COMUNIDADE · FOCO EM PETS",
    headline: "Cão pequeno. Grande comunidade.",
    intro: "MALTY é um projeto comunitário na Solana construído sobre transparência, identidade própria e uma missão de longo prazo: formar uma comunidade capaz de gerar impacto visível e verificável para animais.",
    primaryCta: "Conhecer MALTY", secondaryCta: "Transparência",
    statusEyebrow: "STATUS DO PROJETO", publicStatus: `Status público · ${PUBLIC_STATUS_DATE}`,
    verifyTransparency: "Verificar transparência", changeHistory: "Ver histórico de alterações",
    storyEyebrow: "A MISSÃO MALTY", storyTitle: "Comunidade com propósito.",
    storyText: "MALTY conecta quatro partes de um mesmo projeto: token transparente, identidade forte, comunidade aberta e MALTY Gives — uma iniciativa planejada para apoiar projetos de bem-estar animal com evidências públicas do impacto gerado.",
    about: "Sobre o MALTY",
    verifiedEyebrow: "PROVAS, NÃO PROMESSAS", verifiedTitle: "O que está verificado hoje?", nextTitle: "O que vem a seguir?",
    verifiedItems: ["Supply fixo de 1B", "Mint Authority revogada", "Sem Freeze Authority", "0% de taxa de transferência", "Arquitetura pública de reservas", "Deploy Mainnet verificável"],
    nextItems: ["Expandir a comunidade MALTY", "Publicar critérios operacionais do MALTY Gives", "Concluir a primeira iniciativa pet", "Publicar evidências verificáveis de impacto"],
    tokenEyebrow: "TOKEN OFICIAL", tokenTitle: "Dados claros. Verificáveis publicamente.", tokenText: "O essencial sobre o token oficial MALTY, apresentado de forma aberta e sem esconder a estrutura do projeto atrás do marketing.",
    allocationEyebrow: "TOKENOMICS", allocationTitle: "Plano de alocação publicado", allocationNote: "Estas são alocações planejadas, não uma afirmação de que os saldos das reservas já foram distribuídos.", reserveArchitecture: "Arquitetura completa das reservas",
    givesTitle: "Movido pela comunidade. Focado em pets.", givesText: "MALTY Gives está sendo estruturado como a frente de impacto do projeto. A comunidade poderá ajudar a identificar iniciativas relevantes, enquanto regras de seleção e ações concluídas serão documentadas publicamente.",
    givesStatus: "INICIATIVA PLANEJADA", givesNote: "O programa ainda não está ativo. Regras de financiamento, critérios de beneficiários e padrões de prestação de contas serão publicados antes da primeira iniciativa.",
    givesTimeline: ["Planejado", "Critérios de seleção", "Primeira iniciativa", "Evidência pública", "Dashboard de impacto"],
    roadmapEyebrow: "ROADMAP", roadmapTitle: "Construir a comunidade. Gerar impacto. Comprovar.", updates: "Atualizações do projeto",
    faqTitle: "Respostas rápidas", transparency: "Central de transparência", docs: "Documentação pública",
    copyMint: "Copiar mint", copied: "Copiado", copyFailed: "Falha ao copiar",
    risk: "MALTY é um token digital comunitário construído na Solana. As informações do projeto são publicadas por transparência e não prometem preço, retorno, liquidez ou valor futuro. MALTY Gives é planejado e ainda não é um programa ativo de doações.",
    footerProject: "Projeto", footerVerify: "Verificar", footerStatus: "Status", footerMint: "Mint oficial",
  }
} as const;

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const t = copy[language];

  async function copyMint() {
    try { await navigator.clipboard.writeText(MINT); setCopyState("copied"); }
    catch { setCopyState("error"); }
    window.setTimeout(() => setCopyState("idle"), 1600);
  }

  return <main className="min-h-screen overflow-x-hidden bg-[#080a0d] text-[#f7f1e5] selection:bg-[#d9a53d] selection:text-black">
    <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#080a0d]/90 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <a href="#top" className="flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e9b949]"><Image src={TOKEN_IMAGE} alt="MALTY" width={36} height={36} className="h-9 w-9 rounded-full border border-[#d9a53d]/45 object-cover"/><div className="leading-none"><p className="text-base font-black text-[#e9b949]">MALTY</p><p className="mt-1 text-[9px] uppercase tracking-[0.22em] text-white/35">Solana</p></div></a>
        <nav className="hidden items-center gap-5 text-xs font-semibold text-white/50 md:flex">{t.nav.map((x,i)=><a key={x} href={`#${t.navIds[i]}`} className="rounded-sm transition-colors hover:text-[#e9b949] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e9b949]">{x}</a>)}</nav>
        <div className="flex items-center gap-2"><div className="flex rounded-full border border-white/10 bg-white/[0.035] p-1 text-[11px] font-bold">{(["en","pt"] as const).map(l=><button key={l} onClick={()=>setLanguage(l)} aria-pressed={language===l} className={`rounded-full px-3 py-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#e9b949] ${language===l?"bg-[#e9b949] text-black":"text-white/45"}`}>{l.toUpperCase()}</button>)}</div><button onClick={()=>setMenuOpen(!menuOpen)} aria-expanded={menuOpen} className="rounded-lg border border-white/10 px-3 py-2 text-xs font-bold text-white/70 md:hidden">{menuOpen?t.close:t.menu}</button></div>
      </div>
      {menuOpen&&<div className="border-t border-white/[0.06] px-5 py-3 md:hidden"><nav className="mx-auto grid max-w-6xl gap-1">{t.nav.map((x,i)=><a key={x} href={`#${t.navIds[i]}`} onClick={()=>setMenuOpen(false)} className="rounded-lg px-3 py-3 text-sm font-bold text-white/70 hover:bg-white/[0.04] hover:text-[#e9b949]">{x}</a>)}</nav></div>}
    </header>

    <section id="top" className="relative border-b border-white/[0.07]"><div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_76%_42%,rgba(217,165,61,0.18),transparent_30%)]"/><div className="relative mx-auto grid max-w-6xl items-center gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:py-16"><div><div className="inline-flex items-center gap-2 rounded-full border border-[#e9b949]/20 bg-[#e9b949]/[0.045] px-3 py-1.5 text-[10px] font-black tracking-[0.15em] text-[#e9b949]"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400"/>{t.badge}</div><h1 className="mt-6 text-5xl font-black leading-[.92] tracking-[-.06em] sm:text-6xl lg:text-7xl">MALTY<span className="text-[#e9b949]">.</span></h1><p className="mt-4 text-xl font-bold sm:text-2xl">{t.headline}</p><p className="mt-4 max-w-xl text-sm leading-6 text-white/55 sm:text-base">{t.intro}</p><div className="mt-6 flex flex-wrap gap-3"><a href="#story" className="rounded-xl bg-[#e9b949] px-4 py-2.5 text-sm font-black text-black transition-transform hover:-translate-y-0.5">{t.primaryCta}</a><a href="/transparency" className="rounded-xl border border-white/12 px-4 py-2.5 text-sm font-bold transition-colors hover:border-[#e9b949]/35 hover:text-[#e9b949]">{t.secondaryCta} →</a></div><div className="mt-7 grid max-w-xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[.08] bg-white/[.08] sm:grid-cols-4"><Metric label="Supply" value="1B"/><Metric label="Tax" value="0%"/><Metric label="Decimals" value="6"/><Metric label="Network" value="Solana"/></div></div><div className="relative flex min-h-[310px] items-center justify-center"><div className="absolute h-72 w-72 rounded-full bg-[#e9b949]/10 blur-[70px]"/><div className="relative h-64 w-64 rounded-full border-[7px] border-[#b87d21] bg-gradient-to-br from-[#ffe59a] via-[#d9a53d] to-[#6f4210] p-2 shadow-2xl transition-transform duration-500 hover:scale-[1.02] sm:h-72 sm:w-72"><Image src={TOKEN_IMAGE} alt="Official MALTY token artwork" width={288} height={288} priority className="h-full w-full rounded-full border-4 border-black/25 object-cover"/></div></div></div></section>

    <section className="border-b border-white/[.07] bg-[#0c0f13]"><div className="mx-auto max-w-6xl px-5 py-8 sm:px-8"><div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"><div><Eyebrow>{t.statusEyebrow}</Eyebrow><p className="mt-2 text-lg font-black">{t.publicStatus}</p></div><div className="grid grid-cols-2 gap-2 sm:grid-cols-4"><Status label="Mainnet" value="Live"/><Status label="Mint Authority" value="Revoked"/><Status label="Freeze Authority" value="None"/><Status label="MALTY Gives" value="Planned"/></div></div><div className="mt-4 flex flex-wrap gap-4 text-xs"><a href="/transparency" className="font-bold text-[#e9b949]">{t.verifyTransparency} →</a><a href="/updates" className="font-bold text-white/55 hover:text-white">{t.changeHistory} →</a></div></div></section>

    <section id="story" className="border-b border-black/10 bg-[#f2ecdf] text-[#17130d]"><div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><div><p className="text-[10px] font-black tracking-[.22em] text-[#9a6517]">{t.storyEyebrow}</p><h2 className="mt-2 text-3xl font-black sm:text-4xl">{t.storyTitle}</h2><p className="mt-4 text-sm leading-6 text-black/55">{t.storyText}</p><a href="/about" className="mt-5 inline-flex text-sm font-bold text-[#9a6517]">{t.about} →</a></div><div className="grid grid-cols-2 gap-2 sm:grid-cols-4"><Pillar title="MALTY Token" text={language==="pt"?"Transparência":"Transparency"}/><Pillar title="MALTY Community" text={language==="pt"?"Participação":"Participation"}/><Pillar title="MALTY Gives" text={language==="pt"?"Apoio a pets":"Pet support"}/><Pillar title="MALTY Impact" text={language==="pt"?"Prova pública":"Public proof"}/></div></div></section>

    <section className="border-b border-white/[.07]"><div className="mx-auto grid max-w-6xl gap-5 px-5 py-11 sm:px-8 lg:grid-cols-2"><div className="rounded-3xl border border-emerald-400/15 bg-emerald-400/[0.035] p-6"><Eyebrow>{t.verifiedEyebrow}</Eyebrow><h2 className="mt-2 text-2xl font-black">{t.verifiedTitle}</h2><div className="mt-5 grid gap-2 sm:grid-cols-2">{t.verifiedItems.map(x=><Fact key={x} text={x}/>)}</div></div><div className="rounded-3xl border border-[#e9b949]/15 bg-[#e9b949]/[0.025] p-6"><Eyebrow>{language==="pt"?"PRÓXIMOS PASSOS":"NEXT"}</Eyebrow><h2 className="mt-2 text-2xl font-black">{t.nextTitle}</h2><div className="mt-5 space-y-3">{t.nextItems.map((x,i)=><div key={x} className="flex items-start gap-3"><span className="mt-0.5 text-[10px] font-black text-[#e9b949]">0{i+1}</span><p className="text-sm text-white/55">{x}</p></div>)}</div></div></div></section>

    <section id="token" className="border-b border-white/[.07] bg-[#0c0f13]"><div className="mx-auto max-w-6xl px-5 py-11 sm:px-8"><Eyebrow>{t.tokenEyebrow}</Eyebrow><h2 className="mt-2 text-3xl font-black">{t.tokenTitle}</h2><p className="mt-3 text-sm text-white/50">{t.tokenText}</p><div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3"><Stat label="Supply" value="1B MALTY"/><Stat label="Transfer tax" value="0%"/><Stat label="Decimals" value="6"/><Stat label="Mint Authority" value="Revoked"/><Stat label="Freeze Authority" value="None"/><Stat label="Network" value="Solana"/></div><div className="mt-4 rounded-xl border border-[#e9b949]/20 p-4"><p className="break-all font-mono text-xs text-white/60">{MINT}</p><div className="mt-3 flex flex-wrap gap-4"><button onClick={copyMint} className="text-xs font-bold text-[#e9b949]">{copyState==="copied"?t.copied:copyState==="error"?t.copyFailed:t.copyMint}</button><a href={`https://explorer.solana.com/address/${MINT}`} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-white/45 hover:text-white">Solana Explorer ↗</a></div></div></div></section>

    <section className="border-b border-white/[.07]"><div className="mx-auto max-w-6xl px-5 py-11 sm:px-8"><Eyebrow>{t.allocationEyebrow}</Eyebrow><div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><h2 className="text-3xl font-black">{t.allocationTitle}</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-white/45">{t.allocationNote}</p></div><a href="/transparency" className="text-sm font-bold text-[#e9b949]">{t.reserveArchitecture} →</a></div><div className="mt-6 flex h-3 overflow-hidden rounded-full bg-white/[0.06]">{allocation.map(([name,,,width],i)=><div key={name} title={`${name} ${width}%`} style={{width:`${width}%`}} className={`${i%2===0?"bg-[#e9b949]":"bg-[#b87d21]"} border-r border-black/20 last:border-0`}/>)}</div><div className="mt-5 grid gap-2 sm:grid-cols-5">{allocation.map(([name,pct,amount])=><Allocation key={name} name={name} pct={pct} amount={amount}/>)}</div></div></section>

    <section id="gives" className="border-b border-black/10 bg-[#f2ecdf] text-[#17130d]"><div className="mx-auto max-w-6xl px-5 py-12 sm:px-8"><div className="grid gap-8 lg:grid-cols-2 lg:items-center"><div><div className="inline-flex rounded-full bg-[#9a6517]/10 px-3 py-1 text-[10px] font-black tracking-[.18em] text-[#9a6517]">🐾 MALTY GIVES · {t.givesStatus}</div><h2 className="mt-4 text-3xl font-black sm:text-4xl">{t.givesTitle}</h2><p className="mt-4 text-sm leading-6 text-black/60">{t.givesText}</p><p className="mt-4 rounded-xl border border-[#9a6517]/15 bg-white/50 p-3 text-xs text-black/50">{t.givesNote}</p><a href="/gives" className="mt-5 inline-flex text-sm font-bold text-[#9a6517]">MALTY Gives →</a></div><div className="space-y-2">{t.givesTimeline.map((step,i)=><Timeline key={step} n={i+1} title={step} active={i===0}/>)}</div></div></div></section>

    <section id="roadmap" className="border-b border-white/[.07]"><div className="mx-auto max-w-6xl px-5 py-11 sm:px-8"><Eyebrow>{t.roadmapEyebrow}</Eyebrow><h2 className="mt-2 text-3xl font-black">{t.roadmapTitle}</h2><div className="mt-6 grid gap-2 md:grid-cols-4"><Road state={language==="pt"?"CONCLUÍDO":"DONE"} title={language==="pt"?"Fundação":"Foundation"}/><Road state={language==="pt"?"PRÓXIMO":"NEXT"} title="MALTY Community"/><Road state={language==="pt"?"PLANEJADO":"PLANNED"} title={language==="pt"?"Primeira iniciativa pet":"First pet initiative"}/><Road state={language==="pt"?"FUTURO":"FUTURE"} title={language==="pt"?"Dashboard de impacto":"Impact Dashboard"}/></div><a href="/updates" className="mt-5 inline-flex text-sm font-bold text-[#e9b949]">{t.updates} →</a></div></section>

    <section id="faq" className="bg-[#0c0f13]"><div className="mx-auto grid max-w-6xl gap-8 px-5 py-11 sm:px-8 lg:grid-cols-[.7fr_1.3fr]"><div><Eyebrow>FAQ</Eyebrow><h2 className="mt-2 text-3xl font-black">{t.faqTitle}</h2><div className="mt-5 flex flex-col items-start gap-2"><a href="/transparency" className="text-sm font-bold text-[#e9b949]">{t.transparency} →</a><a href="/docs" className="text-sm font-bold text-white/55 hover:text-[#e9b949]">{t.docs} →</a></div></div><div className="space-y-2"><Faq q={language==="pt"?"O que é MALTY?":"What is MALTY?"} a={language==="pt"?"MALTY é um projeto comunitário na Solana que reúne token, identidade, comunidade e uma missão de longo prazo de gerar impacto positivo para animais.":"MALTY is a community-driven Solana project connecting a token, identity, community and a long-term mission to create positive impact for animals."}/><Faq q={language==="pt"?"Podem criar mais MALTY?":"Can more MALTY be minted?"} a={language==="pt"?"A Mint Authority foi revogada.":"The Mint Authority has been revoked."}/><Faq q={language==="pt"?"Como o MALTY pretende ajudar pets?":"How does MALTY plan to help pets?"} a={language==="pt"?"Por meio do MALTY Gives: a comunidade poderá ajudar a identificar iniciativas, o projeto definirá critérios antes da ativação e cada ação concluída deverá ter prestação de contas pública.":"Through MALTY Gives: the community can help surface initiatives, the project will define criteria before activation, and completed actions should have public reporting."}/></div></div></section>

    <footer className="border-t border-white/[.07] px-5 py-10"><div className="mx-auto max-w-6xl"><div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"><div><p className="font-black text-[#e9b949]">MALTY</p><p className="mt-2 text-sm font-bold">Small Dog. Big Community.</p><p className="mt-4 max-w-xs text-xs leading-5 text-white/35">Community-powered, pet-focused and built around public verification.</p></div><FooterCol title={t.footerProject} links={[[language==="pt"?"Sobre":"About","/about"],["MALTY Gives","/gives"],[language==="pt"?"Atualizações":"Updates","/updates"]]}/><FooterCol title={t.footerVerify} links={[[language==="pt"?"Transparência":"Transparency","/transparency"],[language==="pt"?"Documentação":"Documentation","/docs"],["Solana Explorer",`https://explorer.solana.com/address/${MINT}`]]}/><div><p className="text-xs font-black text-white/55">{t.footerStatus}</p><p className="mt-3 text-xs text-white/35">Solana Mainnet · Live</p><p className="mt-2 text-[10px] text-white/30">{t.footerMint}</p><p className="mt-1 break-all font-mono text-[9px] text-white/25">{MINT}</p></div></div><div className="mt-8 border-t border-white/[.07] pt-5"><p className="max-w-4xl text-[10px] leading-5 text-white/28">{t.risk}</p></div></div></footer>
  </main>;
}

function Eyebrow({children}:{children:React.ReactNode}){return <p className="text-[10px] font-black tracking-[.22em] text-[#e9b949]">{children}</p>}
function Metric({label,value}:{label:string;value:string}){return <div className="bg-[#0d1014] p-3"><p className="text-[9px] text-white/30">{label}</p><p className="mt-1 text-sm font-black">{value}</p></div>}
function Status({label,value}:{label:string;value:string}){return <div className="min-w-28 rounded-xl border border-white/[.08] bg-white/[.025] px-3 py-2"><p className="text-[9px] text-white/32">{label}</p><p className="mt-1 text-xs font-black text-emerald-300">{value}</p></div>}
function Stat({label,value}:{label:string;value:string}){return <div className="rounded-xl border border-white/[.08] p-3 transition-transform hover:-translate-y-0.5"><p className="text-[10px] text-white/32">{label}</p><p className="mt-1 text-sm font-black">{value}</p></div>}
function Allocation({name,pct,amount}:{name:string;pct:string;amount:string}){return <div className="rounded-2xl border border-white/[.08] bg-white/[.025] p-4 transition-transform hover:-translate-y-0.5"><p className="text-xs font-black text-[#e9b949]">{pct}</p><p className="mt-3 text-sm font-black">{name}</p><p className="mt-1 text-[10px] text-white/35">{amount} MALTY · planned</p></div>}
function Pillar({title,text}:{title:string;text:string}){return <div className="rounded-2xl border border-black/10 bg-white/55 p-4"><p className="text-sm font-black text-[#9a6517]">{title}</p><p className="mt-2 text-[11px] text-black/45">{text}</p></div>}
function Fact({text}:{text:string}){return <div className="flex items-center gap-2 rounded-xl border border-white/[.07] bg-black/10 px-3 py-2"><span className="text-emerald-300">✓</span><p className="text-xs font-bold text-white/65">{text}</p></div>}
function Timeline({n,title,active}:{n:number;title:string;active:boolean}){return <div className={`flex items-center gap-4 rounded-2xl border p-4 ${active?"border-[#9a6517]/30 bg-white/65":"border-black/10 bg-white/35"}`}><span className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-black ${active?"bg-[#9a6517] text-white":"bg-black/5 text-black/40"}`}>{n}</span><div><p className="text-sm font-black">{title}</p><p className="mt-1 text-[10px] text-black/40">{active?"Current stage":"Future stage"}</p></div></div>}
function Road({state,title}:{state:string;title:string}){return <div className="rounded-2xl border border-white/[.08] p-4"><p className="text-[9px] font-black text-[#e9b949]">{state}</p><p className="mt-3 text-sm font-black">{title}</p></div>}
function Faq({q,a}:{q:string;a:string}){return <details className="rounded-xl border border-white/[.08] px-4 py-3"><summary className="cursor-pointer text-sm font-bold">{q}</summary><p className="mt-2 text-xs leading-5 text-white/48">{a}</p></details>}
function FooterCol({title,links}:{title:string;links:readonly (readonly [string,string])[]}){return <div><p className="text-xs font-black text-white/55">{title}</p><div className="mt-3 flex flex-col items-start gap-2">{links.map(([label,href])=><a key={label} href={href} target={href.startsWith("http")?"_blank":undefined} rel={href.startsWith("http")?"noopener noreferrer":undefined} className="text-xs text-white/38 hover:text-[#e9b949]">{label}</a>)}</div></div>}
