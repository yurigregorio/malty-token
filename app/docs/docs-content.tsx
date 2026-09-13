"use client";

import Link from "next/link";
import { useLanguage } from "../lib/language";
import { SiteHeader } from "../components/site-header";

const GITHUB_DOCS_BASE = "https://github.com/yurigregorio/malty-token/blob/main/docs/";

const copy = {
  en: {
    eyebrow: "PUBLIC DOCUMENTATION",
    title: "Understand the project.",
    intro: "A simpler public layer for MALTY's most important project information. The repository is public — technical repository records remain the deeper source of truth.",
    docs: [
      ["About MALTY", "Mission, identity and the principles behind the project.", "/about"],
      ["Transparency", "Verified token facts, allocation and reserve-state rules.", "/transparency"],
      ["MALTY Gives", "Planned animal-welfare initiative and activation standard.", "/gives"],
      ["Change history", "Material project milestones and transparency changes.", "/updates"],
    ],
    repoLabel: "Technical repository documents",
    repoDocs: [
      ["Transparency reference", "The concise public transparency reference.", "TRANSPARENCY.md"],
      ["FAQ", "The full public FAQ — facts, disclaimers and current status.", "FAQ.md"],
      ["Launch readiness", "Non-transactional launch-readiness record.", "LAUNCH_READINESS.md"],
      ["v1.0 release notes", "Secure v1 release snapshot notes.", "RELEASE_NOTES_V1.0_SECURE.md"],
      ["Tokenomics", "Canonical allocation, release schedule and change-governance rules.", "TOKENOMICS.md"],
      ["Wallet architecture", "Reserve accounts, custody model and the MALTY Impact wallet.", "WALLET_ARCHITECTURE.md"],
      ["MALTY Gives policy", "Planned animal-welfare initiative policy.", "MALTY_GIVES_POLICY.md"],
      ["Reconciliation", "Balance/circulation reconciliation rules.", "RECONCILIATION.md"],
      ["Liquidity policy", "Rules for the Liquidity Reserve.", "LIQUIDITY_POLICY.md"],
      ["Ecosystem policy", "Rules for the Launch & Ecosystem Reserve.", "ECOSYSTEM_POLICY.md"],
      ["Community policy", "Rules for the Community Reserve.", "COMMUNITY_POLICY.md"],
      ["Team policy", "Team reserve, release schedule and recipient structure.", "TEAM_POLICY.md"],
      ["Team roles", "Public team structure — current and planned roles.", "TEAM_ROLES.md"],
      ["Public changelog", "Full material change history.", "CHANGELOG_PUBLIC.md"],
      ["Security audit", "Repository security review — findings and current status.", "SECURITY_AUDIT.md"],
    ],
    principleLabel: "Documentation principle:",
    principleText: "completed and verifiable facts should be presented as facts; future intentions should remain explicitly labeled as planned.",
  },
  pt: {
    eyebrow: "DOCUMENTAÇÃO PÚBLICA",
    title: "Entenda o projeto.",
    intro: "Uma camada pública mais simples para as informações mais importantes do MALTY. O repositório é público — os registros técnicos continuam sendo a fonte de verdade mais profunda.",
    docs: [
      ["Sobre o MALTY", "Missão, identidade e os princípios por trás do projeto.", "/about"],
      ["Transparência", "Fatos verificados do token, alocação e regras de estado das reservas.", "/transparency"],
      ["MALTY Gives", "Iniciativa planejada de bem-estar animal e padrão de ativação.", "/gives"],
      ["Histórico de mudanças", "Marcos materiais do projeto e mudanças de transparência.", "/updates"],
    ],
    repoLabel: "Documentos técnicos do repositório",
    repoDocs: [
      ["Referência de transparência", "A referência pública concisa de transparência.", "TRANSPARENCY.md"],
      ["FAQ", "O FAQ público completo — fatos, disclaimers e status atual.", "FAQ.md"],
      ["Prontidão de lançamento", "Registro não-transacional de prontidão para lançamento.", "LAUNCH_READINESS.md"],
      ["Notas da versão v1.0", "Notas do snapshot da versão segura v1.", "RELEASE_NOTES_V1.0_SECURE.md"],
      ["Tokenomics", "Alocação canônica, cronograma de liberação e regras de governança de mudanças.", "TOKENOMICS.md"],
      ["Arquitetura de carteiras", "Contas de reserva, modelo de custódia e a carteira MALTY Impact.", "WALLET_ARCHITECTURE.md"],
      ["Política do MALTY Gives", "Política da iniciativa planejada de bem-estar animal.", "MALTY_GIVES_POLICY.md"],
      ["Reconciliação", "Regras de reconciliação de saldo/circulação.", "RECONCILIATION.md"],
      ["Política de liquidez", "Regras da Reserva de Liquidez.", "LIQUIDITY_POLICY.md"],
      ["Política de ecossistema", "Regras da Reserva de Lançamento e Ecossistema.", "ECOSYSTEM_POLICY.md"],
      ["Política de comunidade", "Regras da Reserva de Comunidade.", "COMMUNITY_POLICY.md"],
      ["Política de equipe", "Reserva da equipe, cronograma de liberação e estrutura de destinatários.", "TEAM_POLICY.md"],
      ["Funções da equipe", "Estrutura pública da equipe — funções atuais e planejadas.", "TEAM_ROLES.md"],
      ["Changelog público", "Histórico completo de mudanças materiais.", "CHANGELOG_PUBLIC.md"],
      ["Auditoria de segurança", "Revisão de segurança do repositório — achados e status atual.", "SECURITY_AUDIT.md"],
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
        <p className="mt-10 text-[11px] font-black tracking-[0.18em] text-white/50">{t.repoLabel}</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {t.repoDocs.map(([title, text, file]) => (
            <a key={title} href={`${GITHUB_DOCS_BASE}${file}`} target="_blank" rel="noopener noreferrer" className="group rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition hover:border-[#e9b949]/35">
              <p className="font-black group-hover:text-[#e9b949]">{title} ↗</p>
              <p className="mt-2 text-xs leading-5 text-white/55">{text}</p>
            </a>
          ))}
        </div>
        <div className="mt-10 rounded-2xl border border-white/[0.08] p-5 text-xs leading-5 text-white/50">
          <strong className="text-white/70">{t.principleLabel}</strong> {t.principleText}
        </div>
      </div>
    </main>
  );
}
