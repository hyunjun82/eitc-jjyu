import { ImageResponse } from "next/og";
import { categories } from "@/data/categories";
import { getSpokeArticle, spokeArticles } from "@/data/articles";

export const dynamic = "force-static";
export const alt = "장려금정보";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  const allParams: { category: string; slug: string }[] = [];
  for (const cat of categories) {
    const articles = spokeArticles[cat.slug];
    if (articles) {
      for (const slug of Object.keys(articles)) {
        allParams.push({ category: cat.slug, slug });
      }
    }
  }
  return allParams;
}

export default async function Image({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const article = getSpokeArticle(category, slug);
  const cat = categories.find((c) => c.slug === category);

  const title = article?.h1 ?? "장려금정보";
  const catName = cat?.name ?? "";
  const icon = cat?.icon ?? "📋";

  // 제목이 길면 줄바꿈 처리를 위해 폰트 크기 조절
  const titleSize = title.length > 25 ? 36 : title.length > 18 ? 42 : 48;

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
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 24,
            }}
          >
            <div style={{ fontSize: 40 }}>{icon}</div>
            <div
              style={{
                fontSize: 24,
                color: "#93c5fd",
                padding: "6px 16px",
                borderRadius: 20,
                border: "1px solid #60a5fa",
              }}
            >
              {catName}
            </div>
          </div>
          <div
            style={{
              fontSize: titleSize,
              fontWeight: 800,
              color: "white",
              textAlign: "center",
              lineHeight: 1.4,
              marginBottom: 24,
              wordBreak: "keep-all",
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginTop: 20,
            }}
          >
            <div
              style={{
                fontSize: 18,
                color: "#bfdbfe",
              }}
            >
              2026 근로장려금 가이드
            </div>
            <div
              style={{
                fontSize: 18,
                color: "#93c5fd",
                padding: "6px 16px",
                borderRadius: 8,
                border: "1px solid #60a5fa",
              }}
            >
              eitc.jjyu.co.kr
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
