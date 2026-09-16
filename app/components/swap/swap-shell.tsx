/** The bordered card frame shared by every state of `<MaltySwap />`. */
export function SwapShell({ shell, children }: { shell: "full" | "compact"; children: React.ReactNode }) {
  return (
    <div
      className={
        shell === "full"
          ? "mx-auto w-full rounded-2xl border border-white/[0.08] bg-[#0c0f13] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.4)] sm:p-5"
          : "w-full rounded-2xl border border-white/[0.08] bg-[#0c0f13] p-3.5"
      }
    >
      {children}
    </div>
  );
}
