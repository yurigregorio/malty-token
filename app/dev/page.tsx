"use client";

import { ActionsPanel } from "../components/actions/actions-panel";

export default function DevPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
        MALTY developer tooling
      </p>
      <h1 className="mt-3 text-3xl font-black tracking-tight">
        Development network tools
      </h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
        Wallet and transaction tooling is separated from the public landing page.
        Mainnet remains read-only by default. A one-time maintenance flow can
        be explicitly enabled to publish approved metadata to Arweave and update
        the Metaplex URI with the current Update Authority's Phantom signature.
      </p>
      <ActionsPanel />
    </main>
  );
}
