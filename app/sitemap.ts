import type { MetadataRoute } from "next";
import { hubArticles, spokeArticles } from "@/data/articles";
import { forms } from "@/data/forms";

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
      url: `${BASE_URL}/${encodeURIComponent("서식다운로드")}`,
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
    url: `${BASE_URL}/${encodeURIComponent("서식다운로드")}/${form.id}`,
    lastModified: "2026-02-25",
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...hubPages, ...spokePages, ...formPages];
}
