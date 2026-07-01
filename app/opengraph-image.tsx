import { ImageResponse } from "next/og";

// Brutalist link-preview card. Invisible on the site itself — this only
// controls what shows when the URL is shared (LinkedIn / WhatsApp / X / Slack).
// Edge runtime avoids the node font-path bug during static export on Windows.
export const runtime = "edge";
export const alt = "Dev Rajput — AI Operations & Automation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  const YELLOW = "#f5d000";
  const BLACK = "#0a0a0a";
  const PAPER = "#fffef5";
  const RED = "#ff2e2e";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: YELLOW,
          padding: 48,
          fontFamily: "sans-serif",
        }}
      >
        {/* inner hard border */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: `10px solid ${BLACK}`,
            padding: "40px 48px",
          }}
        >
          {/* top row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: 2,
              color: BLACK,
            }}
          >
            <div style={{ display: "flex" }}>
              <span style={{ color: RED }}>//</span>
              <span style={{ marginLeft: 10 }}>BUILDING IN PUBLIC</span>
            </div>
            <div style={{ display: "flex" }}>IST · INDIA · GLOBAL</div>
          </div>

          {/* headline */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 150,
                fontWeight: 900,
                lineHeight: 0.9,
                letterSpacing: -4,
                color: BLACK,
                display: "flex",
              }}
            >
              DEV RAJPUT
            </div>
            <div
              style={{
                marginTop: 18,
                alignSelf: "flex-start",
                background: BLACK,
                color: YELLOW,
                fontSize: 76,
                fontWeight: 900,
                letterSpacing: -2,
                padding: "6px 22px",
                display: "flex",
              }}
            >
              NOW I BUILD.
            </div>
          </div>

          {/* bottom row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              fontSize: 26,
              fontWeight: 700,
              color: BLACK,
            }}
          >
            <div style={{ display: "flex", maxWidth: 720 }}>
              AI Operations &amp; Automation — agents, workflows, systems from scratch.
            </div>
            <div
              style={{
                display: "flex",
                background: RED,
                color: PAPER,
                padding: "8px 16px",
                fontSize: 22,
                letterSpacing: 1,
              }}
            >
              PYTHON · N8N · CLAUDE
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
