import { address, type Address } from "@solana/kit";

export type MaltyNetworkConfig = {
  mint: Address | null;
  supplyMinted: boolean;
  metadataCreated: boolean;
  mintAuthorityRevoked: boolean;
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
    supplyMinted: true,
    metadataCreated: true,
    mintAuthorityRevoked: true,

    // The Devnet deployment is complete and immutable from the app.
    allowCreateMint: false,
    allowMintSupply: false,
    allowMetadata: false,
    allowRevokeMintAuthority: false,
  },

  mainnet: {
    mint: address(
      "6ZhVVH2KwbiVg6HJjrPg2YC5SWomBFA5qGmz57pknMpz"
    ),

    // Stage 2 verified on-chain: exact 1,000,000,000 MALTY supply exists.
    supplyMinted: true,
    metadataCreated: false,
    mintAuthorityRevoked: false,

    // Stage 3: only Metaplex metadata creation is enabled.
    // Supply minting and authority changes remain locked.
    allowCreateMint: false,
    allowMintSupply: false,
    allowMetadata: true,
    allowRevokeMintAuthority: false,
  },
};
