import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./components/providers";
import { AppHeader } from "./components/app-header";
import { GridBackground } from "./components/grid-background";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MALTY — Small Dog. Big Community.",
  description:
    "MALTY is a Solana memecoin inspired by Charlotte, a Maltese with big community energy.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "MALTY — Small Dog. Big Community.",
    description:
      "MALTY is a Solana memecoin inspired by Charlotte, a Maltese with big community energy.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "MALTY — Small Dog. Big Community.",
    description:
      "MALTY is a Solana memecoin inspired by Charlotte, a Maltese with big community energy.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <div className="relative min-h-screen bg-background text-foreground">
            <GridBackground />
            <div className="relative z-10">
              <AppHeader />
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
