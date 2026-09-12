import { ImageResponse } from "next/og";
import { MALTY_TOKEN } from "./lib/malty-token";

export const alt = "MALTY — Small Dog. Big Community.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#080a0d", color: "#f7f1e5", padding: "72px 84px", position: "relative", overflow: "hidden", fontFamily: "sans-serif" }}>
      <div style={{ position: "absolute", width: 620, height: 620, borderRadius: 999, background: "rgba(233,185,73,.16)", right: -160, top: -20 }} />
      <div style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", maxWidth: 660 }}>
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
        <div style={{ display: "flex", width: 340, height: 340, borderRadius: 999, border: "6px solid #b87d21", background: "linear-gradient(135deg, #ffe59a, #d9a53d 55%, #6f4210)", padding: 8, boxShadow: "0 30px 80px rgba(0,0,0,0.45)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={MALTY_TOKEN.imageUri} alt="" width={324} height={324} style={{ borderRadius: 999, objectFit: "cover", border: "4px solid rgba(0,0,0,0.2)" }} />
        </div>
      </div>
    </div>,
    size
  );
}
