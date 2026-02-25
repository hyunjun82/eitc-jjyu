import Link from "next/link";
import { CategoryCard } from "@/components/CategoryCard";
import { EITCCalculator } from "@/components/EITCCalculator";
import { categories } from "@/data/categories";
import { spokeArticles } from "@/data/articles";
import {
  Landmark,
  Calculator,
  CalendarCheck,
  CheckCircle2,
  ArrowRight,
  FileText,
  Clock,
  Shield,
  Users,
  Baby,
  Lightbulb,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  "신청자격": <CheckCircle2 className="h-5 w-5" />,
  "신청방법": <FileText className="h-5 w-5" />,
  "지급액": <Calculator className="h-5 w-5" />,
  "신청기간": <Clock className="h-5 w-5" />,
  "자녀장려금": <Baby className="h-5 w-5" />,
  "절세팁": <Lightbulb className="h-5 w-5" />,
};

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-blue-100 backdrop-blur-sm mb-8">
              <Shield className="h-3.5 w-3.5" />
              국세청 홈택스 기준 | 2026년 최신 반영
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              2026 근로장려금
              <br className="sm:hidden" />
              <span className="text-blue-200"> 신청 가이드</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base text-blue-100 sm:text-lg">
              자격 확인부터 예상 지급액 계산까지, 한 곳에서 해결하세요.
            </p>

            {/* Key Stats */}
            <div className="mt-10 grid w-full max-w-3xl grid-cols-3 gap-4 sm:gap-6">
              <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm border border-white/10">
                <p className="text-2xl font-extrabold text-white sm:text-3xl">330만</p>
                <p className="mt-1 text-xs text-blue-200 sm:text-sm">최대 지급액 (원)</p>
              </div>
              <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm border border-white/10">
                <p className="text-2xl font-extrabold text-white sm:text-3xl">5.1~6.2</p>
                <p className="mt-1 text-xs text-blue-200 sm:text-sm">정기 신청기간 (월)</p>
              </div>
              <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm border border-white/10">
                <p className="text-2xl font-extrabold text-white sm:text-3xl">2.4억</p>
                <p className="mt-1 text-xs text-blue-200 sm:text-sm">재산 기준 미만</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#calculator"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-blue-700 shadow-lg transition-all hover:bg-blue-50 hover:shadow-xl"
              >
                <Calculator className="h-4 w-4" />
                예상 지급액 계산하기
              </a>
              <Link
                href="/신청자격"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                <CheckCircle2 className="h-4 w-4" />
                자격요건 확인하기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Guide Cards */}
      <section className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                근로장려금 가이드
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                궁금한 항목을 선택하면 상세 정보를 확인할 수 있어요
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="group flex flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 text-center transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100">
                  {iconMap[cat.name] || <FileText className="h-5 w-5" />}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">{cat.name}</h3>
                  <p className="mt-0.5 text-xs text-gray-500 line-clamp-1">{cat.description}</p>
                </div>
                <span className="text-xs font-medium text-blue-600">
                  {Object.keys(spokeArticles[cat.slug] ?? {}).length}개 가이드
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Key Info Summary */}
      <section className="border-b bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            2026년 핵심 정보 요약
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            신청 전 반드시 확인해야 할 주요 사항을 정리했어요
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* 지급액 */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <Calculator className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-gray-900">가구유형별 최대 지급액</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-700">단독가구</span>
                  </div>
                  <span className="text-sm font-bold text-blue-600">최대 165만원</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-700">홑벌이가구</span>
                  </div>
                  <span className="text-sm font-bold text-blue-600">최대 285만원</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-700">맞벌이가구</span>
                  </div>
                  <span className="text-sm font-bold text-blue-600">최대 330만원</span>
                </div>
              </div>
              <Link
                href="/지급액"
                className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700"
              >
                자세히 보기 <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {/* 신청 일정 */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
                  <CalendarCheck className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-gray-900">2026년 신청 일정</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-sm text-gray-700">정기 신청</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">5.1 ~ 6.2</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                    <span className="text-sm text-gray-700">반기 신청 (상반기)</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">9.1 ~ 9.15</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-amber-500" />
                    <span className="text-sm text-gray-700">기한후 신청</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">6.3 ~ 12.1</span>
                </div>
              </div>
              <Link
                href="/신청기간"
                className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700"
              >
                자세히 보기 <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {/* 자격요건 */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                  <Shield className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-gray-900">핵심 자격 요건</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2.5">
                  <span className="text-sm text-gray-700">재산 기준</span>
                  <span className="text-sm font-semibold text-gray-900">2억 4천만원 미만</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2.5">
                  <span className="text-sm text-gray-700">소득 기준</span>
                  <span className="text-sm font-semibold text-gray-900">가구유형별 상이</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2.5">
                  <span className="text-sm text-gray-700">신청 대상</span>
                  <span className="text-sm font-semibold text-gray-900">근로·사업·종교인</span>
                </div>
              </div>
              <Link
                href="/신청자격"
                className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700"
              >
                자세히 보기 <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* EITC Calculator */}
      <div id="calculator">
        <EITCCalculator />
      </div>

      {/* CTA Banner */}
      <section className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 p-8 sm:p-10 text-center">
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              근로장려금, 놓치지 마세요
            </h2>
            <p className="mt-3 text-sm text-blue-100 max-w-lg mx-auto">
              매년 수백만 가구가 신청하는 근로장려금.
              자격이 되는데 모르고 지나치는 분들이 많아요.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/신청방법"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-blue-700 transition-all hover:bg-blue-50"
              >
                <FileText className="h-4 w-4" />
                신청방법 알아보기
              </Link>
              <a
                href="#calculator"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-white/20"
              >
                <Calculator className="h-4 w-4" />
                예상 지급액 계산하기
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
