"use client";

import { useState } from "react";
import { Calculator, HelpCircle, RotateCcw } from "lucide-react";

type Tab = "정기" | "반기";
type YesNo = "예" | "아니오" | null;
type AssetRange = "1.7억 미만" | "1.7억~2.4억" | "2.4억 이상" | null;

interface CalculatorState {
  hasDependent: YesNo;
  childCount: number;
  incomeUnderLimit: YesNo;
  childCreditIncomeUnderLimit: YesNo;
  assetRange: AssetRange;
  applicantWage: string;
  applicantReligious: string;
  applicantBusiness: string;
  spouseWage: string;
  spouseReligious: string;
  spouseBusiness: string;
  isExcluded: YesNo;
}

const initialState: CalculatorState = {
  hasDependent: "아니오",
  childCount: 0,
  incomeUnderLimit: "예",
  childCreditIncomeUnderLimit: null,
  assetRange: "1.7억 미만",
  applicantWage: "",
  applicantReligious: "",
  applicantBusiness: "",
  spouseWage: "",
  spouseReligious: "",
  spouseBusiness: "",
  isExcluded: "아니오",
};

function parseNum(v: string): number {
  const n = parseInt(v.replace(/,/g, ""), 10);
  return isNaN(n) ? 0 : n;
}

function formatWon(n: number): string {
  return new Intl.NumberFormat("ko-KR").format(n);
}

function calcEITC(
  householdType: "단독" | "홑벌이" | "맞벌이",
  totalIncome: number,
  assetRange: AssetRange
): number {
  let maxCredit = 0;
  let incomeLimit = 0;
  let peakStart = 0;
  let peakEnd = 0;

  if (householdType === "단독") {
    maxCredit = 1650000;
    incomeLimit = 22000000;
    peakStart = 4000000;
    peakEnd = 9000000;
  } else if (householdType === "홑벌이") {
    maxCredit = 2850000;
    incomeLimit = 32000000;
    peakStart = 7000000;
    peakEnd = 14000000;
  } else {
    maxCredit = 3300000;
    incomeLimit = 38000000;
    peakStart = 8000000;
    peakEnd = 17000000;
  }

  if (totalIncome >= incomeLimit) return 0;

  let credit = 0;

  if (totalIncome <= peakStart) {
    credit = (totalIncome / peakStart) * maxCredit;
  } else if (totalIncome <= peakEnd) {
    credit = maxCredit;
  } else {
    credit = maxCredit * ((incomeLimit - totalIncome) / (incomeLimit - peakEnd));
  }

  credit = Math.max(0, Math.round(credit));

  if (assetRange === "1.7억~2.4억") {
    credit = Math.round(credit * 0.5);
  } else if (assetRange === "2.4억 이상") {
    credit = 0;
  }

  return credit;
}

function calcChildCredit(
  childCount: number,
  totalIncome: number,
  assetRange: AssetRange
): number {
  if (childCount <= 0 || totalIncome >= 70000000) return 0;

  const perChild = 1000000;
  let credit = childCount * perChild;

  if (totalIncome > 40000000) {
    const reduction = ((totalIncome - 40000000) / 30000000) * credit;
    credit = Math.max(0, Math.round(credit - reduction));
  }

  if (assetRange === "1.7억~2.4억") {
    credit = Math.round(credit * 0.5);
  } else if (assetRange === "2.4억 이상") {
    credit = 0;
  }

  return credit;
}

function RadioGroup({
  value,
  onChange,
  options,
}: {
  value: string | null;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="flex items-center gap-4">
      {options.map((opt) => (
        <label key={opt} className="flex items-center gap-1.5 cursor-pointer text-sm">
          <input
            type="radio"
            checked={value === opt}
            onChange={() => onChange(opt)}
            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          {opt}
        </label>
      ))}
    </div>
  );
}

export function EITCCalculator() {
  const [tab, setTab] = useState<Tab>("정기");
  const [state, setState] = useState<CalculatorState>(initialState);
  const [result, setResult] = useState<{
    householdType: string;
    eitc: number;
    childCredit: number;
    total: number;
  } | null>(null);

  const update = <K extends keyof CalculatorState>(key: K, value: CalculatorState[K]) => {
    setState((prev) => ({ ...prev, [key]: value }));
    setResult(null);
  };

  const handleReset = () => {
    setState(initialState);
    setResult(null);
  };

  const handleCalculate = () => {
    const applicantTotal =
      parseNum(state.applicantWage) +
      parseNum(state.applicantReligious) +
      parseNum(state.applicantBusiness);
    const spouseTotal =
      parseNum(state.spouseWage) +
      parseNum(state.spouseReligious) +
      parseNum(state.spouseBusiness);
    const totalIncome = applicantTotal + spouseTotal;

    let householdType: "단독" | "홑벌이" | "맞벌이";
    if (state.hasDependent === "아니오") {
      householdType = "단독";
    } else if (spouseTotal >= 3000000) {
      householdType = "맞벌이";
    } else {
      householdType = "홑벌이";
    }

    if (state.isExcluded === "예" || state.assetRange === "2.4억 이상") {
      setResult({
        householdType: householdType + "가구",
        eitc: 0,
        childCredit: 0,
        total: 0,
      });
      return;
    }

    const eitc = calcEITC(householdType, totalIncome, state.assetRange);

    let childCredit = 0;
    if (
      state.childCreditIncomeUnderLimit === "예" &&
      state.childCount > 0 &&
      householdType !== "단독"
    ) {
      childCredit = calcChildCredit(state.childCount, totalIncome, state.assetRange);
    }

    const semiAnnualRatio = tab === "반기" ? 0.5 : 1;

    setResult({
      householdType: householdType + "가구",
      eitc: Math.round(eitc * semiAnnualRatio),
      childCredit: Math.round(childCredit * semiAnnualRatio),
      total: Math.round((eitc + childCredit) * semiAnnualRatio),
    });
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 border-b bg-gray-50 px-6 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              근로·자녀장려금 모의계산
            </h2>
            <p className="text-xs text-gray-500">
              국세청 홈택스 기준 | 실제 지급액과 다를 수 있어요
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b">
          <div className="flex">
            {(["정기", "반기"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setResult(null); }}
                className={`px-6 py-3 text-sm font-medium transition-colors ${
                  tab === t
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {t} 모의계산
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* 신청요건 입력 */}
          <div className="rounded-xl border border-gray-200 p-5 space-y-5">
            <h3 className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
              신청요건 입력
            </h3>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-sm text-gray-700 flex items-center gap-1">
                  배우자 또는 부양자녀 또는 부양부모가 있습니까?
                  <HelpCircle className="h-3.5 w-3.5 text-gray-400" />
                </span>
                <RadioGroup
                  value={state.hasDependent}
                  onChange={(v) => update("hasDependent", v as YesNo)}
                  options={["예", "아니오"]}
                />
              </div>

              {state.hasDependent === "예" && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-sm text-gray-700 flex items-center gap-1">
                    부양자녀 수를 입력하세요
                    <HelpCircle className="h-3.5 w-3.5 text-gray-400" />
                  </span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={0}
                      max={10}
                      value={state.childCount}
                      onChange={(e) =>
                        update("childCount", Math.max(0, parseInt(e.target.value) || 0))
                      }
                      className="w-20 rounded-lg border border-gray-300 px-3 py-2 text-sm text-right focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                    <span className="text-sm text-gray-500">명</span>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-sm text-gray-700 flex items-center gap-1">
                  신청자와 배우자의 총소득 합계액은 기준금액 미만입니까?
                  <HelpCircle className="h-3.5 w-3.5 text-gray-400" />
                </span>
                <RadioGroup
                  value={state.incomeUnderLimit}
                  onChange={(v) => update("incomeUnderLimit", v as YesNo)}
                  options={["예", "아니오"]}
                />
              </div>

              {state.hasDependent === "예" && state.childCount > 0 && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-sm text-gray-700 flex items-center gap-1">
                    자녀장려금 총소득 합계액은 기준금액 미만입니까?
                    <HelpCircle className="h-3.5 w-3.5 text-gray-400" />
                  </span>
                  <RadioGroup
                    value={state.childCreditIncomeUnderLimit}
                    onChange={(v) => update("childCreditIncomeUnderLimit", v as YesNo)}
                    options={["예", "아니오"]}
                  />
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-sm text-gray-700 flex items-center gap-1">
                  가구 합산 재산의 합계액을 선택하세요
                  <HelpCircle className="h-3.5 w-3.5 text-gray-400" />
                </span>
                <RadioGroup
                  value={state.assetRange}
                  onChange={(v) => update("assetRange", v as AssetRange)}
                  options={["1.7억 미만", "1.7억~2.4억", "2.4억 이상"]}
                />
              </div>
            </div>
          </div>

          {/* 총급여액 입력 */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* 신청인 */}
            <div className="rounded-xl border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 text-sm">신청인 총급여액 입력</h3>
                <span className="text-xs text-gray-400">(단위:원)</span>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-[10px] font-bold mr-1">1</span>
                    근로소득 총액
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={state.applicantWage}
                    onChange={(e) => update("applicantWage", e.target.value.replace(/[^\d]/g, ""))}
                    placeholder="0"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-right focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-[10px] font-bold mr-1">2</span>
                    종교인소득 총액
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={state.applicantReligious}
                    onChange={(e) => update("applicantReligious", e.target.value.replace(/[^\d]/g, ""))}
                    placeholder="0"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-right focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-[10px] font-bold mr-1">3</span>
                    사업소득 총액
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={state.applicantBusiness}
                    onChange={(e) => update("applicantBusiness", e.target.value.replace(/[^\d]/g, ""))}
                    placeholder="0"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-right focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 배우자 */}
            <div className={`rounded-xl border border-gray-200 p-5 ${state.hasDependent === "아니오" ? "opacity-50 pointer-events-none" : ""}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 text-sm">배우자 총급여액 입력</h3>
                <span className="text-xs text-gray-400">(단위:원)</span>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-orange-100 text-orange-600 text-[10px] font-bold mr-1">1</span>
                    근로소득 총액
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={state.spouseWage}
                    onChange={(e) => update("spouseWage", e.target.value.replace(/[^\d]/g, ""))}
                    placeholder="0"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-right focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-orange-100 text-orange-600 text-[10px] font-bold mr-1">2</span>
                    종교인소득 총액
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={state.spouseReligious}
                    onChange={(e) => update("spouseReligious", e.target.value.replace(/[^\d]/g, ""))}
                    placeholder="0"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-right focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-orange-100 text-orange-600 text-[10px] font-bold mr-1">3</span>
                    사업소득 총액
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={state.spouseBusiness}
                    onChange={(e) => update("spouseBusiness", e.target.value.replace(/[^\d]/g, ""))}
                    placeholder="0"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-right focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 신청제외자 해당 여부 */}
          <div className="rounded-xl border border-gray-200 p-5">
            <h3 className="font-bold text-gray-900 text-sm mb-3 flex items-center gap-1.5">
              신청제외자 해당 여부
              <HelpCircle className="h-3.5 w-3.5 text-gray-400" />
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-sm text-gray-700">
                신청자 또는 배우자가 신청제외자 유형에 해당되나요?
              </span>
              <RadioGroup
                value={state.isExcluded}
                onChange={(v) => update("isExcluded", v as YesNo)}
                options={["예", "아니오"]}
              />
            </div>
          </div>

          {/* Result */}
          {result && (
            <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-6">
              <h3 className="font-bold text-blue-900 text-lg mb-4">
                {tab} 모의계산 결과
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">가구 유형</span>
                  <span className="font-bold text-gray-900">{result.householdType}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">근로장려금 (예상)</span>
                  <span className="font-bold text-blue-600">{formatWon(result.eitc)}원</span>
                </div>
                {result.childCredit > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">자녀장려금 (예상)</span>
                    <span className="font-bold text-blue-600">{formatWon(result.childCredit)}원</span>
                  </div>
                )}
                <div className="border-t border-blue-200 pt-3 flex justify-between">
                  <span className="font-bold text-gray-900">합계 (예상)</span>
                  <span className="text-xl font-extrabold text-blue-600">
                    {formatWon(result.total)}원
                  </span>
                </div>
              </div>
              {result.total === 0 && (
                <p className="mt-3 text-sm text-red-600">
                  입력하신 조건으로는 장려금 수급 대상이 아닐 수 있어요.
                  자격 요건을 다시 확인해 주세요.
                </p>
              )}
              <p className="mt-3 text-xs text-gray-500">
                * 본 계산 결과는 참고용이며, 실제 지급액은 국세청 심사 결과에 따라 달라질 수 있어요.
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex items-center justify-between">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              <RotateCcw className="h-4 w-4" />
              초기화
            </button>
            <button
              onClick={handleCalculate}
              className="rounded-lg bg-blue-600 px-8 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-700"
            >
              계산하기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
