"use server";

import { db, notices, type NewNotice } from "@/db";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type NoticeFormData = {
  title: string;
  content: string;
  isImportant: boolean;
  isPublished: boolean;
};

function buildPayload(data: NoticeFormData): NewNotice {
  return {
    title: data.title.trim(),
    content: data.content.trim(),
    isImportant: !!data.isImportant,
    isPublished: !!data.isPublished,
    updatedAt: new Date(),
  };
}

function revalidatePublic() {
  revalidatePath("/notices");
  revalidatePath("/");
}

export async function createNotice(data: NoticeFormData) {
  await db.insert(notices).values(buildPayload(data));
  revalidatePublic();
  redirect("/admin/notices");
}

export async function updateNotice(id: number, data: NoticeFormData) {
  await db.update(notices).set(buildPayload(data)).where(eq(notices.id, id));
  revalidatePublic();
  redirect("/admin/notices");
}

export async function deleteNotice(id: number) {
  await db.delete(notices).where(eq(notices.id, id));
  revalidatePublic();
}
