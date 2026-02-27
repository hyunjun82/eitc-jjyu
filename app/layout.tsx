import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "장려금정보 - 2026 근로장려금 신청 가이드",
    template: "%s | 장려금정보",
  },
  description:
    "2026년 근로장려금 신청자격, 신청방법, 지급액, 신청기간 총정리. 자녀장려금까지 한눈에 확인하세요.",
  keywords: ["근로장려금", "자녀장려금", "근로장려금 신청", "근로장려금 자격", "근로장려금 지급액", "홈택스"],
  verification: {
    google: "kPe6sAN7cMBDG2OVVWHcI8hH-BxkT5Zv6U8TVWTxuwI",
    other: {
      "naver-site-verification": ["1a137c99b52a6ecfcf48b61cc20c5cd3f06c08b5"],
    },
  },
  openGraph: {
    title: "장려금정보 - 2026 근로장려금 신청 가이드",
    description:
      "2026년 근로장려금 신청자격, 신청방법, 지급액, 신청기간 총정리. 자녀장려금까지 한눈에 확인하세요.",
    url: "https://eitc.jjyu.co.kr",
    siteName: "장려금정보",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "장려금정보 - 2026 근로장려금 신청 가이드",
    description:
      "2026년 근로장려금 신청자격, 신청방법, 지급액, 신청기간 총정리. 자녀장려금까지 한눈에 확인하세요.",
  },
  alternates: {
    canonical: "https://eitc.jjyu.co.kr",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
      </head>
      <body
        className="font-sans antialiased"
        style={{ fontFamily: "'Noto Sans KR', sans-serif" }}
      >
        <Header />
        <main className="min-h-[calc(100vh-140px)]">{children}</main>
        <Footer />

        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2442517902625121"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "장려금정보",
              url: "https://eitc.jjyu.co.kr",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://eitc.jjyu.co.kr/search?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "장려금정보",
              url: "https://eitc.jjyu.co.kr",
              description:
                "국세청 홈택스 기반 근로장려금·자녀장려금 정보 플랫폼. 신청자격, 신청방법, 지급액, 신청기간 정보를 제공합니다.",
              sameAs: [],
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "장려금 에디터",
              url: "https://eitc.jjyu.co.kr/about",
              jobTitle: "금융·세무 콘텐츠 에디터",
              description:
                "국세청 홈택스 공식 자료를 기반으로 근로장려금, 자녀장려금 정보를 전문적으로 분석하고 전달하는 에디터",
              worksFor: {
                "@type": "Organization",
                name: "장려금정보",
                url: "https://eitc.jjyu.co.kr",
              },
              knowsAbout: [
                "근로장려금 신청자격",
                "근로장려금 지급액 계산",
                "자녀장려금",
                "홈택스 신청방법",
                "양도소득세",
                "종합부동산세",
                "취득세",
                "퇴직금",
                "연말정산",
                "원천징수",
                "4대보험",
                "국민연금",
                "실업급여",
                "주택연금",
                "전세자금대출",
              ],
              sameAs: ["https://eitc.jjyu.co.kr/about"],
            }),
          }}
        />
      </body>
    </html>
  );
}
