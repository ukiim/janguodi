import Link from "next/link";
import { db, notices } from "@/db";
import { desc } from "drizzle-orm";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, AlertCircle } from "lucide-react";
import { DeleteNoticeButton } from "./delete-button";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}

export default async function AdminNoticesPage() {
  const list = await db
    .select()
    .from(notices)
    .orderBy(desc(notices.isImportant), desc(notices.createdAt));

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold">공지사항 관리</h1>
          <p className="text-base text-muted-foreground mt-2">
            홈페이지 공지사항을 추가·수정·삭제할 수 있습니다.
          </p>
        </div>
        <Link
          href="/admin/notices/new"
          className={cn(buttonVariants(), "h-14 px-6 text-base font-bold shadow-sm")}
        >
          <Plus className="h-5 w-5 mr-1.5" />새 공지사항 만들기
        </Link>
      </div>

      <div className="space-y-3">
        {list.length === 0 ? (
          <div className="rounded-xl border-2 border-dashed p-12 text-center">
            <p className="text-base text-muted-foreground mb-4">
              아직 등록된 공지사항이 없습니다.
            </p>
            <Link
              href="/admin/notices/new"
              className={cn(buttonVariants(), "h-12 px-6 text-base")}
            >
              <Plus className="h-5 w-5 mr-1.5" />첫 공지사항 만들기
            </Link>
          </div>
        ) : (
          list.map((n) => (
            <div
              key={n.id}
              className="rounded-xl border-2 bg-background p-5 hover:border-primary/40 transition-colors flex items-center gap-4 flex-wrap sm:flex-nowrap"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  {n.isImportant && (
                    <Badge
                      className="text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300"
                    >
                      <AlertCircle className="h-3 w-3 mr-0.5" />
                      중요
                    </Badge>
                  )}
                  <h3 className="text-lg font-bold truncate">{n.title}</h3>
                  {n.isPublished ? (
                    <Badge variant="secondary" className="text-xs">
                      게시중
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs">
                      숨김
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {n.content}
                </p>
                <p className="text-xs text-muted-foreground/70 mt-1">
                  {formatDate(n.createdAt)}
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Link
                  href={`/admin/notices/${n.id}/edit`}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "h-12 px-5 text-base font-semibold"
                  )}
                >
                  <Pencil className="h-4 w-4 mr-1.5" />
                  수정하기
                </Link>
                <DeleteNoticeButton id={n.id} title={n.title} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
