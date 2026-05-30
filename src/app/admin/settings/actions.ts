"use server";

import { db, siteSettings } from "@/db";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { SiteSettings } from "@/lib/site-settings";
import { requireAdmin } from "@/lib/auth-guard";

export type SettingsFormData = SiteSettings;

export async function saveSettings(data: SettingsFormData) {
  await requireAdmin();
  for (const [key, value] of Object.entries(data) as [
    keyof SiteSettings,
    string,
  ][]) {
    const trimmed = value.trim();
    // upsert
    const existing = await db
      .select({ key: siteSettings.key })
      .from(siteSettings)
      .where(eq(siteSettings.key, key))
      .limit(1);
    if (existing.length) {
      await db
        .update(siteSettings)
        .set({ value: trimmed, updatedAt: new Date() })
        .where(eq(siteSettings.key, key));
    } else {
      await db
        .insert(siteSettings)
        .values({ key, value: trimmed });
    }
  }
  // 모든 공개 페이지 캐시 무효화 (푸터·연락처·지도 등이 settings 사용)
  revalidatePath("/", "layout");
  redirect("/admin/settings?saved=1");
}
