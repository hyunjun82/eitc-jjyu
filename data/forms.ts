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
    title: "근로·자녀장려금 신청서",
    description:
      "근로장려금 및 자녀장려금을 신청할 때 사용하는 기본 신청 서식이에요. 홈택스·손택스 온라인 신청이 어려운 경우 이 서식을 작성하여 세무서에 제출할 수 있어요.",
    fileName: "근로자녀장려금_신청서.hwp",
    fileUrl:
      "https://www.nts.go.kr/nts/na/ntt/selectNttInfo.do?mi=2453&nttSn=1321938",
  },
  {
    id: "confirmation",
    title: "근로·자녀장려금 신청 확인서",
    description:
      "근로장려금 신청 완료 후 접수 내역을 확인하는 서식이에요. 신청이 정상 접수되었는지 확인할 때 사용하며, 세무서에서 발급받을 수도 있어요.",
    fileName: "근로자녀장려금_신청확인서.hwp",
    fileUrl:
      "https://www.nts.go.kr/nts/na/ntt/selectNttInfo.do?mi=2453&nttSn=1321939",
  },
  {
    id: "objection",
    title: "장려금 이의신청서",
    description:
      "장려금 결정 내용에 이의가 있는 경우 이의신청을 위해 사용하는 서식이에요. 환수 통보나 감액 결정에 대해 90일 이내에 제출할 수 있어요.",
    fileName: "장려금_이의신청서.hwp",
    fileUrl:
      "https://www.nts.go.kr/nts/na/ntt/selectNttInfo.do?mi=2453&nttSn=1321940",
  },
  {
    id: "account",
    title: "환급계좌 개설(변경) 신고서",
    description:
      "장려금을 수령할 환급계좌를 새로 등록하거나 변경할 때 사용하는 서식이에요. 온라인으로도 변경할 수 있지만, 세무서 방문 시 이 서식을 이용해요.",
    fileName: "환급계좌_개설변경_신고서.hwp",
    fileUrl:
      "https://www.nts.go.kr/nts/na/ntt/selectNttInfo.do?mi=2453&nttSn=1321941",
  },
];
