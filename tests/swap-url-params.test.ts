import { describe, expect, it } from "vitest";
import { isAllowedReturnTo, parseSwapSearchParams } from "../app/lib/swap/url-params";

describe("swap returnTo allowlist", () => {
  it("allows internal root-relative paths", () => {
    expect(isAllowedReturnTo("/")).toBe(true);
    expect(isAllowedReturnTo("/game")).toBe(true);
    expect(isAllowedReturnTo("/game/shop")).toBe(true);
    expect(isAllowedReturnTo("/how-to-buy")).toBe(true);
    expect(isAllowedReturnTo("/swap")).toBe(true);
    expect(isAllowedReturnTo("/swap?output=MALTY")).toBe(true);
  });

  it("rejects external and protocol-relative URLs", () => {
    expect(isAllowedReturnTo("https://evil.com")).toBe(false);
    expect(isAllowedReturnTo("//evil.com")).toBe(false);
    expect(isAllowedReturnTo("http://evil.com/game")).toBe(false);
    expect(isAllowedReturnTo("javascript:alert(1)")).toBe(false);
  });

  it("rejects paths outside the allowlist", () => {
    expect(isAllowedReturnTo("/admin")).toBe(false);
    expect(isAllowedReturnTo("/wallet-import")).toBe(false);
  });

  it("rejects backslash tricks and missing/empty values", () => {
    expect(isAllowedReturnTo("/\\evil.com")).toBe(false);
    expect(isAllowedReturnTo(null)).toBe(false);
    expect(isAllowedReturnTo("")).toBe(false);
  });
});

describe("parseSwapSearchParams", () => {
  it("parses a full, valid game-shop deep link", () => {
    const params = new URLSearchParams(
      "output=MALTY&exactOutput=760&returnTo=/game/shop&source=shop"
    );
    const parsed = parseSwapSearchParams(params);
    expect(parsed.outputToken).toBe("MALTY");
    expect(parsed.exactOutputAmount).toBe("760");
    expect(parsed.returnTo).toBe("/game/shop");
    expect(parsed.source).toBe("shop");
  });

  it("never trusts an arbitrary mint — only known symbols", () => {
    const params = new URLSearchParams("output=6ZhVVH2KwbiVg6HJjrPg2YC5SWomBFA5qGmz57pknMpz");
    expect(parseSwapSearchParams(params).outputToken).toBeNull();
  });

  it("normalizes token symbol casing", () => {
    const params = new URLSearchParams("output=malty&input=sol");
    const parsed = parseSwapSearchParams(params);
    expect(parsed.outputToken).toBe("MALTY");
    expect(parsed.inputToken).toBe("SOL");
  });

  it("drops an unsafe returnTo instead of trusting it", () => {
    const params = new URLSearchParams("returnTo=https://evil.com");
    expect(parseSwapSearchParams(params).returnTo).toBeNull();
  });

  it("falls back to 'website' for an unknown source", () => {
    const params = new URLSearchParams("source=totally-not-a-real-source");
    expect(parseSwapSearchParams(params).source).toBe("website");
  });

  it("rejects a malformed amount", () => {
    const params = new URLSearchParams("exactOutput=not-a-number");
    expect(parseSwapSearchParams(params).exactOutputAmount).toBeNull();
  });
});
