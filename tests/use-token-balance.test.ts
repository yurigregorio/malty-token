import { describe, expect, it } from "vitest";
import { isAccountNotFound } from "../app/lib/hooks/use-token-balance";

describe("isAccountNotFound", () => {
  it("matches Helius's wording for a token account that was never created", () => {
    expect(isAccountNotFound(new Error("JSON-RPC error: Invalid method parameter(s) (Invalid param: not a Token account)"))).toBe(true);
  });

  it("matches the generic 'could not find account' wording used by other providers", () => {
    expect(isAccountNotFound(new Error("Invalid param: could not find account"))).toBe(true);
  });

  it("does not treat an unrelated RPC error as a missing account", () => {
    expect(isAccountNotFound(new Error("Rate limit exceeded"))).toBe(false);
    expect(isAccountNotFound(new Error("Failed to fetch"))).toBe(false);
  });
});
