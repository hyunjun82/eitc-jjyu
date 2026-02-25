import { NextResponse } from "next/server";
import { spokeArticles } from "@/data/articles";
import { categories } from "@/data/categories";

const INDEXNOW_KEY = "a25a1b18bb53441eba59208907f5eb45";
const SITE_HOST = "eitc.jjyu.co.kr";
const SITE_URL = `https://${SITE_HOST}`;

function getAllUrls(): string[] {
  const urls: string[] = [
    SITE_URL,
    `${SITE_URL}/about`,
    `${SITE_URL}/서식다운로드`,
  ];

  for (const cat of categories) {
    urls.push(`${SITE_URL}/${cat.slug}`);
  }

  for (const [catSlug, spokes] of Object.entries(spokeArticles)) {
    for (const spokeSlug of Object.keys(spokes)) {
      urls.push(`${SITE_URL}/${catSlug}/${spokeSlug}`);
    }
  }

  return urls;
}

export async function POST() {
  const urlList = getAllUrls();

  const results: { engine: string; status: string }[] = [];

  // Submit to IndexNow (covers Bing, Naver, Yandex, etc.)
  for (const engine of [
    "https://api.indexnow.org/indexnow",
    "https://www.bing.com/indexnow",
  ]) {
    try {
      const res = await fetch(engine, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          host: SITE_HOST,
          key: INDEXNOW_KEY,
          keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
          urlList,
        }),
      });
      results.push({ engine, status: `${res.status} ${res.statusText}` });
    } catch (e) {
      results.push({
        engine,
        status: `error: ${e instanceof Error ? e.message : "unknown"}`,
      });
    }
  }

  return NextResponse.json({
    submitted: urlList.length,
    urls: urlList,
    results,
  });
}
