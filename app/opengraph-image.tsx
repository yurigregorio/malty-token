import { ImageResponse } from "next/og";

export const alt = "MALTY — Small Dog. Big Community.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#080a0d", color: "#f7f1e5", padding: "72px 84px", position: "relative", overflow: "hidden", fontFamily: "sans-serif" }}>
      <div style={{ position: "absolute", width: 520, height: 520, borderRadius: 999, background: "rgba(233,185,73,.13)", right: -80, top: 55 }} />
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", zIndex: 2 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 58, height: 58, borderRadius: 16, border: "2px solid #e9b949", display: "flex", alignItems: "center", justifyContent: "center", color: "#e9b949", fontSize: 32, fontWeight: 900 }}>M</div>
          <div style={{ fontSize: 30, fontWeight: 900, color: "#e9b949", letterSpacing: -1 }}>MALTY</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 74, lineHeight: 1, fontWeight: 900, letterSpacing: -4 }}>Small Dog.</div>
          <div style={{ fontSize: 74, lineHeight: 1.05, fontWeight: 900, letterSpacing: -4, color: "#e9b949" }}>Big Community.</div>
          <div style={{ marginTop: 28, fontSize: 24, color: "rgba(247,241,229,.62)" }}>Community · Transparency · Positive animal impact</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, color: "rgba(247,241,229,.42)" }}><span>Built on Solana</span><span>Official MALTY project</span></div>
      </div>
    </div>,
    size
  );
}
