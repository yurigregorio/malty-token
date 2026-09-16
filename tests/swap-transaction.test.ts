import { describe, expect, it } from "vitest";
import type { Rpc, SolanaRpcApi } from "@solana/kit";
import {
  confirmSwapSignatures,
  decodeSwapTransactions,
  signAndSendSwapTransactions,
} from "../app/lib/swap/swap-transaction";
import { SwapError } from "../app/lib/swap/types";

describe("decodeSwapTransactions", () => {
  it("rejects invalid base64/garbage input as malformed-response, not a raw crash", () => {
    expect(() => decodeSwapTransactions(["not-valid-base64!!!"])).toThrow(SwapError);
    try {
      decodeSwapTransactions(["not-valid-base64!!!"]);
    } catch (err) {
      expect(err).toBeInstanceOf(SwapError);
      expect((err as SwapError).kind).toBe("malformed-response");
    }
  });

  it("rejects well-formed base64 that isn't a real transaction", () => {
    const notATransaction = Buffer.from("hello world, not a transaction").toString("base64");
    expect(() => decodeSwapTransactions([notATransaction])).toThrow(SwapError);
  });
});

describe("signAndSendSwapTransactions", () => {
  it("signs every transaction in order and returns base58 signatures in the same order", async () => {
    const calls: Uint8Array[][] = [];
    const signAndSendTransactions = async (
      ...inputs: readonly { transaction: Uint8Array }[]
    ) => {
      calls.push(inputs.map((i) => i.transaction));
      return inputs.map((_, i) => ({ signature: new Uint8Array(64).fill(i + 1) }));
    };

    const transactions = [new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])];
    const signatures = await signAndSendSwapTransactions(transactions, signAndSendTransactions);

    expect(signatures).toHaveLength(2);
    expect(signatures[0]).not.toBe(signatures[1]);
    expect(calls[0]).toEqual(transactions);
  });
});

describe("confirmSwapSignatures", () => {
  function mockRpc(statuses: ({ err: unknown; confirmationStatus: string } | null)[]) {
    return {
      getSignatureStatuses: () => ({
        send: async () => ({ value: statuses }),
      }),
    } as unknown as Rpc<SolanaRpcApi>;
  }

  it("resolves once every signature reaches 'confirmed'", async () => {
    const rpc = mockRpc([{ err: null, confirmationStatus: "confirmed" }]);
    await expect(confirmSwapSignatures(rpc, ["sig1"])).resolves.toBeUndefined();
  });

  it("throws transaction-failed when the cluster reports an on-chain error", async () => {
    const rpc = mockRpc([{ err: { InstructionError: [0, "Custom"] }, confirmationStatus: "confirmed" }]);
    await expect(confirmSwapSignatures(rpc, ["sig1"])).rejects.toMatchObject({
      kind: "transaction-failed",
    });
  });
});
