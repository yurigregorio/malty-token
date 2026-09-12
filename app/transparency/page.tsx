import type { Metadata } from "next";
import { TransparencyContent } from "./transparency-content";

export const metadata: Metadata = {
  title: "MALTY Transparency Center — Verify, Don’t Just Trust",
  description: "Verify MALTY supply, authorities, reserve architecture, public review status and project disclosures.",
  openGraph: { title: "MALTY Transparency Center", description: "Verifiable token facts, reserve architecture and public project disclosures.", images: ["/opengraph-image"] },
};

export default function TransparencyPage() {
  return <TransparencyContent />;
}
