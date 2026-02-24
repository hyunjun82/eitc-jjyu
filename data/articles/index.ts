import type { HubArticle, SpokeArticle } from "@/lib/types";

import { hub as 신청자격Hub, spokes as 신청자격Spokes } from "./신청자격";
import { hub as 신청방법Hub, spokes as 신청방법Spokes } from "./신청방법";
import { hub as 지급액Hub, spokes as 지급액Spokes } from "./지급액";
import { hub as 신청기간Hub, spokes as 신청기간Spokes } from "./신청기간";
import { hub as 자녀장려금Hub, spokes as 자녀장려금Spokes } from "./자녀장려금";
import { hub as 절세팁Hub, spokes as 절세팁Spokes } from "./절세팁";

export const hubArticles: Record<string, HubArticle> = {
  신청자격: 신청자격Hub,
  신청방법: 신청방법Hub,
  지급액: 지급액Hub,
  신청기간: 신청기간Hub,
  자녀장려금: 자녀장려금Hub,
  절세팁: 절세팁Hub,
};

export const spokeArticles: Record<string, Record<string, SpokeArticle>> = {
  신청자격: 신청자격Spokes,
  신청방법: 신청방법Spokes,
  지급액: 지급액Spokes,
  신청기간: 신청기간Spokes,
  자녀장려금: 자녀장려금Spokes,
  절세팁: 절세팁Spokes,
};

export function getHubArticle(category: string): HubArticle | undefined {
  return hubArticles[category];
}

export function getSpokeArticle(
  category: string,
  slug: string
): SpokeArticle | undefined {
  return spokeArticles[category]?.[slug];
}
