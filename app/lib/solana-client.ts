import { createClient, MicroLamports } from "@solana/kit";
import { walletSigner } from "@solana/kit-plugin-wallet";
import { solanaRpc, rpcAirdrop } from "@solana/kit-plugin-rpc";
import { tokenProgram } from "@solana-program/token";
import { memoProgram } from "@solana-program/memo";
import { systemProgram } from "@solana-program/system";

export type ClusterMoniker =
  | "devnet"
  | "testnet"
  | "mainnet"
  | "localnet";

export const CLUSTERS: ClusterMoniker[] = [
  "devnet",
  "testnet",
  "mainnet",
  "localnet",
];

// The official public Solana RPC (api.mainnet.solana.com) returns 403 on
// browser-originated (CORS/Origin-header) requests — it works for scripts
// and curl, but not for a dApp actually running in a browser. PublicNode's
// mirror serves the same data and allows browser requests, so it's a safer
// default fallback. Configuring NEXT_PUBLIC_SOLANA_MAINNET_RPC_URL with a
// dedicated provider (Helius, QuickNode, Alchemy, Triton, ...) is still
// strongly recommended for production — this fallback exists purely so the
// app degrades to "works, rate-limited" instead of "broken" when unset.
const PUBLIC_MAINNET_RPC_URL = "https://solana-rpc.publicnode.com";
const PUBLIC_MAINNET_WS_URL = "wss://solana-rpc.publicnode.com";

const configuredMainnetRpcUrl =
  process.env.NEXT_PUBLIC_SOLANA_MAINNET_RPC_URL?.trim() || null;

const configuredMainnetWsUrl =
  process.env.NEXT_PUBLIC_SOLANA_MAINNET_WS_URL?.trim() ||
  (configuredMainnetRpcUrl
    ? configuredMainnetRpcUrl.replace(/^https?:\/\//, (protocol) =>
        protocol === "https://" ? "wss://" : "ws://"
      )
    : null);

const CLUSTER_URLS: Record<ClusterMoniker, string> = {
  devnet: "https://api.devnet.solana.com",
  testnet: "https://api.testnet.solana.com",
  mainnet: configuredMainnetRpcUrl ?? PUBLIC_MAINNET_RPC_URL,
  localnet: "http://localhost:8899",
};

const WS_URLS: Record<ClusterMoniker, string> = {
  devnet: "wss://api.devnet.solana.com",
  testnet: "wss://api.testnet.solana.com",
  mainnet: configuredMainnetWsUrl ?? PUBLIC_MAINNET_WS_URL,
  localnet: "ws://localhost:8900",
};

const WALLET_CHAINS: Record<ClusterMoniker, `solana:${string}`> = {
  devnet: "solana:devnet",
  testnet: "solana:testnet",
  mainnet: "solana:mainnet",

  // Wallets do not advertise a localnet chain.
  // Sign against devnet so wallets stay discoverable
  // while the RPC below targets the local validator.
  localnet: "solana:devnet",
};

export function getClusterUrl(cluster: ClusterMoniker) {
  return CLUSTER_URLS[cluster];
}

export function getWalletChain(cluster: ClusterMoniker) {
  return WALLET_CHAINS[cluster];
}

export function hasDedicatedMainnetRpc() {
  return configuredMainnetRpcUrl != null;
}

export type RpcUrlOverrides = {
  rpcUrl: string;
  rpcSubscriptionsUrl: string;
};

/**
 * Builds the app-wide Solana Kit client.
 *
 * `urls` overrides the cluster's default RPC endpoints.
 * This is useful for tests/local environments.
 *
 * For Mainnet production actions, set NEXT_PUBLIC_SOLANA_MAINNET_RPC_URL.
 * NEXT_PUBLIC_SOLANA_MAINNET_WS_URL is optional; when omitted, the WebSocket
 * URL is derived from the configured HTTPS endpoint.
 */
export function createAppClient(
  cluster: ClusterMoniker,
  urls?: RpcUrlOverrides
) {
  return createClient()
    .use(walletSigner({ chain: WALLET_CHAINS[cluster] }))
    .use(
      solanaRpc({
        rpcUrl: urls?.rpcUrl ?? CLUSTER_URLS[cluster],
        rpcSubscriptionsUrl:
          urls?.rpcSubscriptionsUrl ?? WS_URLS[cluster],
        transactionConfig: {
          microLamportsPerComputeUnit: 1000n as MicroLamports,
        },
      })
    )
    .use(rpcAirdrop())
    .use(systemProgram())
    .use(tokenProgram())
    .use(memoProgram());
}

export type AppClient = ReturnType<typeof createAppClient>;
