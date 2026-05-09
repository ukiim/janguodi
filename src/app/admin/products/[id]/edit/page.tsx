import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
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
      <div>
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          상품 목록으로
        </Link>
        <h1 className="text-3xl font-bold mt-2">
          상품 수정 — <span className="text-primary">{product.name}</span>
        </h1>
        <p className="text-base text-muted-foreground mt-2">
          내용을 고치고 맨 아래 <b>수정 저장하기</b> 버튼을 눌러 주세요.
        </p>
      </div>
      <ProductForm initial={product} />
    </div>
  );
}
