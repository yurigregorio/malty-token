import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MALTY — Small Dog. Big Community.",
    short_name: "MALTY",
    description: "MALTY is a community-driven token on Solana inspired by a Maltese dog and guided by the motto “Small Dog. Big Community.” Built around transparency and participation, the project is developing MALTY Swap and a long-term mission for verifiable animal-welfare impact.",
    start_url: "/",
    display: "standalone",
    background_color: "#080a0d",
    theme_color: "#080a0d",
    icons: [
      { src: "/malty-official.png", sizes: "200x200", type: "image/png" },
      { src: "/malty-official.png", sizes: "200x200", type: "image/png" },
    ],
  };
}
