export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#080a0d] text-[#f7f1e5]">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
        <a href="/" className="text-xs font-bold text-[#e9b949]">← MALTY</a>
        <p className="mt-10 text-[10px] font-black tracking-[0.22em] text-[#e9b949]">ABOUT MALTY</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-[-0.05em] sm:text-6xl">One project. One token. One identity.</h1>
        <p className="mt-5 max-w-2xl text-sm leading-6 text-white/52">MALTY is a community-driven memecoin built on Solana. The project combines a simple token structure with a recognizable identity, public documentation and a long-term mission to create positive impact for animals.</p>
        <section className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><Pillar title="Transparency" text="Separate verified facts from future plans."/><Pillar title="Identity" text="MALTY is the project, brand and token."/><Pillar title="Community" text="Build an open project people can understand."/><Pillar title="Impact" text="Develop MALTY Gives responsibly before activation."/></section>
        <section className="mt-10 rounded-2xl border border-[#e9b949]/20 bg-[#e9b949]/[0.04] p-6"><p className="text-[10px] font-black tracking-[0.2em] text-[#e9b949]">PROJECT PRINCIPLE</p><p className="mt-3 max-w-3xl text-xl font-black leading-8">Publish what can be verified. Clearly label what is planned. Never turn future intentions into present claims.</p></section>
        <div className="mt-10 flex flex-wrap gap-3"><a href="/transparency" className="rounded-xl bg-[#e9b949] px-4 py-2.5 text-sm font-black text-black">Transparency center</a><a href="/gives" className="rounded-xl border border-white/12 px-4 py-2.5 text-sm font-bold">MALTY Gives</a><a href="/docs" className="rounded-xl border border-white/12 px-4 py-2.5 text-sm font-bold">Documentation</a></div>
      </div>
    </main>
  );
}
function Pillar({title,text}:{title:string;text:string}){return <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5"><p className="font-black text-[#e9b949]">{title}</p><p className="mt-2 text-xs leading-5 text-white/42">{text}</p></div>}
