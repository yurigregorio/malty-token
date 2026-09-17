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

  it("matches via context.__serverMessage when @solana/kit strips the display message in production", () => {
    const err = new Error("Solana error #-32602; Decode this error by running `npx @solana/errors decode -- -32602`");
    (err as unknown as { context: unknown }).context = { __code: -32602, __serverMessage: "Invalid param: not a Token account" };
    expect(isAccountNotFound(err)).toBe(true);
  });

  it("does not false-positive on a stripped message with an unrelated __serverMessage", () => {
    const err = new Error("Solana error #-32602; Decode this error by running `npx @solana/errors decode -- -32602`");
    (err as unknown as { context: unknown }).context = { __code: -32602, __serverMessage: "Invalid param: too many accounts requested" };
    expect(isAccountNotFound(err)).toBe(false);
  });
});
