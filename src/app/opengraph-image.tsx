import { ImageResponse } from "next/og";

import { siteConfig } from "@/data/site";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, #F7F2E6 0%, #E8DCC2 48%, #E0D1AE 100%)",
          color: "#273727",
          position: "relative",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at top right, rgba(255,255,255,0.6), transparent 28%), radial-gradient(circle at bottom left, rgba(60,89,63,0.15), transparent 24%)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "72px 76px",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 999,
                background: "#F7F4E8",
                border: "3px solid rgba(61,87,63,0.16)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 26,
                  height: 40,
                  borderRadius: "40px 40px 48px 48px",
                  background: "#44604A",
                  transform: "rotate(-10deg)",
                }}
              />
            </div>
            <div
              style={{
                fontSize: 28,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                opacity: 0.74,
              }}
            >
              Live Oak Chapter
            </div>
          </div>

          <div style={{ display: "flex", gap: 48 }}>
            <div style={{ maxWidth: 760, display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  fontSize: 76,
                  lineHeight: 1,
                  fontWeight: 700,
                }}
              >
                Native plants for Fayette, Colorado, and Lavaca Counties
              </div>
              <div
                style={{
                  marginTop: 28,
                  fontSize: 32,
                  lineHeight: 1.35,
                  fontFamily: "Arial, sans-serif",
                  opacity: 0.82,
                }}
              >
                Events, field walks, and native plant information from the
                Live Oak Chapter.
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "Arial, sans-serif",
              fontSize: 24,
              opacity: 0.72,
            }}
          >
            <div>{siteConfig.domain}</div>
            <div>Native Plant Society of Texas</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
