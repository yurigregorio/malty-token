import { describe, expect, it } from "vitest";
import { mapSwapError } from "../app/lib/swap/swap-errors";
import { SwapError } from "../app/lib/swap/types";

describe("mapSwapError", () => {
  it("passes a SwapError through with its own kind and message", () => {
    const err = new SwapError("no-route", "No route found for this pair.");
    expect(mapSwapError(err)).toEqual({ kind: "no-route", message: "No route found for this pair." });
  });

  it("detects a wallet rejection", () => {
    const err = new Error("User rejected the request.");
    expect(mapSwapError(err).kind).toBe("wallet-rejected");
  });

  it("detects a missing wallet", () => {
    const err = new Error("No wallet found on this device.");
    expect(mapSwapError(err).kind).toBe("wallet-not-installed");
  });

  it("detects a slippage failure", () => {
    const err = new Error("Swap failed: slippage tolerance exceeded");
    expect(mapSwapError(err).kind).toBe("slippage-exceeded");
  });

  it("detects a blockhash/timeout failure", () => {
    const err = new Error("Transaction simulation failed: Blockhash not found");
    expect(mapSwapError(err).kind).toBe("transaction-timeout");
  });

  it("detects a network failure", () => {
    const err = new Error("fetch failed");
    expect(mapSwapError(err).kind).toBe("rpc-failure");
  });

  it("never leaks a raw object or [object Object]", () => {
    const { message } = mapSwapError({ some: "weird non-error payload" });
    expect(message).not.toContain("[object Object]");
    expect(typeof message).toBe("string");
    expect(message.length).toBeGreaterThan(0);
  });

  it("falls back to unknown for an unrecognized error", () => {
    const err = new Error("Something totally unexpected happened");
    expect(mapSwapError(err).kind).toBe("unknown");
  });
});
