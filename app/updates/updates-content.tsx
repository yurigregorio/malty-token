"use client";

import Link from "next/link";
import { getReviewDateLong } from "../lib/malty-token";
import { useLanguage } from "../lib/language";
import { SiteHeader } from "../components/site-header";

const copy = {
  en: {
    eyebrow: "PUBLIC CHANGELOG",
    title: "What changed, clearly.",
    intro: "Material MALTY milestones are recorded here so completed work, published policies and planned work remain distinguishable.",
    lastReview: "LAST PUBLIC REVIEW",
    updates: [
      ["2026-09", "Foundation", "Completed", "MALTY deployed on Solana Mainnet with a fixed 1B supply, 6 decimals and no Freeze Authority."],
      ["2026-09", "Supply security", "Completed", "Mint Authority permanently revoked. Application creation and authority-changing actions are locked for Mainnet."],
      ["2026-09", "Transparency", "Published", "Canonical tokenomics, reserve architecture, allocation policies and reconciliation rules documented."],
      ["2026-09", "Public project identity", "Published", "MALTY established as the sole project, token and brand identity, with public About, Documentation and Transparency pages."],
      ["2026-09", "MALTY Gives policy", "Published", "A policy-first animal-welfare initiative framework was published before any active contribution program exists."],
      ["2026-09", "Public trust layer", "Published", "Project status, visible tokenomics, project stewardship and a public impact path were added to the website."],
      ["2026-09", "Community channel", "Completed", "Public MALTY community channel launched (X: @MaltyCoin)."],
      ["2026-09", "MALTY Impact wallet", "Published", "A dedicated public reference wallet was documented for future, not-yet-active MALTY Gives contributions."],
      ["2026-09", "Telegram channels", "Completed", "Official Telegram channel and community group launched (@MaltyCoinOfficial and @MaltyCoinCommunity)."],
      ["2026-09", "MALTY Impact reserve", "Published", "MALTY Impact promoted from a reference wallet to a canonical 50,000,000 MALTY (5%) reserve, funded by reducing Ecosystem from 20% to 15%. Total supply is unchanged."],
      ["2026-09", "Reserve destination tests", "Completed", "1 MALTY destination-validation transfer completed for each of the Liquidity, Ecosystem, Community and MALTY Impact reserves. Treasury and Team remain at 0 MALTY."],
    ],
    ruleEyebrow: "CHANGE RULE",
    ruleText: "Future intentions are not listed as completed milestones. Material changes to project structure, public policies or MALTY Gives should be reflected here after they are actually published or completed.",
    ctaTransparency: "Transparency →",
    ctaAbout: "About →",
    ctaDocs: "Documentation →",
  },
  pt: {
    eyebrow: "CHANGELOG PÚBLICO",
    title: "O que mudou, com clareza.",
    intro: "Os marcos materiais do MALTY são registrados aqui para que trabalho concluído, políticas publicadas e trabalho planejado permaneçam distinguíveis.",
    lastReview: "ÚLTIMA REVISÃO PÚBLICA",
    updates: [
      ["2026-09", "Fundação", "Concluído", "MALTY implantado na Solana Mainnet com supply fixo de 1B, 6 decimais e sem Freeze Authority."],
      ["2026-09", "Segurança do supply", "Concluído", "Mint Authority permanentemente revogada. Ações de criação e mudança de autoridade estão travadas na Mainnet."],
      ["2026-09", "Transparência", "Publicado", "Tokenomics canônica, arquitetura de reservas, políticas de alocação e regras de reconciliação documentadas."],
      ["2026-09", "Identidade pública do projeto", "Publicado", "MALTY estabelecido como o único projeto, token e identidade de marca, com páginas públicas de Sobre, Documentação e Transparência."],
      ["2026-09", "Política do MALTY Gives", "Publicado", "Um framework de iniciativa de bem-estar animal orientado por política foi publicado antes de qualquer programa de contribuição ativo."],
      ["2026-09", "Camada pública de confiança", "Publicado", "Status do projeto, tokenomics visível, governança do projeto e um caminho público de impacto foram adicionados ao site."],
      ["2026-09", "Canal da comunidade", "Concluído", "Canal público da comunidade MALTY lançado (X: @MaltyCoin)."],
      ["2026-09", "Carteira MALTY Impact", "Publicado", "Uma carteira pública dedicada de referência foi documentada para futuras contribuições do MALTY Gives, ainda não ativas."],
      ["2026-09", "Canais no Telegram", "Concluído", "Canal oficial e grupo da comunidade no Telegram lançados (@MaltyCoinOfficial e @MaltyCoinCommunity)."],
      ["2026-09", "Reserva MALTY Impact", "Publicado", "MALTY Impact promovido de carteira de referência para uma reserva canônica de 50.000.000 MALTY (5%), financiada pela redução do Ecosystem de 20% para 15%. O supply total não mudou."],
      ["2026-09", "Testes de destino das reservas", "Concluído", "Transferência de teste de 1 MALTY concluída para cada uma das reservas Liquidez, Ecossistema, Comunidade e MALTY Impact. Treasury e Equipe seguem em 0 MALTY."],
    ],
    ruleEyebrow: "REGRA DE MUDANÇA",
    ruleText: "Intenções futuras não são listadas como marcos concluídos. Mudanças materiais na estrutura do projeto, políticas públicas ou no MALTY Gives devem ser refletidas aqui somente depois de serem de fato publicadas ou concluídas.",
    ctaTransparency: "Transparência →",
    ctaAbout: "Sobre →",
    ctaDocs: "Documentação →",
  },
} as const;

export function UpdatesContent() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <main className="min-h-screen bg-[#080a0d] text-[#f7f1e5]">
      <SiteHeader />
      <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
        <p className="mt-2 text-[11px] font-black tracking-[0.22em] text-[#e9b949]">{t.eyebrow}</p>
        <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] sm:text-5xl">{t.title}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-white/50">{t.intro}</p>
        <div className="mt-6 rounded-2xl border border-[#e9b949]/15 bg-[#e9b949]/[0.035] p-4">
          <p className="text-[11px] font-black tracking-[0.18em] text-[#e9b949]">{t.lastReview}</p>
          <p className="mt-1 text-sm font-black">{getReviewDateLong(language)}</p>
        </div>
        <div className="mt-8 space-y-3">
          {t.updates.map(([date, title, status, text], i) => (
            <article key={title} className="grid gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 sm:grid-cols-[72px_1fr_auto] sm:items-start">
              <div><span className="text-xs font-black text-[#e9b949]">0{i + 1}</span><p className="mt-1 text-[11px] text-white/55">{date}</p></div>
              <div><h2 className="font-black">{title}</h2><p className="mt-2 text-xs leading-5 text-white/55">{text}</p></div>
              <span className="w-fit rounded-full border border-white/10 px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-white/45">{status}</span>
            </article>
          ))}
        </div>
        <section className="mt-10 rounded-2xl border border-white/[0.08] p-5">
          <p className="text-[11px] font-black tracking-[0.18em] text-[#e9b949]">{t.ruleEyebrow}</p>
          <p className="mt-3 text-sm leading-6 text-white/48">{t.ruleText}</p>
        </section>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/transparency" className="text-sm font-bold text-[#e9b949]">{t.ctaTransparency}</Link>
          <Link href="/about" className="text-sm font-bold text-white/55">{t.ctaAbout}</Link>
          <Link href="/docs" className="text-sm font-bold text-white/55">{t.ctaDocs}</Link>
        </div>
      </div>
    </main>
  );
}
