import type { HubArticle, SpokeArticle } from "@/lib/types";

import { hub as 신청자격Hub, spokes as 신청자격Spokes } from "./신청자격";
import { hub as 신청방법Hub, spokes as 신청방법Spokes } from "./신청방법";
import { hub as 지급액Hub, spokes as 지급액Spokes } from "./지급액";
import { hub as 신청기간Hub, spokes as 신청기간Spokes } from "./신청기간";
import { hub as 자녀장려금Hub, spokes as 자녀장려금Spokes } from "./자녀장려금";
import { hub as 절세팁Hub, spokes as 절세팁Spokes } from "./절세팁";

export const hubArticles: Record<string, HubArticle> = {
  eligibility: 신청자격Hub,
  "how-to-apply": 신청방법Hub,
  payment: 지급액Hub,
  schedule: 신청기간Hub,
  "child-tax-credit": 자녀장려금Hub,
  "tax-tips": 절세팁Hub,
};

export const spokeArticles: Record<string, Record<string, SpokeArticle>> = {
  eligibility: 신청자격Spokes,
  "how-to-apply": 신청방법Spokes,
  payment: 지급액Spokes,
  schedule: 신청기간Spokes,
  "child-tax-credit": 자녀장려금Spokes,
  "tax-tips": 절세팁Spokes,
};

export function getHubArticle(
  categorySlug: string
): HubArticle | undefined {
  return hubArticles[categorySlug];
}

export function getSpokeArticle(
  categorySlug: string,
  spokeSlug: string
): SpokeArticle | undefined {
  return spokeArticles[categorySlug]?.[spokeSlug];
}
