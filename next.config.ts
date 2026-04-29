import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",         // ★ Cloudflare Pages용 정적 export — out/ 폴더 생성
  trailingSlash: true,      //   /eligibility/ 형식. canonical과 일치시키려면 페이지 metadata canonical도 trailing slash 통일
  images: {
    unoptimized: true,      //   정적 export에서는 next/image 최적화 사용 불가
  },
};

export default nextConfig;
