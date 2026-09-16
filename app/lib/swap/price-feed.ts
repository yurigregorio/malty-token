import type { Address } from "@solana/kit";

/**
 * Real USD prices for SOL/USDC, sourced from Raydium's own API v3 (the same
 * service that powers the swap quote) — never a hardcoded or guessed price.
 * MALTY itself isn't tracked by this endpoint (too little standalone volume
 * for Raydium to price it independently), so its USD value is derived from
 * the live swap quote instead — see `deriveMaltyUsdPrice` in
 * `use-token-usd-prices.ts`.
 *
 * Docs: https://docs.raydium.io/api-reference/api-v3-endpoints/mint/get-mint-prices
 */
const MINT_PRICE_API = "https://api-v3.raydium.io/mint/price";

/** How long a fetched price is trusted before a refetch is allowed. */
const PRICE_TTL_MS = 45_000;

type CacheEntry = { price: number | null; fetchedAt: number };
const cache = new Map<string, CacheEntry>();

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

/**
 * Fetches USD prices for the given mints, using a short-lived in-memory
 * cache so re-rendering or re-selecting a token doesn't refetch instantly.
 * Never throws — a failed or untracked mint simply resolves to `null`, and
 * callers must treat that as "unknown", not "zero".
 */
export async function fetchMintUsdPrices(
  mints: (Address | string)[],
  signal?: AbortSignal
): Promise<Record<string, number | null>> {
  const now = Date.now();
  const result: Record<string, number | null> = {};
  const toFetch: string[] = [];

  for (const mint of mints) {
    const key = mint.toString();
    const cached = cache.get(key);
    if (cached && now - cached.fetchedAt < PRICE_TTL_MS) {
      result[key] = cached.price;
    } else {
      toFetch.push(key);
    }
  }

  if (toFetch.length === 0) return result;

  try {
    const response = await fetch(`${MINT_PRICE_API}?mints=${toFetch.join(",")}`, { signal });
    if (!response.ok) throw new Error(`Price feed request failed (${response.status})`);

    const json: unknown = await response.json();
    const data = isRecord(json) && isRecord(json.data) ? json.data : {};

    for (const key of toFetch) {
      const raw = data[key];
      const price = typeof raw === "string" || typeof raw === "number" ? Number(raw) : null;
      const resolved = price != null && Number.isFinite(price) ? price : null;
      cache.set(key, { price: resolved, fetchedAt: now });
      result[key] = resolved;
    }
  } catch (error) {
    if (signal?.aborted) throw error;
    // Network/API failure: report "unknown" for the tokens we couldn't
    // fetch rather than throwing — USD display is a nice-to-have, and a
    // failure here must never block the swap itself.
    for (const key of toFetch) {
      result[key] = cache.get(key)?.price ?? null;
    }
  }

  return result;
}
