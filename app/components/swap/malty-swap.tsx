"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import {
  useConnect,
  useConnectedWallet,
  useIsWalletReady,
  useWallets,
} from "@solana/kit-plugin-wallet/react";
import { useAppClient } from "../../lib/client-provider";
import { useCluster } from "../cluster-context";
import { getWalletChain } from "../../lib/solana-client";
import { trackSwapEvent } from "../../lib/swap/analytics";
import type { MaltySwapProps } from "../../lib/swap/types";
import { ConnectedMaltySwap } from "./connected-malty-swap";

const subscribeToHydration = () => () => {};

/**
 * The reusable Malty Swap widget. Renders in two layouts:
 *  - `mode="full"` (default): the `/swap` page.
 *  - `mode="compact"`: the future in-game embed, e.g.
 *    `<MaltySwap mode="compact" lockOutputToken outputMint="MALTY" exactOutputAmount="760" returnTo="/game/shop" source="shop" />`.
 *
 * Wallet connection is shared app-wide (see `WalletButton` / `AppClientProvider`) —
 * this component reuses that connection rather than establishing its own.
 */
export function MaltySwap(props: MaltySwapProps) {
  const client = useAppClient();
  const { cluster, setCluster } = useCluster();
  const wallets = useWallets(client);
  const connected = useConnectedWallet(client);
  const isWalletReady = useIsWalletReady(client);
  const isHydrated = useSyncExternalStore(subscribeToHydration, () => true, () => false);
  const { dispatchAsync: connect, error: connectError, isRunning: isConnecting } = useConnect(client);

  const openedTracked = useRef(false);
  useEffect(() => {
    if (openedTracked.current) return;
    openedTracked.current = true;
    trackSwapEvent({ name: "swap_opened", source: props.source ?? "website" });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- fire once on mount only
  }, []);

  const connectedTracked = useRef(false);
  useEffect(() => {
    if (connected && !connectedTracked.current) {
      connectedTracked.current = true;
      trackSwapEvent({ name: "wallet_connected", source: props.source ?? "website" });
    }
    if (!connected) connectedTracked.current = false;
  }, [connected, props.source]);

  const shell = props.mode === "compact" ? "compact" : "full";

  if (!isHydrated || !isWalletReady) {
    return (
      <SwapShell shell={shell}>
        <div className="flex items-center justify-center py-10">
          <span className="h-6 w-6 animate-spin rounded-full border-2 border-white/20 border-t-[#e9b949]" />
        </div>
      </SwapShell>
    );
  }

  if (cluster !== "mainnet") {
    return (
      <SwapShell shell={shell}>
        <div className="flex flex-col items-center gap-3 py-8 text-center">
          <p className="text-sm font-black text-white/95">Switch to Mainnet</p>
          <p className="max-w-xs text-xs leading-5 text-white/50">
            $MALTY liquidity lives on Solana Mainnet. Switch networks to continue swapping.
          </p>
          <button
            type="button"
            onClick={() => setCluster("mainnet")}
            className="mt-1 rounded-xl bg-[#e9b949] px-5 py-2.5 text-sm font-black text-black transition-transform hover:-translate-y-0.5"
          >
            Switch to Mainnet
          </button>
        </div>
      </SwapShell>
    );
  }

  if (!connected) {
    return (
      <SwapShell shell={shell}>
        <div className="flex flex-col gap-3 py-6">
          <p className="text-center text-sm font-black text-white/95">Connect your wallet to swap</p>
          {wallets.length === 0 ? (
            <p className="text-center text-xs text-white/45">
              No Solana wallet detected. Install Phantom, Solflare, Backpack, or another
              Wallet Standard–compatible wallet to continue.
            </p>
          ) : (
            <div className="space-y-1.5">
              {wallets.map((wallet) => (
                <button
                  key={wallet.name}
                  type="button"
                  onClick={() => connect(wallet)}
                  disabled={isConnecting}
                  className="flex w-full items-center gap-3 rounded-xl border border-white/[0.1] bg-white/[0.02] px-4 py-3 text-left text-sm font-bold text-white/85 transition-colors hover:border-[#e9b949]/35 disabled:opacity-50"
                >
                  {wallet.icon && (
                    // eslint-disable-next-line @next/next/no-img-element -- wallet-standard icons are data URIs
                    <img src={wallet.icon} alt="" className="h-5 w-5 rounded" />
                  )}
                  {wallet.name}
                </button>
              ))}
            </div>
          )}
          {connectError != null && (
            <p className="text-center text-xs text-red-300" role="alert">
              {connectError instanceof Error ? connectError.message : String(connectError)}
            </p>
          )}
        </div>
      </SwapShell>
    );
  }

  return (
    <SwapShell shell={shell}>
      <ConnectedMaltySwap
        {...props}
        account={connected.account}
        chain={getWalletChain(cluster)}
        key={connected.account.address}
      />
    </SwapShell>
  );
}

function SwapShell({ shell, children }: { shell: "full" | "compact"; children: React.ReactNode }) {
  return (
    <div
      className={
        shell === "full"
          ? "mx-auto w-full rounded-2xl border border-white/[0.08] bg-[#0c0f13] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.4)] sm:p-5"
          : "w-full rounded-2xl border border-white/[0.08] bg-[#0c0f13] p-3.5"
      }
    >
      {children}
    </div>
  );
}
