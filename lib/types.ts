export interface Category {
  name: string;
  slug: string;
  icon: string;
  description: string;
  count: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface InfoItem {
  type: string;
  name: string;
  amount?: string;
  role: string;
}

export interface VisualItem {
  label: string;
  value: number;
  color: "blue" | "green" | "amber" | "red" | "violet" | "gray";
  subLabel?: string;
}

export interface StepItem {
  label: string;
  description?: string;
}

export interface VisualData {
  type: "incomeRange" | "barCompare" | "segment" | "steps";
  items: VisualItem[];
  steps?: StepItem[];
}

export interface ArticleSection {
  title: string;
  content: string;
  infoItems?: InfoItem[];
  visual?: VisualData;
}

export interface SpokeArticle {
  slug: string;
  categorySlug: string;
  title: string;
  h1: string;
  metaDescription: string;
  description: string;
  heroDescription: string;
  faq: FAQItem[];
  sections: ArticleSection[];
  datePublished?: string;
  dateModified?: string;
}

export interface HubArticle {
  categorySlug: string;
  title: string;
  h1: string;
  metaDescription: string;
  description: string;
  heroDescription: string;
  spokes: { slug: string; title: string; description: string }[];
  datePublished?: string;
  dateModified?: string;
}
