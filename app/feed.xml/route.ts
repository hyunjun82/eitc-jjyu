import { hubArticles, spokeArticles } from "@/data/articles";

const BASE_URL = "https://eitc.jjyu.co.kr";

export async function GET() {
  const allItems: { title: string; url: string; description: string; date: string }[] = [];

  for (const hub of Object.values(hubArticles)) {
    allItems.push({
      title: hub.title,
      url: `${BASE_URL}/${hub.categorySlug}`,
      description: hub.metaDescription,
      date: hub.dateModified || hub.datePublished || "2026-02-24",
    });
  }

  for (const [category, articles] of Object.entries(spokeArticles)) {
    for (const article of Object.values(articles)) {
      allItems.push({
        title: article.title,
        url: `${BASE_URL}/${category}/${article.slug}`,
        description: article.metaDescription,
        date: article.dateModified || article.datePublished || "2026-02-24",
      });
    }
  }

  allItems.sort((a, b) => b.date.localeCompare(a.date));

  const escapeXml = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  const rssItems = allItems
    .map(
      (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${item.url}</link>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${new Date(item.date).toUTCString()}</pubDate>
    </item>`
    )
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>장려금정보 - 2026 근로장려금 신청 가이드</title>
    <link>${BASE_URL}</link>
    <description>2026년 근로장려금 신청자격, 신청방법, 지급액, 신청기간 총정리. 자녀장려금까지 한눈에 확인하세요.</description>
    <language>ko</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${rssItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
