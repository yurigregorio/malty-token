"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { PropsWithChildren, useEffect } from "react";
import { ClusterProvider } from "./cluster-context";
import { AppClientProvider } from "../lib/client-provider";
import { LanguageProvider } from "../lib/language";
import { MALTY_TOKEN } from "../lib/malty-token";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://malty-token.vercel.app";

export function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <LanguageProvider>
        <ClusterProvider>
          <AppClientProvider>
            <DevMockWallet />
            <MobileWalletAdapter />
            {children}
          </AppClientProvider>
          <Toaster position="bottom-right" richColors />
        </ClusterProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

/**
 * Dev-only: registers a fake Wallet-Standard wallet so the app is clickable
 * end to end on localhost without a browser wallet extension installed. The
 * `NODE_ENV` check is what lets Next.js dead-code-eliminate this (and its
 * dynamic import) out of the production bundle entirely — never runs on the
 * deployed site.
 */
function DevMockWallet() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    import("../lib/dev/dev-mock-wallet").then(({ registerDevMockWallet }) =>
      registerDevMockWallet().then((walletAddress) => {
        console.info(
          `[dev] Mock Wallet registered (${walletAddress}) — pick "Mock Wallet (Dev)" from Connect Wallet to test locally. It has no real funds.`
        );
      })
    );
  }, []);

  return null;
}

/**
 * Wallet Standard is a browser-extension API — on a normal mobile browser
 * (not a wallet app's own in-app browser), no wallet is ever detected.
 * Registering Mobile Wallet Adapter as a Wallet Standard wallet fixes this
 * for Android Chrome (it launches Phantom/Solflare/etc. directly); iOS has
 * no equivalent OS mechanism, so iOS visitors still need their wallet app's
 * own in-app browser.
 */
function MobileWalletAdapter() {
  useEffect(() => {
    import("../lib/mobile-wallet-adapter").then(({ registerMobileWalletAdapter }) =>
      registerMobileWalletAdapter(SITE_URL, MALTY_TOKEN.imageUri)
    );
  }, []);

  return null;
}
