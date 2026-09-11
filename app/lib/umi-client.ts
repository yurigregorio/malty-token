"use client";

import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import {
  walletAdapterIdentity,
  type WalletAdapter,
} from "@metaplex-foundation/umi-signer-wallet-adapters";

type PhantomWindow = Window & {
  phantom?: {
    solana?: WalletAdapter & {
      isPhantom?: boolean;
    };
  };
};

export function createPhantomUmi(endpoint: string) {
  const phantom = (window as PhantomWindow).phantom?.solana;

  if (!phantom) {
    throw new Error("Phantom wallet not found");
  }

  return createUmi(endpoint)
    .use(walletAdapterIdentity(phantom))
    .use(mplTokenMetadata());
}