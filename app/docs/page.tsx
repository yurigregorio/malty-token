import type { Metadata } from "next";
import { DocsContent } from "./docs-content";

export const metadata: Metadata = {
  title: "Public Documentation — MALTY",
  description: "A simpler public layer for MALTY's most important project information: about, transparency, MALTY Gives, tokenomics and change history.",
  openGraph: { title: "MALTY Public Documentation", description: "About, transparency, MALTY Gives, tokenomics and change history in one place.", images: ["/opengraph-image"] },
};

export default function DocsPage() {
  return <DocsContent />;
}
