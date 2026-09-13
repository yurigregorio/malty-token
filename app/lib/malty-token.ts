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

// Plain-string mint address for display/links on public pages. Must match
// MALTY_CONFIG.mainnet.mint in app/lib/malty-config.ts.
export const MALTY_PUBLIC_MINT = "6ZhVVH2KwbiVg6HJjrPg2YC5SWomBFA5qGmz57pknMpz";

// Public reference wallet for the planned (not active) MALTY Gives
// animal-welfare initiative. See docs/WALLET_ARCHITECTURE.md and
// docs/MALTY_GIVES_POLICY.md — publication does not indicate any
// contribution has occurred.
export const MALTY_IMPACT_WALLET = "DmPEyGFwy972wcdcA7UzxtDiSdrtU3Y4UJned7AJJyik";

// Official MALTY/SOL Raydium AMM (CPMM) pool. Always link to this exact pool
// ID or the mint above — never a name/symbol search — so visitors land on
// the verified official pool rather than a lookalike.
export const MALTY_RAYDIUM_POOL_ID = "DGK42Xe3BMXTJeUVjVNSZL1FmwXVQxUaV88qp6hAdp9W";

// Solana transaction signature that created the official Raydium pool.
export const MALTY_POOL_CREATION_TX =
  "4zaDUJpvZ2s3ePQZ5bEhen8EAzCX8Ramufwjjo4sWB1MXmKisK6PyDgAD4bvCwpejk9T2s2Gy2iF2eezMTK68hrX";

// Confirmed test buy against the official pool (buy and sell both verified).
export const MALTY_TEST_BUY_TX =
  "4HyrCpxTRB5cP3yMFY4kucMpvMqzDoM7twfy8z41uk75Fe9bWNKZ7hx3F2NDSRvjcWBqc9xRHzgboV13QA4rFZf5";

// Raydium's own swap widget, preloaded with the official mint. This is the
// canonical "Buy $MALTY" destination.
export const MALTY_RAYDIUM_SWAP_URL = `https://raydium.io/swap/?inputMint=sol&outputMint=${MALTY_PUBLIC_MINT}`;

export const MALTY_SOLSCAN_TOKEN_URL = `https://solscan.io/token/${MALTY_PUBLIC_MINT}`;
export const MALTY_SOLSCAN_POOL_URL = `https://solscan.io/account/${MALTY_RAYDIUM_POOL_ID}`;

// Single source of truth for the "last public review" date shown across the
// public pages. Update only this constant when the review date changes.
export const MALTY_PUBLIC_REVIEW_DATE_ISO = "2026-09-13";

// Single source of truth for the homepage "What comes next" roadmap timeline
// (the "Proof, not promises" section). This is a 1-indexed position into the
// `nextItems` list in app/page.tsx — update it whenever a roadmap milestone
// is completed and the project moves on to the next one.
export const MALTY_ROADMAP_CURRENT_STEP = 1;

const MONTHS: Record<"en" | "pt", { short: string[]; long: string[] }> = {
  en: {
    short: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    long: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  },
  pt: {
    short: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
    long: ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"],
  },
};

function formatReviewDate(language: "en" | "pt", style: "short" | "long"): string {
  const [year, month, day] = MALTY_PUBLIC_REVIEW_DATE_ISO.split("-").map(Number);
  const monthName = MONTHS[language][style][month - 1];
  return language === "pt" ? `${day} de ${monthName} de ${year}` : `${day} ${monthName} ${year}`;
}

export function getReviewDateShort(language: "en" | "pt"): string {
  return formatReviewDate(language, "short");
}

export function getReviewDateLong(language: "en" | "pt"): string {
  return formatReviewDate(language, "long");
}
