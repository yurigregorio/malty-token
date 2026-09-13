"use client";

import Link from "next/link";
import { MALTY_IMPACT_WALLET, MALTY_PUBLIC_MINT, getReviewDateLong } from "../lib/malty-token";
import { useLanguage } from "../lib/language";
import { SiteHeader } from "../components/site-header";

const MINT = MALTY_PUBLIC_MINT;
const IMPACT_WALLET = MALTY_IMPACT_WALLET;
const reserves = [
  ["Liquidity", "500M planned", "8zMNiAh2uH1MoKh9eRjewSrgRjU4WQAYVV2u4SKSiRfU"],
  ["Ecosystem", "200M planned", "44Ha31Tj911xtFcNv5e4RTD7f3NxhULtcUygBJm8on1g"],
  ["Community", "150M planned", "BFYWFeqf8uJ4BvD6dfySCkdMVdtDPvxFe5hmSzuCCbhg"],
  ["Treasury", "75M planned", "6gkNMy3342qVUKSatW27zUAK22ops5Fu7G5J148MQZK6"],
  ["Team", "75M planned", "CvASopxtFapEhJ8r75UcHiisPVCfxv5ApGAqbwNagXmw"],
] as const;

const copy = {
  en: {
    eyebrow: "TRANSPARENCY CENTER",
    title: "Verify, don’t just trust.",
    intro: "Verifiable token facts, project allocations and documented reserve state. Planned allocations are never presented as completed distribution.",
    reviewStatus: "PUBLIC REVIEW STATUS",
    reviewed: "Reviewed",
    mintEyebrow: "OFFICIAL MAINNET MINT",
    verifyExplorer: "Verify on Solana Explorer ↗",
    reserveEyebrow: "RESERVE ARCHITECTURE",
    reserveTitle: "Planned allocation vs. documented state",
    reserveText: "At the latest documented reconciliation, each published reserve account held 0 MALTY and no reserve transfer had been executed.",
    documented: "Documented: 0 MALTY",
    custodyNote: "Custody model: these five reserve accounts are currently under one temporary single-controller custody boundary. They are not multisig-protected. This page will be updated if custody moves to a different model.",
    impactEyebrow: "MALTY IMPACT — PUBLIC REFERENCE WALLET",
    impactStatus: "Not active",
    impactNote: "Reserved for future, documented MALTY Gives contributions. Publication does not mean an initiative has been funded or completed.",
    historyEyebrow: "PUBLIC HISTORY",
    historyTitle: "Material milestones",
    milestones: [
      ["Mainnet foundation", "1B fixed supply, 6 decimals, no Freeze Authority."],
      ["Supply authority", "Mint Authority permanently revoked."],
      ["Allocation", "50% Liquidity · 20% Ecosystem · 15% Community · 7.5% Treasury · 7.5% Team."],
      ["MALTY Gives", "Policy-first initiative remains Planned; no contribution percentage promised."],
    ],
    changelog: "View public changelog →",
    stewardshipEyebrow: "STEWARDSHIP DISCLOSURE",
    stewardshipText: "MALTY is currently stewarded by a project team. The public site does not describe the project as decentralized governance today. Material project changes should be reflected in public documentation and the changelog.",
    stewardshipLink: "Read project stewardship →",
    ctaDocs: "Public documentation",
    ctaGives: "MALTY Gives",
    ctaUpdates: "Project updates",
    footer: "MALTY is a community-driven digital token on Solana. Transparency documentation does not promise price, returns, liquidity or future value.",
  },
  pt: {
    eyebrow: "CENTRAL DE TRANSPARÊNCIA",
    title: "Verifique, não apenas confie.",
    intro: "Fatos verificáveis do token, alocações do projeto e estado documentado das reservas. Alocações planejadas nunca são apresentadas como distribuição já concluída.",
    reviewStatus: "STATUS DE REVISÃO PÚBLICA",
    reviewed: "Revisado",
    mintEyebrow: "MINT OFICIAL NA MAINNET",
    verifyExplorer: "Verificar no Solana Explorer ↗",
    reserveEyebrow: "ARQUITETURA DE RESERVAS",
    reserveTitle: "Alocação planejada vs. estado documentado",
    reserveText: "Na última reconciliação documentada, cada conta de reserva publicada tinha 0 MALTY e nenhuma transferência de reserva havia sido executada.",
    documented: "Documentado: 0 MALTY",
    custodyNote: "Modelo de custódia: essas cinco contas de reserva estão atualmente sob um único limite temporário de controlador. Elas não são protegidas por multisig. Esta página será atualizada caso a custódia migre para outro modelo.",
    impactEyebrow: "MALTY IMPACT — CARTEIRA PÚBLICA DE REFERÊNCIA",
    impactStatus: "Não ativa",
    impactNote: "Reservada para futuras contribuições documentadas do MALTY Gives. A publicação não significa que uma iniciativa já foi financiada ou concluída.",
    historyEyebrow: "HISTÓRICO PÚBLICO",
    historyTitle: "Marcos materiais",
    milestones: [
      ["Fundação Mainnet", "Supply fixo de 1B, 6 decimais, sem Freeze Authority."],
      ["Autoridade de supply", "Mint Authority permanentemente revogada."],
      ["Alocação", "50% Liquidez · 20% Ecossistema · 15% Comunidade · 7,5% Treasury · 7,5% Equipe."],
      ["MALTY Gives", "Iniciativa orientada por política segue Planejada; nenhum percentual de contribuição prometido."],
    ],
    changelog: "Ver changelog público →",
    stewardshipEyebrow: "DIVULGAÇÃO DE GOVERNANÇA",
    stewardshipText: "O MALTY é atualmente mantido por uma equipe de projeto. O site público não descreve o projeto como governança descentralizada hoje. Mudanças materiais do projeto devem ser refletidas na documentação pública e no changelog.",
    stewardshipLink: "Ler sobre a governança do projeto →",
    ctaDocs: "Documentação pública",
    ctaGives: "MALTY Gives",
    ctaUpdates: "Atualizações do projeto",
    footer: "MALTY é um token digital comunitário construído na Solana. A documentação de transparência não promete preço, retorno, liquidez ou valor futuro.",
  },
} as const;

export function TransparencyContent() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <main className="min-h-screen bg-[#080a0d] text-[#f7f1e5]">
      <SiteHeader />
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
        <p className="mt-2 text-[11px] font-black tracking-[.24em] text-[#e9b949]">{t.eyebrow}</p>
        <h1 className="mt-3 text-4xl font-black tracking-[-.05em] sm:text-5xl">{t.title}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-white/50">{t.intro}</p>

        <section className="mt-8 flex flex-col gap-3 rounded-2xl border border-[#e9b949]/15 bg-[#e9b949]/[.035] p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] font-black tracking-[.18em] text-[#e9b949]">{t.reviewStatus}</p>
            <p className="mt-1 text-sm font-black">{t.reviewed} · {getReviewDateLong(language)}</p>
          </div>
          <div className="flex flex-wrap gap-2"><Badge text="MAINNET LIVE" /><Badge text="MINT REVOKED" /><Badge text="FREEZE NONE" /></div>
        </section>

        <section className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-4"><Card label="Supply" value="1B MALTY" /><Card label="Decimals" value="6" /><Card label="Mint Authority" value="Revoked" /><Card label="Freeze Authority" value="None" /></section>

        <section className="mt-8 rounded-2xl border border-[#e9b949]/20 bg-[#e9b949]/[.04] p-5">
          <p className="text-[11px] font-black tracking-[.18em] text-[#e9b949]">{t.mintEyebrow}</p>
          <p className="mt-2 break-all font-mono text-xs text-white/65">{MINT}</p>
          <a href={`https://explorer.solana.com/address/${MINT}`} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex rounded-lg bg-[#e9b949] px-3 py-2 text-xs font-black text-black">{t.verifyExplorer}</a>
        </section>

        <section className="mt-12">
          <p className="text-[11px] font-black tracking-[.22em] text-[#e9b949]">{t.reserveEyebrow}</p>
          <h2 className="mt-2 text-2xl font-black">{t.reserveTitle}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/45">{t.reserveText}</p>
          <div className="mt-6 space-y-2">
            {reserves.map(([name, planned, wallet]) => (
              <div key={name} className="rounded-xl border border-white/[.08] bg-white/[.025] p-4">
                <div className="flex flex-wrap justify-between gap-2">
                  <p className="text-sm font-black">{name}</p>
                  <p className="text-[11px]"><span className="text-[#e9b949]">{planned}</span><span className="ml-3 text-white/45">{t.documented}</span></p>
                </div>
                <p className="mt-2 break-all font-mono text-[11px] text-white/45">{wallet}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 max-w-2xl text-xs leading-5 text-white/45">{t.custodyNote}</p>
          <div className="mt-5 rounded-xl border border-[#e9b949]/15 bg-[#e9b949]/[.03] p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-[11px] font-black tracking-[.16em] text-[#e9b949]">{t.impactEyebrow}</p>
              <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-white/45">{t.impactStatus}</span>
            </div>
            <p className="mt-2 break-all font-mono text-[11px] text-white/50">{IMPACT_WALLET}</p>
            <p className="mt-2 text-xs leading-5 text-white/55">{t.impactNote}</p>
          </div>
        </section>

        <section className="mt-12">
          <p className="text-[11px] font-black tracking-[.22em] text-[#e9b949]">{t.historyEyebrow}</p>
          <h2 className="mt-2 text-2xl font-black">{t.historyTitle}</h2>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">{t.milestones.map(([title, text]) => <Info key={title} title={title} text={text} />)}</div>
          <Link href="/updates" className="mt-5 inline-flex text-sm font-bold text-[#e9b949]">{t.changelog}</Link>
        </section>

        <section className="mt-12 rounded-2xl border border-white/[.08] bg-white/[.025] p-5">
          <p className="text-[11px] font-black tracking-[.18em] text-[#e9b949]">{t.stewardshipEyebrow}</p>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/45">{t.stewardshipText}</p>
          <Link href="/about" className="mt-4 inline-flex text-sm font-bold text-[#e9b949]">{t.stewardshipLink}</Link>
        </section>

        <section className="mt-12 flex flex-wrap gap-3">
          <Link href="/docs" className="rounded-xl border border-white/12 px-4 py-2.5 text-sm font-bold">{t.ctaDocs}</Link>
          <Link href="/gives" className="rounded-xl border border-white/12 px-4 py-2.5 text-sm font-bold">{t.ctaGives}</Link>
          <Link href="/updates" className="rounded-xl border border-white/12 px-4 py-2.5 text-sm font-bold">{t.ctaUpdates}</Link>
        </section>

        <footer className="mt-14 border-t border-white/[.08] pt-6 text-[11px] leading-5 text-white/50">{t.footer}</footer>
      </div>
    </main>
  );
}

function Badge({ text }: { text: string }) { return <span className="rounded-full border border-emerald-400/15 bg-emerald-400/[.05] px-2.5 py-1 text-[11px] font-black text-emerald-300">{text}</span>; }
function Card({ label, value }: { label: string; value: string }) { return <div className="rounded-xl border border-white/[.08] bg-white/[.025] p-4"><p className="text-[11px] text-white/45">{label}</p><p className="mt-1 text-sm font-black text-[#e9b949]">{value}</p></div>; }
function Info({ title, text }: { title: string; text: string }) { return <div className="rounded-2xl border border-white/[.08] bg-white/[.025] p-5"><p className="text-sm font-black text-[#e9b949]">{title}</p><p className="mt-2 text-xs leading-5 text-white/55">{text}</p></div>; }
