export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#080a0d] px-5 text-[#f7f1e5]">
      <div className="max-w-xl text-center">
        <p className="text-[10px] font-black tracking-[0.24em] text-[#e9b949]">404 · MALTY</p>
        <h1 className="mt-4 text-4xl font-black tracking-[-0.05em] sm:text-6xl">This page wandered off.</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/45">The page you requested does not exist or may have moved. The MALTY project pages are still available below.</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a href="/" className="rounded-xl bg-[#e9b949] px-4 py-2.5 text-sm font-black text-black">Back to MALTY</a>
          <a href="/transparency" className="rounded-xl border border-white/12 px-4 py-2.5 text-sm font-bold">Transparency</a>
          <a href="/gives" className="rounded-xl border border-white/12 px-4 py-2.5 text-sm font-bold">MALTY Gives</a>
        </div>
      </div>
    </main>
  );
}
