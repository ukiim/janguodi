import { db, siteSettings } from "@/db";
import { inArray } from "drizzle-orm";

export type SettingKey =
  | "instagram_handle"
  | "naver_blog_id"
  | "instagram_url"
  | "naver_blog_url";

const ALL_KEYS: SettingKey[] = [
  "instagram_handle",
  "naver_blog_id",
  "instagram_url",
  "naver_blog_url",
];

export async function getSiteSettings(): Promise<Record<SettingKey, string>> {
  const rows = await db
    .select()
    .from(siteSettings)
    .where(inArray(siteSettings.key, ALL_KEYS));
  const map: Record<string, string> = {};
  for (const r of rows) map[r.key] = r.value;
  return {
    instagram_handle: map.instagram_handle ?? "",
    naver_blog_id: map.naver_blog_id ?? "",
    instagram_url: map.instagram_url ?? "",
    naver_blog_url: map.naver_blog_url ?? "",
  };
}
