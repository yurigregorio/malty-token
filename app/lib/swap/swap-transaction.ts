import {
  getBase58Decoder,
  getBase64Encoder,
  getTransactionDecoder,
  type Rpc,
  type SolanaRpcApi,
} from "@solana/kit";
import { SwapError } from "./types";

const base64Encoder = getBase64Encoder();
const base58Decoder = getBase58Decoder();
const transactionDecoder = getTransactionDecoder();

/**
 * Decodes every Raydium-provided transaction and hands back raw wire bytes in
 * signing order. Throws `malformed-response` for anything that fails to
 * decode as a valid Solana transaction, so a corrupt/truncated API response
 * is caught before it ever reaches the wallet for signing.
 */
export function decodeSwapTransactions(base64Transactions: string[]): Uint8Array[] {
  return base64Transactions.map((base64, index) => {
    let bytes: Uint8Array;
    try {
      bytes = base64Encoder.encode(base64) as Uint8Array;
      // Structural sanity check — throws if the bytes aren't a well-formed transaction.
      transactionDecoder.decode(bytes);
    } catch (error) {
      throw new SwapError(
        "malformed-response",
        `Raydium returned an invalid transaction (step ${index + 1}).`,
        error
      );
    }
    return bytes;
  });
}

export type SignAndSendFn = (
  ...inputs: readonly { transaction: Uint8Array }[]
) => Promise<readonly { signature: Uint8Array }[]>;

/**
 * Signs and sends every transaction, in order, through the connected
 * wallet — the wallet holds the keys and is the only thing that ever signs;
 * this app never sees or touches a private key. Returns base58 signatures in
 * the same order.
 */
export async function signAndSendSwapTransactions(
  transactions: Uint8Array[],
  signAndSendTransactions: SignAndSendFn
): Promise<string[]> {
  const inputs = transactions.map((transaction) => ({ transaction }));
  const outputs = await signAndSendTransactions(...inputs);
  return outputs.map((output) => base58Decoder.decode(output.signature));
}

const CONFIRM_POLL_INTERVAL_MS = 1500;
const CONFIRM_TIMEOUT_MS = 45_000;

/**
 * Waits for every signature to reach at least `confirmed` commitment. Throws
 * `transaction-failed` if the cluster reports an on-chain error, or
 * `transaction-timeout` if none arrives within the timeout — the caller
 * should tell the user their swap may still land and to check the signature.
 */
export async function confirmSwapSignatures(
  rpc: Rpc<SolanaRpcApi>,
  signatures: string[]
): Promise<void> {
  const deadline = Date.now() + CONFIRM_TIMEOUT_MS;
  const pending = new Set(signatures);

  while (pending.size > 0) {
    if (Date.now() > deadline) {
      throw new SwapError(
        "transaction-timeout",
        "The swap is taking longer than expected to confirm. Check your wallet or the explorer link — it may still land."
      );
    }

    const pendingList = [...pending];
    const { value: statuses } = await rpc
      .getSignatureStatuses(pendingList as never, { searchTransactionHistory: false })
      .send();

    statuses.forEach((status, i) => {
      const signature = pendingList[i];
      if (!status) return;

      if (status.err) {
        throw new SwapError(
          "transaction-failed",
          "The swap transaction failed on-chain.",
          status.err
        );
      }

      if (status.confirmationStatus === "confirmed" || status.confirmationStatus === "finalized") {
        pending.delete(signature);
      }
    });

    if (pending.size > 0) {
      await new Promise((resolve) => setTimeout(resolve, CONFIRM_POLL_INTERVAL_MS));
    }
  }
}
