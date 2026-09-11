import { address, type Address } from "@solana/kit";

export type MaltyNetworkConfig = {
  mint: Address | null;
  allowCreateMint: boolean;
  allowMintSupply: boolean;
  allowMetadata: boolean;
  allowRevokeMintAuthority: boolean;
};

export const MALTY_CONFIG: Record<
  "devnet" | "mainnet",
  MaltyNetworkConfig
> = {
  devnet: {
    mint: address(
      "6DJRHJMAhgjZjCxBktySxoLcDMtDyMBYCSqVQQCoUHd9"
    ),

    // The Devnet mint is already complete.
    allowCreateMint: false,
    allowMintSupply: false,
    allowMetadata: false,
    allowRevokeMintAuthority: false,
  },

  mainnet: {
    // Stage 1: the production mint does not exist yet.
    mint: null,

    // Only mint-account creation is enabled in this release branch.
    // Supply minting, metadata and authority revocation remain locked.
    allowCreateMint: true,
    allowMintSupply: false,
    allowMetadata: false,
    allowRevokeMintAuthority: false,
  },
};
