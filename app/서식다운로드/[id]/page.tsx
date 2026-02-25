import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight, ArrowLeft, FileText, Download, ExternalLink } from "lucide-react";

import { AdUnit } from "@/components/AdUnit";
import { forms } from "@/data/forms";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return forms.map((form) => ({ id: form.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const form = forms.find((f) => f.id === id);
  if (!form) return {};
  return {
    title: `${form.title} 다운로드 | 장려금정보`,
    description: form.description,
    alternates: {
      canonical: `https://eitc.jjyu.co.kr/서식다운로드/${id}`,
    },
  };
}

export default async function FormDownloadPage({ params }: PageProps) {
  const { id } = await params;
  const form = forms.find((f) => f.id === id);

  if (!form) notFound();

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-3xl px-4 py-3">
          <nav className="flex items-center gap-1 text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600">
              홈
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/서식다운로드" className="hover:text-blue-600">
              서식 다운로드
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gray-900">{form.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="border-b bg-gradient-to-b from-blue-50 to-white">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
            {form.title} 다운로드
          </h1>
          <p className="mt-3 text-base text-gray-500 leading-relaxed sm:text-lg">
            {form.description}
          </p>
        </div>
      </section>

      {/* Download area */}
      <div className="mx-auto max-w-3xl px-4 py-10">
        {/* Download card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 mb-5">
            <FileText className="h-8 w-8" />
          </div>
          <h2 className="text-lg font-bold text-gray-900">{form.title}</h2>
          <p className="mt-1 text-sm text-gray-500">{form.fileName}</p>
          <p className="mt-1 text-xs text-gray-400">국세청(NTS) 공식 서식</p>

          <a
            href={form.fileUrl}
            download={form.fileName}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-3.5 text-base font-bold text-white transition-colors hover:bg-blue-700"
          >
            <Download className="h-5 w-5" />
            서식 다운로드
          </a>

          <p className="mt-3 text-xs text-gray-400">
            HWP/HWPX 파일이 바로 다운로드돼요
          </p>
        </div>

        {/* 수동 광고 - 다운로드 카드 아래 */}
        <AdUnit slot="1370939604" />

        {/* Related forms */}
        <div className="mt-10">
          <h3 className="text-base font-bold text-gray-900 mb-4">
            다른 서식도 확인해 보세요
          </h3>
          <div className="space-y-3">
            {forms
              .filter((f) => f.id !== id)
              .map((f) => (
                <Link
                  key={f.id}
                  href={`/서식다운로드/${f.id}`}
                  className="group flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-blue-200 hover:shadow-sm"
                >
                  <FileText className="h-5 w-5 shrink-0 text-gray-400 group-hover:text-blue-500" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                      {f.title}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{f.fileName}</p>
                  </div>
                  <ExternalLink className="h-4 w-4 shrink-0 text-gray-300 group-hover:text-blue-400" />
                </Link>
              ))}
          </div>
        </div>

        {/* Back link */}
        <div className="py-8 flex gap-4">
          <Link
            href="/서식다운로드"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            서식 목록으로 돌아가기
          </Link>
        </div>
      </div>

      {/* BreadcrumbList schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "홈", item: "https://eitc.jjyu.co.kr" },
              { "@type": "ListItem", position: 2, name: "서식 다운로드", item: "https://eitc.jjyu.co.kr/서식다운로드" },
              { "@type": "ListItem", position: 3, name: form.title, item: `https://eitc.jjyu.co.kr/서식다운로드/${id}` },
            ],
          }),
        }}
      />
    </>
  );
}
