export interface FormItem {
  id: string;
  title: string;
  description: string;
  fileName: string;
  fileUrl: string;
}

export const forms: FormItem[] = [
  {
    id: "application",
    title: "근로·자녀장려금 (정기·기한후) 신청서",
    description:
      "근로장려금 및 자녀장려금을 정기 또는 기한 후에 신청할 때 사용하는 기본 서식이에요. 홈택스·손택스 온라인 신청이 어려운 경우 이 서식을 작성하여 세무서에 제출할 수 있어요.",
    fileName:
      "[별지 제64호의2서식] 귀속 근로장려금ㆍ자녀장려금(정기¸ 기한 후) 신청서(조세특례제한법 시행규칙).hwpx",
    fileUrl: "/forms/application.hwpx",
  },
  {
    id: "semi-annual",
    title: "반기 근로장려금 신청서",
    description:
      "상반기 또는 하반기 귀속 반기 근로장려금을 신청할 때 사용하는 서식이에요. 반기 신청은 근로소득만 있는 경우에 해당하며, 소득 발생 후 빠르게 장려금을 받을 수 있어요.",
    fileName:
      "[별지 제64의16 서식](상반기,하반기)귀속 반기 근로장려금 신청서(조세특례제한법 시행규칙).hwp",
    fileUrl: "/forms/semi-annual.hwp",
  },
  {
    id: "account",
    title: "장려금용 계좌개설(변경·철회) 신고서",
    description:
      "장려금을 수령할 계좌를 새로 등록하거나 변경·철회할 때 사용하는 서식이에요. 온라인으로도 변경할 수 있지만, 세무서 방문 시 이 서식을 이용해요.",
    fileName:
      "[별지 제64호의3서식] 근로장려금 및 자녀장려금용 계좌개설(변경_철회)신고서(조세특례제한법 시행규칙).hwpx",
    fileUrl: "/forms/account.hwpx",
  },
  {
    id: "auto-request",
    title: "장려금 직권신청 동의·유형변경(철회) 요청서",
    description:
      "근로·자녀장려금 직권신청에 동의하거나, 신청 유형을 변경·철회할 때 사용하는 서식이에요. 자동신청 제도에 동의하면 매년 별도 신청 없이 장려금을 받을 수 있어요.",
    fileName:
      "[별지 제13호 서식]근로(자녀)장려금 직권신청 동의 유형변경(철회) 요청서[근로장려세제, 자녀장려세제 사무처리규정].hwp",
    fileUrl: "/forms/auto-request.hwp",
  },
];
