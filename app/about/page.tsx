import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Landmark,
  ShieldCheck,
  FileText,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { categories } from "@/data/categories";

export const metadata: Metadata = {
  title: "장려금 에디터 소개",
  description:
    "장려금 에디터의 프로필, 콘텐츠 작성 방법론, 데이터 출처를 소개합니다. 국세청 홈택스 기반으로 정확한 근로장려금 정보를 전달합니다.",
};

export default function AboutPage() {
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
            <span className="text-gray-900 font-medium">작성자 소개</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="border-b bg-gradient-to-b from-blue-50 to-white">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <Landmark className="h-10 w-10" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900">
                장려금 에디터
              </h1>
              <p className="mt-1 text-base text-gray-500">
                세금·복지 정보 전문 에디터
              </p>
              <Badge className="mt-2 bg-blue-600 text-white hover:bg-blue-600">
                국세청 홈택스 기반 콘텐츠
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="mx-auto max-w-3xl px-4 py-10 space-y-10">
        {/* 소개 */}
        <section>
          <div className="flex items-center gap-2.5 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 text-blue-500">
              <BookOpen className="h-4.5 w-4.5" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">소개</h2>
          </div>
          <div className="text-[15px] text-gray-600 leading-[1.85] pl-[42px] space-y-3">
            <p>
              장려금 에디터는 근로장려금과 자녀장려금에 대한 정확하고 이해하기 쉬운
              정보를 제공하기 위해 국세청 홈택스의 공식 자료를 활용하여 콘텐츠를
              작성합니다.
            </p>
            <p>
              신청자격, 신청방법, 지급액, 신청기간 등 근로장려금의 모든 정보를
              다루고 있으며, 복잡한 세금 용어를 일반인이 이해할 수 있는 쉬운 말로
              풀어서 전달합니다.
            </p>
          </div>
        </section>

        <Separator />

        {/* 방법론 */}
        <section>
          <div className="flex items-center gap-2.5 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 text-blue-500">
              <FileText className="h-4.5 w-4.5" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">
              콘텐츠 작성 방법론
            </h2>
          </div>
          <div className="text-[15px] text-gray-600 leading-[1.85] pl-[42px] space-y-3">
            <p>모든 근로장려금 정보는 다음 프로세스를 거쳐 작성됩니다.</p>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                <strong>공식 자료 수집</strong> — 국세청 홈택스, 법령정보센터에서
                최신 세법 데이터를 수집합니다.
              </li>
              <li>
                <strong>교차 검증</strong> — 기획재정부 보도자료, 국세상담센터
                답변 등과 교차 확인합니다.
              </li>
              <li>
                <strong>전문 용어 풀이</strong> — 세법 용어를 일반인이 이해할 수
                있는 쉬운 표현으로 변환합니다.
              </li>
              <li>
                <strong>구조화 작성</strong> — 자격요건, 신청방법, 지급액 순서로
                체계적으로 작성합니다.
              </li>
              <li>
                <strong>연도별 업데이트</strong> — 매년 세법 개정 사항을 반영하여
                콘텐츠를 업데이트합니다.
              </li>
            </ol>
          </div>
        </section>

        <Separator />

        {/* 데이터 출처 */}
        <section>
          <div className="flex items-center gap-2.5 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 text-violet-500">
              <Landmark className="h-4.5 w-4.5" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">데이터 출처</h2>
          </div>
          <div className="text-[15px] text-gray-600 leading-[1.85] pl-[42px] space-y-3">
            <ul className="space-y-2">
              <li>국세청 홈택스 (hometax.go.kr)</li>
              <li>국세법령정보시스템 (taxinfo.nts.go.kr)</li>
              <li>기획재정부 보도자료 (moef.go.kr)</li>
              <li>국세상담센터 (126)</li>
            </ul>
          </div>
        </section>

        <Separator />

        {/* 편집 정책 */}
        <section>
          <div className="flex items-center gap-2.5 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 text-orange-500">
              <ShieldCheck className="h-4.5 w-4.5" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">편집 정책</h2>
          </div>
          <div className="text-[15px] text-gray-600 leading-[1.85] pl-[42px] space-y-3">
            <p>
              장려금정보의 모든 콘텐츠는 정보 제공 목적으로 작성되며, 전문적인 세무
              상담을 대체하지 않습니다. 실제 신청 시에는 국세청 또는 세무사와
              상담하시기 바랍니다.
            </p>
            <p>
              세법 개정에 따라 자격 요건, 지급액 등이 변경될 수 있으며, 최신
              정보는 국세청 홈택스에서 직접 확인하시기 바랍니다.
            </p>
          </div>
        </section>

        {/* 카테고리 */}
        <section className="rounded-xl border border-gray-200 bg-gray-50/50 p-5">
          <h3 className="text-sm font-bold text-gray-900 mb-3">
            다루는 카테고리
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Link key={cat.slug} href={`/${cat.slug}`}>
                <Badge
                  variant="outline"
                  className="hover:bg-blue-50 hover:border-blue-300 transition-colors cursor-pointer"
                >
                  {cat.icon} {cat.name}
                </Badge>
              </Link>
            ))}
          </div>
        </section>
      </article>

      {/* Back */}
      <div className="mx-auto max-w-3xl px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          홈으로 돌아가기
        </Link>
      </div>

      {/* ProfilePage schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            mainEntity: {
              "@type": "Person",
              name: "장려금 에디터",
              url: "https://eitc.jjyu.co.kr/about",
              jobTitle: "세금·복지 정보 전문 에디터",
              description:
                "국세청 홈택스 기반으로 근로장려금, 자녀장려금 정보를 전문적으로 분석하고 전달하는 에디터입니다.",
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
              ],
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
              {
                "@type": "ListItem",
                position: 2,
                name: "작성자 소개",
                item: "https://eitc.jjyu.co.kr/about",
              },
            ],
          }),
        }}
      />
    </>
  );
}
