import Link from "next/link";
import { Calculator, ArrowRight } from "lucide-react";

export function CalculatorCTA() {
  return (
    <div className="my-6 rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-5">
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
          <Calculator className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-gray-900 sm:text-base">
            내 장려금은 얼마?
          </p>
          <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
            30초면 예상 지급액을 확인할 수 있어요
          </p>
        </div>
        <Link
          href="/#calculator"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 sm:px-4 sm:py-2.5"
        >
          계산해보기
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
