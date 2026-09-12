import { ImageResponse } from "next/og";
import { MALTY_TOKEN } from "./lib/malty-token";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#080a0d" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={MALTY_TOKEN.imageUri} alt="" width={180} height={180} style={{ objectFit: "cover" }} />
      </div>
    ),
    size
  );
}
