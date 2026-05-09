"use server";

import { db, siteSettings } from "@/db";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { SettingKey } from "@/lib/site-settings";

export type SettingsFormData = Record<SettingKey, string>;

export async function saveSettings(data: SettingsFormData) {
  for (const [key, value] of Object.entries(data) as [SettingKey, string][]) {
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
  revalidatePath("/sns");
  redirect("/admin/settings?saved=1");
}
