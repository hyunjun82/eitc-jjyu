import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "장려금정보 - 2026 근로장려금 신청 가이드";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #3b82f6 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "40px 60px",
            maxWidth: "1000px",
          }}
        >
          <div
            style={{
              fontSize: 64,
              marginBottom: 20,
            }}
          >
            💰
          </div>
          <div
            style={{
              fontSize: 52,
              fontWeight: 800,
              color: "white",
              textAlign: "center",
              lineHeight: 1.3,
              marginBottom: 16,
            }}
          >
            2026 근로장려금
          </div>
          <div
            style={{
              fontSize: 52,
              fontWeight: 800,
              color: "white",
              textAlign: "center",
              lineHeight: 1.3,
              marginBottom: 24,
            }}
          >
            신청 가이드
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#bfdbfe",
              textAlign: "center",
              lineHeight: 1.5,
            }}
          >
            신청자격 · 신청방법 · 지급액 · 신청기간 총정리
          </div>
          <div
            style={{
              marginTop: 40,
              fontSize: 20,
              color: "#93c5fd",
              padding: "8px 24px",
              borderRadius: 8,
              border: "1px solid #60a5fa",
            }}
          >
            eitc.jjyu.co.kr
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
