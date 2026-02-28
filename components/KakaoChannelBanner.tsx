"use client";

const KAKAO_CHANNEL_ID = "_BmwqX";

export function KakaoChannelBanner() {
  const handleAddChannel = () => {
    if (window.Kakao?.isInitialized()) {
      window.Kakao.Channel.addChannel({ channelPublicId: KAKAO_CHANNEL_ID });
    } else {
      window.open(`https://pf.kakao.com/${KAKAO_CHANNEL_ID}`, "_blank");
    }
  };

  return (
    <button
      onClick={handleAddChannel}
      className="mb-6 flex w-full items-center justify-between gap-4 rounded-xl border border-yellow-200 bg-[#FEE500] px-5 py-4 transition-all hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <svg viewBox="0 0 24 24" className="h-8 w-8 text-[#3C1E1E]" fill="currentColor">
          <path d="M12 3C6.477 3 2 6.463 2 10.691c0 2.724 1.8 5.113 4.508 6.459-.2.728-.723 2.639-.828 3.049-.128.502.184.495.387.36.16-.107 2.545-1.727 3.576-2.429.776.112 1.575.171 2.357.171 5.523 0 10-3.463 10-7.691S17.523 3 12 3z" />
        </svg>
        <div className="text-left">
          <p className="text-sm font-bold text-[#3C1E1E]">카카오톡 채널 친구 추가</p>
          <p className="text-xs text-[#3C1E1E]/70">근로장려금 최신 소식을 카카오톡으로 받아보세요</p>
        </div>
      </div>
      <span className="shrink-0 rounded-full bg-[#3C1E1E] px-4 py-1.5 text-xs font-bold text-[#FEE500]">
        추가
      </span>
    </button>
  );
}
