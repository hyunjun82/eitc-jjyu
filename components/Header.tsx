"use client";

import Link from "next/link";
import { useState } from "react";
import { Landmark, Menu, X, Calculator } from "lucide-react";

const navItems = [
  { name: "신청자격", href: "/eligibility" },
  { name: "신청방법", href: "/how-to-apply" },
  { name: "지급액", href: "/payment" },
  { name: "신청기간", href: "/schedule" },
  { name: "자녀장려금", href: "/child-tax-credit" },
  { name: "절세팁", href: "/tax-tips" },
  { name: "서식다운로드", href: "/forms" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Landmark className="h-4 w-4" />
          </div>
          <span className="text-base font-bold text-gray-900">장려금정보</span>
        </Link>

        {/* Desktop Nav */}
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
          <a
            href="/#calculator"
            className="ml-2 inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            <Calculator className="h-3.5 w-3.5" />
            계산기
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 md:hidden"
          aria-label="메뉴"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="border-t bg-white px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
              >
                {item.name}
              </Link>
            ))}
            <a
              href="/#calculator"
              onClick={() => setMobileOpen(false)}
              className="mt-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              <Calculator className="h-3.5 w-3.5" />
              계산기
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
