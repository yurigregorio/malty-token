export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#080a0d] text-[#f7f1e5]">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
        <a href="/" className="text-xs font-bold text-[#e9b949]">← MALTY</a>
        <p className="mt-10 text-[10px] font-black tracking-[0.22em] text-[#e9b949]">ABOUT MALTY</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-[-0.05em] sm:text-6xl">A community built with a purpose.</h1>
        <p className="mt-5 max-w-2xl text-sm leading-6 text-white/52">MALTY is a community-driven project built on Solana. It connects a transparent digital token, a recognizable identity, an open community and a long-term mission to create positive, verifiable impact for animals through MALTY Gives.</p>

        <section className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><Pillar title="Transparency" text="Separate verified facts from future plans."/><Pillar title="Community" text="Give people a clear role in helping surface meaningful initiatives."/><Pillar title="Pet impact" text="Make animal welfare a visible part of the MALTY mission."/><Pillar title="Proof" text="Publish evidence only after real actions happen."/></section>

        <section className="mt-10 rounded-2xl border border-[#e9b949]/20 bg-[#e9b949]/[0.04] p-6"><p className="text-[10px] font-black tracking-[0.2em] text-[#e9b949]">PROJECT MISSION</p><p className="mt-3 max-w-3xl text-xl font-black leading-8">Grow a transparent community. Build a responsible impact program. Turn completed animal-welfare initiatives into a public record anyone can verify.</p></section>

        <section className="mt-10 grid gap-3 sm:grid-cols-3"><Flow n="01" title="Community" text="Build participation around a shared project identity."/><Flow n="02" title="MALTY Gives" text="Review and support selected pet and animal-welfare initiatives once the program is active."/><Flow n="03" title="Impact" text="Report completed actions with suitable public evidence."/></section>

        <div className="mt-10 flex flex-wrap gap-3"><a href="/gives" className="rounded-xl bg-[#e9b949] px-4 py-2.5 text-sm font-black text-black">Explore MALTY Gives</a><a href="/transparency" className="rounded-xl border border-white/12 px-4 py-2.5 text-sm font-bold">Transparency center</a><a href="/docs" className="rounded-xl border border-white/12 px-4 py-2.5 text-sm font-bold">Documentation</a></div>
      </div>
    </main>
  );
}
function Pillar({title,text}:{title:string;text:string}){return <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5"><p className="font-black text-[#e9b949]">{title}</p><p className="mt-2 text-xs leading-5 text-white/42">{text}</p></div>}
function Flow({n,title,text}:{n:string;title:string;text:string}){return <div className="rounded-2xl border border-white/[0.08] p-5"><p className="text-[10px] font-black text-[#e9b949]">{n}</p><p className="mt-4 font-black">{title}</p><p className="mt-2 text-xs leading-5 text-white/42">{text}</p></div>}
