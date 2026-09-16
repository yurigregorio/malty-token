import type { SwapAmountMode } from "./types";
import { SwapError } from "./types";
import type { SwapTokenSymbol } from "./tokens";
import { getSwapToken } from "./tokens";

/**
 * Official Raydium Trade API (Route API v2). Deliberately hardcoded — never
 * sourced from an environment variable or, worse, a query parameter — so a
 * malicious `?raydiumEndpoint=` (or similar) can never redirect swap traffic
 * to an attacker-controlled host. Mainnet only: MALTY liquidity only exists
 * on Mainnet.
 *
 * Docs: https://docs.raydium.io/sdk-api/rest-api
 */
const RAYDIUM_TRADE_API_BASE = "https://transaction-v1.raydium.io";

/** Matches the app-wide priority fee used for other on-chain actions (see solana-client.ts). */
const DEFAULT_COMPUTE_UNIT_PRICE_MICRO_LAMPORTS = "1000";

const REQUEST_TIMEOUT_MS = 12_000;

function withTimeout(signal: AbortSignal | undefined): {
  signal: AbortSignal;
  cleanup: () => void;
} {
  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(new DOMException("Timed out", "TimeoutError")),
    REQUEST_TIMEOUT_MS
  );

  const onOuterAbort = () => controller.abort(signal?.reason);
  signal?.addEventListener("abort", onOuterAbort, { once: true });
  if (signal?.aborted) controller.abort(signal.reason);

  return {
    signal: controller.signal,
    cleanup: () => {
      clearTimeout(timeout);
      signal?.removeEventListener("abort", onOuterAbort);
    },
  };
}

async function raydiumFetch(
  path: string,
  init: RequestInit,
  outerSignal?: AbortSignal
): Promise<unknown> {
  const { signal, cleanup } = withTimeout(outerSignal);

  let response: Response;
  try {
    response = await fetch(`${RAYDIUM_TRADE_API_BASE}${path}`, {
      ...init,
      signal,
    });
  } catch (error) {
    if (signal.aborted && !outerSignal?.aborted) {
      throw new SwapError(
        "raydium-unavailable",
        "Raydium is taking too long to respond. Please try again.",
        error
      );
    }
    if (outerSignal?.aborted) throw error;
    throw new SwapError(
      "raydium-unavailable",
      "Could not reach Raydium. Check your connection and try again.",
      error
    );
  } finally {
    cleanup();
  }

  let json: unknown;
  try {
    json = await response.json();
  } catch (error) {
    throw new SwapError(
      "malformed-response",
      "Raydium returned an unexpected response.",
      error
    );
  }

  if (!response.ok) {
    throw new SwapError(
      response.status === 429
        ? "raydium-unavailable"
        : "raydium-unavailable",
      isRecord(json) && typeof json.msg === "string"
        ? `Raydium error: ${json.msg}`
        : `Raydium request failed (${response.status}).`,
      json
    );
  }

  if (!isRecord(json) || json.success !== true || !isRecord(json.data)) {
    const msg = isRecord(json) && typeof json.msg === "string" ? json.msg : undefined;
    throw new SwapError(
      "malformed-response",
      msg ? `Raydium error: ${msg}` : "Raydium returned an unexpected response.",
      json
    );
  }

  return json;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function readString(data: Record<string, unknown>, keys: string[]): string | null {
  for (const key of keys) {
    const value = data[key];
    if (typeof value === "string" && value.length > 0) return value;
    if (typeof value === "number" && Number.isFinite(value)) return String(value);
  }
  return null;
}

function readBigInt(data: Record<string, unknown>, keys: string[]): bigint | null {
  const raw = readString(data, keys);
  if (raw == null || !/^\d+$/.test(raw)) return null;
  try {
    return BigInt(raw);
  } catch {
    return null;
  }
}

function readFloat(data: Record<string, unknown>, keys: string[]): number | null {
  const raw = readString(data, keys);
  if (raw == null) return null;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : null;
}

export type RaydiumComputeQuote = {
  inputAmount: bigint;
  outputAmount: bigint;
  otherAmountThreshold: bigint | null;
  priceImpactPercent: number;
  routes: { poolId?: string; feePct?: number }[];
  /** The full raw compute response — must be echoed back verbatim when building the transaction. */
  raw: Record<string, unknown>;
};

/**
 * Fetches a real quote from Raydium. Never estimates or hardcodes a price —
 * every number here comes straight from the API response, and the request
 * fails loudly (`malformed-response`) rather than silently substituting a
 * guess when an expected field is missing.
 */
export async function fetchSwapQuote(
  mode: SwapAmountMode,
  params: {
    inputToken: SwapTokenSymbol;
    outputToken: SwapTokenSymbol;
    /** Base units: the input amount for exact-in, the output amount for exact-out. */
    amount: bigint;
    slippageBps: number;
  },
  signal?: AbortSignal
): Promise<RaydiumComputeQuote> {
  const inputMint = getSwapToken(params.inputToken).mint;
  const outputMint = getSwapToken(params.outputToken).mint;

  const search = new URLSearchParams({
    inputMint: inputMint.toString(),
    outputMint: outputMint.toString(),
    amount: params.amount.toString(),
    slippageBps: params.slippageBps.toString(),
    txVersion: "V0",
  });

  const path = mode === "exact-in" ? "/compute/swap-base-in" : "/compute/swap-base-out";
  const json = (await raydiumFetch(`${path}?${search.toString()}`, { method: "GET" }, signal)) as {
    data: Record<string, unknown>;
  };

  const data = json.data;

  const inputAmount = readBigInt(data, ["inputAmount"]);
  const outputAmount = readBigInt(data, ["outputAmount"]);
  const priceImpactPercent = readFloat(data, ["priceImpactPct", "priceImpact"]);

  if (inputAmount == null || outputAmount == null || priceImpactPercent == null) {
    throw new SwapError(
      "malformed-response",
      "Raydium returned an incomplete quote.",
      data
    );
  }

  const routesRaw = Array.isArray(data.routePlan)
    ? data.routePlan
    : Array.isArray(data.routes)
      ? data.routes
      : [];

  const routes = routesRaw.filter(isRecord).map((route) => ({
    poolId: typeof route.poolId === "string" ? route.poolId : undefined,
    feePct:
      typeof route.feeRate === "number"
        ? route.feeRate / 100
        : typeof route.feeRate === "string"
          ? Number(route.feeRate) / 100
          : undefined,
  }));

  return {
    inputAmount,
    outputAmount,
    otherAmountThreshold: readBigInt(data, ["otherAmountThreshold"]),
    priceImpactPercent,
    routes,
    raw: json as unknown as Record<string, unknown>,
  };
}

export type BuildSwapTransactionParams = {
  mode: SwapAmountMode;
  walletAddress: string;
  quoteResponse: Record<string, unknown>;
  inputToken: SwapTokenSymbol;
  outputToken: SwapTokenSymbol;
};

/**
 * Builds the unsigned swap transaction(s) from a previously-fetched quote.
 * Raydium may return more than one transaction (e.g. ATA creation / SOL
 * wrap/unwrap alongside the swap itself) — every entry is returned, in the
 * order the caller must sign and send them.
 */
export async function buildSwapTransactions(
  params: BuildSwapTransactionParams,
  signal?: AbortSignal
): Promise<string[]> {
  const inputToken = getSwapToken(params.inputToken);
  const outputToken = getSwapToken(params.outputToken);

  const path = params.mode === "exact-in" ? "/transaction/swap-base-in" : "/transaction/swap-base-out";

  const json = (await raydiumFetch(
    path,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        wallet: params.walletAddress,
        swapResponse: params.quoteResponse,
        txVersion: "V0",
        computeUnitPriceMicroLamports: DEFAULT_COMPUTE_UNIT_PRICE_MICRO_LAMPORTS,
        wrapSol: inputToken.isNative,
        unwrapSol: outputToken.isNative,
      }),
    },
    signal
  )) as { data: unknown };

  const entries = Array.isArray(json.data) ? json.data : [json.data];
  const transactions = entries
    .filter(isRecord)
    .map((entry) => (typeof entry.transaction === "string" ? entry.transaction : null));

  if (transactions.length === 0 || transactions.some((tx) => tx == null)) {
    throw new SwapError(
      "malformed-response",
      "Raydium did not return a signable transaction.",
      json
    );
  }

  return transactions as string[];
}
