import Link from "next/link";
import { Landmark } from "lucide-react";

const navItems = [
  { name: "신청자격", href: "/신청자격" },
  { name: "신청방법", href: "/신청방법" },
  { name: "지급액", href: "/지급액" },
  { name: "신청기간", href: "/신청기간" },
  { name: "자녀장려금", href: "/자녀장려금" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Landmark className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold text-gray-900">장려금정보</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
