import type { VisualData, VisualItem } from "@/lib/types";

const colorMap: Record<
  VisualItem["color"],
  { bg: string; light: string; text: string; border: string }
> = {
  blue: {
    bg: "bg-blue-500",
    light: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
  },
  green: {
    bg: "bg-emerald-500",
    light: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
  },
  amber: {
    bg: "bg-amber-500",
    light: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
  },
  red: {
    bg: "bg-red-500",
    light: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
  },
  violet: {
    bg: "bg-violet-500",
    light: "bg-violet-50",
    text: "text-violet-700",
    border: "border-violet-200",
  },
  gray: {
    bg: "bg-gray-400",
    light: "bg-gray-50",
    text: "text-gray-600",
    border: "border-gray-200",
  },
};

function IncomeRangeChart({ items }: { items: VisualItem[] }) {
  const total = items.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-1.5">
      <div className="flex h-11 rounded-xl overflow-hidden shadow-sm">
        {items.map((item, i) => {
          const width = (item.value / total) * 100;
          const colors = colorMap[item.color];
          const isFirst = i === 0;
          const isLast = i === items.length - 1;
          return (
            <div
              key={i}
              className={`${colors.bg} flex items-center justify-center text-white text-[11px] sm:text-xs font-semibold relative ${isFirst ? "rounded-l-xl" : ""} ${isLast ? "rounded-r-xl" : ""}`}
              style={{ width: `${width}%` }}
            >
              <span className="truncate px-1 drop-shadow-sm">{item.label}</span>
            </div>
          );
        })}
      </div>
      <div className="flex">
        {items.map((item, i) => {
          const width = (item.value / total) * 100;
          const colors = colorMap[item.color];
          return (
            <div
              key={i}
              style={{ width: `${width}%` }}
              className={`text-center text-[10px] sm:text-[11px] font-medium ${colors.text} truncate px-0.5`}
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
        const colors = colorMap[item.color];
        return (
          <div key={i}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[13px] font-semibold text-gray-700">
                {item.label}
              </span>
              <span className={`text-[13px] font-bold ${colors.text}`}>
                {item.subLabel}
              </span>
            </div>
            <div className="h-7 bg-gray-100 rounded-lg overflow-hidden">
              <div
                className={`${colors.bg} h-full rounded-lg transition-all`}
                style={{ width: `${width}%` }}
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
    <div className="space-y-1.5">
      <div className="flex h-14 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
        {items.map((item, i) => {
          const width = (item.value / total) * 100;
          const colors = colorMap[item.color];
          return (
            <div
              key={i}
              className={`${colors.light} ${i < items.length - 1 ? "border-r-2 " + colors.border : ""} flex flex-col items-center justify-center`}
              style={{ width: `${width}%` }}
            >
              <span
                className={`text-[11px] sm:text-xs font-bold ${colors.text}`}
              >
                {item.label}
              </span>
              <span className="text-[10px] sm:text-[11px] text-gray-500 mt-0.5">
                {item.subLabel}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function SectionVisual({ type, items }: VisualData) {
  switch (type) {
    case "incomeRange":
      return <IncomeRangeChart items={items} />;
    case "barCompare":
      return <BarCompareChart items={items} />;
    case "segment":
      return <SegmentChart items={items} />;
    default:
      return null;
  }
}
