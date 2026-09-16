import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useSwapQuote } from "../app/lib/swap/use-swap-quote";

function jsonResponse(body: unknown): Response {
  return { ok: true, status: 200, json: async () => body } as unknown as Response;
}

function mockQuoteResponse(outputAmount: string) {
  return jsonResponse({
    success: true,
    data: {
      inputAmount: "50000000",
      outputAmount,
      priceImpactPct: "0.5",
      routePlan: [],
    },
  });
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("useSwapQuote", () => {
  it("stays idle until an amount is entered", () => {
    const { result } = renderHook(() =>
      useSwapQuote({
        mode: "exact-in",
        inputToken: "SOL",
        outputToken: "MALTY",
        amount: "",
        slippageBps: 100,
        enabled: true,
      })
    );

    expect(result.current.status).toBe("idle");
    expect(result.current.quote).toBeNull();
  });

  it("debounces typing and only fetches once, using the latest amount", async () => {
    const fetchMock = vi.fn().mockResolvedValue(mockQuoteResponse("12430000000"));
    vi.stubGlobal("fetch", fetchMock);

    const { result, rerender } = renderHook(
      ({ amount }: { amount: string }) =>
        useSwapQuote({
          mode: "exact-in",
          inputToken: "SOL",
          outputToken: "MALTY",
          amount,
          slippageBps: 100,
          enabled: true,
        }),
      { initialProps: { amount: "0.0" } }
    );

    rerender({ amount: "0.01" });
    rerender({ amount: "0.05" });

    await waitFor(() => expect(result.current.status).toBe("ready"), { timeout: 3000 });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const requestedUrl = String(fetchMock.mock.calls[0][0]);
    expect(requestedUrl).toContain("amount=50000000");
    expect(result.current.quote?.outputAmount).toBe(12_430_000_000n);
  });

  it("surfaces a friendly error instead of an unhandled rejection on a bad response", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({ success: false, msg: "REQ_ERROR" })));

    const { result } = renderHook(() =>
      useSwapQuote({
        mode: "exact-in",
        inputToken: "SOL",
        outputToken: "MALTY",
        amount: "0.05",
        slippageBps: 100,
        enabled: true,
      })
    );

    await waitFor(() => expect(result.current.status).toBe("error"), { timeout: 3000 });
    expect(result.current.errorMessage).toBeTruthy();
    expect(result.current.errorMessage).not.toContain("[object Object]");
  });

  it("reports an amount validation error without making a request", () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const { result } = renderHook(() =>
      useSwapQuote({
        mode: "exact-in",
        inputToken: "SOL",
        outputToken: "MALTY",
        amount: "1.2345678901",
        slippageBps: 100,
        enabled: true,
      })
    );

    expect(result.current.amountError).toBeTruthy();
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
