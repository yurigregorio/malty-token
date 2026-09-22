import type { Metadata, Viewport } from "next";
import { Geist_Mono, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "./components/providers";
import { AppHeader } from "./components/app-header";
import { GridBackground } from "./components/grid-background";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});
const spaceGrotesk = Space_Grotesk({
  variable: "--font-display-family",
  subsets: ["latin"],
  display: "swap",
});
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://malty-token.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "MALTY — Small Dog. Big Community.",
  description: "MALTY is a community-driven token on Solana inspired by a Maltese dog and guided by the motto “Small Dog. Big Community.” Built around transparency and participation, the project is developing MALTY Swap and a long-term mission for verifiable animal-welfare impact.",
  applicationName: "MALTY",
  keywords: ["MALTY", "Solana", "community", "animal welfare", "transparency"],
  icons: { icon: "/icon.svg", shortcut: "/icon.svg" },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "MALTY — Small Dog. Big Community.",
    description: "MALTY is a community-driven token on Solana inspired by a Maltese dog and guided by the motto “Small Dog. Big Community.” Built around transparency and participation, the project is developing MALTY Swap and a long-term mission for verifiable animal-welfare impact.",
    type: "website",
    url: siteUrl,
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "MALTY — Small Dog. Big Community.",
    description: "Small Dog. Big Community. Transparent, community-driven and built on Solana.",
    images: ["/opengraph-image"],
    site: "@MaltyCoin",
    creator: "@MaltyCoin",
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
    description: "MALTY is a community-driven token on Solana inspired by a Maltese dog and guided by the motto “Small Dog. Big Community.” Built around transparency and participation, the project is developing MALTY Swap and a long-term mission for verifiable animal-welfare impact.",
    about: {
      "@type": "Thing",
      name: "MALTY",
      description: "Community-driven digital token project on Solana.",
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jakarta.variable} ${spaceGrotesk.variable} ${geistMono.variable} antialiased`}>
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
