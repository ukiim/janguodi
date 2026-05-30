"use server";

import { db, reviews, type NewReview } from "@/db";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth-guard";

export async function createReview(data: {
  programSlug: string;
  name: string;
  content: string;
  rating: number;
  isPublished: boolean;
}) {
  await requireAdmin();
  const payload: NewReview = {
    programSlug: data.programSlug.trim(),
    name: data.name.trim(),
    content: data.content.trim(),
    rating: Math.max(1, Math.min(5, Number(data.rating) || 5)),
    isPublished: !!data.isPublished,
  };
  await db.insert(reviews).values(payload);
  revalidatePath("/");
  revalidatePath(`/programs/${payload.programSlug}`);
}

export async function togglePublishReview(id: number, value: boolean) {
  await requireAdmin();
  const [r] = await db
    .select({ slug: reviews.programSlug })
    .from(reviews)
    .where(eq(reviews.id, id))
    .limit(1);
  await db
    .update(reviews)
    .set({ isPublished: value })
    .where(eq(reviews.id, id));
  revalidatePath("/");
  if (r) revalidatePath(`/programs/${r.slug}`);
}

export async function deleteReview(id: number) {
  await requireAdmin();
  const [r] = await db
    .select({ slug: reviews.programSlug })
    .from(reviews)
    .where(eq(reviews.id, id))
    .limit(1);
  await db.delete(reviews).where(eq(reviews.id, id));
  revalidatePath("/");
  if (r) revalidatePath(`/programs/${r.slug}`);
}
