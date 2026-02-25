import type { Category } from "@/lib/types";

export const categories: Category[] = [
  {
    name: "신청자격",
    slug: "eligibility",
    icon: "✅",
    description: "소득요건, 재산요건, 가구유형별 자격 총정리",
    count: 6,
  },
  {
    name: "신청방법",
    slug: "how-to-apply",
    icon: "📝",
    description: "홈택스, 손택스, ARS, 세무서 방문 신청 가이드",
    count: 6,
  },
  {
    name: "지급액",
    slug: "payment",
    icon: "💰",
    description: "가구유형별 최대 지급액과 계산방법",
    count: 5,
  },
  {
    name: "신청기간",
    slug: "schedule",
    icon: "📅",
    description: "정기, 반기, 기한후 신청 일정 안내",
    count: 3,
  },
  {
    name: "자녀장려금",
    slug: "child-tax-credit",
    icon: "👶",
    description: "자녀장려금 자격요건, 지급액, 신청방법",
    count: 3,
  },
  {
    name: "절세팁",
    slug: "tax-tips",
    icon: "💡",
    description: "중복수령, 환급계좌, 사후관리 꿀팁",
    count: 3,
  },
];
