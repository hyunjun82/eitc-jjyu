// app/sitemap.ts
// Cloudflare Pages 빌드 산출물에 들어가도록 force-static 명시.
// 한글 카테고리/슬러그는 encodeURIComponent로 안전 인코딩 (pharm.jjyu.co.kr 패턴 동일).

import type { MetadataRoute } from "next";
import { hubArticles, spokeArticles } from "@/data/articles";
import { forms } from "@/data/forms";

export const dynamic = "force-static";

const BASE_URL = "https://eitc.jjyu.co.kr";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: "2026-02-24",
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/forms`,
      lastModified: "2026-02-25",
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const hubPages: MetadataRoute.Sitemap = Object.values(hubArticles).map(
    (hub) => ({
      url: `${BASE_URL}/${encodeURIComponent(hub.categorySlug)}`,
      lastModified: hub.dateModified,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })
  );

  const spokePages: MetadataRoute.Sitemap = Object.entries(spokeArticles).flatMap(
    ([category, articles]) =>
      Object.values(articles).map((article) => ({
        url: `${BASE_URL}/${encodeURIComponent(category)}/${encodeURIComponent(article.slug)}`,
        lastModified: article.dateModified,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }))
  );

  const formPages: MetadataRoute.Sitemap = forms.map((form) => ({
    url: `${BASE_URL}/forms/${encodeURIComponent(form.id)}`,
    lastModified: "2026-02-25",
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...hubPages, ...spokePages, ...formPages];
}
