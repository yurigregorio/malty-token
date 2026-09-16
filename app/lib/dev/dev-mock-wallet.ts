"use client";

/**
 * Registers a fake Wallet-Standard wallet so the app can be clicked through
 * locally without installing a real browser wallet extension. It signs with
 * a keypair generated fresh in memory (never persisted, never a real
 * wallet) — useful for reviewing the connected UI, but it has no real SOL/
 * MALTY/USDC, so an actual swap will correctly fail with "insufficient
 * balance" once you hit Confirm.
 *
 * Development-only by construction: every caller must gate this behind
 * `process.env.NODE_ENV === "development"` so Next.js dead-code-eliminates
 * the whole module (and its @wallet-standard/wallet import) out of the
 * production bundle.
 */

let registerPromise: Promise<string> | null = null;

export function registerDevMockWallet(): Promise<string> {
  if (!registerPromise) {
    registerPromise = doRegister();
  }
  return registerPromise;
}

async function doRegister(): Promise<string> {
  const [{ registerWallet }, kit, { getClusterUrl }] = await Promise.all([
    import("@wallet-standard/wallet"),
    import("@solana/kit"),
    import("../solana-client"),
  ]);

  const {
    createSolanaRpc,
    generateKeyPair,
    getAddressFromPublicKey,
    getBase58Encoder,
    getBase64EncodedWireTransaction,
    getTransactionDecoder,
    getTransactionEncoder,
    partiallySignTransaction,
    signBytes,
  } = kit;

  function chainToClusterUrl(chain: string): string {
    if (chain === "solana:devnet") return getClusterUrl("devnet");
    if (chain === "solana:testnet") return getClusterUrl("testnet");
    return getClusterUrl("mainnet");
  }

  const keyPair = await generateKeyPair();
  const walletAddress = await getAddressFromPublicKey(keyPair.publicKey);
  const publicKeyBytes = new Uint8Array(
    await crypto.subtle.exportKey("raw", keyPair.publicKey)
  );

  // All clusters the app's ClusterSelect can target, so the mock wallet
  // stays connectable no matter which one is currently selected.
  const CHAINS = ["solana:mainnet", "solana:devnet", "solana:testnet"] as const;

  const ICON =
    "data:image/svg+xml;base64," +
    btoa(
      '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><rect width="32" height="32" rx="8" fill="#e9b949"/><text x="16" y="21" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#0a0a0a">D</text></svg>'
    );

  const account = {
    address: walletAddress,
    chains: CHAINS,
    features: [
      "solana:signMessage",
      "solana:signTransaction",
      "solana:signAndSendTransaction",
    ] as const,
    publicKey: publicKeyBytes,
  };

  let connectedAccounts: (typeof account)[] = [];

  const wallet = {
    chains: CHAINS,
    features: {
      "solana:signMessage": {
        signMessage: async (...inputs: readonly { message: Uint8Array }[]) =>
          Promise.all(
            inputs.map(async ({ message }) => ({
              signature: new Uint8Array(await signBytes(keyPair.privateKey, message)),
              signedMessage: message,
            }))
          ),
        version: "1.0.0" as const,
      },
      "solana:signTransaction": {
        signTransaction: async (
          ...inputs: readonly { transaction: Uint8Array }[]
        ) =>
          Promise.all(
            inputs.map(async ({ transaction }) => {
              const signed = await partiallySignTransaction(
                [keyPair],
                getTransactionDecoder().decode(transaction)
              );
              return {
                signedTransaction: new Uint8Array(getTransactionEncoder().encode(signed)),
              };
            })
          ),
        supportedTransactionVersions: ["legacy", 0] as const,
        version: "1.0.0" as const,
      },
      "solana:signAndSendTransaction": {
        signAndSendTransaction: async (
          ...inputs: readonly { transaction: Uint8Array; chain: string }[]
        ) =>
          Promise.all(
            inputs.map(async ({ transaction, chain }) => {
              const signed = await partiallySignTransaction(
                [keyPair],
                getTransactionDecoder().decode(transaction)
              );
              const rpc = createSolanaRpc(chainToClusterUrl(chain));
              const signatureBase58 = await rpc
                .sendTransaction(getBase64EncodedWireTransaction(signed), {
                  encoding: "base64",
                  preflightCommitment: "confirmed",
                })
                .send();
              return { signature: getBase58Encoder().encode(signatureBase58) as Uint8Array };
            })
          ),
        supportedTransactionVersions: ["legacy", 0] as const,
        version: "1.0.0" as const,
      },
      "standard:connect": {
        connect: async () => {
          connectedAccounts = [account];
          return { accounts: connectedAccounts };
        },
        version: "1.0.0" as const,
      },
      "standard:disconnect": {
        disconnect: async () => {
          connectedAccounts = [];
        },
        version: "1.0.0" as const,
      },
      "standard:events": {
        on: () => () => {},
        version: "1.0.0" as const,
      },
    },
    get accounts() {
      return connectedAccounts;
    },
    icon: ICON as `data:image/svg+xml;base64,${string}`,
    name: "Mock Wallet (Dev)",
    version: "1.0.0" as const,
  };

  registerWallet(wallet);
  return walletAddress;
}
