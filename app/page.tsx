"use client";

import Image from "next/image";
import { useState } from "react";
import {
  MALTY_PUBLIC_MINT,
  MALTY_TOKEN,
  getReviewDateShort,
} from "./lib/malty-token";
import { useLanguage } from "./lib/language";

const MINT = MALTY_PUBLIC_MINT;
const TOKEN_IMAGE = MALTY_TOKEN.imageUri;

const allocation = [
  ["Liquidity", "50%", "500M", 50],
  ["Ecosystem", "20%", "200M", 20],
  ["Community", "15%", "150M", 15],
  ["Treasury", "7.5%", "75M", 7.5],
  ["Team", "7.5%", "75M", 7.5],
] as const;

const copy = {
  en: {
    nav: ["Project", "Token", "Gives", "Roadmap", "FAQ"], navIds: ["story", "token", "gives", "roadmap", "faq"], menu: "Menu", close: "Close",
    badge: "COMMUNITY-POWERED · ANIMAL WELFARE", headline: "Small Dog. Big Community.",
    intro: "MALTY is a community on Solana built on one simple principle: prove, don't promise. The long-term goal is to turn that transparency into real, verifiable impact for animal welfare.",
    primaryCta: "Explore MALTY", secondaryCta: "Transparency", statusEyebrow: "PROJECT STATUS", publicStatusLabel: "Public status",
    verifyTransparency: "Verify transparency", changeHistory: "View change history", storyEyebrow: "THE MALTY MISSION", storyTitle: "Community with a purpose.",
    storyText: "MALTY connects four parts of one project: a transparent token, a strong identity, an open community and MALTY Gives — a planned initiative designed to support animal-welfare projects with public evidence of real-world impact.", about: "About MALTY",
    verifiedEyebrow: "PROOF, NOT PROMISES", verifiedTitle: "What is verified today?", nextTitle: "What comes next?",
    verifiedItems: ["1B fixed supply", "Mint Authority revoked", "No Freeze Authority", "0% transfer tax", "Public reserve architecture", "Mainnet deployment verified"],
    nextItems: ["Grow the MALTY community", "Publish MALTY Gives operating criteria", "Complete the first pet initiative", "Publish verifiable impact evidence"],
    tokenEyebrow: "OFFICIAL TOKEN", tokenTitle: "Clear facts. Publicly verifiable.", tokenText: "The essentials of the official MALTY token, presented openly and without hiding the project structure behind marketing.",
    allocationEyebrow: "TOKENOMICS", allocationTitle: "Published allocation plan", allocationNote: "These are planned allocations, not claims that reserve balances have already been distributed.", reserveArchitecture: "Full reserve architecture",
    givesTitle: "Community-powered. Pet-focused.", givesText: "MALTY Gives is being designed as the impact layer of the project. The community can help surface meaningful animal-welfare initiatives, while selection rules and completed actions are documented publicly.",
    givesStatus: "PLANNED INITIATIVE", givesNote: "The program is not active yet. Funding rules, beneficiary criteria and reporting standards will be published before the first initiative begins.",
    givesTimeline: ["Planned", "Selection criteria", "First initiative", "Public evidence", "Impact dashboard"], roadmapEyebrow: "ROADMAP", roadmapTitle: "Build the community. Create impact. Prove it.", updates: "Project updates",
    faqTitle: "Quick answers", transparency: "Transparency center", docs: "Public documentation", copyMint: "Copy mint", copied: "Copied", copyFailed: "Copy failed",
    risk: "MALTY is a community-driven digital token on Solana. Project information is provided for transparency and does not promise price, returns, liquidity or future value. MALTY Gives is planned and is not currently an active donation program.",
    footerProject: "Project", footerVerify: "Verify", footerStatus: "Status", footerMint: "Official mint",
  },
  pt: {
    nav: ["Projeto", "Token", "Gives", "Roadmap", "FAQ"], navIds: ["story", "token", "gives", "roadmap", "faq"], menu: "Menu", close: "Fechar",
    badge: "MOVIDO PELA COMUNIDADE · BEM-ESTAR ANIMAL", headline: "Cão pequeno. Grande comunidade.",
    intro: "MALTY é uma comunidade na Solana construída sobre um princípio simples: provar, não prometer. O objetivo de longo prazo é transformar essa transparência em impacto real e verificável para o bem-estar animal.",
    primaryCta: "Conhecer MALTY", secondaryCta: "Transparência", statusEyebrow: "STATUS DO PROJETO", publicStatusLabel: "Status público",
    verifyTransparency: "Verificar transparência", changeHistory: "Ver histórico de alterações", storyEyebrow: "A MISSÃO MALTY", storyTitle: "Comunidade com propósito.",
    storyText: "MALTY conecta quatro partes de um mesmo projeto: token transparente, identidade forte, comunidade aberta e MALTY Gives — uma iniciativa planejada para apoiar projetos de bem-estar animal com evidências públicas do impacto gerado.", about: "Sobre o MALTY",
    verifiedEyebrow: "PROVAS, NÃO PROMESSAS", verifiedTitle: "O que está verificado hoje?", nextTitle: "O que vem a seguir?",
    verifiedItems: ["Supply fixo de 1B", "Mint Authority revogada", "Sem Freeze Authority", "0% de taxa de transferência", "Arquitetura pública de reservas", "Deploy Mainnet verificável"],
    nextItems: ["Expandir a comunidade MALTY", "Publicar critérios operacionais do MALTY Gives", "Concluir a primeira iniciativa pet", "Publicar evidências verificáveis de impacto"],
    tokenEyebrow: "TOKEN OFICIAL", tokenTitle: "Dados claros. Verificáveis publicamente.", tokenText: "O essencial sobre o token oficial MALTY, apresentado de forma aberta e sem esconder a estrutura do projeto atrás do marketing.",
    allocationEyebrow: "TOKENOMICS", allocationTitle: "Plano de alocação publicado", allocationNote: "Estas são alocações planejadas, não uma afirmação de que os saldos das reservas já foram distribuídos.", reserveArchitecture: "Arquitetura completa das reservas",
    givesTitle: "Movido pela comunidade. Focado em pets.", givesText: "MALTY Gives está sendo estruturado como a frente de impacto do projeto. A comunidade poderá ajudar a identificar iniciativas relevantes, enquanto regras de seleção e ações concluídas serão documentadas publicamente.",
    givesStatus: "INICIATIVA PLANEJADA", givesNote: "O programa ainda não está ativo. Regras de financiamento, critérios de beneficiários e padrões de prestação de contas serão publicados antes da primeira iniciativa.",
    givesTimeline: ["Planejado", "Critérios de seleção", "Primeira iniciativa", "Evidência pública", "Dashboard de impacto"], roadmapEyebrow: "ROADMAP", roadmapTitle: "Construir a comunidade. Gerar impacto. Comprovar.", updates: "Atualizações do projeto",
    faqTitle: "Respostas rápidas", transparency: "Central de transparência", docs: "Documentação pública", copyMint: "Copiar mint", copied: "Copiado", copyFailed: "Falha ao copiar",
    risk: "MALTY é um token digital comunitário construído na Solana. As informações do projeto são publicadas por transparência e não prometem preço, retorno, liquidez ou valor futuro. MALTY Gives é planejado e ainda não é um programa ativo de doações.",
    footerProject: "Projeto", footerVerify: "Verificar", footerStatus: "Status", footerMint: "Mint oficial",
  }
} as const;

const sectionPad = "px-5 py-16 sm:px-8 sm:py-20 lg:py-24";
const textBody = "text-[15px] leading-7 text-white/65 sm:text-base";
const lightBody = "text-[15px] leading-7 text-black/65 sm:text-base";
const darkSurface = "rounded-2xl border border-white/[0.08] bg-white/[0.025]";

export default function Home() {
  const { language, setLanguage } = useLanguage();
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
      <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-5 px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-3 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e9b949]"><Image src={TOKEN_IMAGE} alt="MALTY" width={38} height={38} priority className="h-9.5 w-9.5 rounded-full border border-[#d9a53d]/40 bg-[#2a2013] object-cover"/><div className="leading-tight"><p className="text-[15px] font-extrabold tracking-[-0.02em] text-[#e9b949]">MALTY</p><p className="text-[11px] font-medium tracking-[0.12em] text-white/45">SOLANA</p></div></a>
        <nav className="hidden items-center gap-7 text-[13px] font-medium text-white/60 md:flex">{t.nav.map((x,i)=><a key={x} href={`#${t.navIds[i]}`} className="rounded-sm transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e9b949]">{x}</a>)}</nav>
        <div className="flex items-center gap-2"><div className="flex rounded-full border border-white/[0.08] bg-white/[0.025] p-1 text-[11px] font-semibold">{(["en","pt"] as const).map(l=><button key={l} onClick={()=>setLanguage(l)} aria-pressed={language===l} className={`rounded-full px-3 py-1.5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#e9b949] ${language===l?"bg-[#e9b949] text-black":"text-white/55 hover:text-white"}`}>{l.toUpperCase()}</button>)}</div><button onClick={()=>setMenuOpen(!menuOpen)} aria-expanded={menuOpen} className="rounded-xl border border-white/[0.08] px-3.5 py-2 text-xs font-semibold text-white/75 md:hidden">{menuOpen?t.close:t.menu}</button></div>
      </div>
      {menuOpen&&<div className="border-t border-white/[0.06] px-5 py-3 md:hidden"><nav className="mx-auto grid max-w-6xl gap-1">{t.nav.map((x,i)=><a key={x} href={`#${t.navIds[i]}`} onClick={()=>setMenuOpen(false)} className="rounded-xl px-3 py-3 text-sm font-semibold text-white/70 hover:bg-white/[0.04] hover:text-white">{x}</a>)}</nav></div>}
    </header>

    <section id="top" className="relative border-b border-white/[0.07]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_76%_42%,rgba(217,165,61,0.15),transparent_31%)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-5 py-8 sm:px-8 sm:py-10 lg:grid-cols-[1.06fr_.94fr] lg:gap-9 lg:py-12">
        <div>
          <div className="inline-flex select-none items-center gap-2 rounded-full border border-[#e9b949]/18 bg-[#e9b949]/[0.04] px-3.5 py-2 text-[11px] font-semibold tracking-[0.12em] text-[#e9b949]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />{t.badge}
          </div>
          <h1 className="mt-[18px] select-none text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-[4.6rem]">MALTY<span className="text-[#e9b949]">.</span></h1>
          <p className="mt-2.5 select-none text-xl font-semibold tracking-[-0.02em] text-white/92 sm:text-2xl">{t.headline}</p>
          <p className={`mt-3 max-w-2xl ${textBody}`}>{t.intro}</p>
          <div className="mt-[22px] flex flex-wrap gap-3">
            <a href="#story" className="inline-flex select-none items-center gap-2 rounded-xl bg-[#e9b949] px-5 py-3 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5">
              <span className="h-3.5 w-3.5 rounded-full bg-[conic-gradient(from_200deg,#ffe59a,#d9a53d_45%,#6f4210_80%,#ffe59a)] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.25)]" />
              {t.primaryCta}
            </a>
            <a href="/transparency" className="select-none rounded-xl border border-white/[0.1] px-5 py-3 text-sm font-semibold text-white/80 transition-colors hover:border-[#e9b949]/35 hover:text-white">{t.secondaryCta} →</a>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-[13px] text-white/45">
            <span><strong className="font-semibold text-white/92">0%</strong> Tax</span>
            <span className="text-white/20">·</span>
            <span className="inline-flex items-center gap-1.5"><SolanaMark className="h-[11px] w-[11px]" /><strong className="font-semibold text-white/92">Solana</strong></span>
          </div>
        </div>
        <div className="relative flex items-center justify-center py-4 lg:min-h-[380px] lg:py-0">
          <div className="absolute h-72 w-72 rounded-full bg-[#e9b949]/[0.18] blur-[80px] sm:h-[360px] sm:w-[360px] sm:blur-[90px]" />
          <div className="absolute bottom-[6%] h-[30px] w-[200px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.55),transparent_72%)] blur-[2px] sm:h-[34px] sm:w-[230px]" />
          <div className="relative h-60 w-60 rounded-full shadow-[0_36px_60px_rgba(0,0,0,0.55),inset_0_0_0_1px_rgba(255,255,255,0.06)] [transform-style:preserve-3d] [transform:rotateX(8deg)_rotateY(-11deg)] transition-shadow duration-500 animate-[coin-float_5.5s_ease-in-out_infinite] before:absolute before:inset-0 before:rounded-full before:bg-[radial-gradient(circle_at_70%_74%,rgba(0,0,0,0.4),transparent_58%)] before:content-[''] after:absolute after:left-[15%] after:top-[7%] after:h-[26%] after:w-[42%] after:rounded-full after:bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.75),rgba(255,255,255,0)_72%)] after:content-[''] after:[mix-blend-mode:overlay] motion-reduce:animate-none sm:h-[300px] sm:w-[300px]">
            <Image src={TOKEN_IMAGE} alt="Official MALTY token artwork" width={300} height={300} priority className="relative h-full w-full rounded-full object-cover shadow-[inset_0_0_0_3px_rgba(66,36,8,0.4),inset_0_3px_8px_rgba(0,0,0,0.3)]" />
          </div>
          <span className="absolute left-1/2 top-1/2 flex h-[26px] w-[26px] translate-x-[calc(-50%+90px)] translate-y-[calc(-50%+78px)] drop-shadow-[0_4px_10px_rgba(0,0,0,0.45)] sm:h-8 sm:w-8 sm:translate-x-[calc(-50%+113px)] sm:translate-y-[calc(-50%+98px)]">
            <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
              <circle cx="12" cy="12" r="10.4" fill="#e9b949" stroke="#3d2608" strokeWidth="1.3" />
              <path d="M7 12.5l3 3 7-7.5" stroke="#1a1204" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </section>

    <section className="border-b border-white/[0.07] bg-[#0c0f13]"><div className="mx-auto max-w-6xl px-5 py-10 sm:px-8"><div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"><div><Eyebrow>{t.statusEyebrow}</Eyebrow><p className="mt-2 text-lg font-semibold tracking-[-0.02em]">{t.publicStatusLabel} · {getReviewDateShort(language)}</p></div><div className="grid grid-cols-2 gap-2 sm:grid-cols-4"><Status label="Mainnet" value="Live"/><Status label="Mint Authority" value="Revoked"/><Status label="Freeze Authority" value="None"/><Status label="MALTY Gives" value="Planned"/></div></div><div className="mt-5 flex flex-wrap gap-5 text-sm"><a href="/transparency" className="font-medium text-[#e9b949]">{t.verifyTransparency} →</a><a href="/updates" className="font-medium text-white/55 hover:text-white">{t.changeHistory} →</a></div></div></section>

    <section id="story" className="border-b border-black/10 bg-[#f2ecdf] text-[#17130d]"><div className={`mx-auto grid max-w-6xl gap-12 ${sectionPad} lg:grid-cols-[.82fr_1.18fr] lg:items-center`}><div><LightEyebrow>{t.storyEyebrow}</LightEyebrow><h2 className="mt-3 max-w-xl text-3xl font-bold leading-tight tracking-[-0.035em] sm:text-4xl">{t.storyTitle}</h2><p className={`mt-5 max-w-2xl ${lightBody}`}>{t.storyText}</p><a href="/about" className="mt-6 inline-flex text-sm font-semibold text-[#8b5a12]">{t.about} →</a></div><div className="grid gap-3 sm:grid-cols-2"><Pillar title="MALTY Token" text={language==="pt"?"Transparência":"Transparency"}/><Pillar title="MALTY Community" text={language==="pt"?"Participação":"Participation"}/><Pillar title="MALTY Gives" text={language==="pt"?"Apoio a pets":"Pet support"}/><Pillar title="MALTY Impact" text={language==="pt"?"Prova pública":"Public proof"}/></div></div></section>

    <section className="border-b border-white/[0.07]"><div className={`mx-auto grid max-w-6xl gap-4 ${sectionPad} lg:grid-cols-2`}><div className={`${darkSurface} p-6 sm:p-8`}><Eyebrow>{t.verifiedEyebrow}</Eyebrow><h2 className="mt-3 text-2xl font-bold tracking-[-0.03em] sm:text-3xl">{t.verifiedTitle}</h2><div className="mt-6 grid gap-2 sm:grid-cols-2">{t.verifiedItems.map(x=><Fact key={x} text={x}/>)}</div></div><div className={`${darkSurface} p-6 sm:p-8`}><Eyebrow>{language==="pt"?"PRÓXIMOS PASSOS":"NEXT"}</Eyebrow><h2 className="mt-3 text-2xl font-bold tracking-[-0.03em] sm:text-3xl">{t.nextTitle}</h2><div className="mt-6 space-y-4">{t.nextItems.map((x,i)=><div key={x} className="flex items-start gap-4"><span className="mt-0.5 text-[11px] font-semibold text-[#e9b949]">0{i+1}</span><p className="text-sm leading-6 text-white/65">{x}</p></div>)}</div></div></div></section>

    <section id="token" className="border-b border-white/[0.07] bg-[#0c0f13]"><div className={`mx-auto max-w-6xl ${sectionPad}`}><Eyebrow>{t.tokenEyebrow}</Eyebrow><h2 className="mt-3 text-3xl font-bold tracking-[-0.035em] sm:text-4xl">{t.tokenTitle}</h2><p className={`mt-5 max-w-2xl ${textBody}`}>{t.tokenText}</p><div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3"><Stat label="Supply" value="1B MALTY"/><Stat label="Transfer tax" value="0%"/><Stat label="Decimals" value="6"/><Stat label="Mint Authority" value="Revoked"/><Stat label="Freeze Authority" value="None"/><Stat label="Network" value="Solana"/></div><div className="mt-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5"><p className="break-all font-mono text-xs leading-5 text-white/65">{MINT}</p><div className="mt-4 flex flex-wrap gap-5"><button onClick={copyMint} className="text-sm font-medium text-[#e9b949]">{copyState==="copied"?t.copied:copyState==="error"?t.copyFailed:t.copyMint}</button><a href={`https://explorer.solana.com/address/${MINT}`} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-white/55 hover:text-white">Solana Explorer ↗</a></div></div></div></section>

    <section className="border-b border-white/[0.07]"><div className={`mx-auto max-w-6xl ${sectionPad}`}><Eyebrow>{t.allocationEyebrow}</Eyebrow><div className="mt-3 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><h2 className="text-3xl font-bold tracking-[-0.035em] sm:text-4xl">{t.allocationTitle}</h2><p className={`mt-5 max-w-2xl ${textBody}`}>{t.allocationNote}</p></div><a href="/transparency" className="shrink-0 text-sm font-medium text-[#e9b949]">{t.reserveArchitecture} →</a></div><div className="mt-9 flex h-2.5 overflow-hidden rounded-full bg-white/[0.05]">{allocation.map(([name,,,width],i)=><div key={name} title={`${name} ${width}%`} style={{width:`${width}%`}} className={`${i%2===0?"bg-[#e9b949]":"bg-[#a9701f]"} border-r border-black/15 last:border-0`}/>)}</div><div className="mt-6 grid gap-3 sm:grid-cols-5">{allocation.map(([name,pct,amount])=><Allocation key={name} name={name} pct={pct} amount={amount}/>)}</div></div></section>

    <section id="gives" className="border-b border-black/10 bg-[#f2ecdf] text-[#17130d]"><div className={`mx-auto max-w-6xl ${sectionPad}`}><div className="grid gap-12 lg:grid-cols-2 lg:items-center"><div><div className="inline-flex rounded-full bg-[#9a6517]/10 px-3.5 py-2 text-[11px] font-semibold tracking-[0.12em] text-[#8b5a12]">🐾 MALTY GIVES · {t.givesStatus}</div><h2 className="mt-5 text-3xl font-bold leading-tight tracking-[-0.035em] sm:text-4xl">{t.givesTitle}</h2><p className={`mt-5 ${lightBody}`}>{t.givesText}</p><p className="mt-5 rounded-2xl border border-[#9a6517]/15 bg-white/45 p-4 text-sm leading-6 text-black/70">{t.givesNote}</p><a href="/gives" className="mt-6 inline-flex text-sm font-semibold text-[#8b5a12]">MALTY Gives →</a></div><div className="space-y-3">{t.givesTimeline.map((step,i)=><Timeline key={step} n={i+1} title={step} active={i===0}/>)}</div></div></div></section>

    <section id="roadmap" className="border-b border-white/[0.07]"><div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-14 lg:py-16"><Eyebrow>{t.roadmapEyebrow}</Eyebrow><h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-[-0.035em] sm:text-4xl">{t.roadmapTitle}</h2><div className="mt-8 grid gap-3 md:grid-cols-4"><Road state={language==="pt"?"CONCLUÍDO":"DONE"} title={language==="pt"?"Fundação":"Foundation"}/><Road state={language==="pt"?"PRÓXIMO":"NEXT"} title="MALTY Community"/><Road state={language==="pt"?"PLANEJADO":"PLANNED"} title={language==="pt"?"Primeira iniciativa pet":"First pet initiative"}/><Road state={language==="pt"?"FUTURO":"FUTURE"} title={language==="pt"?"Dashboard de impacto":"Impact Dashboard"}/></div><a href="/updates" className="mt-6 inline-flex text-sm font-medium text-[#e9b949]">{t.updates} →</a></div></section>

    <section id="faq" className="bg-[#0c0f13]"><div className={`mx-auto grid max-w-6xl gap-12 ${sectionPad} lg:grid-cols-[.72fr_1.28fr]`}><div><Eyebrow>FAQ</Eyebrow><h2 className="mt-3 text-3xl font-bold tracking-[-0.035em] sm:text-4xl">{t.faqTitle}</h2><div className="mt-6 flex flex-col items-start gap-3"><a href="/transparency" className="text-sm font-medium text-[#e9b949]">{t.transparency} →</a><a href="/docs" className="text-sm font-medium text-white/55 hover:text-white">{t.docs} →</a></div></div><div className="space-y-3"><Faq q={language==="pt"?"O que é MALTY?":"What is MALTY?"} a={language==="pt"?"MALTY é um projeto comunitário na Solana que reúne token, identidade, comunidade e uma missão de longo prazo de gerar impacto positivo para animais.":"MALTY is a community-driven Solana project connecting a token, identity, community and a long-term mission to create positive impact for animals."}/><Faq q={language==="pt"?"Podem criar mais MALTY?":"Can more MALTY be minted?"} a={language==="pt"?"A Mint Authority foi revogada.":"The Mint Authority has been revoked."}/><Faq q={language==="pt"?"Como o MALTY pretende ajudar pets?":"How does MALTY plan to help pets?"} a={language==="pt"?"Por meio do MALTY Gives: a comunidade poderá ajudar a identificar iniciativas, o projeto definirá critérios antes da ativação e cada ação concluída deverá ter prestação de contas pública.":"Through MALTY Gives: the community can help surface initiatives, the project will define criteria before activation, and completed actions should have public reporting."}/><Faq q={language==="pt"?"Quem está por trás do MALTY?":"Who is behind MALTY?"} a={language==="pt"?"O projeto é mantido por uma equipe responsável pelo desenvolvimento, documentação pública e operação da comunidade. O MALTY ainda não se apresenta como um projeto de governança descentralizada. Veja a página Sobre para detalhes de responsabilidade.":"MALTY is stewarded by a project team responsible for development, public documentation and community operations. The project does not present itself as decentralized governance today. See the About page for stewardship details."}/><Faq q={language==="pt"?"Existe trava (vesting) para os tokens da equipe?":"Is there a lock or vesting mechanism for team tokens?"} a={language==="pt"?"A reserva da equipe segue uma política pública de liberação em parcelas mensais, mas o mecanismo técnico de trava on-chain ainda está em definição. Nenhum saldo de reserva foi movimentado até o momento — veja a Central de Transparência para o estado atual.":"The team reserve follows a public monthly-release policy, but the on-chain enforcement mechanism is still being defined. No reserve balance has moved to date — see the Transparency center for the current state."}/><Faq q={language==="pt"?"Onde posso comprar MALTY?":"Where can I buy MALTY?"} a={language==="pt"?"O MALTY ainda não tem um pool de liquidez ativo. Quando o lançamento acontecer, o link oficial de compra será publicado aqui e na Central de Transparência — desconfie de qualquer link de compra anunciado em outro lugar antes disso.":"MALTY does not yet have an active liquidity pool. When launch happens, the official buy link will be published here and in the Transparency center — treat any buy link announced elsewhere before then as untrusted."}/></div></div></section>

    <footer className="border-t border-white/[0.07] px-5 py-12 sm:px-8 sm:py-14"><div className="mx-auto max-w-6xl"><div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4"><div><p className="text-lg font-bold tracking-[-0.02em] text-[#e9b949]">MALTY</p><p className="mt-2 text-sm font-medium text-white/90">Small Dog. Big Community.</p><p className="mt-4 max-w-xs text-sm leading-6 text-white/50">Community-powered, pet-focused and built around public verification.</p></div><FooterCol title={t.footerProject} links={[[language==="pt"?"Sobre":"About","/about"],["MALTY Gives","/gives"],[language==="pt"?"Atualizações":"Updates","/updates"]]}/><FooterCol title={t.footerVerify} links={[[language==="pt"?"Transparência":"Transparency","/transparency"],[language==="pt"?"Documentação":"Documentation","/docs"],["Solana Explorer",`https://explorer.solana.com/address/${MINT}`]]}/><div><p className="text-sm font-semibold text-white/75">{t.footerStatus}</p><p className="mt-4 text-sm text-white/55">Solana Mainnet · Live</p><p className="mt-4 text-xs font-medium text-white/40">{t.footerMint}</p><p className="mt-2 break-all font-mono text-[11px] leading-5 text-white/45">{MINT}</p></div></div><div className="mt-10 border-t border-white/[0.07] pt-6"><p className="max-w-4xl text-xs leading-5 text-white/40">{t.risk}</p></div></div></footer>
  </main>;
}

function Eyebrow({children}:{children:React.ReactNode}){return <p className="text-[11px] font-semibold tracking-[0.14em] text-[#e9b949]">{children}</p>}
function LightEyebrow({children}:{children:React.ReactNode}){return <p className="text-[11px] font-semibold tracking-[0.14em] text-[#8b5a12]">{children}</p>}
function SolanaMark({className}:{className?:string}){return <svg className={className} viewBox="0 0 13 13" fill="none"><defs><linearGradient id="solg-hero" x1="0" y1="13" x2="13" y2="0"><stop offset="0" stopColor="#9945FF"/><stop offset="1" stopColor="#14F195"/></linearGradient></defs><rect x="0.4" y="1.2" width="10.5" height="2" rx="1" transform="skewX(-18)" fill="url(#solg-hero)"/><rect x="0.4" y="5.5" width="10.5" height="2" rx="1" transform="skewX(-18)" fill="url(#solg-hero)" opacity=".55"/><rect x="0.4" y="9.8" width="10.5" height="2" rx="1" transform="skewX(-18)" fill="url(#solg-hero)"/></svg>}
function Status({label,value}:{label:string;value:string}){return <div className="min-w-28 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3"><p className="text-[11px] font-medium text-white/45">{label}</p><p className="mt-1.5 text-sm font-semibold text-emerald-300">{value}</p></div>}
function Stat({label,value}:{label:string;value:string}){return <div className={`${darkSurface} p-4 transition-transform hover:-translate-y-0.5`}><p className="text-[11px] font-medium text-white/45">{label}</p><p className="mt-2 text-base font-semibold tracking-[-0.02em] text-white/92">{value}</p></div>}
function Allocation({name,pct,amount}:{name:string;pct:string;amount:string}){return <div className={`${darkSurface} p-4 transition-transform hover:-translate-y-0.5`}><p className="text-sm font-semibold text-[#e9b949]">{pct}</p><p className="mt-3 text-sm font-semibold text-white/90">{name}</p><p className="mt-1.5 text-[11px] leading-5 text-white/45">{amount} MALTY · planned</p></div>}
function Pillar({title,text}:{title:string;text:string}){return <div className="rounded-2xl border border-black/10 bg-white/55 p-5"><p className="text-sm font-semibold text-[#8b5a12]">{title}</p><p className="mt-2 text-sm leading-6 text-black/70">{text}</p></div>}
function Fact({text}:{text:string}){return <div className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-black/10 px-3.5 py-3"><span className="text-emerald-300">✓</span><p className="text-sm font-medium text-white/70">{text}</p></div>}
function Timeline({n,title,active}:{n:number;title:string;active:boolean}){return <div className={`flex items-center gap-4 rounded-2xl border p-5 ${active?"border-[#9a6517]/30 bg-white/65":"border-black/10 bg-white/35"}`}><span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${active?"bg-[#8b5a12] text-white":"bg-black/10 text-black/60"}`}>{n}</span><div><p className="text-sm font-semibold">{title}</p><p className="mt-1 text-xs text-black/60">{active?"Current stage":"Future stage"}</p></div></div>}
function Road({state,title}:{state:string;title:string}){return <div className={`${darkSurface} p-5`}><p className="text-[11px] font-semibold tracking-[0.12em] text-[#e9b949]">{state}</p><p className="mt-4 text-sm font-semibold text-white/90">{title}</p></div>}
function Faq({q,a}:{q:string;a:string}){return <details className={`${darkSurface} px-5 py-4`}><summary className="cursor-pointer text-[15px] font-semibold text-white/90">{q}</summary><p className="mt-3 max-w-2xl text-sm leading-6 text-white/60">{a}</p></details>}
function FooterCol({title,links}:{title:string;links:readonly (readonly [string,string])[]}){return <div><p className="text-sm font-semibold text-white/75">{title}</p><div className="mt-4 flex flex-col items-start gap-3">{links.map(([label,href])=>{const external=href.startsWith("http");return <a key={label} href={href} target={external?"_blank":undefined} rel={external?"noopener noreferrer":undefined} className="text-sm text-white/50 hover:text-[#e9b949]">{label}{external?" ↗":""}</a>;})}</div></div>}
