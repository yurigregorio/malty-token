"use client";

import Link from "next/link";
import { useLanguage } from "../lib/language";
import { SubPageHeader } from "../components/sub-page-header";

const copy = {
  en: {
    eyebrow: "ABOUT MALTY",
    title: "A community built with a purpose.",
    intro: "MALTY is a community-driven project built on Solana. It connects a transparent digital token, a recognizable identity, an open community and a long-term mission to create positive, verifiable impact for animals through MALTY Gives.",
    pillars: [
      ["Transparency", "Separate verified facts from future plans."],
      ["Community", "Give people a clear role in helping surface meaningful initiatives."],
      ["Pet impact", "Make animal welfare a visible part of the MALTY mission."],
      ["Proof", "Publish evidence only after real actions happen."],
    ],
    missionEyebrow: "PROJECT MISSION",
    mission: "Grow a transparent community. Build a responsible impact program. Turn completed animal-welfare initiatives into a public record anyone can verify.",
    stewardshipEyebrow: "PROJECT STEWARDSHIP",
    stewardshipTitle: "Clear responsibilities, public records.",
    stewardshipText: "MALTY is currently stewarded by a project team responsible for development, public documentation, community operations and the design of MALTY Gives. The project does not present those responsibilities as decentralized governance today. Material changes should be reflected in public documentation and project updates.",
    stewards: [
      ["Development", "Maintain the public application and technical safeguards."],
      ["Documentation", "Keep token facts, policies and changes publicly understandable."],
      ["Community", "Create transparent participation channels as the project grows."],
      ["MALTY Gives", "Define eligibility, evidence and reporting standards before activation."],
    ],
    flow: [
      ["01", "Community", "Build participation around a shared project identity."],
      ["02", "MALTY Gives", "Review and support selected pet and animal-welfare initiatives once the program is active."],
      ["03", "Impact", "Report completed actions with suitable public evidence."],
    ],
    commitmentEyebrow: "PUBLIC COMMITMENT",
    commitment: "Publish what can be verified, clearly label what remains planned, document material project changes, and avoid presenting future intentions as completed achievements.",
    ctaGives: "Explore MALTY Gives",
    ctaTransparency: "Transparency center",
    ctaUpdates: "Project updates",
    ctaDocs: "Documentation",
  },
  pt: {
    eyebrow: "SOBRE O MALTY",
    title: "Uma comunidade construída com propósito.",
    intro: "MALTY é um projeto comunitário construído na Solana. Ele conecta um token digital transparente, uma identidade reconhecível, uma comunidade aberta e uma missão de longo prazo de gerar impacto positivo e verificável para animais por meio do MALTY Gives.",
    pillars: [
      ["Transparência", "Separar fatos verificados de planos futuros."],
      ["Comunidade", "Dar às pessoas um papel claro em ajudar a identificar iniciativas relevantes."],
      ["Impacto pet", "Tornar o bem-estar animal uma parte visível da missão MALTY."],
      ["Prova", "Publicar evidências somente depois que ações reais acontecem."],
    ],
    missionEyebrow: "MISSÃO DO PROJETO",
    mission: "Expandir uma comunidade transparente. Construir um programa de impacto responsável. Transformar iniciativas de bem-estar animal concluídas em um registro público que qualquer pessoa possa verificar.",
    stewardshipEyebrow: "GOVERNANÇA DO PROJETO",
    stewardshipTitle: "Responsabilidades claras, registros públicos.",
    stewardshipText: "O MALTY é atualmente mantido por uma equipe responsável pelo desenvolvimento, documentação pública, operações de comunidade e pelo desenho do MALTY Gives. O projeto não apresenta essas responsabilidades como governança descentralizada hoje. Mudanças materiais devem ser refletidas na documentação pública e nas atualizações do projeto.",
    stewards: [
      ["Desenvolvimento", "Manter a aplicação pública e as salvaguardas técnicas."],
      ["Documentação", "Manter fatos do token, políticas e mudanças compreensíveis publicamente."],
      ["Comunidade", "Criar canais de participação transparentes à medida que o projeto cresce."],
      ["MALTY Gives", "Definir critérios de elegibilidade, evidências e padrões de prestação de contas antes da ativação."],
    ],
    flow: [
      ["01", "Comunidade", "Construir participação em torno de uma identidade de projeto compartilhada."],
      ["02", "MALTY Gives", "Revisar e apoiar iniciativas selecionadas de pets e bem-estar animal quando o programa estiver ativo."],
      ["03", "Impacto", "Reportar ações concluídas com evidências públicas adequadas."],
    ],
    commitmentEyebrow: "COMPROMISSO PÚBLICO",
    commitment: "Publicar o que pode ser verificado, rotular claramente o que ainda é planejado, documentar mudanças materiais do projeto e evitar apresentar intenções futuras como conquistas já concluídas.",
    ctaGives: "Explorar o MALTY Gives",
    ctaTransparency: "Central de transparência",
    ctaUpdates: "Atualizações do projeto",
    ctaDocs: "Documentação",
  },
} as const;

export function AboutContent() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <main className="min-h-screen bg-[#080a0d] text-[#f7f1e5]">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
        <SubPageHeader />
        <p className="mt-10 text-[11px] font-black tracking-[0.22em] text-[#e9b949]">{t.eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-[-0.05em] sm:text-6xl">{t.title}</h1>
        <p className="mt-5 max-w-2xl text-sm leading-6 text-white/52">{t.intro}</p>
        <section className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {t.pillars.map(([title, text]) => <Pillar key={title} title={title} text={text} />)}
        </section>
        <section className="mt-10 rounded-2xl border border-[#e9b949]/20 bg-[#e9b949]/[0.04] p-6">
          <p className="text-[11px] font-black tracking-[0.2em] text-[#e9b949]">{t.missionEyebrow}</p>
          <p className="mt-3 max-w-3xl text-xl font-black leading-8">{t.mission}</p>
        </section>
        <section className="mt-10">
          <p className="text-[11px] font-black tracking-[0.2em] text-[#e9b949]">{t.stewardshipEyebrow}</p>
          <h2 className="mt-2 text-2xl font-black">{t.stewardshipTitle}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/48">{t.stewardshipText}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {t.stewards.map(([title, text]) => <Steward key={title} title={title} text={text} />)}
          </div>
        </section>
        <section className="mt-10 grid gap-3 sm:grid-cols-3">
          {t.flow.map(([n, title, text]) => <Flow key={n} n={n} title={title} text={text} />)}
        </section>
        <section className="mt-10 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6">
          <p className="text-[11px] font-black tracking-[0.2em] text-[#e9b949]">{t.commitmentEyebrow}</p>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/48">{t.commitment}</p>
        </section>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/gives" className="rounded-xl bg-[#e9b949] px-4 py-2.5 text-sm font-black text-black">{t.ctaGives}</Link>
          <Link href="/transparency" className="rounded-xl border border-white/12 px-4 py-2.5 text-sm font-bold">{t.ctaTransparency}</Link>
          <Link href="/updates" className="rounded-xl border border-white/12 px-4 py-2.5 text-sm font-bold">{t.ctaUpdates}</Link>
          <Link href="/docs" className="rounded-xl border border-white/12 px-4 py-2.5 text-sm font-bold">{t.ctaDocs}</Link>
        </div>
      </div>
    </main>
  );
}

function Pillar({ title, text }: { title: string; text: string }) { return <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5"><p className="font-black text-[#e9b949]">{title}</p><p className="mt-2 text-xs leading-5 text-white/42">{text}</p></div>; }
function Steward({ title, text }: { title: string; text: string }) { return <div className="rounded-2xl border border-white/[0.08] p-5"><p className="text-sm font-black">{title}</p><p className="mt-2 text-xs leading-5 text-white/42">{text}</p></div>; }
function Flow({ n, title, text }: { n: string; title: string; text: string }) { return <div className="rounded-2xl border border-white/[0.08] p-5"><p className="text-[11px] font-black text-[#e9b949]">{n}</p><p className="mt-4 font-black">{title}</p><p className="mt-2 text-xs leading-5 text-white/42">{text}</p></div>; }
