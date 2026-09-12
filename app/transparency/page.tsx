const MINT = "6ZhVVH2KwbiVg6HJjrPg2YC5SWomBFA5qGmz57pknMpz";

const reserves = [
  ["Liquidity", "500M planned", "8zMNiAh2uH1MoKh9eRjewSrgRjU4WQAYVV2u4SKSiRfU"],
  ["Ecosystem", "200M planned", "44Ha31Tj911xtFcNv5e4RTD7f3NxhULtcUygBJm8on1g"],
  ["Community", "150M planned", "BFYWFeqf8uJ4BvD6dfySCkdMVdtDPvxFe5hmSzuCCbhg"],
  ["Treasury", "75M planned", "6gkNMy3342qVUKSatW27zUAK22ops5Fu7G5J148MQZK6"],
  ["Team", "75M planned", "CvASopxtFapEhJ8r75UcHiisPVCfxv5ApGAqbwNagXmw"],
] as const;

export default function TransparencyPage() {
  return (
    <main className="min-h-screen bg-[#080a0d] text-[#f7f1e5]">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
        <a href="/" className="text-xs font-bold text-[#e9b949]">← MALTY</a>
        <p className="mt-10 text-[10px] font-black tracking-[0.24em] text-[#e9b949]">TRANSPARENCY CENTER</p>
        <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] sm:text-5xl">Verify, don’t just trust.</h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-white/50">This page separates verifiable token facts, project allocations and documented reserve state. Planned allocations are not presented as completed distribution.</p>

        <section className="mt-10 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <Card label="Supply" value="1B MALTY"/><Card label="Decimals" value="6"/><Card label="Mint Authority" value="Revoked" accent/><Card label="Freeze Authority" value="None" accent/>
        </section>

        <section className="mt-8 rounded-2xl border border-[#e9b949]/20 bg-[#e9b949]/[0.04] p-5">
          <p className="text-[10px] font-black tracking-[0.18em] text-[#e9b949]">OFFICIAL MAINNET MINT</p>
          <p className="mt-2 break-all font-mono text-xs text-white/65">{MINT}</p>
          <a href={`https://explorer.solana.com/address/${MINT}`} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex rounded-lg bg-[#e9b949] px-3 py-2 text-xs font-black text-black">Verify on Solana Explorer ↗</a>
        </section>

        <section className="mt-12">
          <p className="text-[10px] font-black tracking-[0.22em] text-[#e9b949]">RESERVE ARCHITECTURE</p>
          <h2 className="mt-2 text-2xl font-black">Planned allocation vs. documented state</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/45">The five reserve addresses are public. At the latest documented reconciliation, each reserve account held 0 MALTY and no reserve transfer had been executed.</p>
          <div className="mt-6 space-y-2">{reserves.map(([name,planned,wallet])=><div key={name} className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-4"><div className="flex flex-wrap items-center justify-between gap-2"><p className="text-sm font-black">{name}</p><div className="flex gap-3 text-[10px]"><span className="text-[#e9b949]">{planned}</span><span className="text-white/35">Documented: 0 MALTY</span></div></div><p className="mt-2 break-all font-mono text-[10px] text-white/32">{wallet}</p></div>)}</div>
        </section>

        <section className="mt-12 grid gap-3 sm:grid-cols-3">
          <Info title="Tokenomics" text="Liquidity 50% · Ecosystem 20% · Community 15% · Treasury 7.5% · Team 7.5%"/>
          <Info title="MALTY Gives" text="Planned initiative. No active donation program or promised contribution percentage exists yet."/>
          <Info title="Project principle" text="Publish what can be verified and clearly label what is still planned."/>
        </section>

        <footer className="mt-14 border-t border-white/[0.08] pt-6 text-[10px] leading-5 text-white/28">MALTY is a memecoin. This transparency page documents project structure and verifiable token facts; it does not promise price, returns, liquidity or future value.</footer>
      </div>
    </main>
  );
}

function Card({label,value,accent=false}:{label:string;value:string;accent?:boolean}){return <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-4"><p className="text-[10px] text-white/32">{label}</p><p className={`mt-1 text-sm font-black ${accent?"text-[#e9b949]":""}`}>{value}</p></div>}
function Info({title,text}:{title:string;text:string}){return <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5"><p className="text-sm font-black text-[#e9b949]">{title}</p><p className="mt-2 text-xs leading-5 text-white/42">{text}</p></div>}
