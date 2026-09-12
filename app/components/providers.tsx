"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { PropsWithChildren } from "react";
import { ClusterProvider } from "./cluster-context";
import { AppClientProvider } from "../lib/client-provider";
import { LanguageProvider } from "../lib/language";

export function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <LanguageProvider>
        <ClusterProvider>
          <AppClientProvider>{children}</AppClientProvider>
          <Toaster position="bottom-right" richColors />
        </ClusterProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
