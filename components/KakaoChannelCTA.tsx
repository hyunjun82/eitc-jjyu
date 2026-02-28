const KAKAO_CHANNEL_URL = "https://pf.kakao.com/_BmwqX";

export function KakaoChannelCTA() {
  return (
    <a
      href={KAKAO_CHANNEL_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="my-8 flex items-center gap-4 rounded-xl border-2 border-[#FEE500] bg-[#FEE500]/10 px-5 py-5 transition-all hover:bg-[#FEE500]/20"
    >
      <svg viewBox="0 0 24 24" className="h-10 w-10 shrink-0 text-[#3C1E1E]" fill="currentColor">
        <path d="M12 3C6.477 3 2 6.463 2 10.691c0 2.724 1.8 5.113 4.508 6.459-.2.728-.723 2.639-.828 3.049-.128.502.184.495.387.36.16-.107 2.545-1.727 3.576-2.429.776.112 1.575.171 2.357.171 5.523 0 10-3.463 10-7.691S17.523 3 12 3z" />
      </svg>
      <div className="flex-1">
        <p className="text-sm font-bold text-gray-900">
          카카오톡으로 근로장려금 소식 받기
        </p>
        <p className="mt-0.5 text-xs text-gray-500">
          채널 추가하면 신청 시기·변경사항을 바로 알려드려요
        </p>
      </div>
      <span className="shrink-0 rounded-full bg-[#FEE500] px-4 py-2 text-sm font-bold text-[#3C1E1E]">
        채널 추가
      </span>
    </a>
  );
}
