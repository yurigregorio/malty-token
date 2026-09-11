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
    // Stage 1 complete and verified on-chain: 6 decimals, supply 0.
    mint: address(
      "6ZhVVH2KwbiVg6HJjrPg2YC5SWomBFA5qGmz57pknMpz"
    ),

    // Lock every Mainnet mutation until the next reviewed stage.
    allowCreateMint: false,
    allowMintSupply: false,
    allowMetadata: false,
    allowRevokeMintAuthority: false,
  },
};
