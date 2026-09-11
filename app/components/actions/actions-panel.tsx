"use client";

import { useSyncExternalStore } from "react";
import {
  useConnectedWallet,
  useIsWalletReady,
} from "@solana/kit-plugin-wallet/react";
import { useAppClient } from "../../lib/client-provider";
import { useCluster } from "../cluster-context";
import { AirdropCard } from "./airdrop-card";
import { TransferSolCard } from "./transfer-sol-card";
import { TokenCard } from "./token-card";
import { MemoCard } from "./memo-card";

const subscribeToHydration = () => () => {};

export function ActionsPanel() {
  const client = useAppClient();
  const connected = useConnectedWallet(client);
  const isWalletReady = useIsWalletReady(client);
  const isHydrated = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false
  );
  const { cluster } = useCluster();

  if (!isHydrated || !isWalletReady) {
    return (
      <div
        className="mt-8 rounded-2xl border border-border-low bg-card p-6 text-sm text-muted"
        role="status"
      >
        Restoring wallet connection...
      </div>
    );
  }

  if (!connected) {
    return (
      <div className="mt-8 rounded-2xl border border-border-low bg-card p-6 text-sm text-muted">
        Connect a wallet to inspect the selected network.
      </div>
    );
  }

  if (cluster === "mainnet") {
    return (
      <section className="mt-8 rounded-2xl border border-border-low bg-card p-6">
        <h2 className="text-sm font-semibold">MALTY Mainnet</h2>
        <p className="mt-2 text-sm text-muted">
          Mainnet v1 is complete. Transaction actions are intentionally disabled
          in this application. Use Mainnet here only for read-only inspection
          and verification.
        </p>
      </section>
    );
  }

  return (
    <section className="mt-8 grid gap-4 sm:grid-cols-2">
      <AirdropCard />
      {connected.signer ? (
        <>
          <TransferSolCard />
          <MemoCard />
          <TokenCard key={`${cluster}:${connected.account.address}`} />
        </>
      ) : (
        <p className="sm:col-span-2 rounded-lg border border-border-low bg-card px-4 py-3 text-sm text-muted">
          This wallet account is connected in read-only mode and cannot sign
          transactions. Connect a signing-capable account to use non-Mainnet
          development actions.
        </p>
      )}
    </section>
  );
}
