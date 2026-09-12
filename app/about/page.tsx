import type { Metadata } from "next";
import { AboutContent } from "./about-content";

export const metadata: Metadata = {
  title: "About MALTY — Community with a Purpose",
  description: "Learn how MALTY combines transparent token structure, community stewardship and a long-term mission for verifiable animal-welfare impact.",
  openGraph: { title: "About MALTY", description: "Community, transparency and a long-term mission for verifiable animal-welfare impact.", images: ["/opengraph-image"] },
};

export default function AboutPage() {
  return <AboutContent />;
}
