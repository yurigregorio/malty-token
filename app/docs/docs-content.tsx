"use client";

import Link from "next/link";
import { useLanguage } from "../lib/language";
import { SiteHeader } from "../components/site-header";

const copy = {
  en: {
    eyebrow: "PUBLIC DOCUMENTATION",
    title: "Understand the project.",
    intro: "A simpler public layer for MALTY's most important project information.",
    docs: [
      ["About MALTY", "Mission, identity and the principles behind the project.", "/about"],
      ["Transparency", "Verified token facts, allocation and reserve-state rules.", "/transparency"],
      ["MALTY Gives", "Planned animal-welfare initiative and activation standard.", "/gives"],
      ["Change history", "Material project milestones and transparency changes.", "/updates"],
    ],
    principleLabel: "Documentation principle:",
    principleText: "completed and verifiable facts should be presented as facts; future intentions should remain explicitly labeled as planned.",
  },
  pt: {
    eyebrow: "DOCUMENTAÇÃO PÚBLICA",
    title: "Entenda o projeto.",
    intro: "Uma camada pública mais simples para as informações mais importantes do MALTY.",
    docs: [
      ["Sobre o MALTY", "Missão, identidade e os princípios por trás do projeto.", "/about"],
      ["Transparência", "Fatos verificados do token, alocação e regras de estado das reservas.", "/transparency"],
      ["MALTY Gives", "Iniciativa planejada de bem-estar animal e padrão de ativação.", "/gives"],
      ["Histórico de mudanças", "Marcos materiais do projeto e mudanças de transparência.", "/updates"],
    ],
    principleLabel: "Princípio de documentação:",
    principleText: "fatos concluídos e verificáveis devem ser apresentados como fatos; intenções futuras devem permanecer explicitamente rotuladas como planejadas.",
  },
} as const;

export function DocsContent() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <main className="min-h-screen bg-[#080a0d] text-[#f7f1e5]">
      <SiteHeader />
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
        <p className="mt-2 text-[11px] font-black tracking-[0.22em] text-[#e9b949]">{t.eyebrow}</p>
        <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] sm:text-5xl">{t.title}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-white/50">{t.intro}</p>
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {t.docs.map(([title, text, href]) => (
            <Link key={title} href={href} className="group rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition hover:border-[#e9b949]/35">
              <p className="font-black group-hover:text-[#e9b949]">{title} →</p>
              <p className="mt-2 text-xs leading-5 text-white/55">{text}</p>
            </Link>
          ))}
        </div>
        <div className="mt-10 rounded-2xl border border-white/[0.08] p-5 text-xs leading-5 text-white/50">
          <strong className="text-white/70">{t.principleLabel}</strong> {t.principleText}
        </div>
      </div>
    </main>
  );
}
