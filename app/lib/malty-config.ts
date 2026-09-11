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

    // Mainnet deployment verified on-chain: exact supply, Metaplex metadata,
    // no freeze authority, and Mint Authority permanently revoked.
    supplyMinted: true,
    metadataCreated: true,
    mintAuthorityRevoked: true,

    // Production deployment is complete. Creation and authority actions are
    // permanently locked from the app.
    allowCreateMint: false,
    allowMintSupply: false,
    allowMetadata: false,
    allowRevokeMintAuthority: false,
  },
};
