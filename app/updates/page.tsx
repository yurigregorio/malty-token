const updates = [
  ["2026-09", "Foundation", "Completed", "MALTY deployed on Solana Mainnet with a fixed 1B supply, 6 decimals and no Freeze Authority."],
  ["2026-09", "Supply security", "Completed", "Mint Authority permanently revoked. Application creation and authority-changing actions are locked for Mainnet."],
  ["2026-09", "Transparency", "Published", "Canonical tokenomics, reserve architecture, allocation policies and reconciliation rules documented."],
  ["2026-09", "Public project identity", "Published", "MALTY established as the sole project, token and brand identity, with public About, Documentation and Transparency pages."],
  ["2026-09", "MALTY Gives policy", "Published", "A policy-first animal-welfare initiative framework was published before any active contribution program exists."],
  ["2026-09", "Public trust layer", "Published", "Project status, visible tokenomics, project stewardship and a public impact path were added to the website."],
] as const;

export default function UpdatesPage() {
  return (
    <main className="min-h-screen bg-[#080a0d] text-[#f7f1e5]">
      <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
        <a href="/" className="text-xs font-bold text-[#e9b949]">← MALTY</a>
        <p className="mt-10 text-[10px] font-black tracking-[0.22em] text-[#e9b949]">PUBLIC CHANGELOG</p>
        <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] sm:text-5xl">What changed, clearly.</h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-white/50">Material MALTY milestones are recorded here so completed work, published policies and planned work remain distinguishable.</p>
        <div className="mt-6 rounded-2xl border border-[#e9b949]/15 bg-[#e9b949]/[0.035] p-4"><p className="text-[10px] font-black tracking-[0.18em] text-[#e9b949]">LAST PUBLIC REVIEW</p><p className="mt-1 text-sm font-black">12 September 2026</p></div>
        <div className="mt-8 space-y-3">{updates.map(([date,title,status,text], i) => <article key={title} className="grid gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 sm:grid-cols-[72px_1fr_auto] sm:items-start"><div><span className="text-xs font-black text-[#e9b949]">0{i + 1}</span><p className="mt-1 text-[9px] text-white/28">{date}</p></div><div><h2 className="font-black">{title}</h2><p className="mt-2 text-xs leading-5 text-white/42">{text}</p></div><span className="w-fit rounded-full border border-white/10 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-white/45">{status}</span></article>)}</div>
        <section className="mt-10 rounded-2xl border border-white/[0.08] p-5"><p className="text-[10px] font-black tracking-[0.18em] text-[#e9b949]">CHANGE RULE</p><p className="mt-3 text-sm leading-6 text-white/48">Future intentions are not listed as completed milestones. Material changes to project structure, public policies or MALTY Gives should be reflected here after they are actually published or completed.</p></section>
        <div className="mt-8 flex flex-wrap gap-3"><a href="/transparency" className="text-sm font-bold text-[#e9b949]">Transparency →</a><a href="/about" className="text-sm font-bold text-white/55">About →</a><a href="/docs" className="text-sm font-bold text-white/55">Documentation →</a></div>
      </div>
    </main>
  );
}
