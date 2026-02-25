"use client";

import { useState } from "react";
import { Calculator, RotateCcw, ChevronDown } from "lucide-react";

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

/* ---------- Styled sub-components ---------- */

function SegmentedControl({
  value,
  onChange,
  options,
}: {
  value: string | null;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-0.5">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`rounded-md px-4 py-1.5 text-sm font-medium transition-all ${
            value === opt
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function FormRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <label className="text-sm text-gray-700">{label}</label>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function MoneyInput({
  value,
  onChange,
  placeholder = "0",
  disabled = false,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <div className="relative">
      <input
        type="text"
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/[^\d]/g, ""))}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 pr-10 text-sm text-right focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none disabled:bg-gray-50 disabled:text-gray-400"
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
        원
      </span>
    </div>
  );
}

/* ---------- Main component ---------- */

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

  const spouseDisabled = state.hasDependent === "아니오";

  return (
    <section className="border-t bg-gray-50/50">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          근로·자녀장려금 모의계산
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          간단한 정보를 입력하면 예상 지급액을 확인할 수 있어요
        </p>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Left: Form (3 cols) */}
          <div className="lg:col-span-3 rounded-2xl border border-gray-200 bg-white shadow-sm">
            {/* Tab */}
            <div className="px-6 pt-5 pb-4">
              <div className="inline-flex w-full rounded-lg bg-gray-100 p-1">
                {(["정기", "반기"] as Tab[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setTab(t);
                      setResult(null);
                    }}
                    className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${
                      tab === t
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {t} 신청
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-100" />

            {/* Form */}
            <div className="px-6 py-5 space-y-6">
              {/* Section 1: 가구 정보 */}
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  가구 정보
                </h3>
                <div className="space-y-4">
                  <FormRow label="배우자·부양가족 유무">
                    <SegmentedControl
                      value={state.hasDependent}
                      onChange={(v) => update("hasDependent", v as YesNo)}
                      options={["예", "아니오"]}
                    />
                  </FormRow>

                  {state.hasDependent === "예" && (
                    <FormRow label="부양자녀 수">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min={0}
                          max={10}
                          value={state.childCount}
                          onChange={(e) =>
                            update("childCount", Math.max(0, parseInt(e.target.value) || 0))
                          }
                          className="w-20 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-center focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                        />
                        <span className="text-sm text-gray-500">명</span>
                      </div>
                    </FormRow>
                  )}

                  <FormRow label="총소득 기준금액 미만 여부">
                    <SegmentedControl
                      value={state.incomeUnderLimit}
                      onChange={(v) => update("incomeUnderLimit", v as YesNo)}
                      options={["예", "아니오"]}
                    />
                  </FormRow>

                  {state.hasDependent === "예" && state.childCount > 0 && (
                    <FormRow label="자녀장려금 소득기준 미만 여부">
                      <SegmentedControl
                        value={state.childCreditIncomeUnderLimit}
                        onChange={(v) => update("childCreditIncomeUnderLimit", v as YesNo)}
                        options={["예", "아니오"]}
                      />
                    </FormRow>
                  )}

                  <FormRow label="가구 재산 합계">
                    <SegmentedControl
                      value={state.assetRange}
                      onChange={(v) => update("assetRange", v as AssetRange)}
                      options={["1.7억 미만", "1.7억~2.4억", "2.4억 이상"]}
                    />
                  </FormRow>
                </div>
              </div>

              <div className="border-t border-gray-100" />

              {/* Section 2: 소득 입력 */}
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  소득 입력
                </h3>
                <div className="grid gap-5 sm:grid-cols-2">
                  {/* 신청인 */}
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-gray-900">신청인</p>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">근로소득</label>
                      <MoneyInput
                        value={state.applicantWage}
                        onChange={(v) => update("applicantWage", v)}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">종교인소득</label>
                      <MoneyInput
                        value={state.applicantReligious}
                        onChange={(v) => update("applicantReligious", v)}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">사업소득</label>
                      <MoneyInput
                        value={state.applicantBusiness}
                        onChange={(v) => update("applicantBusiness", v)}
                      />
                    </div>
                  </div>

                  {/* 배우자 */}
                  <div className={`space-y-3 ${spouseDisabled ? "opacity-40" : ""}`}>
                    <p className="text-sm font-semibold text-gray-900">
                      배우자
                      {spouseDisabled && (
                        <span className="ml-1.5 text-xs font-normal text-gray-400">
                          (해당 없음)
                        </span>
                      )}
                    </p>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">근로소득</label>
                      <MoneyInput
                        value={state.spouseWage}
                        onChange={(v) => update("spouseWage", v)}
                        disabled={spouseDisabled}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">종교인소득</label>
                      <MoneyInput
                        value={state.spouseReligious}
                        onChange={(v) => update("spouseReligious", v)}
                        disabled={spouseDisabled}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">사업소득</label>
                      <MoneyInput
                        value={state.spouseBusiness}
                        onChange={(v) => update("spouseBusiness", v)}
                        disabled={spouseDisabled}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100" />

              {/* Section 3: 제외 여부 */}
              <FormRow label="신청제외자 해당 여부">
                <SegmentedControl
                  value={state.isExcluded}
                  onChange={(v) => update("isExcluded", v as YesNo)}
                  options={["예", "아니오"]}
                />
              </FormRow>
            </div>

            {/* Action buttons */}
            <div className="border-t border-gray-100 px-6 py-4 flex items-center gap-3">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                초기화
              </button>
              <button
                onClick={handleCalculate}
                className="flex-1 rounded-lg bg-blue-600 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-700"
              >
                계산하기
              </button>
            </div>
          </div>

          {/* Right: Result panel (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            {/* Result card */}
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6 lg:sticky lg:top-20">
              <div className="flex items-center gap-2 mb-5">
                <Calculator className="h-5 w-5 text-blue-600" />
                <h3 className="font-bold text-gray-900">계산 결과</h3>
              </div>

              {result ? (
                <>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center rounded-lg bg-gray-50 px-4 py-3">
                      <span className="text-sm text-gray-600">가구 유형</span>
                      <span className="text-sm font-semibold text-gray-900">{result.householdType}</span>
                    </div>
                    <div className="flex justify-between items-center rounded-lg bg-gray-50 px-4 py-3">
                      <span className="text-sm text-gray-600">근로장려금</span>
                      <span className="text-sm font-bold text-gray-900">{formatWon(result.eitc)}원</span>
                    </div>
                    {result.childCredit > 0 && (
                      <div className="flex justify-between items-center rounded-lg bg-gray-50 px-4 py-3">
                        <span className="text-sm text-gray-600">자녀장려금</span>
                        <span className="text-sm font-bold text-gray-900">{formatWon(result.childCredit)}원</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center rounded-xl bg-blue-600 px-4 py-4 mt-1">
                      <span className="text-sm font-semibold text-blue-100">예상 합계</span>
                      <span className="text-xl font-extrabold text-white">
                        {formatWon(result.total)}원
                      </span>
                    </div>
                  </div>

                  {result.total === 0 && (
                    <p className="mt-3 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">
                      입력하신 조건으로는 수급 대상이 아닐 수 있어요.
                    </p>
                  )}
                  <p className="mt-4 text-xs text-gray-400">
                    * 본 결과는 참고용이며, 실제 지급액은 국세청 심사에 따라 달라질 수 있습니다.
                  </p>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                    <Calculator className="h-6 w-6 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500">
                    왼쪽 정보를 입력하고
                  </p>
                  <p className="text-sm font-semibold text-gray-700">
                    계산하기 버튼을 눌러주세요
                  </p>
                </div>
              )}
            </div>

            {/* Info tips */}
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
              <h4 className="text-sm font-bold text-blue-900 mb-2">알아두세요</h4>
              <ul className="space-y-1.5 text-xs text-blue-700">
                <li>· 단독가구: 배우자·부양가족 없는 경우</li>
                <li>· 홑벌이가구: 배우자 소득 300만원 미만</li>
                <li>· 맞벌이가구: 배우자 소득 300만원 이상</li>
                <li>· 재산 1.7억~2.4억: 장려금 50% 감액</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
