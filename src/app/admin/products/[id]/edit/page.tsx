import { notFound } from "next/navigation";
import { db, products } from "@/db";
import { eq } from "drizzle-orm";
import { ProductForm } from "@/components/admin/product-form";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = Number(id);
  if (!Number.isFinite(productId)) notFound();

  const [product] = await db
    .select()
    .from(products)
    .where(eq(products.id, productId))
    .limit(1);
  if (!product) notFound();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">상품 수정</h1>
      <ProductForm initial={product} />
    </div>
  );
}
