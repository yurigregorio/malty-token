const docs = [
  ["Transparency", "Verified token facts, allocation and reserve-state rules.", "/transparency"],
  ["MALTY Gives", "Planned animal-welfare initiative and activation standard.", "/gives"],
  ["Tokenomics", "Canonical allocation: 50 / 20 / 15 / 7.5 / 7.5.", "/transparency"],
  ["Change history", "Material project milestones and transparency changes.", "/updates"],
] as const;

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-[#080a0d] text-[#f7f1e5]">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
        <a href="/" className="text-xs font-bold text-[#e9b949]">← MALTY</a>
        <p className="mt-10 text-[10px] font-black tracking-[0.22em] text-[#e9b949]">PUBLIC DOCUMENTATION</p>
        <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] sm:text-5xl">Understand the project.</h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-white/50">A simpler public layer for MALTY's most important project information. Technical repository records remain the deeper source of truth.</p>
        <div className="mt-10 grid gap-3 sm:grid-cols-2">{docs.map(([title, text, href]) => <a key={title} href={href} className="group rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition hover:border-[#e9b949]/35"><p className="font-black group-hover:text-[#e9b949]">{title} →</p><p className="mt-2 text-xs leading-5 text-white/42">{text}</p></a>)}</div>
        <div className="mt-10 rounded-2xl border border-white/[0.08] p-5 text-xs leading-5 text-white/40"><strong className="text-white/70">Documentation principle:</strong> completed and verifiable facts should be presented as facts; future intentions should remain explicitly labeled as planned.</div>
      </div>
    </main>
  );
}
