"use server";

import { db, products, type NewProduct } from "@/db";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth-guard";

export type ProductFormData = {
  name: string;
  description: string;
  price: number;
  image: string;
  storeUrl: string;
  badge: string | null;
  sortOrder: number;
  isPublished: boolean;
};

function buildPayload(data: ProductFormData): NewProduct {
  return {
    name: data.name.trim(),
    description: data.description.trim(),
    price: Number(data.price) || 0,
    image: data.image.trim(),
    storeUrl: data.storeUrl.trim(),
    badge: data.badge?.trim() || null,
    sortOrder: Number(data.sortOrder) || 0,
    isPublished: !!data.isPublished,
    updatedAt: new Date(),
  };
}

function revalidatePublic() {
  revalidatePath("/store");
  revalidatePath("/");
}

export async function createProduct(data: ProductFormData) {
  await requireAdmin();
  await db.insert(products).values(buildPayload(data));
  revalidatePublic();
  redirect("/admin/products");
}

export async function updateProduct(id: number, data: ProductFormData) {
  await requireAdmin();
  await db.update(products).set(buildPayload(data)).where(eq(products.id, id));
  revalidatePublic();
  redirect("/admin/products");
}

export async function deleteProduct(id: number) {
  await requireAdmin();
  await db.delete(products).where(eq(products.id, id));
  revalidatePublic();
}
