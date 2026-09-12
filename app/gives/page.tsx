const steps = [
  ["01", "Community surfaces", "Community members can help identify animal-welfare organizations, shelters and initiatives worth reviewing."],
  ["02", "Project reviews", "MALTY applies published eligibility and evidence criteria before any initiative is selected."],
  ["03", "Support is documented", "When the program becomes active, each completed initiative should state the beneficiary, purpose, date and contribution."],
  ["04", "Impact is proven", "Suitable evidence and public references are published so the community can verify what actually happened."],
] as const;

const phases = [
  ["PLANNED", "Policy & criteria", "Funding model, eligibility and reporting rules are published before activation."],
  ["NEXT", "First initiative", "A first beneficiary or initiative is identified only after it meets the published standard."],
  ["FUTURE", "Verified impact", "Completed actions appear in a public impact record with evidence."],
] as const;

export default function GivesPage() {
  return (
    <main className="min-h-screen bg-[#080a0d] text-[#f7f1e5]">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
        <a href="/" className="text-xs font-bold text-[#e9b949]">← MALTY</a>
        <div className="mt-10 inline-flex rounded-full border border-[#e9b949]/20 bg-[#e9b949]/[0.05] px-3 py-1.5 text-[10px] font-black tracking-[0.18em] text-[#e9b949]">🐾 PLANNED INITIATIVE</div>
        <h1 className="mt-5 text-4xl font-black tracking-[-0.05em] sm:text-6xl">Community-powered.<br/>Pet-focused.</h1>
        <p className="mt-5 max-w-2xl text-sm leading-6 text-white/52">MALTY Gives is being designed as the real-world impact layer of the MALTY project. Its long-term mission is to connect community participation with transparent, verifiable support for animal-welfare initiatives.</p>

        <section className="mt-10 rounded-3xl border border-[#e9b949]/20 bg-[#e9b949]/[0.045] p-6 sm:p-8">
          <p className="text-[10px] font-black tracking-[0.22em] text-[#e9b949]">THE MODEL</p>
          <p className="mt-3 max-w-3xl text-2xl font-black leading-9">MALTY Community → MALTY Gives → Pet initiatives → Verifiable impact.</p>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/45">The objective is not to make vague claims about helping animals. The objective is to build a repeatable process where initiatives can be identified, reviewed, supported and publicly documented.</p>
        </section>

        <section className="mt-10"><p className="text-[10px] font-black tracking-[0.2em] text-[#e9b949]">PUBLIC PATH</p><h2 className="mt-2 text-2xl font-black">Planned → First initiative → Verified impact.</h2><div className="mt-5 grid gap-3 sm:grid-cols-3">{phases.map(([state,title,text])=><Phase key={state} state={state} title={title} text={text}/>)}</div></section>

        <section className="mt-10 grid gap-3 sm:grid-cols-2">
          {steps.map(([n, title, text]) => <Step key={n} n={n} title={title} text={text} />)}
        </section>

        <section className="mt-10 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6">
          <p className="text-[10px] font-black tracking-[0.2em] text-[#e9b949]">ACTIVATION STANDARD</p>
          <h2 className="mt-2 text-2xl font-black">Policy before the first initiative.</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/48">Before MALTY Gives is marked Active, the project intends to publish a funding model, beneficiary selection criteria, reporting requirements and the first identified initiative. There is currently no active donation program and no fixed contribution amount or percentage.</p>
        </section>

        <section className="mt-10 grid gap-3 sm:grid-cols-3">
          <Info title="Community participation" text="Create a clear way for the community to suggest credible animal-welfare initiatives for review." />
          <Info title="Transparent selection" text="Publish what qualifies, what does not qualify and why an initiative was selected." />
          <Info title="Impact record" text="Once real actions exist, publish beneficiaries, dates, contributions, status and suitable evidence." />
        </section>

        <section className="mt-10 rounded-2xl border border-white/[0.08] p-5">
          <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-sm font-black text-white/80">Current status</p><p className="mt-1 text-[10px] font-black tracking-[0.16em] text-[#e9b949]">LAST PUBLIC REVIEW · 12 SEP 2026</p></div><span className="rounded-full border border-[#e9b949]/20 bg-[#e9b949]/[0.05] px-3 py-1 text-[9px] font-black text-[#e9b949]">PLANNED</span></div>
          <p className="mt-3 text-xs leading-5 text-white/42">No organization is currently presented as a beneficiary, no contribution has been claimed, and no future amount is guaranteed. The public record should only change after real, documented activity exists.</p>
        </section>

        <div className="mt-10 flex flex-wrap gap-3"><a href="/transparency" className="rounded-xl bg-[#e9b949] px-4 py-2.5 text-sm font-black text-black">Transparency center</a><a href="/updates" className="rounded-xl border border-white/12 px-4 py-2.5 text-sm font-bold">Project updates</a><a href="/docs" className="rounded-xl border border-white/12 px-4 py-2.5 text-sm font-bold">Public documentation</a></div>
      </div>
    </main>
  );
}

function Phase({state,title,text}:{state:string;title:string;text:string}){return <div className="rounded-2xl border border-[#e9b949]/15 bg-[#e9b949]/[0.035] p-5"><p className="text-[9px] font-black tracking-wider text-[#e9b949]">{state}</p><p className="mt-3 font-black">{title}</p><p className="mt-2 text-xs leading-5 text-white/42">{text}</p></div>}
function Step({ n, title, text }: { n: string; title: string; text: string }) { return <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5"><p className="text-[10px] font-black text-[#e9b949]">{n}</p><p className="mt-5 font-black">{title}</p><p className="mt-2 text-xs leading-5 text-white/42">{text}</p></div>; }
function Info({ title, text }: { title: string; text: string }) { return <div className="rounded-2xl border border-[#e9b949]/15 bg-[#e9b949]/[0.035] p-5"><p className="text-sm font-black text-[#e9b949]">{title}</p><p className="mt-2 text-xs leading-5 text-white/45">{text}</p></div>; }
