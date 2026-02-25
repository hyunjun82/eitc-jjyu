import type { VisualData, VisualItem, StepItem } from "@/lib/types";

/* ── 단일 블루 색상 기반 시각화 ── */

function IncomeRangeChart({ items }: { items: VisualItem[] }) {
  const total = items.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-1.5">
      <div className="flex h-11 rounded-xl overflow-hidden border border-blue-200">
        {items.map((item, i) => {
          const width = (item.value / total) * 100;
          // 단일 블루 계열 — 진하기로 구분
          const shades = ["bg-blue-400", "bg-blue-500", "bg-blue-600", "bg-blue-700"];
          const bg = shades[Math.min(i, shades.length - 1)];
          return (
            <div
              key={i}
              className={`${bg} flex items-center justify-center text-white text-[11px] sm:text-xs font-semibold ${i > 0 ? "border-l border-blue-300/50" : ""}`}
              style={{ width: `${width}%` }}
            >
              <span className="truncate px-1">{item.label}</span>
            </div>
          );
        })}
      </div>
      <div className="flex">
        {items.map((item, i) => {
          const width = (item.value / total) * 100;
          return (
            <div
              key={i}
              style={{ width: `${width}%` }}
              className="text-center text-[10px] sm:text-[11px] font-medium text-blue-600 truncate px-0.5"
            >
              {item.subLabel}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BarCompareChart({ items }: { items: VisualItem[] }) {
  const maxValue = Math.max(...items.map((item) => item.value));

  return (
    <div className="space-y-2.5">
      {items.map((item, i) => {
        const width = Math.max((item.value / maxValue) * 100, 20);
        // 단일 블루 — opacity로 구분
        const opacity = 0.5 + (i / items.length) * 0.5;
        return (
          <div key={i}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[13px] font-semibold text-gray-700">
                {item.label}
              </span>
              <span className="text-[13px] font-bold text-blue-600">
                {item.subLabel}
              </span>
            </div>
            <div className="h-7 bg-blue-50 rounded-lg overflow-hidden">
              <div
                className="bg-blue-500 h-full rounded-lg"
                style={{ width: `${width}%`, opacity }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SegmentChart({ items }: { items: VisualItem[] }) {
  const total = items.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="flex h-14 rounded-xl overflow-hidden border border-blue-100">
      {items.map((item, i) => {
        const width = (item.value / total) * 100;
        return (
          <div
            key={i}
            className={`bg-blue-50 flex flex-col items-center justify-center ${i < items.length - 1 ? "border-r border-blue-100" : ""}`}
            style={{ width: `${width}%` }}
          >
            <span className="text-[11px] sm:text-xs font-bold text-blue-700">
              {item.label}
            </span>
            {item.subLabel && (
              <span className="text-[10px] sm:text-[11px] text-blue-500 mt-0.5">
                {item.subLabel}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

function StepsProcess({ steps }: { steps: StepItem[] }) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch gap-0">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center flex-1">
          {/* Step card */}
          <div className="flex-1 rounded-xl bg-blue-50 border border-blue-100 px-4 py-3 text-center">
            <div className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-bold mb-1.5">
              {i + 1}
            </div>
            <p className="text-sm font-semibold text-blue-900 leading-tight">
              {step.label}
            </p>
            {step.description && (
              <p className="mt-1 text-[11px] text-blue-600 leading-snug">
                {step.description}
              </p>
            )}
          </div>
          {/* Arrow between steps */}
          {i < steps.length - 1 && (
            <div className="flex items-center justify-center shrink-0 px-1 text-blue-300">
              {/* Desktop: horizontal arrow */}
              <svg className="hidden sm:block h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 1l7 7-7 7V9H1V7h7V1z" />
              </svg>
              {/* Mobile: vertical arrow */}
              <svg className="block sm:hidden h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
                <path d="M1 8l7 7 7-7H9V1H7v7H1z" />
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function SectionVisual({ type, items, steps }: VisualData) {
  switch (type) {
    case "incomeRange":
      return <IncomeRangeChart items={items} />;
    case "barCompare":
      return <BarCompareChart items={items} />;
    case "segment":
      return <SegmentChart items={items} />;
    case "steps":
      return steps ? <StepsProcess steps={steps} /> : null;
    default:
      return null;
  }
}
