"use server";

import { db, programs, type NewProgram } from "@/db";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type ProgramFormData = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  duration: string;
  capacity: string;
  target: string;
  season: string;
  highlights: string[];
  schedule: { time: string; activity: string }[];
  faq: { question: string; answer: string }[];
  sortOrder: number;
  isPublished: boolean;
};

function buildPayload(data: ProgramFormData): NewProgram {
  return {
    slug: data.slug.trim(),
    title: data.title.trim(),
    subtitle: data.subtitle.trim(),
    description: data.description.trim(),
    image: data.image.trim(),
    duration: data.duration.trim(),
    capacity: data.capacity.trim(),
    target: data.target.trim(),
    season: data.season.trim(),
    highlights: (data.highlights || []).filter((h) => h.trim()),
    schedule: (data.schedule || []).filter((s) => s.time && s.activity),
    faq: (data.faq || []).filter((f) => f.question && f.answer),
    sortOrder: Number(data.sortOrder) || 0,
    isPublished: !!data.isPublished,
    updatedAt: new Date(),
  };
}

function revalidatePublic(slug?: string) {
  revalidatePath("/");
  revalidatePath("/programs");
  if (slug) revalidatePath(`/programs/${slug}`);
}

export async function createProgram(data: ProgramFormData) {
  await db.insert(programs).values(buildPayload(data));
  revalidatePublic(data.slug);
  redirect("/admin/programs");
}

export async function updateProgram(id: number, data: ProgramFormData) {
  await db.update(programs).set(buildPayload(data)).where(eq(programs.id, id));
  revalidatePublic(data.slug);
  redirect("/admin/programs");
}

export async function deleteProgram(id: number) {
  const [target] = await db
    .select({ slug: programs.slug })
    .from(programs)
    .where(eq(programs.id, id))
    .limit(1);
  await db.delete(programs).where(eq(programs.id, id));
  revalidatePublic(target?.slug);
}
