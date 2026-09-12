import type { Metadata } from "next";
import { UpdatesContent } from "./updates-content";

export const metadata: Metadata = {
  title: "MALTY Project Updates — Public Changelog",
  description: "Follow material MALTY milestones, published policies and project changes in a public changelog that separates completed work from future plans.",
  openGraph: { title: "MALTY Project Updates", description: "A public changelog of material MALTY milestones and project changes.", images: ["/opengraph-image"] },
};

export default function UpdatesPage() {
  return <UpdatesContent />;
}
