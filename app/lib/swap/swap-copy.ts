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

    // Trust badges (below the page subtitle)
    badgeSecureTitle: "Non-custodial & secure",
    badgeSecureText: "You stay in control",
    badgeLiquidityTitle: "Raydium liquidity",
    badgeLiquidityText: "Best available rates",
    badgeSpeedTitle: "Solana transactions",
    badgeSpeedText: "Fast and low fees",
    mascotTagline: "Good Dogs Trade Together",

    // Wallet / network gating
    switchToMainnetTitle: "Switch to Mainnet",
    switchToMainnetBody:
      "$MALTY liquidity lives on Solana Mainnet. Switch networks to continue swapping.",
    switchToMainnetCta: "Switch to Mainnet",
    connectPrompt: "Connect your wallet to swap",
    noWalletDetected:
      "No Solana wallet detected. Install Phantom, Solflare, Backpack, or another Wallet Standard–compatible wallet to continue.",
    iosNoWalletDetected:
      "iPhone browsers can't connect a wallet directly here yet. Open this page from inside your wallet app's own browser (e.g. Phantom → browser tab), or trade on Raydium instead:",
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
    fetchingQuote: "Getting quote…",
    enterAnAmount: "Enter an amount",
    reviewSwapCta: "Review Swap",
    swapCtaPrefix: "Swap",
    forWord: "for",
    estimatedValue: "Estimated value",
    estimatedNetworkFee: "Estimated network fee",
    viaRaydium: "via Raydium",
    quoteUnavailable: "Quote unavailable",

    // Slippage
    slippageLabel: "Slippage",
    custom: "Custom",
    highSlippageWarning:
      "High slippage tolerance — your swap may execute at a worse price than expected.",
    maxSlippagePrefix: "Max",
    whatIsSlippage: "What is slippage?",
    slippageExplanation:
      "Slippage tolerance is the most the price can move against you between getting this quote and your swap actually executing on-chain. If the price moves more than that, the swap fails instead of going through at a worse rate than you approved.",

    // Price impact
    priceImpactWarning: "This swap has a high price impact due to available liquidity.",

    // Errors thrown directly by the engine (not through mapSwapError's pattern matching)
    quoteExpiredError: "This quote expired. Refreshing…",
    wrongNetworkError: "Switch to Mainnet to swap MALTY.",

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
    preparingTitle: "Preparing transaction",
    preparingText: "Building your swap transaction from the latest quote.",
    awaitingSignatureTitle: "Confirm in your wallet",
    awaitingSignatureText:
      "Approve the transaction in your wallet to continue. Malty never signs on your behalf.",
    submittedTitle: "Sending…",
    submittedText: "Your swap was sent to the network.",
    confirmingTitle: "Confirming…",
    confirmingText:
      "Waiting for the Solana network to confirm your swap. This is usually quick.",
    swapCompleteTitle: "Swap complete! 🎉",
    viewTransaction: "View transaction",
    returnToGame: "Return to Game",
    swapAgain: "Swap again",
    swapFailedTitle: "Swap didn't go through",
    tryAgain: "Try again",
    genericFailure: "Something went wrong.",

    // Trust footer / contract / pool info
    contractLabel: "MALTY contract",
    copy: "Copy",
    copied: "Copied ✓",
    copyFailed: "Copy failed",
    viewOnSolscan: "View on Solscan ↗",
    disclosure:
      "Swaps are executed on Solana using decentralized liquidity. Rates and price impact may change before confirmation. Always review the transaction in your wallet.",
    poolInfoTitle: "Liquidity provided by Raydium",
    viewPool: "View pool ↗",

    // Recent swaps (local history for the connected wallet)
    recentSwapsTitle: "Your recent swaps",
    recentSwapsEmpty: "No swaps made from this wallet yet.",
    recentSwapsEmptyOther: "No other swaps found in this wallet.",
    confirmedLabel: "Confirmed",
    flipTokens: "Flip tokens",
    viewAll: "View all",

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

    badgeSecureTitle: "Seguro e não-custodial",
    badgeSecureText: "Você mantém o controle",
    badgeLiquidityTitle: "Liquidez via Raydium",
    badgeLiquidityText: "Melhores preços",
    badgeSpeedTitle: "Transações na Solana",
    badgeSpeedText: "Rápidas e com baixas taxas",
    mascotTagline: "Good Dogs Trade Together",

    switchToMainnetTitle: "Mude para a Mainnet",
    switchToMainnetBody:
      "A liquidez do $MALTY está na Solana Mainnet. Mude de rede para continuar trocando.",
    switchToMainnetCta: "Mudar para a Mainnet",
    connectPrompt: "Conecte sua carteira para trocar",
    noWalletDetected:
      "Nenhuma carteira Solana detectada. Instale a Phantom, Solflare, Backpack ou outra carteira compatível com Wallet Standard para continuar.",
    iosNoWalletDetected:
      "No iPhone, o navegador ainda não consegue conectar uma carteira diretamente aqui. Abra esta página pelo navegador de dentro do app da sua carteira (ex: Phantom → aba do navegador), ou negocie pela Raydium:",
    chooseWallet: "Escolha uma carteira",

    balance: "Saldo",
    max: "MAX",
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
    fetchingQuote: "Obtendo cotação…",
    enterAnAmount: "Digite um valor",
    reviewSwapCta: "Revisar Swap",
    swapCtaPrefix: "Trocar",
    forWord: "por",
    estimatedValue: "Valor estimado",
    estimatedNetworkFee: "Taxa estimada da rede",
    viaRaydium: "via Raydium",
    quoteUnavailable: "Cotação indisponível",

    slippageLabel: "Slippage",
    custom: "Personalizado",
    highSlippageWarning:
      "Tolerância de slippage alta — seu swap pode executar a um preço pior que o esperado.",
    maxSlippagePrefix: "Máx.",
    whatIsSlippage: "O que é slippage?",
    slippageExplanation:
      "Slippage é o quanto o preço pode se mover contra você entre a cotação e a execução do swap on-chain. Se o preço mudar mais do que isso, o swap falha em vez de ser executado a um preço pior do que você aprovou.",

    priceImpactWarning: "Esta troca possui impacto elevado no preço devido à liquidez disponível.",

    quoteExpiredError: "Esta cotação expirou. Atualizando…",
    wrongNetworkError: "Mude para a Mainnet para trocar MALTY.",

    reviewSwapTitle: "Revisar Swap",
    youReceiveApprox: "Você recebe aproximadamente",
    priceImpactAckPrefix: "Este swap tem um impacto de preço alto (",
    priceImpactAckSuffix:
      "%) devido à liquidez atual do MALTY. Entendo que posso receber um valor significativamente menor do que estou pagando, e quero continuar.",
    poweredByRaydium: "Powered by Raydium",
    back: "Voltar",
    confirmSwapCta: "Confirmar Swap",
    confirmInWalletCta: "Confirmando na carteira…",

    preparingTitle: "Preparando transação",
    preparingText: "Montando sua transação de swap a partir da cotação mais recente.",
    awaitingSignatureTitle: "Confirme na sua carteira",
    awaitingSignatureText:
      "Aprove a transação na sua carteira para continuar. O Malty nunca assina em seu nome.",
    submittedTitle: "Enviando…",
    submittedText: "Seu swap foi enviado para a rede.",
    confirmingTitle: "Confirmando…",
    confirmingText:
      "Aguardando a rede Solana confirmar seu swap. Isso costuma ser rápido.",
    swapCompleteTitle: "Swap concluído! 🎉",
    viewTransaction: "Ver transação",
    returnToGame: "Voltar ao Jogo",
    swapAgain: "Trocar de novo",
    swapFailedTitle: "O swap não foi concluído",
    tryAgain: "Tentar de novo",
    genericFailure: "Algo deu errado.",

    contractLabel: "Contrato MALTY",
    copy: "Copiar",
    copied: "Copiado ✓",
    copyFailed: "Falha ao copiar",
    viewOnSolscan: "Ver no Solscan ↗",
    disclosure:
      "Os swaps são executados na Solana usando liquidez descentralizada. Taxas e impacto no preço podem mudar antes da confirmação. Sempre revise a transação na sua carteira.",
    poolInfoTitle: "Liquidez fornecida pela Raydium",
    viewPool: "Ver pool ↗",

    recentSwapsTitle: "Suas últimas trocas",
    recentSwapsEmpty: "Nenhuma troca realizada nesta carteira ainda.",
    recentSwapsEmptyOther: "Nenhuma outra troca encontrada nesta carteira.",
    confirmedLabel: "Confirmado",
    flipTokens: "Inverter tokens",
    viewAll: "Ver todas",

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

// Compile-time check that `pt` defines every key `en` does (and vice versa) —
// checked independently against the shared shape so it doesn't hit the
// literal-type-unification issue a direct `Record<Language, ...>` would.
SWAP_COPY.en satisfies SwapCopy;
SWAP_COPY.pt satisfies SwapCopy;

export function useSwapCopy(): SwapCopy {
  const { language } = useLanguage();
  return SWAP_COPY[language];
}
