/**
 * Registers Solana Mobile's Mobile Wallet Adapter (MWA) as a Wallet Standard
 * wallet, so a visitor on a normal mobile browser (not a wallet app's own
 * in-app browser) can still connect — Android Chrome launches Phantom/
 * Solflare/etc. directly via an intent link; Wallet Standard's existing
 * discovery then treats it exactly like any other wallet, so no other swap
 * code needs to change.
 *
 * iOS has no equivalent OS-level mechanism for a website to hand off to a
 * native app this way, so this does not add iOS Safari support — an iOS
 * visitor still needs to open the site from inside their wallet app's own
 * browser, same as before.
 *
 * Split into its own dynamically-imported module (mirroring the dev-only
 * mock wallet) purely to keep this dependency out of the initial bundle for
 * the common desktop-with-extension case.
 */

let registered = false;

export async function registerMobileWalletAdapter(siteUrl: string, iconUrl: string): Promise<void> {
  if (registered) return;
  registered = true;

  const {
    registerMwa,
    createDefaultAuthorizationCache,
    createDefaultChainSelector,
    createDefaultWalletNotFoundHandler,
  } = await import("@solana-mobile/wallet-standard-mobile");

  registerMwa({
    appIdentity: {
      name: "MALTY",
      uri: siteUrl,
      icon: iconUrl,
    },
    authorizationCache: createDefaultAuthorizationCache(),
    chains: ["solana:mainnet", "solana:devnet"],
    chainSelector: createDefaultChainSelector(),
    onWalletNotFound: createDefaultWalletNotFoundHandler(),
  });
}
