import { useLanguage } from "../language";

/**
 * All user-facing copy for the Malty Swap feature, in one place. Every
 * swap component pulls its strings from here via `useSwapCopy()` instead of
 * hardcoding English — matches the site's existing EN/PT language toggle.
 */
export const SWAP_COPY = {
  en: {
    // /swap page
    pageEyebrow: "MALTY SWAP",
    pageTitle: "Trade $MALTY.",
    pageSubtitle:
      "Swap SOL or USDC for MALTY — and back — using real Raydium liquidity from your own wallet. Non-custodial, every transaction signed by you.",
    guideLink: "New to crypto? Read the guide →",
    openOnRaydium: "Open on Raydium ↗",

    // Wallet / network gating
    switchToMainnetTitle: "Switch to Mainnet",
    switchToMainnetBody:
      "$MALTY liquidity lives on Solana Mainnet. Switch networks to continue swapping.",
    switchToMainnetCta: "Switch to Mainnet",
    connectPrompt: "Connect your wallet to swap",
    noWalletDetected:
      "No Solana wallet detected. Install Phantom, Solflare, Backpack, or another Wallet Standard–compatible wallet to continue.",
    chooseWallet: "Choose a wallet",

    // Token amount panels
    balance: "Balance",
    max: "MAX",
    loadingBalance: "Loading balance…",
    balanceUnavailable: "Balance unavailable",
    retry: "Retry",
    youPay: "You pay",
    youReceive: "You receive",
    buyingExactly: "Buying exactly",
    amountFieldSuffix: "amount",

    // Quote / details
    rate: "Rate",
    minimumReceived: "Minimum received",
    maximumYouPay: "Maximum you pay",
    slippageTolerance: "Slippage tolerance",
    priceImpact: "Price impact",
    route: "Route",
    refreshingQuote: "Refreshing quote…",
    fetchingQuote: "Fetching quote…",
    enterAnAmount: "Enter an amount",
    reviewSwapCta: "Review Swap",

    // Slippage
    custom: "Custom",
    highSlippageWarning:
      "High slippage tolerance — your swap may execute at a worse price than expected.",
    maxSlippagePrefix: "Max",
    whatIsSlippage: "What is slippage?",
    slippageExplanation:
      "Slippage tolerance is the most the price can move against you between getting this quote and your swap actually executing on-chain. If the price moves more than that, the swap fails instead of going through at a worse rate than you approved.",

    // Review screen
    reviewSwapTitle: "Review Swap",
    youReceiveApprox: "You receive approximately",
    priceImpactAckPrefix: "This swap has a high price impact (",
    priceImpactAckSuffix:
      "%) due to MALTY's current liquidity. I understand I may receive significantly less value than I pay, and I want to continue.",
    poweredByRaydium: "Powered by Raydium",
    back: "Back",
    confirmSwapCta: "Confirm Swap",
    confirmInWalletCta: "Confirm in wallet…",

    // In-flight / result states
    awaitingSignatureTitle: "Confirm in your wallet",
    awaitingSignatureText:
      "Approve the transaction in your wallet to continue. Malty never signs on your behalf.",
    submittedTitle: "Transaction submitted",
    submittedText: "Your swap was sent to the network.",
    confirmingTitle: "Confirming…",
    confirmingText:
      "Waiting for the Solana network to confirm your swap. This is usually quick.",
    swapCompleteTitle: "Swap complete!",
    returnToGame: "Return to Game",
    swapAgain: "Swap again",
    swapFailedTitle: "Swap didn't go through",
    tryAgain: "Try again",
    genericFailure: "Something went wrong.",

    // Trust footer
    contractLabel: "$MALTY CONTRACT",
    copy: "Copy",
    copied: "Copied!",
    copyFailed: "Copy failed",
    disclosure:
      "Swaps are executed on Solana using decentralized liquidity. Rates and price impact may change before confirmation. Always review the transaction in your wallet.",

    // Site-wide wallet button
    connectWallet: "Connect Wallet",
    connectShort: "Connect",
    walletLabel: "Wallet",
    copyAddress: "Copy address",
    explorer: "Explorer ↗",
    disconnect: "Disconnect",
    disconnecting: "Disconnecting…",
  },
  pt: {
    pageEyebrow: "MALTY SWAP",
    pageTitle: "Troque $MALTY.",
    pageSubtitle:
      "Troque SOL ou USDC por MALTY — e volte — usando liquidez real da Raydium, direto da sua carteira. Não-custodial, você assina cada transação.",
    guideLink: "Novo em cripto? Leia o guia →",
    openOnRaydium: "Abrir na Raydium ↗",

    switchToMainnetTitle: "Mude para a Mainnet",
    switchToMainnetBody:
      "A liquidez do $MALTY está na Solana Mainnet. Mude de rede para continuar trocando.",
    switchToMainnetCta: "Mudar para a Mainnet",
    connectPrompt: "Conecte sua carteira para trocar",
    noWalletDetected:
      "Nenhuma carteira Solana detectada. Instale a Phantom, Solflare, Backpack ou outra carteira compatível com Wallet Standard para continuar.",
    chooseWallet: "Escolha uma carteira",

    balance: "Saldo",
    max: "MÁX",
    loadingBalance: "Carregando saldo…",
    balanceUnavailable: "Saldo indisponível",
    retry: "Tentar de novo",
    youPay: "Você paga",
    youReceive: "Você recebe",
    buyingExactly: "Comprando exatamente",
    amountFieldSuffix: "valor",

    rate: "Cotação",
    minimumReceived: "Mínimo recebido",
    maximumYouPay: "Máximo que você paga",
    slippageTolerance: "Tolerância de slippage",
    priceImpact: "Impacto no preço",
    route: "Rota",
    refreshingQuote: "Atualizando cotação…",
    fetchingQuote: "Buscando cotação…",
    enterAnAmount: "Digite um valor",
    reviewSwapCta: "Revisar Swap",

    custom: "Personalizado",
    highSlippageWarning:
      "Tolerância de slippage alta — seu swap pode executar a um preço pior que o esperado.",
    maxSlippagePrefix: "Máx.",
    whatIsSlippage: "O que é slippage?",
    slippageExplanation:
      "Slippage é o quanto o preço pode se mover contra você entre a cotação e a execução do swap on-chain. Se o preço mudar mais do que isso, o swap falha em vez de ser executado a um preço pior do que você aprovou.",

    reviewSwapTitle: "Revisar Swap",
    youReceiveApprox: "Você recebe aproximadamente",
    priceImpactAckPrefix: "Este swap tem um impacto de preço alto (",
    priceImpactAckSuffix:
      "%) devido à liquidez atual do MALTY. Entendo que posso receber um valor significativamente menor do que estou pagando, e quero continuar.",
    poweredByRaydium: "Powered by Raydium",
    back: "Voltar",
    confirmSwapCta: "Confirmar Swap",
    confirmInWalletCta: "Confirmando na carteira…",

    awaitingSignatureTitle: "Confirme na sua carteira",
    awaitingSignatureText:
      "Aprove a transação na sua carteira para continuar. O Malty nunca assina em seu nome.",
    submittedTitle: "Transação enviada",
    submittedText: "Seu swap foi enviado para a rede.",
    confirmingTitle: "Confirmando…",
    confirmingText:
      "Aguardando a rede Solana confirmar seu swap. Isso costuma ser rápido.",
    swapCompleteTitle: "Swap concluído!",
    returnToGame: "Voltar ao Jogo",
    swapAgain: "Trocar de novo",
    swapFailedTitle: "O swap não foi concluído",
    tryAgain: "Tentar de novo",
    genericFailure: "Algo deu errado.",

    contractLabel: "CONTRATO DO $MALTY",
    copy: "Copiar",
    copied: "Copiado!",
    copyFailed: "Falha ao copiar",
    disclosure:
      "Os swaps são executados na Solana usando liquidez descentralizada. Taxas e impacto no preço podem mudar antes da confirmação. Sempre revise a transação na sua carteira.",

    connectWallet: "Conectar Carteira",
    connectShort: "Conectar",
    walletLabel: "Carteira",
    copyAddress: "Copiar endereço",
    explorer: "Explorer ↗",
    disconnect: "Desconectar",
    disconnecting: "Desconectando…",
  },
} as const;

// Structural (keys only, widened to `string`) rather than `typeof SWAP_COPY["en"]`
// directly — the latter pins every value to `en`'s exact literal string, which
// the `pt` object (different literal strings, same keys) can't satisfy.
export type SwapCopy = { [K in keyof (typeof SWAP_COPY)["en"]]: string };

export function useSwapCopy(): SwapCopy {
  const { language } = useLanguage();
  return SWAP_COPY[language];
}
