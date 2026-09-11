const MINT = "6ZhVVH2KwbiVg6HJjrPg2YC5SWomBFA5qGmz57pknMpz";

const allocations = [
  ["Liquidity", "500,000,000", "50%"],
  ["Ecosystem", "200,000,000", "20%"],
  ["Community", "150,000,000", "15%"],
  ["Treasury", "75,000,000", "7.5%"],
  ["Team", "75,000,000", "7.5%"],
] as const;

const reserveWallets = [
  ["Liquidity", "8zMNiAh2uH1MoKh9eRjewSrgRjU4WQAYVV2u4SKSiRfU"],
  ["Ecosystem", "44Ha31Tj911xtFcNv5e4RTD7f3NxhULtcUygBJm8on1g"],
  ["Community", "BFYWFeqf8uJ4BvD6dfySCkdMVdtDPvxFe5hmSzuCCbhg"],
  ["Treasury", "6gkNMy3342qVUKSatW27zUAK22ops5Fu7G5J148MQZK6"],
  ["Team", "CvASopxtFapEhJ8r75UcHiisPVCfxv5ApGAqbwNagXmw"],
] as const;

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <section className="rounded-3xl border border-border-low bg-card p-8 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
          MALTY · Solana
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
          Small Dog. Big Community.
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-muted sm:text-base">
          MALTY is a Solana memecoin inspired by Charlotte, a Maltese with big
          community energy. This page publishes the project&apos;s verifiable token
          facts, reserve architecture and current distribution status.
        </p>

        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          <Fact label="Total supply" value="1,000,000,000 MALTY" />
          <Fact label="Decimals" value="6" />
          <Fact label="Transfer tax" value="0%" />
          <Fact label="Mint Authority" value="Revoked" />
          <Fact label="Freeze Authority" value="None" />
          <Fact label="Metadata" value="Present" />
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-border-low bg-card p-6 sm:p-8">
        <h2 className="text-lg font-bold">Verified Mainnet mint</h2>
        <p className="mt-2 break-all font-mono text-xs text-muted">{MINT}</p>
        <a
          className="mt-4 inline-flex rounded-lg border border-border-low px-4 py-2 text-sm font-medium hover:bg-background"
          href={`https://explorer.solana.com/address/${MINT}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View on Solana Explorer
        </a>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-border-low bg-card p-6 sm:p-8">
          <h2 className="text-lg font-bold">Token allocation</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            These are the canonical project allocations. Allocation does not by
            itself mean tokens are circulating or distributed.
          </p>
          <div className="mt-5 space-y-3">
            {allocations.map(([name, amount, share]) => (
              <div
                className="flex items-center justify-between gap-4 rounded-xl border border-border-low bg-background px-4 py-3"
                key={name}
              >
                <span className="text-sm font-medium">{name}</span>
                <span className="text-right text-xs text-muted">
                  {amount} · {share}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-border-low bg-card p-6 sm:p-8">
          <h2 className="text-lg font-bold">Current reserve status</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            The five reserve addresses are published below. At the latest
            documented reconciliation, no reserve transfer had been executed and
            each reserve account held 0 MALTY.
          </p>
          <div className="mt-5 space-y-3">
            {reserveWallets.map(([name, wallet]) => (
              <div
                className="rounded-xl border border-border-low bg-background px-4 py-3"
                key={name}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium">{name}</span>
                  <span className="text-xs text-muted">Documented: 0 MALTY</span>
                </div>
                <p className="mt-2 break-all font-mono text-[11px] text-muted">
                  {wallet}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-border-low bg-card p-6 sm:p-8">
        <h2 className="text-lg font-bold">Transparency notes</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Note text="Planned initial availability is 100,000,000 MALTY, but planned availability is not the same as circulating supply." />
          <Note text="Reserve balances and circulating supply should only be updated from observed on-chain movements." />
          <Note text="The five reserve addresses are separate public accounts under one temporary custody security boundary." />
          <Note text="No claim is made that liquidity is locked, permanent or guaranteed unless a verifiable mechanism is implemented." />
        </div>
      </section>

      <p className="mt-8 text-center text-xs leading-5 text-muted">
        MALTY is a memecoin. Project documentation describes token structure and
        transparency practices; it is not a promise of price, returns or future
        value.
      </p>
    </main>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border-low bg-background p-4">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}

function Note({ text }: { text: string }) {
  return (
    <p className="rounded-xl border border-border-low bg-background p-4 text-sm leading-6 text-muted">
      {text}
    </p>
  );
}
