import type { InfoItem } from "@/lib/types";

export function InfoTable({ items }: { items: InfoItem[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full text-sm table-fixed">
        <colgroup>
          <col className="w-[76px]" />
          <col />
          <col className="hidden sm:table-column w-[100px]" />
          <col />
        </colgroup>
        <thead>
          <tr className="bg-gray-50 text-left">
            <th className="px-3 py-2.5 font-semibold text-gray-700">구분</th>
            <th className="px-3 py-2.5 font-semibold text-gray-700">항목</th>
            <th className="px-3 py-2.5 font-semibold text-gray-700 hidden sm:table-cell">기준</th>
            <th className="px-3 py-2.5 font-semibold text-gray-700">설명</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {items.map((item, i) => (
            <tr key={i} className={item.type === "필수" || item.type === "핵심" ? "bg-blue-50/50" : ""}>
              <td className="px-3 py-2.5">
                <span className={`inline-flex items-center justify-center min-w-[52px] rounded-full px-2 py-0.5 text-xs font-medium text-center ${
                  item.type === "필수" || item.type === "핵심"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-500"
                }`}>
                  {item.type}
                </span>
              </td>
              <td className="px-3 py-2.5 font-medium text-gray-900 break-keep">{item.name}</td>
              <td className="px-3 py-2.5 text-gray-500 hidden sm:table-cell">{item.amount || "-"}</td>
              <td className="px-3 py-2.5 text-gray-600 break-keep">{item.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
