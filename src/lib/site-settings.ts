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
  // 예약 안내
  | "reservation_notice"
  | "reservation_phone_note"
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
  "reservation_notice",
  "reservation_phone_note",
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
  reservation_notice: "",
  reservation_phone_note: "",
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

/** 인스타그램 URL 구성 (전체 URL 우선, 없으면 핸들로 생성, 둘 다 없으면 "") */
export function buildInstagramUrl(s: SiteSettings): string {
  if (s.instagram_url.trim()) return s.instagram_url.trim();
  if (s.instagram_handle.trim())
    return `https://www.instagram.com/${s.instagram_handle.trim().replace(/^@/, "")}/`;
  return "";
}

/** 네이버 블로그 URL 구성 (전체 URL 우선, 없으면 ID로 생성, 둘 다 없으면 "") */
export function buildNaverBlogUrl(s: SiteSettings): string {
  if (s.naver_blog_url.trim()) return s.naver_blog_url.trim();
  if (s.naver_blog_id.trim())
    return `https://blog.naver.com/${s.naver_blog_id.trim()}`;
  return "";
}
