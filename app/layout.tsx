import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./components/providers";
import { AppHeader } from "./components/app-header";
import { GridBackground } from "./components/grid-background";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://malty-token.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "MALTY — Small Dog. Big Community.",
  description: "MALTY is a community-driven Solana project focused on transparency, community and a long-term mission for verifiable positive impact for animals.",
  applicationName: "MALTY",
  keywords: ["MALTY", "Solana", "community", "animal welfare", "transparency"],
  icons: { icon: "/icon.svg", shortcut: "/icon.svg" },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "MALTY — Small Dog. Big Community.",
    description: "A community-driven Solana project built transparently, with a long-term mission for verifiable positive impact for animals.",
    type: "website",
    url: siteUrl,
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "MALTY — Small Dog. Big Community.",
    description: "Community. Transparency. Verifiable positive animal impact.",
    images: ["/opengraph-image"],
  },
};

export const viewport: Viewport = {
  themeColor: "#080a0d",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "MALTY",
    url: siteUrl,
    description: "A community-driven Solana project built around transparency, community and a long-term mission for verifiable animal-welfare impact.",
    about: {
      "@type": "Thing",
      name: "MALTY",
      description: "Community-driven digital token project on Solana.",
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
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
