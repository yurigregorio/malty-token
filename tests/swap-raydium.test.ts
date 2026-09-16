import { afterEach, describe, expect, it, vi } from "vitest";
import { buildSwapTransactions, fetchSwapQuote } from "../app/lib/swap/raydium";
import { SwapError } from "../app/lib/swap/types";

function jsonResponse(body: unknown, ok = true, status = 200): Response {
  return {
    ok,
    status,
    json: async () => body,
  } as unknown as Response;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("fetchSwapQuote", () => {
  it("parses a well-formed compute response into a normalized quote", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        jsonResponse({
          id: "abc",
          success: true,
          version: "V1",
          data: {
            inputAmount: "50000000",
            outputAmount: "12430000000",
            otherAmountThreshold: "12305700000",
            priceImpactPct: "0.72",
            routePlan: [{ poolId: "pool1", feeRate: 2500 }],
          },
        })
      )
    );

    const quote = await fetchSwapQuote("exact-in", {
      inputToken: "SOL",
      outputToken: "MALTY",
      amount: 50_000_000n,
      slippageBps: 100,
    });

    expect(quote.inputAmount).toBe(50_000_000n);
    expect(quote.outputAmount).toBe(12_430_000_000n);
    expect(quote.otherAmountThreshold).toBe(12_305_700_000n);
    expect(quote.priceImpactPercent).toBe(0.72);
    expect(quote.routes).toEqual([{ poolId: "pool1", feePct: 25 }]);
  });

  it("never invents a price — throws malformed-response when a required field is missing", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        jsonResponse({
          success: true,
          data: { inputAmount: "1000" /* outputAmount missing */ },
        })
      )
    );

    await expect(
      fetchSwapQuote("exact-in", {
        inputToken: "SOL",
        outputToken: "MALTY",
        amount: 1000n,
        slippageBps: 100,
      })
    ).rejects.toMatchObject({ kind: "malformed-response" } satisfies Partial<SwapError>);
  });

  it("surfaces an API-reported error instead of a generic failure", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(jsonResponse({ success: false, msg: "REQ_SLIPPAGE_BPS_ERROR" }, false, 400))
    );

    await expect(
      fetchSwapQuote("exact-in", {
        inputToken: "SOL",
        outputToken: "MALTY",
        amount: 1000n,
        slippageBps: 100,
      })
    ).rejects.toThrow(/REQ_SLIPPAGE_BPS_ERROR/);
  });
});

describe("buildSwapTransactions", () => {
  it("normalizes a single-object transaction response into a one-item list", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        jsonResponse({ success: true, data: { transaction: "base64tx1" } })
      )
    );

    const txs = await buildSwapTransactions({
      mode: "exact-in",
      walletAddress: "11111111111111111111111111111111",
      quoteResponse: {},
      inputToken: "SOL",
      outputToken: "MALTY",
    });

    expect(txs).toEqual(["base64tx1"]);
  });

  it("preserves order across multiple transactions (e.g. ATA creation + swap)", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        jsonResponse({
          success: true,
          data: [{ transaction: "step1-create-ata" }, { transaction: "step2-swap" }],
        })
      )
    );

    const txs = await buildSwapTransactions({
      mode: "exact-in",
      walletAddress: "11111111111111111111111111111111",
      quoteResponse: {},
      inputToken: "SOL",
      outputToken: "MALTY",
    });

    expect(txs).toEqual(["step1-create-ata", "step2-swap"]);
  });

  it("throws malformed-response when no signable transaction is returned", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({ success: true, data: [] })));

    await expect(
      buildSwapTransactions({
        mode: "exact-in",
        walletAddress: "11111111111111111111111111111111",
        quoteResponse: {},
        inputToken: "SOL",
        outputToken: "MALTY",
      })
    ).rejects.toMatchObject({ kind: "malformed-response" });
  });
});
