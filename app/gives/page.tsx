export default function GivesPage() {
  return (
    <main className="min-h-screen bg-[#080a0d] text-[#f7f1e5]">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
        <a href="/" className="text-xs font-bold text-[#e9b949]">← MALTY</a>
        <div className="mt-10 inline-flex rounded-full border border-[#e9b949]/20 bg-[#e9b949]/[0.05] px-3 py-1.5 text-[10px] font-black tracking-[0.18em] text-[#e9b949]">🐾 PLANNED INITIATIVE</div>
        <h1 className="mt-5 text-4xl font-black tracking-[-0.05em] sm:text-6xl">MALTY Gives.</h1>
        <p className="mt-4 max-w-2xl text-lg font-bold">Small Dog. Bigger Impact.</p>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-white/50">MALTY Gives is the project's planned animal-welfare initiative. The goal is simple: when the program becomes active, make every initiative understandable, documented and verifiable.</p>

        <section className="mt-10 grid gap-3 sm:grid-cols-3">
          <Card n="01" title="Select responsibly" text="Support identifiable organizations or projects with a clear animal-welfare purpose." />
          <Card n="02" title="Contribute clearly" text="State what was contributed, when, why and to whom." />
          <Card n="03" title="Publish evidence" text="Provide suitable proof and public blockchain references when applicable." />
        </section>

        <section className="mt-10 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6">
          <p className="text-[10px] font-black tracking-[0.2em] text-[#e9b949]">ACTIVATION STANDARD</p>
          <h2 className="mt-2 text-2xl font-black">Policy before promises.</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/48">Before this initiative is marked Active, MALTY intends to publish its funding model, beneficiary selection criteria, evidence format and first identified initiative. There is currently no active donation program and no fixed contribution amount or percentage.</p>
        </section>

        <section className="mt-10 grid gap-3 sm:grid-cols-2">
          <Info title="Independent from token performance" text="MALTY Gives is not presented as a reason to expect token price appreciation, returns or guaranteed demand." />
          <Info title="Public reporting" text="Completed initiatives should identify the beneficiary, purpose, date, contribution, status and suitable evidence." />
        </section>

        <div className="mt-10 flex flex-wrap gap-3"><a href="/transparency" className="rounded-xl bg-[#e9b949] px-4 py-2.5 text-sm font-black text-black">Transparency center</a><a href="/docs" className="rounded-xl border border-white/12 px-4 py-2.5 text-sm font-bold">Public documentation</a></div>
      </div>
    </main>
  );
}

function Card({ n, title, text }: { n: string; title: string; text: string }) { return <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5"><p className="text-[10px] font-black text-[#e9b949]">{n}</p><p className="mt-5 font-black">{title}</p><p className="mt-2 text-xs leading-5 text-white/42">{text}</p></div>; }
function Info({ title, text }: { title: string; text: string }) { return <div className="rounded-2xl border border-[#e9b949]/15 bg-[#e9b949]/[0.035] p-5"><p className="text-sm font-black text-[#e9b949]">{title}</p><p className="mt-2 text-xs leading-5 text-white/45">{text}</p></div>; }
