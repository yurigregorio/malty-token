const updates = [
  ["Foundation", "Completed", "MALTY deployed on Solana Mainnet with a fixed 1B supply, 6 decimals and no Freeze Authority."],
  ["Supply security", "Completed", "Mint Authority permanently revoked. Application creation and authority-changing actions are locked for Mainnet."],
  ["Transparency", "Published", "Canonical tokenomics, reserve architecture, allocation policies and reconciliation rules documented."],
  ["MALTY identity", "Published", "MALTY established as the sole project, token and brand identity."],
  ["MALTY Gives", "Planned", "Animal-welfare initiative announced with a policy-first activation standard and no contribution percentage promised yet."],
] as const;

export default function UpdatesPage() {
  return (
    <main className="min-h-screen bg-[#080a0d] text-[#f7f1e5]">
      <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
        <a href="/" className="text-xs font-bold text-[#e9b949]">← MALTY</a>
        <p className="mt-10 text-[10px] font-black tracking-[0.22em] text-[#e9b949]">PROJECT UPDATES</p>
        <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] sm:text-5xl">What changed, clearly.</h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-white/50">A concise public view of material MALTY milestones. Planned work is kept separate from completed work.</p>
        <div className="mt-10 space-y-3">{updates.map(([title, status, text], i) => <article key={title} className="grid gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 sm:grid-cols-[60px_1fr_auto] sm:items-start"><span className="text-xs font-black text-[#e9b949]">0{i + 1}</span><div><h2 className="font-black">{title}</h2><p className="mt-2 text-xs leading-5 text-white/42">{text}</p></div><span className="w-fit rounded-full border border-white/10 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-white/45">{status}</span></article>)}</div>
        <div className="mt-8 flex gap-3"><a href="/transparency" className="text-sm font-bold text-[#e9b949]">Transparency →</a><a href="/docs" className="text-sm font-bold text-white/55">Documentation →</a></div>
      </div>
    </main>
  );
}
