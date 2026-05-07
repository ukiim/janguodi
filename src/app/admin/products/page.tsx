import Link from "next/link";
import { db, products } from "@/db";
import { asc } from "drizzle-orm";
import { buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil } from "lucide-react";
import { DeleteProductButton } from "./delete-button";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const list = await db
    .select()
    .from(products)
    .orderBy(asc(products.sortOrder), asc(products.id));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">상품 관리</h1>
          <p className="text-sm text-muted-foreground mt-1">
            네이버 스마트스토어 연결 상품을 관리합니다.
          </p>
        </div>
        <Link href="/admin/products/new" className={buttonVariants()}>
          <Plus className="h-4 w-4 mr-1" />새 상품
        </Link>
      </div>

      <div className="rounded-md border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>상품명</TableHead>
              <TableHead>가격</TableHead>
              <TableHead>배지</TableHead>
              <TableHead>상태</TableHead>
              <TableHead className="text-right">작업</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                  등록된 상품이 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              list.map((p, i) => (
                <TableRow key={p.id}>
                  <TableCell className="text-muted-foreground">{i + 1}</TableCell>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell>{p.price.toLocaleString()}원</TableCell>
                  <TableCell>{p.badge ?? "-"}</TableCell>
                  <TableCell>
                    {p.isPublished ? (
                      <Badge variant="secondary">게시중</Badge>
                    ) : (
                      <Badge variant="outline">숨김</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Link
                      href={`/admin/products/${p.id}/edit`}
                      className={buttonVariants({ variant: "outline", size: "sm" })}
                    >
                      <Pencil className="h-3.5 w-3.5 mr-1" />
                      편집
                    </Link>
                    <DeleteProductButton id={p.id} name={p.name} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
