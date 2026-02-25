import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
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
            <Link href="/서식다운로드" className="hover:text-gray-600">
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
