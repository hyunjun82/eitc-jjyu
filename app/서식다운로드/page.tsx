import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, FileText, ArrowLeft, Download } from "lucide-react";
import { CalculatorCTA } from "@/components/CalculatorCTA";
import { AdUnit } from "@/components/AdUnit";
import { forms } from "@/data/forms";

export const metadata: Metadata = {
  title: "근로장려금 서식 다운로드 | 신청서·확인서·이의신청서 양식",
  description:
    "국세청 공식 근로장려금·자녀장려금 서식을 다운로드하세요. 신청서, 신청 확인서, 이의신청서, 환급계좌 변경 신고서 양식을 제공해요.",
  alternates: {
    canonical: "https://eitc.jjyu.co.kr/서식다운로드",
  },
};

export default function FormsDownloadPage() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-3xl px-4 py-3">
          <nav className="flex items-center gap-1 text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600">
              홈
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gray-900">서식 다운로드</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="border-b bg-gradient-to-b from-blue-50 to-white">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
            근로장려금 서식 다운로드
          </h1>
          <p className="mt-3 text-base text-gray-500 leading-relaxed sm:text-lg">
            국세청 공식 근로장려금·자녀장려금 관련 서식을 다운로드하세요.
            세무서 방문 신청이나 이의신청 시 필요한 양식을 제공해요.
          </p>
          <CalculatorCTA />
        </div>
      </section>

      {/* Forms list */}
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="space-y-4">
          {forms.map((form) => (
            <Link
              key={form.id}
              href={`/서식다운로드/${form.id}`}
              className="group block rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-blue-300 hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100">
                  <FileText className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {form.title}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                    {form.description}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                      {form.fileName}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-blue-600 font-medium">
                      <Download className="h-3 w-3" />
                      다운로드 페이지로 이동
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <AdUnit slot="1370939604" />

        {/* Notice */}
        <div className="mt-8 rounded-lg bg-amber-50 border border-amber-200 p-4">
          <p className="text-sm text-amber-800 leading-relaxed">
            <strong>안내:</strong> 모든 서식은 국세청(NTS) 공식 자료를
            기반으로 제공돼요. 서식 내용이 변경될 수 있으므로, 신청 전
            국세청 홈택스에서 최신 서식을 확인하는 것을 권장해요.
          </p>
        </div>

        {/* Back link */}
        <div className="py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />홈으로 돌아가기
          </Link>
        </div>
      </div>

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "근로장려금 서식 다운로드",
            description:
              "국세청 공식 근로장려금·자녀장려금 서식을 다운로드하세요.",
            url: "https://eitc.jjyu.co.kr/서식다운로드",
            mainEntity: {
              "@type": "ItemList",
              itemListElement: forms.map((form, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: form.title,
                description: form.description,
                url: `https://eitc.jjyu.co.kr/서식다운로드/${form.id}`,
              })),
            },
          }),
        }}
      />
    </>
  );
}
