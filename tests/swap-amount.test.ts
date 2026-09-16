import { describe, expect, it } from "vitest";
import { fromBaseUnits, getAmountError, toBaseUnits, formatTokenAmount } from "../app/lib/swap/amount";

describe("swap amount conversion", () => {
  it("round-trips a whole amount", () => {
    expect(toBaseUnits("12", 6)).toBe(12_000_000n);
    expect(fromBaseUnits(12_000_000n, 6)).toBe("12");
  });

  it("round-trips a fractional amount", () => {
    expect(toBaseUnits("0.05", 9)).toBe(50_000_000n);
    expect(fromBaseUnits(50_000_000n, 9)).toBe("0.05");
  });

  it("handles the SOL decimals boundary (9 places)", () => {
    expect(toBaseUnits("1.000000001", 9)).toBe(1_000_000_001n);
  });

  it("strips trailing zero fraction on formatting", () => {
    expect(fromBaseUnits(1_500_000n, 6)).toBe("1.5");
    expect(fromBaseUnits(1_000_000n, 6)).toBe("1");
  });

  it("rejects too many decimal places", () => {
    expect(() => toBaseUnits("1.1234567", 6)).toThrow();
  });

  it("rejects zero and negative-looking input", () => {
    expect(() => toBaseUnits("0", 6)).toThrow();
    expect(() => toBaseUnits("-1", 6)).toThrow();
  });

  it("rejects garbage input", () => {
    expect(() => toBaseUnits("abc", 6)).toThrow();
    expect(() => toBaseUnits("1e10", 6)).toThrow();
    expect(() => toBaseUnits("", 6)).toThrow();
  });

  it("getAmountError returns null for a valid amount and empty string", () => {
    expect(getAmountError("1.5", 6)).toBeNull();
    expect(getAmountError("", 6)).toBeNull();
  });

  it("getAmountError returns a message for an invalid amount", () => {
    expect(getAmountError("abc", 6)).not.toBeNull();
    expect(getAmountError("0", 6)).not.toBeNull();
  });

  it("formats large token amounts with grouping", () => {
    expect(formatTokenAmount(12_430_000_000n, 6)).toBe("12,430");
  });
});
