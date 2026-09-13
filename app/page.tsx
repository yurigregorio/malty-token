"use client";

import Image from "next/image";
import { useState } from "react";
import {
  MALTY_POOL_CREATION_TX,
  MALTY_PUBLIC_MINT,
  MALTY_RAYDIUM_POOL_ID,
  MALTY_RAYDIUM_SWAP_URL,
  MALTY_ROADMAP_CURRENT_STEP,
  MALTY_SOLSCAN_POOL_URL,
  MALTY_SOLSCAN_TOKEN_URL,
  MALTY_TEST_BUY_TX,
  MALTY_TOKEN,
  getReviewDateShort,
} from "./lib/malty-token";
import { useLanguage } from "./lib/language";
import { SiteHeader } from "./components/site-header";

const MINT = MALTY_PUBLIC_MINT;
const TOKEN_IMAGE = MALTY_TOKEN.imageUri;
const POOL_ID = MALTY_RAYDIUM_POOL_ID;

const allocation = [
  ["Liquidity", "50%", "500M", 50],
  ["Ecosystem", "15%", "150M", 15],
  ["Community", "15%", "150M", 15],
  ["MALTY Impact", "5%", "50M", 5],
  ["Treasury", "7.5%", "75M", 7.5],
  ["Team", "7.5%", "75M", 7.5],
] as const;

const allocationIcons = [
  <svg key="liquidity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2.1-1.1-4.1-3-5.7-1.6-1.4-3-3.6-4-6-1 2.4-2.4 4.6-4 6-1.9 1.6-3 3.6-3 5.7a7 7 0 0 0 7 7Z"/></svg>,
  <svg key="ecosystem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10Z"/><path d="M2 21c0-3 1.9-5.4 5.1-6C9.5 14.5 12 13 13 12"/></svg>,
  <svg key="community" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  <svg key="impact" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 4.6a5 5 0 0 0-7.07 0L12 5.3l-1.73-.7a5 5 0 0 0-7.07 7.07L12 20.4l8.8-8.73a5 5 0 0 0 0-7.07Z"/></svg>,
  <svg key="treasury" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M3 22h18"/><path d="M6 18v-7M10 18v-7M14 18v-7M18 18v-7"/><path d="M2 8 12 3l10 5"/><path d="M2 8h20"/></svg>,
  <svg key="team" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
];

const roadmapIcons = [
  <svg key="foundation" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"><path d="M5 21V4.2c0-.6.5-1 1.1-.9 1.8.4 3.9 1.4 5.9 1.4s3.6-1 5.4-1c.6 0 1.1.5 1.1 1.1v9.1c0 .5-.4.9-.9 1-1.8.4-3.9 1.4-5.9 1.4s-3.6-1-5.4-1"/></svg>,
  <svg key="community" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  <svg key="pet" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 4.6a5 5 0 0 0-7.07 0L12 5.3l-1.73-.7a5 5 0 0 0-7.07 7.07L12 20.4l8.8-8.73a5 5 0 0 0 0-7.07Z"/></svg>,
  <svg key="dashboard" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"><path d="M4 20V10M12 20V4M20 20v-7"/></svg>,
];

const roadmapStages = {
  en: [
    { status: "completed", title: "Foundation", subtitle: "The base for a sustainable project.",
      items: [["Token deployed", true], ["Mint authority revoked", true], ["Reserves fully funded", true], ["Transparency tools", true], ["Live on Raydium", true]] },
    { status: "in-progress", title: "MALTY Community", subtitle: "Grow, engage and build together.",
      items: [["Community channels live", true], ["Grow holders and supporters", false], ["Establish governance model", false], ["Prepare first impact initiative", false]] },
    { status: "planned", title: "First pet initiative", subtitle: "Turn coins into real help.",
      items: [["Define selection criteria", false], ["Community voting", false], ["Execute first initiative", false], ["Publish results", false]] },
    { status: "planned", title: "Impact Dashboard", subtitle: "Public data. Real impact.",
      items: [["Track all donations", false], ["Show beneficiaries", false], ["On-chain evidence", false], ["Ongoing impact history", false]] },
  ],
  pt: [
    { status: "completed", title: "Fundação", subtitle: "A base para um projeto sustentável.",
      items: [["Token implantado", true], ["Mint authority revogada", true], ["Reservas totalmente financiadas", true], ["Ferramentas de transparência", true], ["Ao vivo na Raydium", true]] },
    { status: "in-progress", title: "MALTY Community", subtitle: "Crescer, engajar e construir juntos.",
      items: [["Canais da comunidade no ar", true], ["Crescer holders e apoiadores", false], ["Estabelecer modelo de governança", false], ["Preparar primeira iniciativa", false]] },
    { status: "planned", title: "Primeira iniciativa pet", subtitle: "Transformar moedas em ajuda real.",
      items: [["Definir critérios de seleção", false], ["Votação da comunidade", false], ["Executar primeira iniciativa", false], ["Publicar resultados", false]] },
    { status: "planned", title: "Dashboard de impacto", subtitle: "Dados públicos. Impacto real.",
      items: [["Rastrear todas as doações", false], ["Mostrar beneficiários", false], ["Evidência on-chain", false], ["Histórico contínuo de impacto", false]] },
  ],
} as const;

const missionPillars = {
  en: [
    ["Token", "Verifiable information", "Token data, tokenomics and contracts available for public review."],
    ["Community", "Participation and dialogue", "A space to exchange ideas, contribute and follow the next steps."],
    ["MALTY Gives", "Planned · Animal-welfare support", "A planned initiative to support animal welfare, with clear execution criteria."],
    ["Reporting", "Evidence after every action", "Public records and evidence for every completed initiative."],
  ],
  pt: [
    ["Token", "Informações verificáveis", "Dados do token, tokenomics e contratos disponíveis para consulta pública."],
    ["Comunidade", "Participação e diálogo", "Espaço para trocar ideias, contribuir e acompanhar os próximos passos."],
    ["MALTY Gives", "Planejado · Apoio ao bem-estar animal", "Iniciativa planejada para apoiar o bem-estar animal, com critérios claros de execução."],
    ["Prestação de contas", "Evidências após cada ação", "Registros e evidências públicas de cada iniciativa realizada."],
  ],
} as const;

const copy = {
  en: {
    badge: "LIVE ON SOLANA MAINNET", headline: "Small Dog. Big Community.",
    intro: "MALTY is now live on Solana. A community project built on one simple principle: prove, don't promise. The long-term goal is to turn that transparency into real, verifiable impact for animal welfare.",
    primaryCta: "Buy $MALTY", secondaryCta: "View on Solscan", statusEyebrow: "PROJECT STATUS", publicStatusLabel: "Public status",
    heroFacts: ["Solana Mainnet", "Live on Raydium", "Fixed Supply: 1B", "0% Transfer Tax", "Mint Authority Revoked"],
    verifyTransparency: "Verify transparency", changeHistory: "View change history", storyEyebrow: "THE MALTY MISSION", storyTitle: "Community with a purpose.",
    storyText: "MALTY connects four parts of one project: a transparent token, a strong identity, an open community and MALTY Gives — a planned initiative designed to support animal-welfare projects with public evidence of real-world impact.", about: "About MALTY",
    verifiedEyebrow: "PROOF, NOT PROMISES", proofTitle: "Built on proof. Moving with purpose.",
    proofSubtitle: "A fair launch. A transparent foundation. A kinder tomorrow for pets. Here's what's verified on-chain today — and what's next.",
    verifiedTitle: "Verified today", verifiedSubtitle: "Core facts, on-chain and verifiable.",
    nextTitle: "What's next", nextSubtitle: "A clear roadmap for real-world impact.",
    viewEvidence: "View on-chain evidence", exploreGives: "Explore MALTY Gives",
    verifiedItems: ["1B fixed supply", "Mint Authority revoked", "No Freeze Authority", "0% transfer tax", "Public reserve architecture", "Mainnet deployment verified", "Live on Raydium (MALTY/SOL)"],
    nextItems: [
      ["Grow the MALTY community", "More pet lovers. A stronger voice. A bigger impact ahead."],
      ["Publish MALTY Gives operating criteria", "A clear, transparent framework for doing good."],
      ["Complete the first pet initiative", "Turn community support into real-world help for pets."],
      ["Publish verifiable impact evidence", "Show what's been achieved, on-chain and beyond."],
    ],
    tradeEyebrow: "TRADE $MALTY", tradeTitle: "Buy or sell MALTY on Raydium.",
    tradeText: "MALTY is available through the official MALTY/SOL liquidity pool on Raydium.",
    buyOnRaydium: "Buy on Raydium", viewPool: "View Pool",
    pairLabel: "Pair", dexLabel: "DEX", feeTierLabel: "Fee tier", poolIdLabel: "Pool ID", initialLiquidityLabel: "Initial pool liquidity",
    tradeWarning: "Always verify the official MALTY contract before trading.",
    tradeLiquidityNote: "The pool's initial 5,000,000 MALTY + 0.5 SOL was funded from the 500,000,000 MALTY Liquidity Reserve. The remaining 495,000,000 MALTY stays directly in the Liquidity Reserve wallet for future market-making.",
    lpCustodyNote: "LP tokens remain under the project's custody wallet. They are not locked or burned.",
    poolCreationLabel: "Pool creation", testBuyLabel: "Test buy confirmed",
    tokenEyebrow: "OFFICIAL TOKEN", tokenTitle: "Clear facts. Publicly verifiable.", tokenText: "The essentials of the official MALTY token, presented openly and without hiding the project structure behind marketing.",
    allocationEyebrow: "TOKENOMICS", allocationTitle: "Published allocation plan", allocationNote: "Planned allocations. Distribution is not confirmed.", reserveArchitecture: "Full reserve architecture",
    totalSupplyLabel: "Total supply", allocationStatus: "Status", allocationStatusPlanned: "Planned", viewReserveDetails: "View reserve details",
    allocationLiquidityNote: "5,000,000 MALTY of the 500M Liquidity Reserve was deployed as the Raydium pool's initial liquidity (+ 0.5 SOL). The remaining 495,000,000 MALTY stays held in reserve for future market-making.",
    givesTitle: "Community-powered. Pet-focused.", givesText: "MALTY Gives is being designed as the impact layer of the project. The community can help surface meaningful animal-welfare initiatives, while selection rules and completed actions are documented publicly.",
    givesStatus: "PLANNED INITIATIVE", givesNote: "The program is not active yet. Funding rules, beneficiary criteria and reporting standards will be published before the first initiative begins.",
    roadmapEyebrow: "ROADMAP", roadmapTitle: "Small steps. Big impact.", roadmapDesc: "Our roadmap turns community power into real help for pets. Transparent, measurable and community-driven.", roadmapCta: "View full roadmap", viewProof: "View proof", statusCompleted: "Completed", statusInProgress: "In progress", statusPlanned: "Planned", updates: "Project updates",
    faqTitle: "Quick answers", transparency: "Transparency center", docs: "Public documentation", copyMint: "Copy address", copied: "Copied", copyFailed: "Copy failed",
    risk: "MALTY is a community-driven digital token on Solana. Project information is provided for transparency and does not promise price, returns, liquidity or future value. MALTY Gives is planned and is not currently an active donation program.",
    footerProject: "Project", footerVerify: "Verify", footerCommunity: "Community", footerStatus: "Status", footerMint: "Official mint",
  },
  pt: {
    badge: "AO VIVO NA SOLANA MAINNET", headline: "Cão pequeno. Grande comunidade.",
    intro: "O MALTY já está ao vivo na Solana. Um projeto comunitário construído sobre um princípio simples: provar, não prometer. O objetivo de longo prazo é transformar essa transparência em impacto real e verificável para o bem-estar animal.",
    primaryCta: "Comprar $MALTY", secondaryCta: "Ver no Solscan", statusEyebrow: "STATUS DO PROJETO", publicStatusLabel: "Status público",
    heroFacts: ["Solana Mainnet", "Ao vivo na Raydium", "Supply fixo: 1B", "0% de taxa", "Mint Authority revogada"],
    verifyTransparency: "Verificar transparência", changeHistory: "Ver histórico de alterações", storyEyebrow: "A MISSÃO MALTY", storyTitle: "Comunidade com propósito.",
    storyText: "MALTY conecta quatro partes de um mesmo projeto: token transparente, identidade forte, comunidade aberta e MALTY Gives — uma iniciativa planejada para apoiar projetos de bem-estar animal com evidências públicas do impacto gerado.", about: "Sobre o MALTY",
    verifiedEyebrow: "PROVAS, NÃO PROMESSAS", proofTitle: "Construído sobre provas. Andando com propósito.",
    proofSubtitle: "Um lançamento justo. Uma base transparente. Um amanhã melhor para os pets. Aqui está o que já está verificado on-chain hoje — e o que vem a seguir.",
    verifiedTitle: "Verificado hoje", verifiedSubtitle: "Fatos centrais, on-chain e auditáveis.",
    nextTitle: "O que vem a seguir", nextSubtitle: "Um roteiro claro para impacto real.",
    viewEvidence: "Ver evidências on-chain", exploreGives: "Explorar MALTY Gives",
    verifiedItems: ["Supply fixo de 1B", "Mint Authority revogada", "Sem Freeze Authority", "0% de taxa de transferência", "Arquitetura pública de reservas", "Deploy Mainnet verificável", "Ao vivo na Raydium (MALTY/SOL)"],
    nextItems: [
      ["Expandir a comunidade MALTY", "Mais tutores. Uma voz mais forte. Mais impacto à frente."],
      ["Publicar critérios operacionais do MALTY Gives", "Um framework claro e transparente para fazer o bem."],
      ["Concluir a primeira iniciativa pet", "Transformar apoio da comunidade em ajuda real para os pets."],
      ["Publicar evidências verificáveis de impacto", "Mostrar o que foi realizado, on-chain e além."],
    ],
    tradeEyebrow: "NEGOCIAR $MALTY", tradeTitle: "Compre ou venda MALTY na Raydium.",
    tradeText: "O MALTY está disponível através do pool oficial de liquidez MALTY/SOL na Raydium.",
    buyOnRaydium: "Comprar na Raydium", viewPool: "Ver Pool",
    pairLabel: "Par", dexLabel: "DEX", feeTierLabel: "Taxa da pool", poolIdLabel: "ID do Pool", initialLiquidityLabel: "Liquidez inicial do pool",
    tradeWarning: "Sempre verifique o contrato oficial do MALTY antes de negociar.",
    tradeLiquidityNote: "Os 5.000.000 MALTY + 0,5 SOL iniciais do pool vieram da Reserva de Liquidez de 500.000.000 MALTY. Os 495.000.000 MALTY restantes seguem diretamente na carteira da reserva para futuras ações de mercado.",
    lpCustodyNote: "Os tokens de LP continuam sob custódia da carteira do projeto. Eles não estão travados nem foram queimados.",
    poolCreationLabel: "Criação do pool", testBuyLabel: "Compra de teste confirmada",
    tokenEyebrow: "TOKEN OFICIAL", tokenTitle: "Dados claros. Verificáveis publicamente.", tokenText: "O essencial sobre o token oficial MALTY, apresentado de forma aberta e sem esconder a estrutura do projeto atrás do marketing.",
    allocationEyebrow: "TOKENOMICS", allocationTitle: "Plano de alocação publicado", allocationNote: "Alocações planejadas. A distribuição não está confirmada.", reserveArchitecture: "Arquitetura completa das reservas",
    totalSupplyLabel: "Supply total", allocationStatus: "Status", allocationStatusPlanned: "Planejado", viewReserveDetails: "Ver detalhes da reserva",
    allocationLiquidityNote: "5.000.000 MALTY da Reserva de Liquidez de 500M foram usados como liquidez inicial do pool na Raydium (+ 0,5 SOL). Os 495.000.000 MALTY restantes seguem reservados para futuras ações de mercado.",
    givesTitle: "Movido pela comunidade. Focado em pets.", givesText: "MALTY Gives está sendo estruturado como a frente de impacto do projeto. A comunidade poderá ajudar a identificar iniciativas relevantes, enquanto regras de seleção e ações concluídas serão documentadas publicamente.",
    givesStatus: "INICIATIVA PLANEJADA", givesNote: "O programa ainda não está ativo. Regras de financiamento, critérios de beneficiários e padrões de prestação de contas serão publicados antes da primeira iniciativa.",
    roadmapEyebrow: "ROADMAP", roadmapTitle: "Passos pequenos. Grande impacto.", roadmapDesc: "Nosso roadmap transforma o poder da comunidade em ajuda real para os pets. Transparente, mensurável e feito pela comunidade.", roadmapCta: "Ver roadmap completo", viewProof: "Ver provas", statusCompleted: "Concluído", statusInProgress: "Em andamento", statusPlanned: "Planejado", updates: "Atualizações do projeto",
    faqTitle: "Respostas rápidas", transparency: "Central de transparência", docs: "Documentação pública", copyMint: "Copiar endereço", copied: "Copiado", copyFailed: "Falha ao copiar",
    risk: "MALTY é um token digital comunitário construído na Solana. As informações do projeto são publicadas por transparência e não prometem preço, retorno, liquidez ou valor futuro. MALTY Gives é planejado e ainda não é um programa ativo de doações.",
    footerProject: "Projeto", footerVerify: "Verificar", footerCommunity: "Comunidade", footerStatus: "Status", footerMint: "Mint oficial",
  }
} as const;

const sectionPad = "px-5 py-16 sm:px-8 sm:py-20 lg:py-24";
const textBody = "text-[15px] leading-7 text-white/65 sm:text-base";
const lightBody = "text-[15px] leading-7 text-black/65 sm:text-base";
const darkSurface = "rounded-2xl border border-white/[0.08] bg-white/[0.025]";

export default function Home() {
  const { language } = useLanguage();
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const [expandedAllocation, setExpandedAllocation] = useState<string | null>(allocation[0][0]);
  const t = copy[language];

  async function copyMint() {
    try { await navigator.clipboard.writeText(MINT); setCopyState("copied"); }
    catch { setCopyState("error"); }
    window.setTimeout(() => setCopyState("idle"), 1600);
  }

  return <main className="min-h-screen overflow-x-hidden bg-[#080a0d] text-[#f7f1e5] selection:bg-[#d9a53d] selection:text-black">
    <SiteHeader />

    <div id="top" className="relative">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_76%_28%,rgba(217,165,61,0.15),transparent_50%)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-5 py-8 sm:px-8 sm:py-10 lg:grid-cols-[1.06fr_.94fr] lg:gap-9 lg:py-12">
        <div>
          <div className="inline-flex select-none items-center gap-2 rounded-full border border-[#e9b949]/18 bg-[#e9b949]/[0.04] px-3.5 py-2 text-[11px] font-semibold tracking-[0.12em] text-[#e9b949]">
            <span className="relative flex h-1.5 w-1.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" /></span>{t.badge}
          </div>
          <h1 className="mt-[18px] select-none text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-[4.6rem]">MALTY<span className="text-[#e9b949]">.</span></h1>
          <p className="mt-2.5 select-none text-xl font-semibold tracking-[-0.02em] text-white/92 sm:text-2xl">{t.headline}</p>
          <p className={`mt-3 max-w-2xl ${textBody}`}>{t.intro}</p>
          <div className="mt-[22px] flex flex-wrap gap-3">
            <a href={MALTY_RAYDIUM_SWAP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex select-none items-center gap-2 rounded-xl bg-[#e9b949] px-5 py-3 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5">
              <span className="h-3.5 w-3.5 rounded-full bg-[conic-gradient(from_200deg,#ffe59a,#d9a53d_45%,#6f4210_80%,#ffe59a)] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.25)]" />
              {t.primaryCta}
            </a>
            <a href={MALTY_SOLSCAN_TOKEN_URL} target="_blank" rel="noopener noreferrer" className="select-none rounded-xl border border-white/[0.1] px-5 py-3 text-sm font-semibold text-white/80 transition-colors hover:border-[#e9b949]/35 hover:text-white">{t.secondaryCta} ↗</a>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {t.heroFacts.map(fact => <span key={fact} className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] px-2.5 py-1 text-[11px] font-medium text-white/70"><span className="text-emerald-300">✓</span>{fact}</span>)}
          </div>
          <div className="mt-3 inline-flex max-w-full flex-wrap items-center gap-2.5 rounded-xl border border-white/[0.08] bg-black/15 px-3.5 py-2.5">
            <span className="font-mono text-[11px] text-white/60 sm:text-xs">{MINT.slice(0, 6)}...{MINT.slice(-6)}</span>
            <button onClick={copyMint} className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.1] bg-white/[0.04] px-2.5 py-1 text-[11px] font-semibold text-white/85 transition-colors hover:border-[#e9b949]/35">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3 w-3"><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V6a2 2 0 0 1 2-2h9" /></svg>
              {copyState==="copied"?t.copied:copyState==="error"?t.copyFailed:t.copyMint}
            </button>
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

      <div className="relative border-b border-white/[0.07]">
        <div className="mx-auto max-w-6xl px-5 py-6 sm:px-8">
        <div className="flex flex-wrap items-center gap-4 rounded-xl border border-white/[0.07] bg-white/[0.02] px-5 py-3.5 sm:gap-5">
          <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#e9b949]">{t.statusEyebrow}</span>
          <span className="hidden h-4 w-px bg-white/[0.1] sm:block" />
          <span className="flex items-center gap-2 text-[13px] font-semibold">
            <span className="relative flex h-[7px] w-[7px]">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-emerald-400" />
            </span>
            {language==="pt"?"Token na Solana":"Token on Solana"}
            <span className="text-[11px] font-normal text-white/55">{language==="pt"?"Publicado":"Published"}</span>
          </span>
          <span className="hidden h-4 w-px bg-white/[0.1] sm:block" />
          <span className="flex items-center gap-2 text-[13px] font-semibold">
            <span className="relative flex h-[7px] w-[7px]">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-emerald-400" />
            </span>
            {language==="pt"?"Ao vivo na Raydium":"Live on Raydium"}
            <span className="text-[11px] font-normal text-white/55">{language==="pt"?"Negociável":"Trading"}</span>
          </span>
          <span className="hidden h-4 w-px bg-white/[0.1] sm:block" />
          <span className="flex items-center gap-2 text-[13px] font-semibold">
            <span className="h-[7px] w-[7px] rounded-full bg-[#e9b949]" />
            MALTY Gives
            <span className="text-[11px] font-normal text-white/55">{language==="pt"?"Planejado":"Planned"}</span>
          </span>
          <div className="ml-auto flex flex-wrap items-center gap-4">
            <span className="text-[11px] text-white/55">{language==="pt"?"Atualizado":"Updated"} · {getReviewDateShort(language)}</span>
            <a href="/transparency" className="text-[13px] font-semibold text-[#e9b949]">{t.verifyTransparency} ↗</a>
            <a href="/updates" className="text-[13px] font-semibold text-white/55 hover:text-white">{language==="pt"?"Histórico":"History"} ↗</a>
          </div>
        </div>
      </div>
      </div>
    </div>

    <section id="trade" className="border-b border-white/[0.07] bg-[#0c0f13]">
      <div className={`mx-auto max-w-6xl ${sectionPad}`}>
        <Eyebrow>{t.tradeEyebrow}</Eyebrow>
        <h2 className="mt-3 text-3xl font-bold tracking-[-0.035em] sm:text-4xl">{t.tradeTitle}</h2>
        <p className={`mt-4 max-w-2xl ${textBody}`}>{t.tradeText}</p>

        <div className="mt-8 overflow-hidden rounded-2xl border border-white/[0.08]">
          <div className="flex flex-col sm:flex-row">
            <div className="flex min-w-[190px] flex-col justify-center gap-1.5 border-b border-white/[0.08] bg-[#e9b949]/[0.03] p-6 sm:border-b-0 sm:border-r">
              <span className="text-2xl font-extrabold tracking-[-0.02em] text-[#e9b949]">MALTY/SOL</span>
              <span className="text-[13px] text-white/55">Raydium · CPMM</span>
            </div>
            <div className="flex-1">
              <div className="grid divide-y divide-white/[0.07] sm:grid-cols-2 sm:divide-y-0">
                <TokenFact label={t.feeTierLabel} value="0.25%" right />
                <TokenFact label={t.initialLiquidityLabel} value="5M MALTY + 0.5 SOL" />
              </div>
            </div>
          </div>
          <div className="border-t border-white/[0.08] bg-white/[0.015] p-5">
            <p className="text-[11px] font-medium text-white/45">{t.poolIdLabel}</p>
            <p className="mt-0.5 break-all font-mono text-xs text-white/80">{POOL_ID}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a href={MALTY_RAYDIUM_SWAP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex select-none items-center gap-2 rounded-xl bg-[#e9b949] px-5 py-3 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5">{t.buyOnRaydium} ↗</a>
          <a href={MALTY_SOLSCAN_POOL_URL} target="_blank" rel="noopener noreferrer" className="select-none rounded-xl border border-white/[0.1] px-5 py-3 text-sm font-semibold text-white/80 transition-colors hover:border-[#e9b949]/35 hover:text-white">{t.viewPool} ↗</a>
          <a href={MALTY_SOLSCAN_TOKEN_URL} target="_blank" rel="noopener noreferrer" className="select-none rounded-xl border border-white/[0.1] px-5 py-3 text-sm font-semibold text-white/80 transition-colors hover:border-[#e9b949]/35 hover:text-white">{t.secondaryCta} ↗</a>
        </div>

        <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-[#e9b949]/15 bg-[#e9b949]/[0.03] px-4 py-3.5">
          <span className="mt-0.5 text-[#e9b949]">⚠</span>
          <p className="text-xs leading-5 text-white/60">{t.tradeWarning} <span className="mt-1 block break-all font-mono text-[11px] text-white/50">{MINT}</span></p>
        </div>
        <p className="mt-4 max-w-2xl text-xs leading-5 text-white/45">{t.tradeLiquidityNote}</p>
        <p className="mt-2 max-w-2xl text-xs leading-5 text-white/45">{t.lpCustodyNote}</p>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[12px]">
          <a href={`https://solscan.io/tx/${MALTY_POOL_CREATION_TX}`} target="_blank" rel="noopener noreferrer" className="text-white/45 hover:text-[#e9b949]">{t.poolCreationLabel} ↗</a>
          <a href={`https://solscan.io/tx/${MALTY_TEST_BUY_TX}`} target="_blank" rel="noopener noreferrer" className="text-white/45 hover:text-[#e9b949]">{t.testBuyLabel} ↗</a>
        </div>
      </div>
    </section>

    <section id="story" className="border-b border-black/10 bg-[#f2ecdf] text-[#17130d]">
      <div className="mx-auto max-w-6xl px-5 py-9 sm:px-8 sm:py-11 lg:py-12">
        <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:items-center">
          <div>
            <LightEyebrow>{t.storyEyebrow}</LightEyebrow>
            <h2 className="mt-3 max-w-xl text-3xl font-bold leading-tight tracking-[-0.035em] sm:text-4xl">{t.storyTitle}</h2>
            <p className={`mt-5 max-w-2xl ${lightBody}`}>{t.storyText}</p>
            <a href="/about" className="mt-6 inline-flex text-sm font-semibold text-[#8b5a12]">{t.about} →</a>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {missionPillars[language].map(([title, tag, text], i) => (
              <MissionPillar key={title} icon={missionIcons[i]} title={title} tag={tag} text={text} last={i === missionPillars[language].length - 1} />
            ))}
          </div>
        </div>
      </div>
    </section>

    <section id="proof" className="border-b border-white/[0.07]">
      <div className={`mx-auto max-w-6xl ${sectionPad}`}>
        <div className="max-w-2xl">
          <Eyebrow>{t.verifiedEyebrow}</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold tracking-[-0.035em] sm:text-4xl">{t.proofTitle}</h2>
          <p className={`mt-4 ${textBody}`}>{t.proofSubtitle}</p>
        </div>
        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h3 className="text-xl font-bold tracking-[-0.02em]">{t.verifiedTitle}</h3>
            <p className="mt-1.5 text-[13px] text-white/45">{t.verifiedSubtitle}</p>
            <div className="mt-5 flex flex-col gap-2">
              {t.verifiedItems.map(x => <FactLink key={x} text={x} href={x.includes("Raydium") ? MALTY_SOLSCAN_POOL_URL : `https://explorer.solana.com/address/${MINT}`} />)}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-[-0.02em]">{t.nextTitle}</h3>
            <p className="mt-1.5 text-[13px] text-white/45">{t.nextSubtitle}</p>
            <div className="mt-5">
              {t.nextItems.map(([title, text], i) => (
                <TimelineStep key={title} n={i + 1} title={title} text={text} active={i + 1 === MALTY_ROADMAP_CURRENT_STEP} last={i === t.nextItems.length - 1} />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.07] pt-6">
          <a href={`https://explorer.solana.com/address/${MINT}`} target="_blank" rel="noopener noreferrer" className="text-[13px] font-semibold text-[#e9b949]">{t.viewEvidence} ↗</a>
          <a href="/gives" className="inline-flex items-center gap-1.5 rounded-xl border border-[#e9b949] px-4.5 py-2.5 text-[13px] font-bold text-[#e9b949] transition-colors hover:bg-[#e9b949]/10">{t.exploreGives} →</a>
        </div>
      </div>
    </section>

    <section id="token" className="border-b border-white/[0.07] bg-[#0c0f13]">
      <div className={`mx-auto max-w-6xl ${sectionPad}`}>
        <Eyebrow>{t.tokenEyebrow}</Eyebrow>
        <h2 className="mt-3 text-3xl font-bold tracking-[-0.035em] sm:text-4xl">{t.tokenTitle}</h2>
        <p className={`mt-5 max-w-2xl ${textBody}`}>{t.tokenText}</p>

        <div className="mt-8 overflow-hidden rounded-2xl border border-white/[0.08]">
          <div className="flex flex-col sm:flex-row">
            <div className="flex min-w-[190px] flex-col justify-center gap-1.5 border-b border-white/[0.08] bg-[#e9b949]/[0.03] p-6 sm:border-b-0 sm:border-r">
              <span className="text-3xl font-extrabold tracking-[-0.02em] text-[#e9b949]">$MALTY</span>
              <span className="text-[13px] text-white/55">{language==="pt"?"Token na Solana":"Token on Solana"}</span>
            </div>
            <div className="flex-1">
              <div className="grid divide-y divide-white/[0.07] sm:grid-cols-2 sm:divide-y-0">
                <TokenFact label={language==="pt"?"Rede":"Network"} value={<span className="inline-flex items-center gap-1.5"><SolanaMark className="h-[13px] w-[13px]" id="solg-token" />Solana Mainnet</span>} right />
                <TokenFact label={language==="pt"?"Oferta total":"Total supply"} value={language==="pt"?"1 bilhão de MALTY":"1 billion MALTY"} />
              </div>
              <div className="grid divide-y divide-white/[0.07] border-t border-white/[0.07] sm:grid-cols-2 sm:divide-y-0">
                <TokenFact label={language==="pt"?"Emissão adicional":"Additional issuance"} value={language==="pt"?"Desativada":"Disabled"} right />
                <TokenFact label={language==="pt"?"Autoridade de congelamento":"Freeze authority"} value={language==="pt"?"Inexistente":"None"} />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3.5 border-t border-white/[0.08] bg-white/[0.015] p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] font-medium text-white/45">{language==="pt"?"Endereço oficial":"Official address"}</p>
              <p className="mt-0.5 break-all font-mono text-xs text-white/80">{MINT.slice(0, 8)}...{MINT.slice(-8)}</p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <button onClick={copyMint} className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3.5 py-2 text-[13px] font-semibold text-white/90">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5"><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V6a2 2 0 0 1 2-2h9" /></svg>
                {copyState==="copied"?t.copied:copyState==="error"?t.copyFailed:t.copyMint}
              </button>
              <a href={`https://explorer.solana.com/address/${MINT}`} target="_blank" rel="noopener noreferrer" className="text-[13px] font-semibold text-[#e9b949]">{language==="pt"?"Ver no Explorer":"View on Explorer"} ↗</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="border-b border-white/[0.07]">
      <div className={`mx-auto max-w-6xl ${sectionPad}`}>
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <Eyebrow>{t.allocationEyebrow}</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.035em] sm:text-4xl">{t.allocationTitle}</h2>
            <p className={`mt-3 max-w-xl ${textBody}`}>{t.allocationNote}</p>
          </div>
          <div className={`${darkSurface} shrink-0 px-5 py-3.5`}>
            <p className="text-xs text-white/45">{t.totalSupplyLabel}</p>
            <p className="mt-1 text-lg font-extrabold tracking-[-0.02em] text-[#e9b949]">1B MALTY</p>
          </div>
        </div>
        <div className="mt-7 flex flex-col gap-2.5">
          {allocation.map(([name, pct, amount], i) => (
            <AllocationRow
              key={name}
              icon={allocationIcons[i]}
              name={name}
              pct={pct}
              amount={amount}
              expanded={expandedAllocation === name}
              onToggle={() => setExpandedAllocation(expandedAllocation === name ? null : name)}
              statusLabel={t.allocationStatus}
              statusValue={t.allocationStatusPlanned}
              detailLabel={t.viewReserveDetails}
            />
          ))}
        </div>
        <p className="mt-5 max-w-2xl text-xs leading-5 text-white/45">{t.allocationLiquidityNote}</p>
        <div className="mt-5 flex justify-end">
          <a href="/transparency" className="text-sm font-medium text-[#e9b949]">{t.reserveArchitecture} →</a>
        </div>
      </div>
    </section>

    <section id="gives" className="border-b border-black/10 bg-[#f2ecdf] text-[#17130d]"><div className={`mx-auto max-w-6xl ${sectionPad}`}><div className="max-w-2xl"><div className="inline-flex rounded-full bg-[#9a6517]/10 px-3.5 py-2 text-[11px] font-semibold tracking-[0.12em] text-[#8b5a12]">🐾 MALTY GIVES · {t.givesStatus}</div><h2 className="mt-5 text-3xl font-bold leading-tight tracking-[-0.035em] sm:text-4xl">{t.givesTitle}</h2><p className={`mt-5 ${lightBody}`}>{t.givesText}</p><p className="mt-5 rounded-2xl border border-[#9a6517]/15 bg-white/45 p-4 text-sm leading-6 text-black/70">{t.givesNote}</p><a href="/gives" className="mt-6 inline-flex text-sm font-semibold text-[#8b5a12]">MALTY Gives →</a></div></div></section>

    <section id="roadmap" className="border-b border-white/[0.07]">
      <div className={`mx-auto max-w-6xl ${sectionPad}`}>
        <div className="grid gap-8 lg:grid-cols-[.62fr_2.3fr] lg:gap-10">
          <div>
            <Eyebrow>{t.roadmapEyebrow}</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold leading-tight tracking-[-0.035em] sm:text-4xl">{t.roadmapTitle}</h2>
            <p className="mt-3.5 max-w-xs text-sm leading-6 text-white/55">{t.roadmapDesc}</p>
            <a href="/updates" className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-[#e9b949] px-4.5 py-2.5 text-[13px] font-bold text-black">{t.roadmapCta} →</a>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {roadmapStages[language].map((s, i) => (
              <RoadmapCard key={s.title} n={i + 1} icon={roadmapIcons[i]} status={s.status} title={s.title} subtitle={s.subtitle} items={s.items}
                statusLabel={s.status === "completed" ? t.statusCompleted : s.status === "in-progress" ? t.statusInProgress : t.statusPlanned}
                proofLabel={i === 0 ? t.viewProof : undefined} />
            ))}
          </div>
        </div>
      </div>
    </section>

    <section id="faq" className="bg-[#0c0f13]">
      <div className={`mx-auto grid max-w-6xl gap-12 ${sectionPad} lg:grid-cols-[.72fr_1.28fr]`}>
        <div>
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold tracking-[-0.035em] sm:text-4xl">{t.faqTitle}</h2>
          <div className="mt-6 flex flex-col items-start gap-3">
            <a href="/transparency" className="text-sm font-medium text-[#e9b949]">{t.transparency} →</a>
            <a href="/docs" className="text-sm font-medium text-white/55 hover:text-white">{t.docs} →</a>
          </div>
        </div>
        <div className="space-y-3">
          <Faq q={language==="pt"?"O que é MALTY?":"What is MALTY?"} a={language==="pt"?"MALTY é um projeto comunitário na Solana que reúne token, identidade, comunidade e uma missão de longo prazo de gerar impacto positivo para animais.":"MALTY is a community-driven Solana project connecting a token, identity, community and a long-term mission to create positive impact for animals."}/>
          <Faq q={language==="pt"?"Qual é o mint oficial na Mainnet?":"What is the official Mainnet mint?"} a={language==="pt"?`${MINT} — com 1 bilhão de MALTY de supply fixo e 6 decimais. Sempre verifique o endereço do mint em vez de confiar apenas no nome ou ticker.`:`${MINT} — with a fixed supply of 1 billion MALTY and 6 decimals. Always verify the mint address rather than relying only on the name or ticker.`}/>
          <Faq q={language==="pt"?"Podem criar mais MALTY?":"Can more MALTY be minted?"} a={language==="pt"?"A Mint Authority foi revogada.":"The Mint Authority has been revoked."}/>
          <Faq q={language==="pt"?"Como o MALTY pretende ajudar pets?":"How does MALTY plan to help pets?"} a={language==="pt"?"Por meio do MALTY Gives: a comunidade poderá ajudar a identificar iniciativas, o projeto definirá critérios antes da ativação e cada ação concluída deverá ter prestação de contas pública.":"Through MALTY Gives: the community can help surface initiatives, the project will define criteria before activation, and completed actions should have public reporting."}/>
          <Faq q={language==="pt"?"Quem está por trás do MALTY?":"Who is behind MALTY?"} a={language==="pt"?"O projeto é mantido por uma equipe responsável pelo desenvolvimento, documentação pública e operação da comunidade. O MALTY ainda não se apresenta como um projeto de governança descentralizada. Veja a página Sobre para detalhes de responsabilidade.":"MALTY is stewarded by a project team responsible for development, public documentation and community operations. The project does not present itself as decentralized governance today. See the About page for stewardship details."}/>
          <Faq q={language==="pt"?"Existe trava (vesting) para os tokens da equipe?":"Is there a lock or vesting mechanism for team tokens?"} a={language==="pt"?"A reserva da equipe segue uma política pública de liberação em parcelas mensais, mas o mecanismo técnico de trava on-chain ainda está em definição. Nenhum saldo de reserva foi movimentado até o momento — veja a Central de Transparência para o estado atual.":"The team reserve follows a public monthly-release policy, but the on-chain enforcement mechanism is still being defined. No reserve balance has moved to date — see the Transparency center for the current state."}/>
          <Faq q={language==="pt"?"Onde posso comprar MALTY?":"Where can I buy MALTY?"} a={language==="pt"?`O MALTY está ao vivo e disponível no pool oficial MALTY/SOL na Raydium (ID do pool: ${POOL_ID}). Sempre verifique o mint e o ID do pool antes de negociar — desconfie de qualquer link de compra que não aponte para esse pool.`:`MALTY is live and available through the official MALTY/SOL pool on Raydium (pool ID: ${POOL_ID}). Always verify the mint and pool ID before trading — treat any buy link that doesn't point to this pool as untrusted.`}/>
          <Faq q={language==="pt"?"A liquidez é travada (locked)?":"Is the liquidity locked?"} a={language==="pt"?"Não. Os tokens de LP do pool continuam sob custódia da carteira do projeto — eles não estão travados nem foram queimados. O projeto não afirma que a liquidez é travada, permanente ou garantida, a menos que um mecanismo separado e verificável seja implementado e documentado publicamente.":"No. The pool's LP tokens remain under the project's custody wallet — they are not locked or burned. The project does not claim that liquidity is locked, permanent or guaranteed unless a separate verifiable mechanism is implemented and publicly documented."}/>
          <Faq q={language==="pt"?"As carteiras de reserva são custódia independente?":"Are the reserve wallets independent custody wallets?"} a={language==="pt"?"São endereços públicos separados para fins contábeis, mas atualmente pertencem a um único limite de custódia temporário. Não devem ser descritas como custódia independente ou protegidas por multisig.":"They are separate public addresses used for accounting, but they currently belong to one temporary custody security boundary. They should not be described as independent custody or multisignature protection."}/>
          <Faq q={language==="pt"?"O MALTY garante retorno ou valorização?":"Does MALTY guarantee returns or price appreciation?"} a={language==="pt"?"Não. MALTY é um memecoin. Não há promessa ou garantia de preço, liquidez, retorno ou valor futuro.":"No. MALTY is a memecoin. There is no promise or guarantee of price, liquidity, returns or future value."}/>
        </div>
      </div>
    </section>

    <footer className="border-t border-white/[0.07] px-5 py-12 sm:px-8 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-lg font-bold tracking-[-0.02em] text-[#e9b949]">MALTY</p>
            <p className="mt-2 text-sm font-medium text-white/90">Small Dog. Big Community.</p>
            <p className="mt-4 max-w-xs text-sm leading-6 text-white/50">Community-powered, pet-focused and built around public verification.</p>
            <div className="mt-5 flex items-center gap-2">
              <a href="https://t.me/MaltyCoinOfficial" target="_blank" rel="noopener noreferrer" aria-label="MALTY on Telegram" className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.025] text-white/50 transition-colors hover:border-[#e9b949]/35 hover:text-white"><svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor"><path d="M21.05 3.16 2.42 10.6c-1.24.5-1.23 1.2-.23 1.51l4.76 1.49L18.6 6.63c.5-.33.96-.15.58.21L10 15.03h-.01l.35 5.08c.5 0 .73-.23.99-.5l2.4-2.33 4.98 3.68c.92.51 1.58.25 1.81-.85l3.27-15.4c.34-1.35-.5-1.96-1.34-1.55Z"/></svg></a>
              <a href="https://x.com/MaltyCoin" target="_blank" rel="noopener noreferrer" aria-label="MALTY on X" className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.025] text-white/50 transition-colors hover:border-[#e9b949]/35 hover:text-white"><svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor"><path d="M13.3174 10.7749L19.1457 4H17.7646L12.7852 9.88256L8.80309 4H4.21053L10.3186 12.8955L4.21053 20H5.59183L10.6337 13.7899L14.7942 20H19.3893L13.3174 10.7749ZM11.5116 12.9776L10.7118 11.8656L6.09846 5.05078H8.03556L11.7852 10.4988L12.5849 11.6109L17.7658 19.1489H15.8288L11.5116 12.9776Z"/></svg></a>
            </div>
          </div>
          <FooterCol title={t.footerProject} links={[[language==="pt"?"Sobre":"About","/about"],["MALTY Gives","/gives"],[language==="pt"?"Atualizações":"Updates","/updates"]]}/>
          <FooterCol title={t.footerVerify} links={[[language==="pt"?"Transparência":"Transparency","/transparency"],[language==="pt"?"Documentação":"Documentation","/docs"],["Solana Explorer",`https://explorer.solana.com/address/${MINT}`]]}/>
          <FooterCol title={t.footerCommunity} links={[["Telegram Channel","https://t.me/MaltyCoinOfficial"],["Telegram Community","https://t.me/MaltyCoinCommunity"],["X","https://x.com/MaltyCoin"]]}/>
        </div>
        <div className="mt-10 border-t border-white/[0.07] pt-6">
          <p className="text-sm font-semibold text-white/75">{t.footerStatus}</p>
          <p className="mt-4 text-sm text-white/55">Solana Mainnet · Live</p>
          <p className="mt-4 text-xs font-medium text-white/55">{t.footerMint}</p>
          <p className="mt-2 break-all font-mono text-[11px] leading-5 text-white/45">{MINT}</p>
        </div>
        <div className="mt-10 border-t border-white/[0.07] pt-6"><p className="max-w-4xl text-xs leading-5 text-white/55">{t.risk}</p></div>
      </div>
    </footer>
  </main>;
}

function Eyebrow({children}:{children:React.ReactNode}){return <p className="text-[11px] font-semibold tracking-[0.14em] text-[#e9b949]">{children}</p>}
function LightEyebrow({children}:{children:React.ReactNode}){return <p className="text-[11px] font-semibold tracking-[0.14em] text-[#8b5a12]">{children}</p>}
function SolanaMark({className,id="solg-hero"}:{className?:string;id?:string}){return <svg className={className} viewBox="0 0 13 13" fill="none"><defs><linearGradient id={id} x1="0" y1="13" x2="13" y2="0"><stop offset="0" stopColor="#9945FF"/><stop offset="1" stopColor="#14F195"/></linearGradient></defs><rect x="0.4" y="1.2" width="10.5" height="2" rx="1" transform="skewX(-18)" fill={`url(#${id})`}/><rect x="0.4" y="5.5" width="10.5" height="2" rx="1" transform="skewX(-18)" fill={`url(#${id})`} opacity=".55"/><rect x="0.4" y="9.8" width="10.5" height="2" rx="1" transform="skewX(-18)" fill={`url(#${id})`}/></svg>}
function TokenFact({label,value,right}:{label:string;value:React.ReactNode;right?:boolean}){return <div className={`flex items-baseline justify-between gap-4 px-6 py-3.5 ${right?"sm:border-r sm:border-white/[0.07]":""}`}><span className="text-[13px] text-white/45">{label}</span><span className="text-sm font-bold text-white/92">{value}</span></div>}
function AllocationRow({icon,name,pct,amount,expanded,onToggle,statusLabel,statusValue,detailLabel}:{icon:React.ReactNode;name:string;pct:string;amount:string;expanded:boolean;onToggle:()=>void;statusLabel:string;statusValue:string;detailLabel:string}){
  return <div className={`overflow-hidden rounded-2xl border transition-colors ${expanded?"border-[#e9b949]/45":"border-white/[0.08]"} bg-white/[0.02]`}>
    <button type="button" onClick={onToggle} aria-expanded={expanded} className="flex w-full items-center gap-3.5 px-4 py-3.5 text-left sm:gap-4 sm:px-5">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px] bg-[#e9b949]/10 text-[#e9b949] [&_svg]:h-[17px] [&_svg]:w-[17px]">{icon}</span>
      <span className="flex-1 text-[15px] font-bold">{name}</span>
      <span className="text-[15px] font-bold">{pct}</span>
      <span className="hidden min-w-[84px] text-right text-[13px] text-white/45 sm:block">{amount} MALTY</span>
      <span className={`text-white/45 transition-transform ${expanded?"rotate-180 text-[#e9b949]":""}`}>⌄</span>
    </button>
    {expanded && <div className="flex flex-wrap items-center justify-between gap-3 px-4 pb-4 pl-[3.4rem] text-[13px] sm:px-5 sm:pl-[4.6rem]">
      <span className="text-white/45">{statusLabel}: <strong className="font-semibold text-white/85">{statusValue}</strong></span>
      <a href="/transparency" className="font-semibold text-[#e9b949]">{detailLabel} ↗</a>
    </div>}
  </div>;
}
function MissionPillar({icon,title,tag,text,last}:{icon:React.ReactNode;title:string;tag:string;text:string;last?:boolean}){return <div className={last?"":"lg:border-r lg:border-black/10 lg:pr-6"}><span className="text-[#17130d]">{icon}</span><p className="mt-3 text-base font-bold text-[#17130d]">{title}</p><p className="mt-0.5 text-xs text-black/45">{tag}</p><p className="mt-2.5 text-[13px] leading-6 text-black/55">{text}</p></div>}

const missionIcons = [
  <svg key="token" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h6"/></svg>,
  <svg key="community" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7"><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  <svg key="gives" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7"><circle cx="11" cy="4.5" r="2"/><circle cx="17.5" cy="8" r="2"/><circle cx="19.5" cy="15" r="2"/><path d="M9 9.5a4.5 4.5 0 0 1 4.5 4.5v3.2a3.2 3.2 0 0 1-6.24.95Q6 17.5 4.2 16.9A3.2 3.2 0 0 1 5.1 9.5Z"/></svg>,
  <svg key="reporting" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 16v-3M12 16V8M16 16v-5"/></svg>,
] as const;
function FactLink({text,href}:{text:string;href:string}){return <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-black/10 px-3.5 py-3 transition-colors hover:border-[#e9b949]/35 hover:bg-[#e9b949]/[0.04]"><span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-[11px] text-emerald-300">✓</span><p className="flex-1 text-sm font-medium text-white/80">{text}</p><span className="text-white/30">↗</span></a>}
function TimelineStep({n,title,text,active,last}:{n:number;title:string;text:string;active:boolean;last:boolean}){return <div className={`relative flex gap-4 ${last?"":"pb-5"}`}>{!last&&<span className="absolute left-[13px] top-7 bottom-0 w-px bg-white/[0.08]" />}<span className={`z-10 flex h-[27px] w-[27px] shrink-0 items-center justify-center rounded-full border text-xs font-bold ${active?"border-[#e9b949] bg-[#e9b949]/10 text-[#e9b949]":"border-white/15 text-white/40"}`}>{n}</span><div className={`flex-1 rounded-xl ${active?"border border-[#e9b949]/30 bg-[#e9b949]/[0.04] p-3.5":"p-0.5"}`}><p className="text-sm font-semibold text-white/90">{title}</p><p className="mt-1 text-[13px] leading-5 text-white/45">{text}</p></div></div>}
function RoadmapCard({n,icon,status,title,subtitle,items,statusLabel,proofLabel}:{n:number;icon:React.ReactNode;status:"completed"|"in-progress"|"planned";title:string;subtitle:string;items:readonly(readonly[string,boolean])[];statusLabel:string;proofLabel?:string}){
  const badgeClass = status === "completed" ? "bg-emerald-400/15 text-emerald-300" : status === "in-progress" ? "bg-[#e9b949]/15 text-[#e9b949]" : "bg-white/[0.06] text-white/45";
  const cardClass = status === "in-progress" ? "border-[#e9b949]/45 bg-[#e9b949]/[0.03]" : "border-white/[0.08] bg-white/[0.02]";
  const iconClass = status === "completed" ? "text-emerald-300" : status === "in-progress" ? "text-[#e9b949]" : "text-white/40";
  return <div className={`flex flex-col rounded-2xl border p-5 ${cardClass}`}>
    <div className="flex items-center justify-between gap-2">
      <span className="text-[11px] font-semibold text-white/40">0{n}</span>
      <span className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.05em] ${badgeClass}`}>{statusLabel}</span>
    </div>
    <div className="mt-3.5 flex items-start justify-between gap-2.5">
      <div><h3 className="text-[15px] font-bold tracking-[-0.01em]">{title}</h3><p className="mt-1 text-[12px] leading-5 text-white/55">{subtitle}</p></div>
      <span className={`h-7 w-7 shrink-0 ${iconClass}`}>{icon}</span>
    </div>
    <div className="mt-3.5 flex flex-col gap-2 border-t border-white/[0.08] pt-3.5">
      {items.map(([text, done]) => (
        <div key={text} className="flex items-center gap-2.5 text-[12.5px]">
          <span className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full text-[9px] ${done ? (status === "completed" ? "bg-emerald-400/20 text-emerald-300" : "bg-[#e9b949]/20 text-[#e9b949]") : "border border-white/[0.18]"}`}>{done ? "✓" : ""}</span>
          <span className={done ? "text-white/85" : "text-white/55"}>{text}</span>
        </div>
      ))}
    </div>
    {proofLabel && <a href="/transparency" className="mt-3.5 text-[12.5px] font-semibold text-[#e9b949]">{proofLabel} →</a>}
  </div>;
}
function Faq({q,a}:{q:string;a:string}){return <details className={`${darkSurface} px-5 py-4`}><summary className="cursor-pointer text-[15px] font-semibold text-white/90">{q}</summary><p className="mt-3 max-w-2xl text-sm leading-6 text-white/60">{a}</p></details>}
function FooterCol({title,links}:{title:string;links:readonly (readonly [string,string])[]}){return <div><p className="text-sm font-semibold text-white/75">{title}</p><div className="mt-4 flex flex-col items-start gap-3">{links.map(([label,href])=>{const external=href.startsWith("http");return <a key={label} href={href} target={external?"_blank":undefined} rel={external?"noopener noreferrer":undefined} className="text-sm text-white/50 hover:text-[#e9b949]">{label}{external?" ↗":""}</a>;})}</div></div>}
