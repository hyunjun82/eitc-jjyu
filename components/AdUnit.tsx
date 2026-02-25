"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: Record<string, unknown>[];
  }
}

interface AdUnitProps {
  slot: string;
  format?: "auto" | "rectangle" | "horizontal";
  className?: string;
}

export function AdUnit({ slot, format = "auto", className = "" }: AdUnitProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // adsbygoogle not loaded yet
    }
  }, []);

  return (
    <div className={`my-6 overflow-hidden text-center ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-2442517902625121"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
