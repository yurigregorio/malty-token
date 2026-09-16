"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * A small "i" info button that reveals an explanatory popover on click/tap —
 * not hover-only, so it works the same on touch devices as on desktop.
 */
export function InfoTooltip({ label, children }: { label: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <span className="relative inline-flex shrink-0" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={label}
        aria-expanded={open}
        className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-white/20 text-[9px] font-bold leading-none text-white/45 transition-colors hover:border-[#e9b949]/50 hover:text-[#e9b949]"
      >
        i
      </button>

      {open && (
        // A <span> (not <div>) so this stays valid even when InfoTooltip is
        // used inside a <p> or another inline element — block-level layout
        // comes from the `block` utility instead of the tag itself.
        <span
          role="tooltip"
          className="absolute left-1/2 top-full z-30 mt-2 block w-60 -translate-x-1/2 rounded-lg border border-white/[0.1] bg-[#0c0f13] p-3 text-left text-[11px] font-normal leading-5 text-white/70 shadow-[0_12px_30px_rgba(0,0,0,0.5)]"
        >
          {children}
        </span>
      )}
    </span>
  );
}
