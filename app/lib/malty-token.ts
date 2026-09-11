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

  // Keep metadata editable during the final verification window so a bad URI,
  // typo or image issue can still be corrected before the project is locked.
  metadataMutableAtCreation: true,

  // The metadata update authority is separate from the SPL mint authority.
  // We keep it initially and decide whether to revoke it only after verifying
  // the final Mainnet metadata in wallets and explorers.
  revokeMetadataUpdateAuthorityAtCreation: false,

  // The SPL mint authority is revoked only after the exact full supply has
  // been minted and independently verified on Mainnet.
  revokeMintAuthorityAfterSupplyVerification: true,
} as const;

export const MALTY_TOTAL_SUPPLY_BASE_UNITS =
  MALTY_TOKEN.totalSupplyTokens * 10n ** BigInt(MALTY_TOKEN.decimals);
