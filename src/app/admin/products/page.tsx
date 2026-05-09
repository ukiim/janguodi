import Link from "next/link";
import Image from "next/image";
import { db, products } from "@/db";
import { asc } from "drizzle-orm";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil } from "lucide-react";
import { DeleteProductButton } from "./delete-button";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const list = await db
    .select()
    .from(products)
    .orderBy(asc(products.sortOrder), asc(products.id));

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold">상품 관리</h1>
          <p className="text-base text-muted-foreground mt-2">
            네이버 스마트스토어 연결 상품을 추가·수정·삭제할 수 있습니다.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className={cn(
            buttonVariants(),
            "h-14 px-6 text-base font-bold shadow-sm"
          )}
        >
          <Plus className="h-5 w-5 mr-1.5" />새 상품 만들기
        </Link>
      </div>

      <div className="space-y-3">
        {list.length === 0 ? (
          <div className="rounded-xl border-2 border-dashed p-12 text-center">
            <p className="text-base text-muted-foreground mb-4">
              아직 등록된 상품이 없습니다.
            </p>
            <Link
              href="/admin/products/new"
              className={cn(buttonVariants(), "h-12 px-6 text-base")}
            >
              <Plus className="h-5 w-5 mr-1.5" />첫 상품 만들기
            </Link>
          </div>
        ) : (
          list.map((p, i) => (
            <div
              key={p.id}
              className="rounded-xl border-2 bg-background p-4 hover:border-primary/40 transition-colors flex items-center gap-4 flex-wrap sm:flex-nowrap"
            >
              <div className="text-2xl font-bold text-muted-foreground w-10 text-center shrink-0">
                {i + 1}
              </div>
              {/* 썸네일 */}
              <div className="w-20 h-20 rounded-lg border bg-muted/30 overflow-hidden shrink-0">
                {p.image && (
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="text-lg font-bold truncate">{p.name}</h3>
                  {p.badge && (
                    <Badge className="text-xs bg-primary/15 text-primary border-0">
                      {p.badge}
                    </Badge>
                  )}
                  {p.isPublished ? (
                    <Badge variant="secondary" className="text-xs">
                      게시중
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs">
                      숨김
                    </Badge>
                  )}
                </div>
                <p className="text-base font-semibold text-primary">
                  {p.price.toLocaleString()}원
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Link
                  href={`/admin/products/${p.id}/edit`}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "h-12 px-5 text-base font-semibold"
                  )}
                >
                  <Pencil className="h-4 w-4 mr-1.5" />
                  수정하기
                </Link>
                <DeleteProductButton id={p.id} name={p.name} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
