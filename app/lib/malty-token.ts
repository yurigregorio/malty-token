export const MALTY_TOKEN = {
  name: "Malty",
  symbol: "MALTY",
  decimals: 6,
  totalSupplyTokens: 1_000_000_000n,
  description:
    "MALTY is a Solana memecoin inspired by Charlotte, a Maltese with big community energy.",
  slogan: "Small Dog. Big Community.",
  imageUri:
    "https://arweave.net/w-TXbk_hQOw1mC5vA9YrVmClKzz_Avjfiq5coE1AYec",
  metadataUri:
    "https://turbo-gateway.com/rLzUMFUoqgYI04MijeVjLDriWACUApJo2BKK6ycB5MU",
} as const;

export const MALTY_PRODUCTION_POLICY = {
  // MALTY must never have a freeze authority.
  freezeAuthority: null,

  // Metadata was created as mutable and the Metadata Update Authority is
  // intentionally retained for metadata maintenance. This authority is
  // separate from the SPL Mint Authority and cannot increase token supply.
  metadataMutableAtCreation: true,

  // Historical creation policy: do not revoke the Metadata Update Authority
  // automatically as part of token creation.
  revokeMetadataUpdateAuthorityAtCreation: false,

  // Historical deployment policy: revoke the SPL Mint Authority only after
  // the exact fixed supply has been minted and independently verified.
  revokeMintAuthorityAfterSupplyVerification: true,
} as const;

export const MALTY_TOTAL_SUPPLY_BASE_UNITS =
  MALTY_TOKEN.totalSupplyTokens * 10n ** BigInt(MALTY_TOKEN.decimals);
