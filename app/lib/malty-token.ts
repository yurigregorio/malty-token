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

// Single source of truth for the "last public review" date shown across the
// public pages. Update only this constant when the review date changes.
export const MALTY_PUBLIC_REVIEW_DATE_ISO = "2026-09-12";

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
