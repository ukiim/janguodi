import { db, siteSettings } from "@/db";
import { inArray } from "drizzle-orm";

export type SettingKey =
  // 소셜
  | "instagram_handle"
  | "naver_blog_id"
  | "instagram_url"
  | "naver_blog_url"
  // 연락처
  | "contact_phone"
  | "contact_email"
  | "contact_hours"
  // 위치
  | "location_address"
  | "location_directions"
  | "location_parking"
  // 스토어 연결
  | "smartstore_base_url"
  // 푸터
  | "footer_description"
  | "footer_company_name"
  | "footer_business_info"
  | "footer_copyright";

const ALL_KEYS: SettingKey[] = [
  "instagram_handle",
  "naver_blog_id",
  "instagram_url",
  "naver_blog_url",
  "contact_phone",
  "contact_email",
  "contact_hours",
  "location_address",
  "location_directions",
  "location_parking",
  "smartstore_base_url",
  "footer_description",
  "footer_company_name",
  "footer_business_info",
  "footer_copyright",
];

export type SiteSettings = Record<SettingKey, string>;

const EMPTY: SiteSettings = {
  instagram_handle: "",
  naver_blog_id: "",
  instagram_url: "",
  naver_blog_url: "",
  contact_phone: "",
  contact_email: "",
  contact_hours: "",
  location_address: "",
  location_directions: "",
  location_parking: "",
  smartstore_base_url: "",
  footer_description: "",
  footer_company_name: "",
  footer_business_info: "",
  footer_copyright: "",
};

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const rows = await db
      .select()
      .from(siteSettings)
      .where(inArray(siteSettings.key, ALL_KEYS));
    const map: Record<string, string> = {};
    for (const r of rows) map[r.key] = r.value;
    return { ...EMPTY, ...(map as Partial<SiteSettings>) };
  } catch {
    return EMPTY;
  }
}

/** 빈 문자열이면 폴백 반환 */
export function withFallback(value: string, fallback: string): string {
  const v = (value ?? "").trim();
  return v.length > 0 ? v : fallback;
}
