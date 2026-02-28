import Link from "next/link";

const KAKAO_CHANNEL_URL = "https://pf.kakao.com/_BmwqX";

export function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* 카카오 채널 친구추가 배너 */}
        <a
          href={KAKAO_CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-6 flex items-center justify-between gap-4 rounded-xl border border-yellow-200 bg-[#FEE500] px-5 py-4 transition-all hover:shadow-md"
        >
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 24 24" className="h-8 w-8 text-[#3C1E1E]" fill="currentColor">
              <path d="M12 3C6.477 3 2 6.463 2 10.691c0 2.724 1.8 5.113 4.508 6.459-.2.728-.723 2.639-.828 3.049-.128.502.184.495.387.36.16-.107 2.545-1.727 3.576-2.429.776.112 1.575.171 2.357.171 5.523 0 10-3.463 10-7.691S17.523 3 12 3z" />
            </svg>
            <div>
              <p className="text-sm font-bold text-[#3C1E1E]">카카오톡 채널 친구 추가</p>
              <p className="text-xs text-[#3C1E1E]/70">근로장려금 최신 소식을 카카오톡으로 받아보세요</p>
            </div>
          </div>
          <span className="shrink-0 rounded-full bg-[#3C1E1E] px-4 py-1.5 text-xs font-bold text-[#FEE500]">
            추가
          </span>
        </a>

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-gray-500">
            장려금정보는 근로장려금 정보 제공 목적이며, 세무 상담을 대체하지 않습니다.
          </p>
          <div className="flex gap-4 text-sm text-gray-400">
            <Link href="/" className="hover:text-gray-600">
              홈
            </Link>
            <span>|</span>
            <Link href="/about" className="hover:text-gray-600">
              작성자 소개
            </Link>
            <span>|</span>
            <Link href="/forms" className="hover:text-gray-600">
              서식 다운로드
            </Link>
            <span>|</span>
            <span>국세청 홈택스 기반</span>
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
          <p className="text-xs text-amber-800 leading-relaxed">
            <strong>면책조항:</strong> 본 사이트에서 제공하는 근로장려금 정보는
            국세청 홈택스의 공식 자료를 기반으로 하며, 일반적인 정보 제공
            목적입니다. 실제 신청 및 수급 자격은 개인 상황에 따라 다를 수 있으므로
            반드시 <strong>국세청 또는 세무사와 상담</strong>하시기 바랍니다.
            본 사이트의 정보는 전문적인 세무 상담을 대체할 수 없습니다.
          </p>
        </div>

        <p className="mt-4 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} 장려금정보. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
