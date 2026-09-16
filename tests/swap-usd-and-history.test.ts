import { beforeEach, describe, expect, it } from "vitest";
import { formatUsd, formatUsdPrice } from "../app/lib/swap/format-usd";
import { estimateNetworkFeeLamports, SOLANA_BASE_FEE_LAMPORTS } from "../app/lib/swap/network-fee";
import { getSwapHistory, recordSwapHistory } from "../app/lib/swap/swap-history";
import type { SwapResult } from "../app/lib/swap/types";

describe("formatUsd", () => {
  it("formats a normal amount as currency", () => {
    expect(formatUsd(21.359)).toBe("$21.36");
    expect(formatUsd(0)).toBe("$0.00");
  });
});

describe("formatUsdPrice", () => {
  it("uses standard currency formatting at or above $1", () => {
    expect(formatUsdPrice(1)).toBe("$1.00");
    expect(formatUsdPrice(97.27)).toBe("$97.27");
  });

  it("shows enough significant digits for a sub-cent token price (MALTY-like)", () => {
    const formatted = formatUsdPrice(0.0001234);
    expect(formatted.startsWith("$0.0001")).toBe(true);
    expect(formatted).not.toBe("$0.00");
  });

  it("never returns a bare $0 for a positive price", () => {
    expect(formatUsdPrice(0.00000001)).not.toBe("$0");
  });

  it("returns $0 for a non-positive price", () => {
    expect(formatUsdPrice(0)).toBe("$0");
  });
});

describe("estimateNetworkFeeLamports", () => {
  it("defaults to one signature's worth of the real Solana base fee", () => {
    expect(estimateNetworkFeeLamports()).toBe(SOLANA_BASE_FEE_LAMPORTS);
  });

  it("scales with an explicit transaction count", () => {
    expect(estimateNetworkFeeLamports(2)).toBe(SOLANA_BASE_FEE_LAMPORTS * 2n);
  });

  it("never goes below a single signature's fee", () => {
    expect(estimateNetworkFeeLamports(0)).toBe(SOLANA_BASE_FEE_LAMPORTS);
  });
});

describe("swap history (local, per-wallet)", () => {
  const wallet = "TestWallet1111111111111111111111111111111";

  beforeEach(() => {
    localStorage.clear();
  });

  function makeResult(signature: string): SwapResult {
    return {
      signatures: [signature],
      inputMint: "SOL",
      outputMint: "MALTY",
      inputAmount: 50_000_000n,
      outputAmount: 12_430_000_000n,
      confirmed: true,
      timestamp: Date.now(),
      source: "website",
    };
  }

  it("starts empty for a wallet with no recorded swaps", () => {
    expect(getSwapHistory(wallet)).toEqual([]);
  });

  it("records a swap and reads it back, newest first", () => {
    recordSwapHistory(wallet, makeResult("sig1"));
    recordSwapHistory(wallet, makeResult("sig2"));

    const history = getSwapHistory(wallet);
    expect(history).toHaveLength(2);
    expect(history[0].signature).toBe("sig2");
    expect(history[1].signature).toBe("sig1");
    // bigints round-trip through JSON as decimal strings, not numbers
    expect(history[0].inputAmount).toBe("50000000");
  });

  it("de-duplicates by signature instead of appending twice", () => {
    recordSwapHistory(wallet, makeResult("sig1"));
    recordSwapHistory(wallet, makeResult("sig1"));
    expect(getSwapHistory(wallet)).toHaveLength(1);
  });

  it("keeps history isolated per wallet address", () => {
    recordSwapHistory(wallet, makeResult("sig1"));
    expect(getSwapHistory("AnotherWallet2222222222222222222222222222")).toEqual([]);
  });

  it("caps history length instead of growing unbounded", () => {
    for (let i = 0; i < 25; i++) {
      recordSwapHistory(wallet, makeResult(`sig${i}`));
    }
    expect(getSwapHistory(wallet).length).toBeLessThanOrEqual(20);
  });
});
