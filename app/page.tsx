import Link from "next/link";
import { EITCCalculator } from "@/components/EITCCalculator";
import { CategoryCard } from "@/components/CategoryCard";
import { categories } from "@/data/categories";
import { hubArticles } from "@/data/articles";
import { Landmark, Calculator, CalendarCheck } from "lucide-react";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="border-b bg-gradient-to-b from-blue-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:py-20">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-1.5 text-sm text-blue-700 mb-6">
            <Landmark className="h-3.5 w-3.5" />
            2026년 최신 기준 반영
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            2026 근로장려금 신청 가이드
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-500 sm:text-lg">
            근로장려금 신청자격, 신청방법, 지급액, 신청기간을 한눈에 확인하세요.
            자녀장려금 정보도 함께 제공합니다.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-xl font-bold text-gray-900 mb-8">
          카테고리별 가이드
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((cat) => {
            const hub = hubArticles[cat.slug];
            if (!hub) return null;
            return (
              <CategoryCard
                key={cat.slug}
                category={{ ...cat, count: hub.spokes.length }}
              />
            );
          })}
        </div>
      </section>

      {/* EITC Calculator */}
      <EITCCalculator />

      {/* Quick Info Section */}
      <section className="border-t bg-gray-50/50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            2026년 근로장려금 핵심 요약
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Calculator className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-gray-900">가구유형별 최대 지급액</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex justify-between">
                  <span>단독가구</span>
                  <span className="font-bold text-blue-600">최대 165만원</span>
                </li>
                <li className="flex justify-between">
                  <span>홑벌이가구</span>
                  <span className="font-bold text-blue-600">최대 285만원</span>
                </li>
                <li className="flex justify-between">
                  <span>맞벌이가구</span>
                  <span className="font-bold text-blue-600">최대 330만원</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <CalendarCheck className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-gray-900">2026년 신청 일정</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex justify-between">
                  <span>반기 신청 (하반기)</span>
                  <span className="font-semibold">3월 1일 ~ 16일</span>
                </li>
                <li className="flex justify-between">
                  <span>정기 신청</span>
                  <span className="font-semibold">5월 1일 ~ 6월 2일</span>
                </li>
                <li className="flex justify-between">
                  <span>기한후 신청</span>
                  <span className="font-semibold">6월 3일 ~ 12월 1일</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Landmark className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-gray-900">핵심 자격 요건</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex justify-between">
                  <span>재산 기준</span>
                  <span className="font-semibold">2억 4천만원 미만</span>
                </li>
                <li className="flex justify-between">
                  <span>소득 기준</span>
                  <span className="font-semibold">가구유형별 상이</span>
                </li>
                <li className="flex justify-between">
                  <span>신청 대상</span>
                  <span className="font-semibold">근로·사업·종교인 소득</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Info Banner */}
      <section className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-12 text-center">
          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-8">
            <h2 className="text-lg font-bold text-blue-900">
              근로장려금, 놓치지 마세요
            </h2>
            <p className="mt-2 text-sm text-blue-700">
              매년 수백만 가구가 신청하는 근로장려금. 자격이 되는데 모르고 지나치는 분들이 많아요.
              지금 바로 자격 요건을 확인해 보세요.
            </p>
          </div>
        </div>
      </section>
      {/* WebApplication schema - 계산기 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "근로·자녀장려금 모의계산기",
            description:
              "2026년 근로장려금, 자녀장려금 예상 지급액을 간편하게 계산해 보세요.",
            url: "https://eitc.jjyu.co.kr/#calculator",
            applicationCategory: "FinanceApplication",
            operatingSystem: "All",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "KRW",
            },
          }),
        }}
      />

      {/* BreadcrumbList schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "홈",
                item: "https://eitc.jjyu.co.kr",
              },
            ],
          }),
        }}
      />
    </>
  );
}
