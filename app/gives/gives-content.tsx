"use client";

import Link from "next/link";
import { MALTY_IMPACT_WALLET, getReviewDateShort } from "../lib/malty-token";
import { useLanguage } from "../lib/language";
import { SubPageHeader } from "../components/sub-page-header";

const IMPACT_WALLET = MALTY_IMPACT_WALLET;

const copy = {
  en: {
    badge: "🐾 PLANNED INITIATIVE",
    title: <>Community-powered.<br />Pet-focused.</>,
    intro: "MALTY Gives is being designed as the real-world impact layer of the MALTY project. Its long-term mission is to connect community participation with transparent, verifiable support for animal-welfare initiatives.",
    modelEyebrow: "THE MODEL",
    model: "MALTY Community → MALTY Gives → Pet initiatives → Verifiable impact.",
    modelText: "The objective is not to make vague claims about helping animals. The objective is to build a repeatable process where initiatives can be identified, reviewed, supported and publicly documented.",
    pathEyebrow: "PUBLIC PATH",
    pathTitle: "Planned → First initiative → Verified impact.",
    phases: [
      ["PLANNED", "Policy & criteria", "Funding model, eligibility and reporting rules are published before activation."],
      ["NEXT", "First initiative", "A first beneficiary or initiative is identified only after it meets the published standard."],
      ["FUTURE", "Verified impact", "Completed actions appear in a public impact record with evidence."],
    ],
    steps: [
      ["01", "Community surfaces", "Community members can help identify animal-welfare organizations, shelters and initiatives worth reviewing."],
      ["02", "Project reviews", "MALTY applies published eligibility and evidence criteria before any initiative is selected."],
      ["03", "Support is documented", "When the program becomes active, each completed initiative should state the beneficiary, purpose, date and contribution."],
      ["04", "Impact is proven", "Suitable evidence and public references are published so the community can verify what actually happened."],
    ],
    standardEyebrow: "ACTIVATION STANDARD",
    standardTitle: "Policy before the first initiative.",
    standardText: "Before MALTY Gives is marked Active, the project intends to publish a funding model, beneficiary selection criteria, reporting requirements and the first identified initiative. There is currently no active donation program and no fixed contribution amount or percentage.",
    info: [
      ["Community participation", "Create a clear way for the community to suggest credible animal-welfare initiatives for review."],
      ["Transparent selection", "Publish what qualifies, what does not qualify and why an initiative was selected."],
      ["Impact record", "Once real actions exist, publish beneficiaries, dates, contributions, status and suitable evidence."],
    ],
    currentStatus: "Current status",
    lastReview: "LAST PUBLIC REVIEW",
    planned: "PLANNED",
    statusNote: "No organization is currently presented as a beneficiary, no contribution has been claimed, and no future amount is guaranteed. The public record should only change after real, documented activity exists.",
    walletEyebrow: "PUBLIC REFERENCE WALLET",
    walletTitle: "MALTY Impact",
    walletNote: "A dedicated public wallet reserved for future, documented MALTY Gives contributions. Publishing this address does not mean an initiative has been funded or completed.",
    walletStatus: "Not active",
    ctaTransparency: "Transparency center",
    ctaUpdates: "Project updates",
    ctaDocs: "Public documentation",
  },
  pt: {
    badge: "🐾 INICIATIVA PLANEJADA",
    title: <>Movido pela comunidade.<br />Focado em pets.</>,
    intro: "O MALTY Gives está sendo desenhado como a camada de impacto real do projeto MALTY. Sua missão de longo prazo é conectar a participação da comunidade com apoio transparente e verificável a iniciativas de bem-estar animal.",
    modelEyebrow: "O MODELO",
    model: "Comunidade MALTY → MALTY Gives → Iniciativas pet → Impacto verificável.",
    modelText: "O objetivo não é fazer afirmações vagas sobre ajudar animais. O objetivo é construir um processo repetível em que iniciativas possam ser identificadas, revisadas, apoiadas e documentadas publicamente.",
    pathEyebrow: "CAMINHO PÚBLICO",
    pathTitle: "Planejado → Primeira iniciativa → Impacto verificado.",
    phases: [
      ["PLANEJADO", "Política e critérios", "Modelo de financiamento, elegibilidade e regras de prestação de contas são publicados antes da ativação."],
      ["PRÓXIMO", "Primeira iniciativa", "Um primeiro beneficiário ou iniciativa é identificado somente depois de atender ao padrão publicado."],
      ["FUTURO", "Impacto verificado", "Ações concluídas aparecem em um registro público de impacto com evidências."],
    ],
    steps: [
      ["01", "Comunidade identifica", "Membros da comunidade podem ajudar a identificar organizações, abrigos e iniciativas de bem-estar animal que valem revisão."],
      ["02", "Projeto revisa", "O MALTY aplica critérios publicados de elegibilidade e evidência antes de qualquer iniciativa ser selecionada."],
      ["03", "Apoio é documentado", "Quando o programa se tornar ativo, cada iniciativa concluída deve indicar beneficiário, propósito, data e contribuição."],
      ["04", "Impacto é comprovado", "Evidências e referências públicas adequadas são publicadas para que a comunidade possa verificar o que realmente aconteceu."],
    ],
    standardEyebrow: "PADRÃO DE ATIVAÇÃO",
    standardTitle: "Política antes da primeira iniciativa.",
    standardText: "Antes que o MALTY Gives seja marcado como Ativo, o projeto pretende publicar um modelo de financiamento, critérios de seleção de beneficiários, requisitos de prestação de contas e a primeira iniciativa identificada. Atualmente não há programa de doação ativo nem valor ou percentual de contribuição fixado.",
    info: [
      ["Participação da comunidade", "Criar uma forma clara da comunidade sugerir iniciativas críveis de bem-estar animal para revisão."],
      ["Seleção transparente", "Publicar o que qualifica, o que não qualifica e por que uma iniciativa foi selecionada."],
      ["Registro de impacto", "Quando existirem ações reais, publicar beneficiários, datas, contribuições, status e evidências adequadas."],
    ],
    currentStatus: "Status atual",
    lastReview: "ÚLTIMA REVISÃO PÚBLICA",
    planned: "PLANEJADO",
    statusNote: "Nenhuma organização é atualmente apresentada como beneficiária, nenhuma contribuição foi reivindicada e nenhum valor futuro é garantido. O registro público só deve mudar depois que atividade real e documentada existir.",
    walletEyebrow: "CARTEIRA PÚBLICA DE REFERÊNCIA",
    walletTitle: "MALTY Impact",
    walletNote: "Uma carteira pública dedicada, reservada para futuras contribuições documentadas do MALTY Gives. Publicar esse endereço não significa que uma iniciativa já foi financiada ou concluída.",
    walletStatus: "Não ativa",
    ctaTransparency: "Central de transparência",
    ctaUpdates: "Atualizações do projeto",
    ctaDocs: "Documentação pública",
  },
} as const;

export function GivesContent() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <main className="min-h-screen bg-[#080a0d] text-[#f7f1e5]">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
        <SubPageHeader />
        <div className="mt-10 inline-flex rounded-full border border-[#e9b949]/20 bg-[#e9b949]/[0.05] px-3 py-1.5 text-[11px] font-black tracking-[0.18em] text-[#e9b949]">{t.badge}</div>
        <h1 className="mt-5 text-4xl font-black tracking-[-0.05em] sm:text-6xl">{t.title}</h1>
        <p className="mt-5 max-w-2xl text-sm leading-6 text-white/52">{t.intro}</p>
        <section className="mt-10 rounded-3xl border border-[#e9b949]/20 bg-[#e9b949]/[0.045] p-6 sm:p-8">
          <p className="text-[11px] font-black tracking-[0.22em] text-[#e9b949]">{t.modelEyebrow}</p>
          <p className="mt-3 max-w-3xl text-2xl font-black leading-9">{t.model}</p>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/45">{t.modelText}</p>
        </section>
        <section className="mt-10">
          <p className="text-[11px] font-black tracking-[0.2em] text-[#e9b949]">{t.pathEyebrow}</p>
          <h2 className="mt-2 text-2xl font-black">{t.pathTitle}</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">{t.phases.map(([state, title, text]) => <Phase key={state} state={state} title={title} text={text} />)}</div>
        </section>
        <section className="mt-10 grid gap-3 sm:grid-cols-2">{t.steps.map(([n, title, text]) => <Step key={n} n={n} title={title} text={text} />)}</section>
        <section className="mt-10 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6">
          <p className="text-[11px] font-black tracking-[0.2em] text-[#e9b949]">{t.standardEyebrow}</p>
          <h2 className="mt-2 text-2xl font-black">{t.standardTitle}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/48">{t.standardText}</p>
        </section>
        <section className="mt-10 grid gap-3 sm:grid-cols-3">{t.info.map(([title, text]) => <Info key={title} title={title} text={text} />)}</section>
        <section className="mt-10 rounded-2xl border border-white/[0.08] p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-black text-white/80">{t.currentStatus}</p>
              <p className="mt-1 text-[11px] font-black tracking-[0.16em] text-[#e9b949]">{t.lastReview} · {getReviewDateShort(language).toUpperCase()}</p>
            </div>
            <span className="rounded-full border border-[#e9b949]/20 bg-[#e9b949]/[0.05] px-3 py-1 text-[11px] font-black text-[#e9b949]">{t.planned}</span>
          </div>
          <p className="mt-3 text-xs leading-5 text-white/42">{t.statusNote}</p>
        </section>
        <section className="mt-6 rounded-2xl border border-[#e9b949]/15 bg-[#e9b949]/[0.03] p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-[11px] font-black tracking-[0.18em] text-[#e9b949]">{t.walletEyebrow}</p>
            <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-white/45">{t.walletStatus}</span>
          </div>
          <p className="mt-2 text-sm font-black">{t.walletTitle}</p>
          <p className="mt-2 break-all font-mono text-[11px] leading-5 text-white/50">{IMPACT_WALLET}</p>
          <p className="mt-3 max-w-2xl text-xs leading-5 text-white/42">{t.walletNote}</p>
        </section>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/transparency" className="rounded-xl bg-[#e9b949] px-4 py-2.5 text-sm font-black text-black">{t.ctaTransparency}</Link>
          <Link href="/updates" className="rounded-xl border border-white/12 px-4 py-2.5 text-sm font-bold">{t.ctaUpdates}</Link>
          <Link href="/docs" className="rounded-xl border border-white/12 px-4 py-2.5 text-sm font-bold">{t.ctaDocs}</Link>
        </div>
      </div>
    </main>
  );
}

function Phase({ state, title, text }: { state: string; title: string; text: string }) { return <div className="rounded-2xl border border-[#e9b949]/15 bg-[#e9b949]/[0.035] p-5"><p className="text-[11px] font-black tracking-wider text-[#e9b949]">{state}</p><p className="mt-3 font-black">{title}</p><p className="mt-2 text-xs leading-5 text-white/42">{text}</p></div>; }
function Step({ n, title, text }: { n: string; title: string; text: string }) { return <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5"><p className="text-[11px] font-black text-[#e9b949]">{n}</p><p className="mt-5 font-black">{title}</p><p className="mt-2 text-xs leading-5 text-white/42">{text}</p></div>; }
function Info({ title, text }: { title: string; text: string }) { return <div className="rounded-2xl border border-[#e9b949]/15 bg-[#e9b949]/[0.035] p-5"><p className="text-sm font-black text-[#e9b949]">{title}</p><p className="mt-2 text-xs leading-5 text-white/45">{text}</p></div>; }
