import type { Metadata } from "next";
import { GivesContent } from "./gives-content";

export const metadata: Metadata = {
  title: "MALTY Gives — Community-powered Pet Impact",
  description: "See how MALTY Gives is being designed to support animal-welfare initiatives with published criteria, public reporting and verifiable evidence.",
  openGraph: { title: "MALTY Gives", description: "Community-powered. Pet-focused. Built around transparent, verifiable impact.", images: ["/opengraph-image"] },
};

export default function GivesPage() {
  return <GivesContent />;
}
