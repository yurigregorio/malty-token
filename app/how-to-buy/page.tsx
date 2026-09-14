import type { Metadata } from "next";
import { HowToBuyContent } from "./how-to-buy-content";

export const metadata: Metadata = {
  title: "How to Buy $MALTY | MALTY",
  description: "A step-by-step guide to buying $MALTY on Solana — get a wallet, get SOL, swap on the official Raydium pool, and verify the official contract along the way.",
  openGraph: { title: "How to Buy $MALTY", description: "Get a wallet, get SOL, and swap on the official MALTY/SOL pool on Raydium — with the official contract to verify at every step.", images: ["/opengraph-image"] },
};

export default function HowToBuyPage() {
  return <HowToBuyContent />;
}
