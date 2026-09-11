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
    // MALTY does not exist on Mainnet yet.
    mint: null,

    // Everything stays locked until the final production review.
    allowCreateMint: false,
    allowMintSupply: false,
    allowMetadata: false,
    allowRevokeMintAuthority: false,
  },
};
