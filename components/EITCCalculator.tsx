"use client";

import { useState } from "react";
import { Calculator, RotateCcw, ChevronDown, ChevronUp } from "lucide-react";

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
  householdType: "홑벌이" | "맞벌이",
  childCount: number,
  totalIncome: number,
  assetRange: AssetRange
): number {
  if (childCount <= 0 || totalIncome >= 70000000) return 0;

  const maxCredit = childCount * 1000000;

  // 가구유형별 최대지급 구간 (국세청 기준)
  // 홑벌이: 2,100만원 기준, 맞벌이: 2,500만원 기준
  const peakPoint = householdType === "홑벌이" ? 21000000 : 25000000;
  const incomeLimit = 70000000;

  let credit = 0;

  if (totalIncome < peakPoint) {
    // 증가구간: 0 ~ peakPoint
    credit = (totalIncome / peakPoint) * maxCredit;
  } else {
    // 감소구간: peakPoint ~ 7,000만원
    credit = maxCredit - ((totalIncome - peakPoint) / (incomeLimit - peakPoint)) * maxCredit;
  }

  credit = Math.max(0, Math.round(credit));

  if (assetRange === "1.7억~2.4억") {
    credit = Math.round(credit * 0.5);
  } else if (assetRange === "2.4억 이상") {
    credit = 0;
  }

  return credit;
}

/* ---------- Sub-components ---------- */

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

function Accordion({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-3.5 bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="text-sm font-semibold text-gray-900">{title}</span>
        {open ? (
          <ChevronUp className="h-4 w-4 text-gray-400" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-400" />
        )}
      </button>
      {open && <div className="border-t border-gray-200 bg-white">{children}</div>}
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
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

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
      childCredit = calcChildCredit(householdType as "홑벌이" | "맞벌이", state.childCount, totalIncome, state.assetRange);
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
    <section id="calculator" className="border-t bg-gray-50/50">
      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Section title */}
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          근로·자녀장려금 모의계산
        </h2>

        {/* Calculator card */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          {/* Tab bar */}
          <div className="border-b border-gray-200 bg-gray-50">
            <div className="flex">
              {(["정기", "반기"] as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setTab(t);
                    setResult(null);
                  }}
                  className={`flex-1 py-3.5 text-sm font-semibold transition-colors ${
                    tab === t
                      ? "bg-white text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {t} 모의계산
                </button>
              ))}
            </div>
          </div>

          {/* Form body */}
          <div className="p-6 lg:p-8">
            {/* 신청요건 */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">
                신청요건 입력
              </h3>
              <div className="space-y-5">
                <FormRow label="배우자 또는 부양자녀·부양부모가 있습니까?">
                  <SegmentedControl
                    value={state.hasDependent}
                    onChange={(v) => update("hasDependent", v as YesNo)}
                    options={["예", "아니오"]}
                  />
                </FormRow>

                {state.hasDependent === "예" && (
                  <FormRow label="부양자녀 수를 입력하세요">
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

                <FormRow label="신청자와 배우자의 총소득 합계액은 기준금액 미만입니까?">
                  <SegmentedControl
                    value={state.incomeUnderLimit}
                    onChange={(v) => update("incomeUnderLimit", v as YesNo)}
                    options={["예", "아니오"]}
                  />
                </FormRow>

                {state.hasDependent === "예" && state.childCount > 0 && (
                  <FormRow label="자녀장려금 총소득 합계액은 기준금액 미만입니까?">
                    <SegmentedControl
                      value={state.childCreditIncomeUnderLimit}
                      onChange={(v) => update("childCreditIncomeUnderLimit", v as YesNo)}
                      options={["예", "아니오"]}
                    />
                  </FormRow>
                )}

                <FormRow label="가구 합산 재산의 합계액을 선택하세요">
                  <SegmentedControl
                    value={state.assetRange}
                    onChange={(v) => update("assetRange", v as AssetRange)}
                    options={["1.7억 미만", "1.7억~2.4억", "2.4억 이상"]}
                  />
                </FormRow>
              </div>
            </div>

            {/* 총급여액 입력 */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">
                총급여액 등 입력 <span className="text-xs font-normal text-gray-400 ml-1">(단위: 원)</span>
              </h3>
              <div className="grid gap-6 sm:grid-cols-2">
                {/* 신청인 */}
                <div className="rounded-xl border border-gray-200 p-5">
                  <p className="text-sm font-bold text-gray-900 mb-4">신청인</p>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-500 mb-1.5 block">근로소득 총급여액</label>
                      <MoneyInput
                        value={state.applicantWage}
                        onChange={(v) => update("applicantWage", v)}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1.5 block">종교인소득 총수입금액</label>
                      <MoneyInput
                        value={state.applicantReligious}
                        onChange={(v) => update("applicantReligious", v)}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1.5 block">사업소득 총수입금액</label>
                      <MoneyInput
                        value={state.applicantBusiness}
                        onChange={(v) => update("applicantBusiness", v)}
                      />
                    </div>
                  </div>
                </div>

                {/* 배우자 */}
                <div className={`rounded-xl border border-gray-200 p-5 ${spouseDisabled ? "opacity-40 pointer-events-none" : ""}`}>
                  <p className="text-sm font-bold text-gray-900 mb-4">
                    배우자
                    {spouseDisabled && (
                      <span className="ml-1.5 text-xs font-normal text-gray-400">(해당 없음)</span>
                    )}
                  </p>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-500 mb-1.5 block">근로소득 총급여액</label>
                      <MoneyInput
                        value={state.spouseWage}
                        onChange={(v) => update("spouseWage", v)}
                        disabled={spouseDisabled}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1.5 block">종교인소득 총수입금액</label>
                      <MoneyInput
                        value={state.spouseReligious}
                        onChange={(v) => update("spouseReligious", v)}
                        disabled={spouseDisabled}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1.5 block">사업소득 총수입금액</label>
                      <MoneyInput
                        value={state.spouseBusiness}
                        onChange={(v) => update("spouseBusiness", v)}
                        disabled={spouseDisabled}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 신청제외자 */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">
                신청제외자 해당 여부
              </h3>
              <FormRow label="신청자 또는 배우자가 신청제외자 유형에 해당합니까?">
                <SegmentedControl
                  value={state.isExcluded}
                  onChange={(v) => update("isExcluded", v as YesNo)}
                  options={["예", "아니오"]}
                />
              </FormRow>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                초기화
              </button>
              <button
                onClick={handleCalculate}
                className="flex-1 rounded-lg bg-blue-600 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-700"
              >
                계산하기
              </button>
            </div>

            {/* Result */}
            {result && (
              <div className="mt-8 rounded-xl border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
                  <h3 className="text-sm font-bold text-gray-900">
                    {tab} 모의계산 결과
                  </h3>
                </div>
                <div className="p-5">
                  <div className="grid gap-3 sm:grid-cols-3 mb-3">
                    <div className="rounded-lg bg-gray-50 px-4 py-3">
                      <p className="text-xs text-gray-500 mb-1">가구 유형</p>
                      <p className="text-sm font-bold text-gray-900">{result.householdType}</p>
                    </div>
                    <div className="rounded-lg bg-gray-50 px-4 py-3">
                      <p className="text-xs text-gray-500 mb-1">근로장려금 (예상)</p>
                      <p className="text-sm font-bold text-gray-900">{formatWon(result.eitc)}원</p>
                    </div>
                    <div className="rounded-lg bg-gray-50 px-4 py-3">
                      <p className="text-xs text-gray-500 mb-1">
                        {result.childCredit > 0 ? "자녀장려금 (예상)" : "자녀장려금"}
                      </p>
                      <p className="text-sm font-bold text-gray-900">{formatWon(result.childCredit)}원</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center rounded-xl bg-blue-600 px-5 py-4">
                    <span className="text-sm font-semibold text-blue-100">예상 합계 금액</span>
                    <span className="text-2xl font-extrabold text-white">
                      {formatWon(result.total)}원
                    </span>
                  </div>
                  {result.total === 0 && (
                    <p className="mt-3 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">
                      입력하신 조건으로는 수급 대상이 아닐 수 있어요. 자격 요건을 다시 확인해 주세요.
                    </p>
                  )}
                  <p className="mt-3 text-xs text-gray-400">
                    * 본 계산 결과는 참고용이며, 실제 지급액은 국세청 심사 결과에 따라 달라질 수 있습니다.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reference info accordions */}
        <div className="mt-6 space-y-3">
          <Accordion
            title="자격요건 안내"
            open={openAccordion === "자격요건"}
            onToggle={() => setOpenAccordion(openAccordion === "자격요건" ? null : "자격요건")}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-5 py-3 text-left font-semibold text-gray-700 border-b">구분</th>
                    <th className="px-5 py-3 text-left font-semibold text-gray-700 border-b">단독가구</th>
                    <th className="px-5 py-3 text-left font-semibold text-gray-700 border-b">홑벌이가구</th>
                    <th className="px-5 py-3 text-left font-semibold text-gray-700 border-b">맞벌이가구</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-b border-gray-100">
                    <td className="px-5 py-3 font-medium text-gray-900">가구 구성</td>
                    <td className="px-5 py-3">배우자·부양가족 없음</td>
                    <td className="px-5 py-3">배우자 소득 300만 미만</td>
                    <td className="px-5 py-3">배우자 소득 300만 이상</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-5 py-3 font-medium text-gray-900">총소득 기준</td>
                    <td className="px-5 py-3">2,200만원 미만</td>
                    <td className="px-5 py-3">3,200만원 미만</td>
                    <td className="px-5 py-3">3,800만원 미만</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3 font-medium text-gray-900">재산 기준</td>
                    <td colSpan={3} className="px-5 py-3">가구원 합산 재산 2억 4천만원 미만 (1.7억~2.4억: 50% 감액)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Accordion>

          <Accordion
            title="가구유형별 최대 지급액"
            open={openAccordion === "지급액"}
            onToggle={() => setOpenAccordion(openAccordion === "지급액" ? null : "지급액")}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-5 py-3 text-left font-semibold text-gray-700 border-b">장려금 종류</th>
                    <th className="px-5 py-3 text-left font-semibold text-gray-700 border-b">단독가구</th>
                    <th className="px-5 py-3 text-left font-semibold text-gray-700 border-b">홑벌이가구</th>
                    <th className="px-5 py-3 text-left font-semibold text-gray-700 border-b">맞벌이가구</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-b border-gray-100">
                    <td className="px-5 py-3 font-medium text-gray-900">근로장려금</td>
                    <td className="px-5 py-3 font-semibold text-blue-600">최대 165만원</td>
                    <td className="px-5 py-3 font-semibold text-blue-600">최대 285만원</td>
                    <td className="px-5 py-3 font-semibold text-blue-600">최대 330만원</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3 font-medium text-gray-900">자녀장려금</td>
                    <td className="px-5 py-3 text-gray-400">해당 없음</td>
                    <td colSpan={2} className="px-5 py-3 font-semibold text-blue-600">부양자녀 1인당 최대 100만원</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Accordion>

          <Accordion
            title="총급여액 등 산정 기준"
            open={openAccordion === "산정기준"}
            onToggle={() => setOpenAccordion(openAccordion === "산정기준" ? null : "산정기준")}
          >
            <div className="px-5 py-4 space-y-3 text-sm text-gray-600">
              <div className="flex gap-3">
                <span className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs font-bold">1</span>
                <div>
                  <p className="font-medium text-gray-900">근로소득</p>
                  <p>총급여액 (비과세 제외) 그대로 입력</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs font-bold">2</span>
                <div>
                  <p className="font-medium text-gray-900">종교인소득</p>
                  <p>총수입금액 (비과세 제외) 그대로 입력</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs font-bold">3</span>
                <div>
                  <p className="font-medium text-gray-900">사업소득</p>
                  <p>업종별 조정률을 적용한 총수입금액 입력 (업종별 조정률: 농업·임업·어업 등 70%, 제조업 등 30%, 소매업 등 20%, 부동산임대업 등 60%)</p>
                </div>
              </div>
            </div>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
