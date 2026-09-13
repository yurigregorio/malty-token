"use client";

import Link from "next/link";
import { useLanguage } from "../lib/language";
import { SubPageHeader } from "../components/sub-page-header";

const copy = {
  en: {
    eyebrow: "PUBLIC DOCUMENTATION",
    title: "Understand the project.",
    intro: "A simpler public layer for MALTY's most important project information. Technical repository records remain the deeper source of truth.",
    docs: [
      ["About MALTY", "Mission, identity and the principles behind the project.", "/about"],
      ["Transparency", "Verified token facts, allocation and reserve-state rules.", "/transparency"],
      ["MALTY Gives", "Planned animal-welfare initiative and activation standard.", "/gives"],
      ["Tokenomics", "Canonical allocation: 50 / 20 / 15 / 7.5 / 7.5.", "/transparency"],
      ["Change history", "Material project milestones and transparency changes.", "/updates"],
      ["Security audit", "Repository security review — findings and current status.", "https://github.com/yurigregorio/malty-token/blob/main/docs/SECURITY_AUDIT.md"],
    ],
    principleLabel: "Documentation principle:",
    principleText: "completed and verifiable facts should be presented as facts; future intentions should remain explicitly labeled as planned.",
  },
  pt: {
    eyebrow: "DOCUMENTAÇÃO PÚBLICA",
    title: "Entenda o projeto.",
    intro: "Uma camada pública mais simples para as informações mais importantes do MALTY. Os registros técnicos do repositório continuam sendo a fonte de verdade mais profunda.",
    docs: [
      ["Sobre o MALTY", "Missão, identidade e os princípios por trás do projeto.", "/about"],
      ["Transparência", "Fatos verificados do token, alocação e regras de estado das reservas.", "/transparency"],
      ["MALTY Gives", "Iniciativa planejada de bem-estar animal e padrão de ativação.", "/gives"],
      ["Tokenomics", "Alocação canônica: 50 / 20 / 15 / 7,5 / 7,5.", "/transparency"],
      ["Histórico de mudanças", "Marcos materiais do projeto e mudanças de transparência.", "/updates"],
      ["Auditoria de segurança", "Revisão de segurança do repositório — achados e status atual.", "https://github.com/yurigregorio/malty-token/blob/main/docs/SECURITY_AUDIT.md"],
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
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
        <SubPageHeader />
        <p className="mt-10 text-[11px] font-black tracking-[0.22em] text-[#e9b949]">{t.eyebrow}</p>
        <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] sm:text-5xl">{t.title}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-white/50">{t.intro}</p>
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {t.docs.map(([title, text, href]) => {
            const external = href.startsWith("http");
            return external ? (
              <a key={title} href={href} target="_blank" rel="noopener noreferrer" className="group rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition hover:border-[#e9b949]/35">
                <p className="font-black group-hover:text-[#e9b949]">{title} ↗</p>
                <p className="mt-2 text-xs leading-5 text-white/42">{text}</p>
              </a>
            ) : (
              <Link key={title} href={href} className="group rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition hover:border-[#e9b949]/35">
                <p className="font-black group-hover:text-[#e9b949]">{title} →</p>
                <p className="mt-2 text-xs leading-5 text-white/42">{text}</p>
              </Link>
            );
          })}
        </div>
        <div className="mt-10 rounded-2xl border border-white/[0.08] p-5 text-xs leading-5 text-white/40">
          <strong className="text-white/70">{t.principleLabel}</strong> {t.principleText}
        </div>
      </div>
    </main>
  );
}
