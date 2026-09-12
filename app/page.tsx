"use client";

import { useState } from "react";

const MINT = "6ZhVVH2KwbiVg6HJjrPg2YC5SWomBFA5qGmz57pknMpz";
const TOKEN_IMAGE = "https://arweave.net/w-TXbk_hQOw1mC5vA9YrVmClKzz_Avjfiq5coE1AYec";

const allocations = [
  ["Liquidity", "500,000,000", "50%"],
  ["Ecosystem", "200,000,000", "20%"],
  ["Community", "150,000,000", "15%"],
  ["Treasury", "75,000,000", "7.5%"],
  ["Team", "75,000,000", "7.5%"],
] as const;

const reserveWallets = [
  ["Liquidity", "8zMNiAh2uH1MoKh9eRjewSrgRjU4WQAYVV2u4SKSiRfU"],
  ["Ecosystem", "44Ha31Tj911xtFcNv5e4RTD7f3NxhULtcUygBJm8on1g"],
  ["Community", "BFYWFeqf8uJ4BvD6dfySCkdMVdtDPvxFe5hmSzuCCbhg"],
  ["Treasury", "6gkNMy3342qVUKSatW27zUAK22ops5Fu7G5J148MQZK6"],
  ["Team", "CvASopxtFapEhJ8r75UcHiisPVCfxv5ApGAqbwNagXmw"],
] as const;

type Language = "en" | "pt";

const copy = {
  en: {
    nav: ["About", "Token", "Transparency", "Tokenomics", "Roadmap", "FAQ"],
    badge: "SOLANA MAINNET · VERIFIED CONTRACT",
    headline: "Small Dog. Big Community.",
    intro:
      "MALTY is a transparent community token built on Solana, inspired by Charlotte — a Maltese with a big personality and an even bigger community spirit.",
    explore: "Explore MALTY",
    verify: "Verify on Solana",
    aboutEyebrow: "ABOUT MALTY",
    aboutTitle: "A community story, built with transparency.",
    aboutText:
      "Charlotte gives MALTY its personality. The project gives it structure: a fixed issued supply, public token facts, published reserve addresses and documentation that separates plans from what has actually happened on-chain.",
    tokenTitle: "The MALTY token",
    tokenText: "Official Mainnet facts, presented clearly and verifiably.",
    transparencyTitle: "Verified. Transparent. MALTY.",
    transparencyText:
      "The project publishes what can be verified and avoids presenting planned allocations as completed distribution.",
    tokenomicsTitle: "Tokenomics designed to be understood.",
    tokenomicsText:
      "Canonical allocation of the 1B MALTY issued supply. Allocation does not by itself mean tokens are circulating or distributed.",
    reservesTitle: "Reserve architecture",
    reservesText:
      "Five public reserve addresses are documented. At the latest documented reconciliation, each held 0 MALTY and no reserve transfer had been executed.",
    roadmapTitle: "Build first. Communicate clearly.",
    faqTitle: "Frequently asked questions",
    risk:
      "MALTY is a memecoin. This website documents project structure and verifiable token facts; it is not a promise of price, returns, liquidity or future value.",
    current: "Documented: 0 MALTY",
    copy: "Copy",
    copied: "Copied",
  },
  pt: {
    nav: ["Sobre", "Token", "Transparência", "Tokenomics", "Roadmap", "FAQ"],
    badge: "SOLANA MAINNET · CONTRATO VERIFICÁVEL",
    headline: "Cão pequeno. Grande comunidade.",
    intro:
      "MALTY é um token comunitário transparente construído na Solana, inspirado na Charlotte — uma Maltês com uma grande personalidade e um espírito de comunidade ainda maior.",
    explore: "Conhecer MALTY",
    verify: "Verificar na Solana",
    aboutEyebrow: "SOBRE O MALTY",
    aboutTitle: "Uma história de comunidade, construída com transparência.",
    aboutText:
      "Charlotte dá personalidade ao MALTY. O projeto dá estrutura: supply emitido e definido, dados públicos do token, endereços de reserva publicados e documentação que separa planos do que realmente aconteceu on-chain.",
    tokenTitle: "O token MALTY",
    tokenText: "Dados oficiais da Mainnet, apresentados de forma clara e verificável.",
    transparencyTitle: "Verificável. Transparente. MALTY.",
    transparencyText:
      "O projeto publica o que pode ser verificado e evita apresentar alocações planeadas como distribuição já realizada.",
    tokenomicsTitle: "Tokenomics feita para ser entendida.",
    tokenomicsText:
      "Alocação canónica do supply emitido de 1B MALTY. Alocação, por si só, não significa que os tokens estejam em circulação ou distribuídos.",
    reservesTitle: "Arquitetura de reservas",
    reservesText:
      "Cinco endereços públicos de reserva estão documentados. Na última reconciliação documentada, cada um mantinha 0 MALTY e nenhuma transferência de reserva tinha sido executada.",
    roadmapTitle: "Construir primeiro. Comunicar com clareza.",
    faqTitle: "Perguntas frequentes",
    risk:
      "MALTY é uma memecoin. Este site documenta a estrutura do projeto e dados verificáveis do token; não é promessa de preço, retorno, liquidez ou valor futuro.",
    current: "Documentado: 0 MALTY",
    copy: "Copiar",
    copied: "Copiado",
  },
} as const;

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [copied, setCopied] = useState(false);
  const t = copy[language];

  async function copyMint() {
    await navigator.clipboard.writeText(MINT);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <main className="min-h-screen bg-[#090b0f] text-[#f8f3e7] selection:bg-[#e9b949] selection:text-black">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#090b0f]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <a className="flex items-center gap-3" href="#top">
            <img src={TOKEN_IMAGE} alt="MALTY" className="h-10 w-10 rounded-full border border-[#e9b949]/50 object-cover" />
            <div>
              <p className="text-lg font-black tracking-tight text-[#f4c35b]">MALTY</p>
              <p className="text-[10px] uppercase tracking-[0.22em] text-white/45">Solana</p>
            </div>
          </a>

          <nav className="hidden items-center gap-6 text-sm text-white/65 lg:flex">
            {t.nav.map((item, i) => (
              <a key={item} className="transition hover:text-[#f4c35b]" href={`#${["about", "token", "transparency", "tokenomics", "roadmap", "faq"][i]}`}>
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] p-1 text-xs font-semibold">
            {(["en", "pt"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`rounded-full px-3 py-2 transition ${language === lang ? "bg-[#e9b949] text-black" : "text-white/60 hover:text-white"}`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </header>

      <section id="top" className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgba(233,185,73,0.14),transparent_32%),radial-gradient(circle_at_25%_20%,rgba(93,63,211,0.10),transparent_28%)]" />
        <div className="relative mx-auto grid min-h-[720px] max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e9b949]/25 bg-[#e9b949]/5 px-4 py-2 text-[11px] font-bold tracking-[0.18em] text-[#f4c35b]">
              <span className="h-2 w-2 rounded-full bg-emerald-400" /> {t.badge}
            </div>
            <h1 className="mt-7 max-w-3xl text-5xl font-black leading-[0.95] tracking-[-0.05em] sm:text-7xl lg:text-8xl">
              MALTY<span className="text-[#e9b949]">.</span>
            </h1>
            <p className="mt-5 text-2xl font-bold tracking-tight text-white sm:text-3xl">{t.headline}</p>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/60 sm:text-lg">{t.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#token" className="rounded-xl bg-[#e9b949] px-5 py-3 text-sm font-bold text-black transition hover:bg-[#f4c35b]">
                {t.explore}
              </a>
              <a href={`https://explorer.solana.com/address/${MINT}`} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-bold text-white transition hover:border-[#e9b949]/60">
                {t.verify} ↗
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/40">
              <span>1B MALTY</span><span>0% Transfer Tax</span><span>6 Decimals</span><span>Solana Mainnet</span>
            </div>
          </div>

          <div className="relative flex min-h-[430px] items-center justify-center">
            <div className="absolute h-[370px] w-[370px] rounded-full bg-[#e9b949]/10 blur-3xl" />
            <div className="relative">
              <div className="absolute -inset-6 rounded-full border border-[#e9b949]/10" />
              <div className="absolute -inset-12 rounded-full border border-white/5" />
              <div className="relative flex h-72 w-72 items-center justify-center rounded-full border-[10px] border-[#c8952e] bg-gradient-to-br from-[#f5d57a] via-[#c9952e] to-[#6f4715] p-3 shadow-[0_30px_100px_rgba(233,185,73,0.25)] sm:h-96 sm:w-96">
                <div className="h-full w-full overflow-hidden rounded-full border-4 border-black/30 bg-[#111318]">
                  <img src={TOKEN_IMAGE} alt="Official MALTY token artwork" className="h-full w-full object-cover" />
                </div>
              </div>
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-[#101319] px-5 py-2 text-center shadow-xl">
                <p className="text-xs font-black tracking-[0.24em] text-[#f4c35b]">MALTY</p>
                <p className="mt-1 text-[10px] text-white/45">OFFICIAL TOKEN</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="border-b border-black/10 bg-[#f4efe4] text-[#17130d]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:py-28">
          <div className="flex items-center justify-center">
            <div className="rotate-[-3deg] rounded-2xl bg-white p-4 shadow-2xl shadow-black/10">
              <img src={TOKEN_IMAGE} alt="MALTY identity" className="aspect-square w-full max-w-sm rounded-xl object-cover" />
              <p className="px-2 pb-2 pt-4 text-center text-sm font-bold text-black/55">Charlotte × MALTY</p>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-xs font-black tracking-[0.25em] text-[#9f6d16]">{t.aboutEyebrow}</p>
            <h2 className="mt-4 max-w-2xl text-4xl font-black tracking-[-0.035em] sm:text-5xl">{t.aboutTitle}</h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-black/60">{t.aboutText}</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <LightStat label="Network" value="Solana" />
              <LightStat label="Ticker" value="MALTY" />
              <LightStat label="Supply" value="1,000,000,000" />
            </div>
          </div>
        </div>
      </section>

      <section id="token" className="border-b border-white/10 bg-[#0c0f14]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
          <SectionHeader eyebrow="TOKEN" title={t.tokenTitle} text={t.tokenText} />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <DarkStat label="Total supply" value="1,000,000,000 MALTY" />
            <DarkStat label="Decimals" value="6" />
            <DarkStat label="Transfer tax" value="0%" />
            <DarkStat label="Mint Authority" value="Revoked" accent />
            <DarkStat label="Freeze Authority" value="None" accent />
            <DarkStat label="Metadata" value="Present" />
          </div>

          <div className="mt-6 rounded-2xl border border-[#e9b949]/25 bg-[#e9b949]/[0.04] p-5 sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f4c35b]">Official Mint</p>
                <p className="mt-2 break-all font-mono text-sm text-white/75">{MINT}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button onClick={copyMint} className="rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-white/75 transition hover:border-[#e9b949]/50 hover:text-white">
                  {copied ? t.copied : t.copy}
                </button>
                <a href={`https://explorer.solana.com/address/${MINT}`} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-[#e9b949] px-4 py-2 text-sm font-bold text-black">
                  Explorer ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="transparency" className="border-b border-white/10 bg-[#090b0f]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
          <SectionHeader eyebrow="TRANSPARENCY" title={t.transparencyTitle} text={t.transparencyText} />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatusCard title="1B MALTY" detail="Fixed issued supply" status="Verified" />
            <StatusCard title="Mint Authority" detail="No further minting authority" status="Revoked" />
            <StatusCard title="Freeze Authority" detail="No freeze authority configured" status="None" />
            <StatusCard title="Network" detail="Official deployment" status="Solana Mainnet" />
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            <Note title="Plans ≠ balances" text={language === "pt" ? "Alocações planeadas são apresentadas separadamente dos saldos on-chain atuais." : "Planned allocations are presented separately from current on-chain balances."} />
            <Note title="Public addresses" text={language === "pt" ? "Os endereços de reserva são publicados para permitir verificação independente." : "Reserve addresses are published so they can be independently checked."} />
            <Note title="No unsupported claims" text={language === "pt" ? "O projeto não declara liquidez bloqueada ou garantida sem mecanismo verificável." : "The project does not claim locked or guaranteed liquidity without a verifiable mechanism."} />
          </div>
        </div>
      </section>

      <section id="tokenomics" className="border-b border-black/10 bg-[#f4efe4] text-[#17130d]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
          <SectionHeader light eyebrow="TOKENOMICS" title={t.tokenomicsTitle} text={t.tokenomicsText} />
          <div className="mt-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="flex items-center justify-center">
              <div className="relative flex h-72 w-72 items-center justify-center rounded-full bg-[conic-gradient(#d9a63b_0_50%,#9468d9_50%_70%,#3b9ed9_70%_85%,#78a75a_85%_92.5%,#d86f6f_92.5%_100%)] shadow-xl shadow-black/10">
                <div className="flex h-44 w-44 flex-col items-center justify-center rounded-full bg-[#f4efe4] text-center">
                  <span className="text-4xl font-black">1B</span>
                  <span className="mt-1 text-xs font-bold tracking-[0.2em] text-black/45">MALTY</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {allocations.map(([name, amount, share], index) => (
                <div key={name} className="flex items-center justify-between gap-4 rounded-2xl border border-black/10 bg-white/55 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span className={`h-3 w-3 rounded-full ${["bg-[#d9a63b]", "bg-[#9468d9]", "bg-[#3b9ed9]", "bg-[#78a75a]", "bg-[#d86f6f]"][index]}`} />
                    <span className="font-bold">{name}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-black">{share}</p>
                    <p className="text-xs text-black/45">{amount} MALTY</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#0c0f14]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
          <SectionHeader eyebrow="RESERVES" title={t.reservesTitle} text={t.reservesText} />
          <div className="mt-10 grid gap-3 lg:grid-cols-2">
            {reserveWallets.map(([name, wallet]) => (
              <div key={name} className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-bold text-white">{name}</p>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white/45">{t.current}</span>
                </div>
                <p className="mt-4 break-all font-mono text-[11px] leading-5 text-white/40">{wallet}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs leading-6 text-white/35">
            {language === "pt" ? "Nota de custódia: estes cinco endereços são contas públicas separadas, atualmente documentadas sob uma única fronteira temporária de segurança de custódia." : "Custody note: these five addresses are separate public accounts, currently documented under one temporary custody security boundary."}
          </p>
        </div>
      </section>

      <section id="roadmap" className="border-b border-white/10 bg-[#090b0f]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
          <SectionHeader eyebrow="ROADMAP" title={t.roadmapTitle} text={language === "pt" ? "Estados simples, sem promessas exageradas: concluído, em progresso e planeado." : "Simple states, without inflated promises: completed, in progress and planned."} />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <RoadmapCard n="01" status="Completed" title={language === "pt" ? "Fundação técnica" : "Technical foundation"} items={["Mainnet token", "Metadata", "Mint authority revoked"]} />
            <RoadmapCard n="02" status="Completed" title={language === "pt" ? "Transparência" : "Transparency"} items={["Tokenomics", "Reserve architecture", "Security hardening"]} />
            <RoadmapCard n="03" status="In progress" title={language === "pt" ? "Presença pública" : "Public presence"} items={["Professional website", "PT / EN", "Community channels"]} />
            <RoadmapCard n="04" status="Planned" title={language === "pt" ? "Próximos marcos" : "Next milestones"} items={["Public updates", "Community initiatives", "Verifiable releases"]} />
          </div>
        </div>
      </section>

      <section id="faq" className="bg-[#f4efe4] text-[#17130d]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
          <SectionHeader light eyebrow="FAQ" title={t.faqTitle} text={language === "pt" ? "Respostas diretas sobre os pontos mais importantes do projeto." : "Direct answers to the most important project questions."} />
          <div className="mt-10 grid gap-3 lg:grid-cols-2">
            <Faq q={language === "pt" ? "O que é MALTY?" : "What is MALTY?"} a={language === "pt" ? "Um token comunitário na Solana inspirado na Charlotte e construído com foco em transparência pública." : "A Solana community token inspired by Charlotte and built around public transparency."} />
            <Faq q={language === "pt" ? "Podem ser criados mais MALTY?" : "Can more MALTY be minted?"} a={language === "pt" ? "A Mint Authority do token oficial foi revogada." : "The official token's Mint Authority has been revoked."} />
            <Faq q={language === "pt" ? "Existe taxa de transferência?" : "Is there a transfer tax?"} a={language === "pt" ? "Não. O token foi configurado com taxa de transferência de 0%." : "No. The token is configured with a 0% transfer tax."} />
            <Faq q={language === "pt" ? "Como verifico o token oficial?" : "How do I verify the official token?"} a={`${language === "pt" ? "Confirme sempre o mint oficial" : "Always verify the official mint"}: ${MINT}`} />
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#080a0d]">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <img src={TOKEN_IMAGE} alt="MALTY" className="h-9 w-9 rounded-full" />
                <span className="text-lg font-black text-[#f4c35b]">MALTY</span>
              </div>
              <p className="mt-3 max-w-xl text-xs leading-6 text-white/35">{t.risk}</p>
            </div>
            <div className="text-xs text-white/35 lg:text-right">
              <p>Built on Solana · Transparent by design</p>
              <p className="mt-2">Small Dog. Big Community.</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

function SectionHeader({ eyebrow, title, text, light = false }: { eyebrow: string; title: string; text: string; light?: boolean }) {
  return (
    <div className="max-w-3xl">
      <p className={`text-xs font-black tracking-[0.24em] ${light ? "text-[#9f6d16]" : "text-[#f4c35b]"}`}>{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] sm:text-5xl">{title}</h2>
      <p className={`mt-4 max-w-2xl text-sm leading-7 sm:text-base ${light ? "text-black/55" : "text-white/50"}`}>{text}</p>
    </div>
  );
}

function LightStat({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-black/10 bg-white/55 p-4"><p className="text-xs font-semibold text-black/40">{label}</p><p className="mt-2 font-black">{value}</p></div>;
}

function DarkStat({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5"><p className="text-xs font-semibold text-white/35">{label}</p><p className={`mt-2 text-base font-black ${accent ? "text-emerald-400" : "text-white"}`}>{value}</p></div>;
}

function StatusCard({ title, detail, status }: { title: string; detail: string; status: string }) {
  return <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5"><div className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-sm text-emerald-400">✓</div><p className="mt-5 font-black text-white">{title}</p><p className="mt-2 text-xs leading-5 text-white/40">{detail}</p><p className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-[#f4c35b]">{status}</p></div>;
}

function Note({ title, text }: { title: string; text: string }) {
  return <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"><p className="font-bold text-white">{title}</p><p className="mt-2 text-sm leading-6 text-white/45">{text}</p></div>;
}

function RoadmapCard({ n, status, title, items }: { n: string; status: string; title: string; items: string[] }) {
  return <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5"><div className="flex items-center justify-between"><span className="text-2xl font-black text-white/15">{n}</span><span className="rounded-full border border-[#e9b949]/20 bg-[#e9b949]/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#f4c35b]">{status}</span></div><p className="mt-6 font-black text-white">{title}</p><ul className="mt-4 space-y-2 text-xs text-white/45">{items.map((item) => <li key={item}>• {item}</li>)}</ul></div>;
}

function Faq({ q, a }: { q: string; a: string }) {
  return <details className="group rounded-2xl border border-black/10 bg-white/50 p-5"><summary className="cursor-pointer list-none font-bold">{q}<span className="float-right text-black/35 group-open:rotate-45">+</span></summary><p className="mt-4 break-words text-sm leading-6 text-black/55">{a}</p></details>;
}
