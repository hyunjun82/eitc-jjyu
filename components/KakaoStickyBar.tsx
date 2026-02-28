"use client";

import { useState, useEffect } from "react";

const KAKAO_CHANNEL_ID = "_BmwqX";

export function KakaoStickyBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 300px 이상 스크롤하면 표시
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAddChannel = () => {
    if (window.Kakao?.isInitialized()) {
      window.Kakao.Channel.addChannel({ channelPublicId: KAKAO_CHANNEL_ID });
    } else {
      window.open(`https://pf.kakao.com/${KAKAO_CHANNEL_ID}`, "_blank");
    }
  };

  if (dismissed || !visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 safe-bottom">
      <div className="mx-auto max-w-2xl px-3 pb-3">
        <div className="flex items-center gap-3 rounded-xl border border-yellow-300 bg-[#FEE500] px-4 py-2.5 shadow-lg">
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6 shrink-0 text-[#3C1E1E]"
            fill="currentColor"
          >
            <path d="M12 3C6.477 3 2 6.463 2 10.691c0 2.724 1.8 5.113 4.508 6.459-.2.728-.723 2.639-.828 3.049-.128.502.184.495.387.36.16-.107 2.545-1.727 3.576-2.429.776.112 1.575.171 2.357.171 5.523 0 10-3.463 10-7.691S17.523 3 12 3z" />
          </svg>
          <p className="flex-1 text-xs font-medium text-[#3C1E1E]">
            근로장려금 소식 받기
          </p>
          <button
            onClick={handleAddChannel}
            className="shrink-0 rounded-full bg-[#3C1E1E] px-3.5 py-1.5 text-xs font-bold text-[#FEE500] transition-colors hover:bg-[#2D1616]"
          >
            채널 추가
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="shrink-0 p-1 text-[#3C1E1E]/50 hover:text-[#3C1E1E]"
            aria-label="닫기"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
