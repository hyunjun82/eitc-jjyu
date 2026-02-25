"use client";

import { useState, useCallback, useEffect } from "react";
import { X, Download, FileText } from "lucide-react";

interface DownloadInterstitialProps {
  fileName: string;
  fileUrl: string;
  children: React.ReactNode;
}

export function DownloadInterstitial({
  fileName,
  fileUrl,
  children,
}: DownloadInterstitialProps) {
  const [showAd, setShowAd] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [canClose, setCanClose] = useState(false);

  const handleClick = useCallback(() => {
    setShowAd(true);
    setCountdown(5);
    setCanClose(false);
  }, []);

  useEffect(() => {
    if (!showAd) return;
    if (countdown <= 0) {
      setCanClose(true);
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [showAd, countdown]);

  const handleDownload = useCallback(() => {
    window.open(fileUrl, "_blank", "noopener,noreferrer");
    setShowAd(false);
  }, [fileUrl]);

  const handleClose = useCallback(() => {
    if (canClose) setShowAd(false);
  }, [canClose]);

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="w-full text-left"
      >
        {children}
      </button>

      {showAd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="relative mx-4 w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            {/* Close button */}
            <button
              type="button"
              onClick={handleClose}
              disabled={!canClose}
              className={`absolute right-4 top-4 rounded-full p-1.5 transition-colors ${
                canClose
                  ? "text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                  : "text-gray-200 cursor-not-allowed"
              }`}
              aria-label="닫기"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Ad area */}
            <div className="mb-6 rounded-xl border border-dashed border-gray-200 bg-gray-50 p-8 text-center">
              <div
                className="min-h-[200px] flex items-center justify-center"
                data-ad-slot="interstitial"
                id="ad-interstitial-download"
              >
                <span className="text-sm text-gray-400">광고 영역</span>
              </div>
            </div>

            {/* File info & download */}
            <div className="flex items-center gap-3 rounded-lg bg-blue-50 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {fileName}
                </p>
                <p className="text-xs text-gray-500">국세청 공식 서식</p>
              </div>
              <button
                type="button"
                onClick={handleDownload}
                disabled={!canClose}
                className={`flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                  canClose
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                <Download className="h-4 w-4" />
                {canClose ? "다운로드" : `${countdown}초`}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
