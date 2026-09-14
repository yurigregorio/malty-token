"use client";

import Link from "next/link";
import { useState } from "react";
import { MALTY_PUBLIC_MINT, MALTY_RAYDIUM_SWAP_URL } from "../lib/malty-token";
import { useLanguage } from "../lib/language";
import { SiteHeader } from "../components/site-header";

const MINT = MALTY_PUBLIC_MINT;

const copy = {
  en: {
    eyebrow: "GUIDE",
    title: "How to Buy $MALTY",
    subtitle: "MALTY is live on Solana and available through the official MALTY/SOL pool on Raydium. Follow these six steps to buy safely — no prior crypto experience needed.",
    ctaBuy: "Buy $MALTY on Raydium",
    flow: ["Wallet", "SOL", "Raydium", "$MALTY", "Done 🐶"],
    steps: [
      {
        n: "01", title: "Get a Solana Wallet",
        text: "You need a Solana-compatible wallet to hold and swap MALTY. Phantom is a popular, widely used option — MALTY has no partnership with any wallet provider, this is just a common choice.",
        bullets: [
          "Install a wallet app or browser extension and create a new wallet.",
          "Write down your recovery phrase and store it somewhere private and offline.",
          "Never share your seed phrase or private key with anyone, for any reason.",
        ],
      },
      {
        n: "02", title: "Get SOL",
        text: "You'll need some SOL in your wallet — both to swap for MALTY and to pay small Solana network fees. You can send SOL to your wallet from an exchange you already use, or from another wallet.",
        bullets: [
          "A small amount of SOL covers network fees for every transaction.",
          "MALTY does not endorse or partner with any specific exchange.",
        ],
      },
      {
        n: "03", title: "Open Raydium",
        text: "Raydium is the decentralized exchange (DEX) hosting the official MALTY/SOL pool. Use only the official swap link below — never search for MALTY by name on a DEX.",
        cta: "Open Raydium",
        warning: "Always verify that you are using the official MALTY links before connecting your wallet.",
      },
      {
        n: "04", title: "Select $MALTY",
        text: "Confirm you're swapping for the real MALTY by checking the official contract address below — not just the name or ticker symbol.",
        showContract: true,
        warning: "Always verify the contract address before swapping.",
      },
      {
        n: "05", title: "Swap SOL → MALTY",
        text: "Once your wallet is connected on the official pool:",
        bullets: [
          "Choose SOL as the token you're paying with.",
          "Confirm MALTY as the token you're receiving.",
          "Enter the amount of SOL you want to swap.",
          "Review the transaction details Raydium shows you.",
          "Confirm the swap in your wallet.",
        ],
      },
      {
        n: "06", title: "Check your $MALTY",
        text: "After the swap confirms, MALTY should appear in your wallet's token list. Some wallets take a moment to show new or unverified tokens — if you don't see it right away, search your wallet's token list manually.",
        bullets: [
          "Always confirm it's the real MALTY by matching the contract address, not just the name.",
        ],
      },
    ],
    safeEyebrow: "STAY SAFE",
    safeTitle: "A few things worth knowing.",
    safeItems: [
      "MALTY admins/devs will never ask for your seed phrase.",
      "Never share your private key with anyone, including support.",
      "Be careful with fake MALTY tokens using a similar name or logo.",
      "Always verify the contract address before swapping.",
      "Always use official links from this website or our verified channels.",
      "Be careful with unsolicited DMs offering help, airdrops or investment advice.",
      "MALTY does not guarantee financial returns.",
    ],
    contractLabel: "Official Contract Address",
    copy: "Copy Contract", copied: "Copied!", copyFailed: "Copy failed",
    quickTitle: "Ready to get $MALTY?",
    quickBuy: "Buy $MALTY", quickTelegram: "Join Telegram", quickX: "Follow on X",
    faqTitle: "How to Buy — FAQ",
    faq: [
      ["What network is MALTY on?", "Solana."],
      ["Where can I buy MALTY?", "The official method today is the MALTY/SOL pool on Raydium, linked throughout this page. MALTY is also reachable through Jupiter, which routes to the same pool."],
      ["What is the official MALTY contract?", `${MINT} — always confirm this exact address before swapping.`],
      ["Why can't I see MALTY in my wallet?", "New or not-yet-verified tokens can take a moment to be indexed by some wallets. Check your token list manually, and always confirm you're looking at the right token by its contract address."],
      ["Can a MALTY admin help me through DM?", "MALTY admins will never DM you first, and will never ask for your seed phrase, private key, or a payment. Treat unsolicited DMs offering help as untrusted."],
      ["Does MALTY guarantee profit?", "No. MALTY is a community token. There is no promise or guarantee of price, returns or future value."],
    ],
    ctaTransparency: "Transparency center",
    ctaFaq: "More FAQ",
    ctaHome: "Back to MALTY",
  },
  pt: {
    eyebrow: "GUIA",
    title: "Como comprar $MALTY",
    subtitle: "O MALTY já está ao vivo na Solana e disponível no pool oficial MALTY/SOL na Raydium. Siga estes seis passos para comprar com segurança — sem precisar de experiência prévia com cripto.",
    ctaBuy: "Comprar $MALTY na Raydium",
    flow: ["Wallet", "SOL", "Raydium", "$MALTY", "Feito 🐶"],
    steps: [
      {
        n: "01", title: "Consiga uma carteira Solana",
        text: "Você precisa de uma carteira compatível com a Solana para guardar e negociar MALTY. A Phantom é uma opção popular e bastante usada — o MALTY não tem parceria com nenhuma carteira, é só uma escolha comum.",
        bullets: [
          "Instale um app ou extensão de carteira e crie uma nova carteira.",
          "Anote sua recovery phrase e guarde em um lugar privado e offline.",
          "Nunca compartilhe sua seed phrase ou chave privada com ninguém, por nenhum motivo.",
        ],
      },
      {
        n: "02", title: "Consiga SOL",
        text: "Você vai precisar de um pouco de SOL na sua carteira — tanto para trocar por MALTY quanto para pagar as pequenas taxas da rede Solana. Você pode enviar SOL de uma exchange que já usa, ou de outra carteira.",
        bullets: [
          "Uma pequena quantia de SOL cobre as taxas de rede de cada transação.",
          "O MALTY não recomenda nem tem parceria com nenhuma exchange específica.",
        ],
      },
      {
        n: "03", title: "Abra a Raydium",
        text: "A Raydium é a exchange descentralizada (DEX) que hospeda o pool oficial MALTY/SOL. Use apenas o link oficial de swap abaixo — nunca busque MALTY pelo nome em uma DEX.",
        cta: "Abrir Raydium",
        warning: "Sempre verifique se está usando os links oficiais do MALTY antes de conectar sua carteira.",
      },
      {
        n: "04", title: "Selecione o $MALTY",
        text: "Confirme que você está negociando o MALTY de verdade conferindo o endereço oficial do contrato abaixo — não apenas o nome ou o ticker.",
        showContract: true,
        warning: "Sempre verifique o endereço do contrato antes de fazer o swap.",
      },
      {
        n: "05", title: "Troque SOL → MALTY",
        text: "Com sua carteira conectada no pool oficial:",
        bullets: [
          "Escolha SOL como o token que você está pagando.",
          "Confirme MALTY como o token que você vai receber.",
          "Digite a quantidade de SOL que quer trocar.",
          "Revise os detalhes da transação mostrados pela Raydium.",
          "Confirme o swap na sua carteira.",
        ],
      },
      {
        n: "06", title: "Confira seu $MALTY",
        text: "Depois que o swap for confirmado, o MALTY deve aparecer na lista de tokens da sua carteira. Algumas carteiras demoram um pouco para mostrar tokens novos ou ainda não verificados — se não aparecer de imediato, procure manualmente na lista de tokens.",
        bullets: [
          "Sempre confirme que é o MALTY de verdade comparando o endereço do contrato, não só o nome.",
        ],
      },
    ],
    safeEyebrow: "MANTENHA-SE SEGURO",
    safeTitle: "Algumas coisas importantes de saber.",
    safeItems: [
      "Os admins/devs do MALTY nunca vão pedir sua seed phrase.",
      "Nunca compartilhe sua chave privada com ninguém, nem com o suporte.",
      "Cuidado com tokens falsos do MALTY usando nome ou logo parecidos.",
      "Sempre verifique o endereço do contrato antes de fazer o swap.",
      "Use sempre os links oficiais deste site ou dos nossos canais verificados.",
      "Cuidado com DMs não solicitadas oferecendo ajuda, airdrops ou dicas de investimento.",
      "O MALTY não garante retorno financeiro.",
    ],
    contractLabel: "Endereço Oficial do Contrato",
    copy: "Copiar Contrato", copied: "Copiado!", copyFailed: "Falha ao copiar",
    quickTitle: "Pronto para conseguir seu $MALTY?",
    quickBuy: "Comprar $MALTY", quickTelegram: "Entrar no Telegram", quickX: "Seguir no X",
    faqTitle: "Como comprar — FAQ",
    faq: [
      ["Em qual rede o MALTY está?", "Solana."],
      ["Onde posso comprar MALTY?", "O método oficial hoje é o pool MALTY/SOL na Raydium, linkado ao longo desta página. O MALTY também é acessível via Jupiter, que roteia para o mesmo pool."],
      ["Qual é o contrato oficial do MALTY?", `${MINT} — sempre confirme esse endereço exato antes de negociar.`],
      ["Por que não consigo ver o MALTY na minha carteira?", "Tokens novos ou ainda não verificados podem demorar um pouco para serem indexados por algumas carteiras. Verifique sua lista de tokens manualmente, e sempre confirme que é o token certo pelo endereço do contrato."],
      ["Um admin do MALTY pode me ajudar por DM?", "Os admins do MALTY nunca vão te mandar DM primeiro, e nunca vão pedir sua seed phrase, chave privada ou um pagamento. Trate DMs não solicitadas oferecendo ajuda como não confiáveis."],
      ["O MALTY garante lucro?", "Não. O MALTY é um token comunitário. Não há promessa ou garantia de preço, retorno ou valor futuro."],
    ],
    ctaTransparency: "Central de transparência",
    ctaFaq: "Mais FAQ",
    ctaHome: "Voltar ao MALTY",
  },
} as const;

export function HowToBuyContent() {
  const { language } = useLanguage();
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const t = copy[language];

  async function copyMint() {
    try { await navigator.clipboard.writeText(MINT); setCopyState("copied"); }
    catch { setCopyState("error"); }
    window.setTimeout(() => setCopyState("idle"), 1600);
  }

  return (
    <main className="min-h-screen bg-[#080a0d] text-[#f7f1e5]">
      <SiteHeader />
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
        <p className="mt-2 text-[11px] font-black tracking-[0.22em] text-[#e9b949]">{t.eyebrow}</p>
        <h1 className="mt-3 max-w-2xl text-4xl font-black tracking-[-0.05em] sm:text-6xl">{t.title}</h1>
        <p className="mt-5 max-w-2xl text-sm leading-6 text-white/55">{t.subtitle}</p>
        <a href={MALTY_RAYDIUM_SWAP_URL} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#e9b949] px-5 py-3 text-sm font-black text-black transition-transform hover:-translate-y-0.5">
          {t.ctaBuy} ↗
        </a>

        <div className="mt-8 flex flex-wrap items-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-4 py-3.5 text-sm font-bold text-white/70">
          {t.flow.map((step, i) => (
            <span key={step} className="flex items-center gap-2">
              <span className={i === t.flow.length - 1 ? "text-[#e9b949]" : ""}>{step}</span>
              {i < t.flow.length - 1 && <span className="text-white/25">→</span>}
            </span>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4">
          {t.steps.map((step) => (
            <div key={step.n} className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#e9b949]/30 bg-[#e9b949]/10 text-sm font-black text-[#e9b949]">{step.n}</span>
                <div className="flex-1">
                  <h2 className="text-lg font-black tracking-[-0.01em]">{step.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-white/60">{step.text}</p>

                  {"bullets" in step && step.bullets && (
                    <ul className="mt-3 flex flex-col gap-1.5">
                      {step.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-[13px] leading-5 text-white/55">
                          <span className="mt-0.5 text-emerald-300">✓</span>{b}
                        </li>
                      ))}
                    </ul>
                  )}

                  {"showContract" in step && step.showContract && (
                    <div className="mt-4 rounded-xl border border-white/[0.08] bg-black/15 p-4">
                      <p className="text-[11px] font-medium text-white/45">{t.contractLabel}</p>
                      <p className="mt-1 break-all font-mono text-xs text-white/85 sm:text-sm">{MINT}</p>
                      <button onClick={copyMint} className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-white/[0.1] bg-white/[0.04] px-3 py-1.5 text-[13px] font-semibold text-white/90 transition-colors hover:border-[#e9b949]/35">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5"><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V6a2 2 0 0 1 2-2h9" /></svg>
                        {copyState === "copied" ? t.copied : copyState === "error" ? t.copyFailed : t.copy}
                      </button>
                    </div>
                  )}

                  {"cta" in step && step.cta && (
                    <a href={MALTY_RAYDIUM_SWAP_URL} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#e9b949] px-4 py-2 text-[13px] font-black text-black">
                      {step.cta} ↗
                    </a>
                  )}

                  {"warning" in step && step.warning && (
                    <p className="mt-3 flex items-start gap-2 text-xs leading-5 text-[#e9b949]/90">
                      <span className="mt-0.5">⚠</span>{step.warning}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <section className="mt-10 rounded-2xl border border-[#e9b949]/20 bg-[#e9b949]/[0.04] p-6">
          <p className="text-[11px] font-black tracking-[0.2em] text-[#e9b949]">{t.safeEyebrow}</p>
          <h2 className="mt-2 text-xl font-black">{t.safeTitle}</h2>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {t.safeItems.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm leading-6 text-white/70">
                <span className="mt-0.5 text-[#e9b949]">✓</span>{item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 text-center sm:p-8">
          <h2 className="text-2xl font-black tracking-[-0.02em]">{t.quickTitle}</h2>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <a href={MALTY_RAYDIUM_SWAP_URL} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-[#e9b949] px-5 py-3 text-sm font-black text-black">{t.quickBuy} ↗</a>
            <a href="https://t.me/MaltyCoinOfficial" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-white/12 px-5 py-3 text-sm font-bold">{t.quickTelegram} ↗</a>
            <a href="https://x.com/MaltyCoin" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-white/12 px-5 py-3 text-sm font-bold">{t.quickX} ↗</a>
          </div>
          <button onClick={copyMint} className="mx-auto mt-4 flex items-center gap-1.5 rounded-lg border border-white/[0.1] bg-white/[0.04] px-3 py-1.5 text-[13px] font-semibold text-white/80 transition-colors hover:border-[#e9b949]/35">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5"><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V6a2 2 0 0 1 2-2h9" /></svg>
            {copyState === "copied" ? t.copied : copyState === "error" ? t.copyFailed : t.copy}
          </button>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-black tracking-[-0.02em]">{t.faqTitle}</h2>
          <div className="mt-5 space-y-3">
            {t.faq.map(([q, a]) => (
              <details key={q} className="rounded-2xl border border-white/[0.08] bg-white/[0.025] px-5 py-4">
                <summary className="cursor-pointer text-[15px] font-semibold text-white/90">{q}</summary>
                <p className="mt-3 max-w-2xl break-all text-sm leading-6 text-white/60">{a}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/transparency" className="rounded-xl border border-white/12 px-4 py-2.5 text-sm font-bold">{t.ctaTransparency}</Link>
          <Link href="/#faq" className="rounded-xl border border-white/12 px-4 py-2.5 text-sm font-bold">{t.ctaFaq}</Link>
          <Link href="/" className="rounded-xl border border-white/12 px-4 py-2.5 text-sm font-bold">{t.ctaHome}</Link>
        </div>
      </div>
    </main>
  );
}
