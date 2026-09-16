"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { address, formatDecimalFixedPoint, lamportsToSol } from "@solana/kit";
import {
  useWallets,
  useConnect,
  useDisconnect,
  useConnectedWallet,
  useIsWalletReady,
} from "@solana/kit-plugin-wallet/react";
import { useBalance } from "../lib/hooks/use-balance";
import { ellipsify } from "../lib/explorer";
import { useCluster } from "./cluster-context";
import { useAppClient } from "../lib/client-provider";

const solFormatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: 4 });
const subscribeToHydration = () => () => {};

/**
 * The site-wide "Connect Wallet" button, styled to match the public site's
 * dark/gold design language (SiteHeader, /swap, /how-to-buy, ...). Shares
 * the same underlying wallet connection as the /dev sandbox's `WalletButton`
 * — connecting here also connects Malty Swap and vice versa.
 */
export function SiteWalletButton() {
  const client = useAppClient();
  const wallets = useWallets(client);
  const connected = useConnectedWallet(client);
  const isWalletReady = useIsWalletReady(client);
  const isHydrated = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false
  );
  const { dispatchAsync: connect, error: connectError, isRunning: isConnecting } = useConnect(client);
  const { dispatchAsync: disconnect, isRunning: isDisconnecting } = useDisconnect(client);

  const { getExplorerUrl } = useCluster();
  const [isOpen, setIsOpen] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const walletAddress = connected?.account.address;
  const balance = useBalance(walletAddress ? address(walletAddress) : undefined);

  const close = () => setIsOpen(false);
  const closeAndRestoreFocus = () => {
    setIsOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  async function copyAddress() {
    if (!walletAddress) return;
    try {
      await navigator.clipboard.writeText(walletAddress);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
    window.setTimeout(() => setCopyState("idle"), 1600);
  }

  if (!isHydrated || !isWalletReady) {
    return (
      <span className="hidden h-8 w-[112px] animate-pulse rounded-full border border-white/[0.08] bg-white/[0.025] sm:block" />
    );
  }

  if (!connected) {
    return (
      <div className="relative" ref={ref}>
        <button
          ref={triggerRef}
          onClick={() => (isOpen ? close() : setIsOpen(true))}
          aria-expanded={isOpen}
          className="whitespace-nowrap rounded-full border border-[#e9b949]/30 bg-[#e9b949]/10 px-3 py-1.5 text-[11px] font-bold text-[#e9b949] transition-colors hover:border-[#e9b949]/50 hover:bg-[#e9b949]/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#e9b949] sm:px-4 sm:py-2 sm:text-[12px]"
        >
          <span className="sm:hidden">Connect</span>
          <span className="hidden sm:inline">Connect Wallet</span>
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-2xl border border-white/[0.1] bg-[#0c0f13] p-3 shadow-[0_16px_40px_rgba(0,0,0,0.5)]">
            <p className="mb-2 px-1 text-[11px] font-semibold text-white/40">Choose a wallet</p>
            {wallets.length === 0 ? (
              <p className="px-1 text-xs leading-5 text-white/50">
                No wallet detected. Install Phantom, Solflare, Backpack, or another
                Wallet Standard–compatible wallet.
              </p>
            ) : (
              <div className="space-y-1">
                {wallets.map((wallet) => (
                  <button
                    key={wallet.name}
                    onClick={async () => {
                      try {
                        await connect(wallet);
                        closeAndRestoreFocus();
                      } catch {
                        // connectError below surfaces the failure
                      }
                    }}
                    disabled={isConnecting}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-bold text-white/85 transition-colors hover:bg-white/[0.05] disabled:opacity-50"
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
              <p className="mt-2 px-1 text-[11px] text-red-300" role="alert">
                {connectError instanceof Error ? connectError.message : String(connectError)}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        ref={triggerRef}
        onClick={() => (isOpen ? close() : setIsOpen(true))}
        aria-expanded={isOpen}
        aria-label={`Wallet ${walletAddress}`}
        className="flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.025] px-3.5 py-2 text-[12px] font-bold text-white/85 transition-colors hover:border-[#e9b949]/35"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        <span className="font-mono">{ellipsify(walletAddress!, 4)}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-72 rounded-2xl border border-white/[0.1] bg-[#0c0f13] p-4 shadow-[0_16px_40px_rgba(0,0,0,0.5)]">
          <p className="text-[11px] font-semibold text-white/40">Balance</p>
          <p className="mt-0.5 text-lg font-black text-white/95">
            {balance.lamports != null
              ? formatDecimalFixedPoint(solFormatter, lamportsToSol(balance.lamports))
              : balance.isLoading
                ? "Loading…"
                : "—"}{" "}
            {balance.lamports != null && <span className="text-sm font-normal text-white/45">SOL</span>}
          </p>

          <div className="mt-3 break-all rounded-xl border border-white/[0.08] bg-black/20 px-3 py-2 font-mono text-xs text-white/70">
            {walletAddress}
          </div>

          <div className="mt-3 flex gap-2">
            <button
              onClick={copyAddress}
              className="flex-1 rounded-lg border border-white/[0.1] bg-white/[0.025] px-3 py-2 text-[11px] font-bold text-white/80 transition-colors hover:border-[#e9b949]/35"
            >
              {copyState === "copied" ? "Copied!" : copyState === "error" ? "Copy failed" : "Copy address"}
            </button>
            <a
              href={getExplorerUrl(`/address/${walletAddress}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-lg border border-white/[0.1] bg-white/[0.025] px-3 py-2 text-center text-[11px] font-bold text-white/80 transition-colors hover:border-[#e9b949]/35"
            >
              Explorer ↗
            </a>
          </div>

          <button
            onClick={async () => {
              try {
                await disconnect();
                closeAndRestoreFocus();
              } catch {
                // disconnect rarely fails; nothing actionable to show here
              }
            }}
            disabled={isDisconnecting}
            className="mt-2 w-full rounded-lg border border-white/[0.1] px-3 py-2 text-[11px] font-bold text-red-300 transition-colors hover:bg-red-400/10 disabled:opacity-50"
          >
            {isDisconnecting ? "Disconnecting…" : "Disconnect"}
          </button>
        </div>
      )}
    </div>
  );
}
