import { describe, expect, it } from "vitest";
import { MALTY_PUBLIC_MINT } from "../app/lib/malty-token";
import {
  SWAP_TOKENS,
  counterpartsFor,
  isSupportedPair,
  isSwapTokenSymbol,
} from "../app/lib/swap/tokens";
import {
  DEFAULT_SLIPPAGE_BPS,
  MAX_SLIPPAGE_BPS,
  bpsToPercentLabel,
  validateSlippageBps,
} from "../app/lib/swap/slippage";
import { classifyPriceImpact, requiresExtraConfirmation } from "../app/lib/swap/price-impact";

describe("swap token allowlist", () => {
  it("uses the official MALTY mint, matching the rest of the app", () => {
    expect(SWAP_TOKENS.MALTY.mint.toString()).toBe(MALTY_PUBLIC_MINT);
    expect(SWAP_TOKENS.MALTY.decimals).toBe(6);
  });

  it("only recognizes the three allowlisted symbols", () => {
    expect(isSwapTokenSymbol("MALTY")).toBe(true);
    expect(isSwapTokenSymbol("SOL")).toBe(true);
    expect(isSwapTokenSymbol("USDC")).toBe(true);
    expect(isSwapTokenSymbol("USDT")).toBe(false);
    expect(isSwapTokenSymbol("anything-from-a-url")).toBe(false);
  });

  it("supports SOL<->MALTY and USDC<->MALTY, not SOL<->USDC directly", () => {
    expect(isSupportedPair("SOL", "MALTY")).toBe(true);
    expect(isSupportedPair("USDC", "MALTY")).toBe(true);
    expect(isSupportedPair("SOL", "USDC")).toBe(false);
    expect(isSupportedPair("MALTY", "MALTY")).toBe(false);
  });

  it("lists MALTY's counterparts as SOL and USDC", () => {
    expect([...counterpartsFor("MALTY")].sort()).toEqual(["SOL", "USDC"]);
  });
});

describe("slippage", () => {
  it("has a conservative 1% default", () => {
    expect(DEFAULT_SLIPPAGE_BPS).toBe(100);
    expect(bpsToPercentLabel(DEFAULT_SLIPPAGE_BPS)).toBe("1%");
  });

  it("rejects zero, negative, non-integer and absurd values", () => {
    expect(validateSlippageBps(0)).not.toBeNull();
    expect(validateSlippageBps(-10)).not.toBeNull();
    expect(validateSlippageBps(1.5)).not.toBeNull();
    expect(validateSlippageBps(MAX_SLIPPAGE_BPS + 1)).not.toBeNull();
  });

  it("accepts valid values within bounds", () => {
    expect(validateSlippageBps(50)).toBeNull();
    expect(validateSlippageBps(MAX_SLIPPAGE_BPS)).toBeNull();
  });
});

describe("price impact classification", () => {
  it("classifies low, medium and high impact using conservative thresholds", () => {
    expect(classifyPriceImpact(0.1)).toBe("normal");
    expect(classifyPriceImpact(1.5)).toBe("attention");
    expect(classifyPriceImpact(4)).toBe("high");
  });

  it("only requires extra confirmation at the high tier", () => {
    expect(requiresExtraConfirmation(0.5)).toBe(false);
    expect(requiresExtraConfirmation(2)).toBe(false);
    expect(requiresExtraConfirmation(5)).toBe(true);
  });
});
