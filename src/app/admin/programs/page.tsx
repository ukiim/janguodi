import Link from "next/link";
import { db, programs } from "@/db";
import { asc } from "drizzle-orm";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { DeleteProgramButton } from "./delete-button";

export const dynamic = "force-dynamic";

export default async function AdminProgramsPage() {
  const list = await db
    .select()
    .from(programs)
    .orderBy(asc(programs.sortOrder), asc(programs.id));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">프로그램 관리</h1>
          <p className="text-sm text-muted-foreground mt-1">
            체험 프로그램을 추가·수정·삭제합니다.
          </p>
        </div>
        <Link href="/admin/programs/new" className={buttonVariants()}>
          <Plus className="h-4 w-4 mr-1" />새 프로그램
        </Link>
      </div>

      <div className="rounded-md border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>제목</TableHead>
              <TableHead>슬러그</TableHead>
              <TableHead>시즌</TableHead>
              <TableHead>상태</TableHead>
              <TableHead className="text-right">작업</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                  등록된 프로그램이 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              list.map((p, i) => (
                <TableRow key={p.id}>
                  <TableCell className="text-muted-foreground">{i + 1}</TableCell>
                  <TableCell className="font-medium">{p.title}</TableCell>
                  <TableCell className="font-mono text-xs">{p.slug}</TableCell>
                  <TableCell>{p.season}</TableCell>
                  <TableCell>
                    {p.isPublished ? (
                      <Badge variant="secondary">게시중</Badge>
                    ) : (
                      <Badge variant="outline">숨김</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Link
                      href={`/admin/programs/${p.id}/edit`}
                      className={buttonVariants({ variant: "outline", size: "sm" })}
                    >
                      <Pencil className="h-3.5 w-3.5 mr-1" />
                      편집
                    </Link>
                    <DeleteProgramButton id={p.id} title={p.title} />
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
