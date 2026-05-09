import Link from "next/link";
import { db, programs } from "@/db";
import { asc } from "drizzle-orm";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil } from "lucide-react";
import { DeleteProgramButton } from "./delete-button";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminProgramsPage() {
  const list = await db
    .select()
    .from(programs)
    .orderBy(asc(programs.sortOrder), asc(programs.id));

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold">프로그램 관리</h1>
          <p className="text-base text-muted-foreground mt-2">
            체험 프로그램을 추가하거나 수정·삭제할 수 있습니다.
          </p>
        </div>
        <Link
          href="/admin/programs/new"
          className={cn(
            buttonVariants(),
            "h-14 px-6 text-base font-bold shadow-sm"
          )}
        >
          <Plus className="h-5 w-5 mr-1.5" />새 프로그램 만들기
        </Link>
      </div>

      <div className="space-y-3">
        {list.length === 0 ? (
          <div className="rounded-xl border-2 border-dashed p-12 text-center">
            <p className="text-base text-muted-foreground mb-4">
              아직 등록된 프로그램이 없습니다.
            </p>
            <Link
              href="/admin/programs/new"
              className={cn(buttonVariants(), "h-12 px-6 text-base")}
            >
              <Plus className="h-5 w-5 mr-1.5" />첫 프로그램 만들기
            </Link>
          </div>
        ) : (
          list.map((p, i) => (
            <div
              key={p.id}
              className="rounded-xl border-2 bg-background p-5 hover:border-primary/40 transition-colors flex items-center gap-5 flex-wrap sm:flex-nowrap"
            >
              <div className="text-2xl font-bold text-muted-foreground w-10 text-center shrink-0">
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="text-lg font-bold truncate">{p.title}</h3>
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
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {p.subtitle}
                </p>
                <p className="text-xs text-muted-foreground/70 mt-1 font-mono">
                  /programs/{p.slug} · {p.season}
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Link
                  href={`/admin/programs/${p.id}/edit`}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "h-12 px-5 text-base font-semibold"
                  )}
                >
                  <Pencil className="h-4 w-4 mr-1.5" />
                  수정하기
                </Link>
                <DeleteProgramButton id={p.id} title={p.title} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
