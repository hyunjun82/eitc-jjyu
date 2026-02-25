import { Fragment } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { FAQSection } from "@/components/FAQSection";
import { InfoTable } from "@/components/InfoTable";
import { SectionVisual } from "@/components/SectionVisual";
import { RelatedSpokes } from "@/components/RelatedSpokes";
import { CategorySidebar } from "@/components/CategorySidebar";
import { ShareButtons } from "@/components/ShareButtons";
import { AuthorBio } from "@/components/AuthorBio";
import { AdUnit } from "@/components/AdUnit";

import { CalculatorCTA } from "@/components/CalculatorCTA";
import { getSpokeArticle } from "@/data/articles";
import { spokeArticles } from "@/data/articles";
import { categories } from "@/data/categories";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ChevronRight,
  ArrowLeft,
  CheckCircle,
  Banknote,
  FileText,
  Calendar,
  AlertTriangle,
  ShieldAlert,
  ClipboardList,
  Calculator,
  Home,
  Users,
  Phone,
  Landmark,
} from "lucide-react";

function formatKoreanDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-");
  return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
}

const SECTION_ICONS: Record<string, { icon: React.ElementType; color: string }> = {
  "소득": { icon: Banknote, color: "text-blue-500" },
  "재산": { icon: Home, color: "text-violet-500" },
  "자격": { icon: CheckCircle, color: "text-green-500" },
  "가구": { icon: Users, color: "text-amber-500" },
  "신청": { icon: FileText, color: "text-blue-500" },
  "홈택스": { icon: Landmark, color: "text-blue-500" },
  "손택스": { icon: Phone, color: "text-green-500" },
  "ARS": { icon: Phone, color: "text-violet-500" },
  "세무서": { icon: Landmark, color: "text-amber-500" },
  "지급": { icon: Calculator, color: "text-blue-600" },
  "계산": { icon: Calculator, color: "text-blue-600" },
  "기간": { icon: Calendar, color: "text-amber-500" },
  "일정": { icon: Calendar, color: "text-amber-500" },
  "주의": { icon: ShieldAlert, color: "text-orange-500" },
  "부작용": { icon: AlertTriangle, color: "text-red-500" },
  "제외": { icon: AlertTriangle, color: "text-red-500" },
  "필요": { icon: ClipboardList, color: "text-green-500" },
  "서류": { icon: ClipboardList, color: "text-green-500" },
  "절차": { icon: ClipboardList, color: "text-green-500" },
  "환급": { icon: Banknote, color: "text-blue-600" },
  "중복": { icon: CheckCircle, color: "text-violet-500" },
  "사후": { icon: ShieldAlert, color: "text-orange-500" },
};

function getSectionIcon(title: string) {
  for (const [keyword, config] of Object.entries(SECTION_ICONS)) {
    if (title.includes(keyword)) return config;
  }
  return { icon: ClipboardList, color: "text-gray-400" };
}

interface PageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  const allParams: { category: string; slug: string }[] = [];
  for (const [categorySlug, spokes] of Object.entries(spokeArticles)) {
    for (const spokeSlug of Object.keys(spokes)) {
      allParams.push({ category: categorySlug, slug: spokeSlug });
    }
  }
  return allParams;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const catSlug = decodeURIComponent(category);
  const spokeSlug = decodeURIComponent(slug);
  const article = getSpokeArticle(catSlug, spokeSlug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.metaDescription,
    authors: [{ name: "장려금 에디터", url: "https://eitc.jjyu.co.kr/about" }],
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      url: `https://eitc.jjyu.co.kr/${catSlug}/${spokeSlug}`,
      type: "article",
      publishedTime: article.datePublished,
      modifiedTime: article.dateModified,
      authors: ["https://eitc.jjyu.co.kr/about"],
      siteName: "장려금정보",
      locale: "ko_KR",
    },
    twitter: {
      card: "summary",
      title: article.title,
      description: article.metaDescription,
    },
    alternates: {
      canonical: `https://eitc.jjyu.co.kr/${catSlug}/${spokeSlug}`,
    },
  };
}

export default async function SpokePage({ params }: PageProps) {
  const { category, slug } = await params;
  const catSlug = decodeURIComponent(category);
  const spokeSlug = decodeURIComponent(slug);
  const article = getSpokeArticle(catSlug, spokeSlug);
  const catInfo = categories.find((c) => c.slug === catSlug);

  if (!article || !catInfo) notFound();

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-5xl px-4 py-3 lg:flex lg:gap-8">
          <div className="flex-1">
            <nav className="flex items-center gap-1 text-sm text-gray-500">
              <Link href="/" className="hover:text-blue-600">
                홈
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link href={`/${catSlug}`} className="hover:text-blue-600">
                {catInfo.name}
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-gray-900 font-medium">{spokeSlug}</span>
            </nav>
          </div>
          <div className="hidden lg:block w-64 shrink-0" />
        </div>
      </div>

      {/* Hero */}
      <section className="border-b bg-gradient-to-b from-blue-50 to-white">
        <div className="mx-auto max-w-5xl px-4 py-12 lg:flex lg:gap-8">
          <div className="flex-1">
            <Badge className="bg-blue-600 text-white hover:bg-blue-600 mb-4">
              {catInfo.icon} {catInfo.name}
            </Badge>
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              {article.h1}
            </h1>
            <p className="mt-3 text-base text-gray-500 leading-relaxed sm:text-lg">
              {article.heroDescription}
            </p>
            <div className="mt-3 flex items-center gap-3 text-sm text-gray-400">
              <Link
                href="/about"
                className="font-medium text-gray-500 hover:text-blue-600 transition-colors"
              >
                장려금 에디터
              </Link>
              {article.datePublished && (
                <>
                  <span>|</span>
                  <time dateTime={article.datePublished}>
                    {formatKoreanDate(article.datePublished)} 작성
                  </time>
                </>
              )}
              {article.dateModified && article.dateModified !== article.datePublished && (
                <>
                  <span>|</span>
                  <time dateTime={article.dateModified}>
                    {formatKoreanDate(article.dateModified)} 수정
                  </time>
                </>
              )}
            </div>
            <div className="mt-4">
              <ShareButtons title={article.title} />
            </div>

            {/* CTA - 서론 아래 */}
            <CalculatorCTA />
          </div>
          <div className="hidden lg:block w-64 shrink-0" />
        </div>
      </section>

      {/* 2-column layout */}
      <div className="mx-auto max-w-5xl px-4 lg:flex lg:gap-8">
        {/* Main Column */}
        <div className="flex-1 max-w-3xl">

      {/* Article Sections */}
      <article>
        {article.sections.map((section, i) => {
          const { icon: Icon, color } = getSectionIcon(section.title);
          const showRelatedAfter = i === Math.min(2, article.sections.length - 1);
          return (
            <Fragment key={i}>
              <section className="mb-8">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 ${color}`}>
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">
                    {section.title}
                  </h2>
                </div>
                {section.visual && (
                  <div className="mb-4 pl-[42px]">
                    <SectionVisual type={section.visual.type} items={section.visual.items} />
                  </div>
                )}
                {section.infoItems && section.infoItems.length > 0 && (
                  <div className="mb-4 pl-[42px]">
                    <InfoTable items={section.infoItems} />
                  </div>
                )}
                <div className="text-[15px] text-gray-600 leading-[1.85] sm:text-[16px] pl-[42px] space-y-3">
                  {section.content.split("\n\n").map((paragraph, pi) => (
                    <p key={pi}>{paragraph}</p>
                  ))}
                </div>
                {i < article.sections.length - 1 && <Separator className="mt-8" />}
              </section>

              {showRelatedAfter && (
                <>
                  {/* CTA - 중간 */}
                  <CalculatorCTA />
                  <AdUnit slot="REPLACE_ME_MID" />
                  <RelatedSpokes categorySlug={catSlug} currentSlug={spokeSlug} />
                </>
              )}
            </Fragment>
          );
        })}
      </article>

      {/* 수동 광고 - 본문 하단 */}
      <AdUnit slot="REPLACE_ME_BOTTOM" />

      {/* FAQ */}
      {article.faq.length > 0 && (
        <div className="pb-4">
          <FAQSection items={article.faq} />
        </div>
      )}

      {/* Author Bio */}
      <AuthorBio
        categoryName={catInfo.name}
        datePublished={article.datePublished}
        dateModified={article.dateModified}
      />

      {/* Back Links */}
      <div className="py-8 flex gap-4">
        <Link
          href={`/${catSlug}`}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {catInfo.name} 가이드로 돌아가기
        </Link>
      </div>

        </div>{/* end Main Column */}

        {/* PC Sidebar */}
        <CategorySidebar categorySlug={catSlug} currentSlug={spokeSlug} />

      </div>{/* end 2-column wrapper */}

      {/* Article schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.description,
            datePublished: article.datePublished,
            dateModified: article.dateModified,
            author: {
              "@type": "Person",
              name: "장려금 에디터",
              url: "https://eitc.jjyu.co.kr/about",
              jobTitle: "금융·세무 콘텐츠 에디터",
              worksFor: {
                "@type": "Organization",
                name: "장려금정보",
              },
            },
            publisher: {
              "@type": "Organization",
              name: "장려금정보",
              url: "https://eitc.jjyu.co.kr",
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://eitc.jjyu.co.kr/${catSlug}/${spokeSlug}`,
            },
            inLanguage: "ko",
          }),
        }}
      />

      {/* FAQPage schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: article.faq.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
      />

      {/* BreadcrumbList schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "홈",
                item: "https://eitc.jjyu.co.kr",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: catInfo.name,
                item: `https://eitc.jjyu.co.kr/${catSlug}`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: spokeSlug,
                item: `https://eitc.jjyu.co.kr/${catSlug}/${spokeSlug}`,
              },
            ],
          }),
        }}
      />

      {/* HowTo schema */}
      {article.sections.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HowTo",
              name: article.title,
              description: article.description,
              step: article.sections.map((section, i) => ({
                "@type": "HowToStep",
                position: i + 1,
                name: section.title,
                text: section.content,
              })),
            }),
          }}
        />
      )}
    </>
  );
}
