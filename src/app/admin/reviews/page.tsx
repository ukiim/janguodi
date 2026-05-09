import { db, reviews, programs } from "@/db";
import { desc } from "drizzle-orm";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { ReviewActions } from "./review-actions";
import { NewReviewDialog } from "./new-review-dialog";

export const dynamic = "force-dynamic";

export default async function AdminReviewsPage() {
  const [reviewList, programList] = await Promise.all([
    db.select().from(reviews).orderBy(desc(reviews.createdAt)),
    db.select({ slug: programs.slug, title: programs.title }).from(programs),
  ]);

  const programLabel = (slug: string) =>
    programList.find((p) => p.slug === slug)?.title ?? slug;

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold">후기 관리</h1>
          <p className="text-base text-muted-foreground mt-2">
            참가자 후기를 추가하거나 게시 여부를 바꿀 수 있습니다.
          </p>
        </div>
        <NewReviewDialog programs={programList} />
      </div>

      <div className="space-y-3">
        {reviewList.length === 0 ? (
          <div className="rounded-xl border-2 border-dashed p-12 text-center">
            <p className="text-base text-muted-foreground">
              아직 등록된 후기가 없습니다. 위의 <b>새 후기 추가</b> 버튼을 눌러 시작하세요.
            </p>
          </div>
        ) : (
          reviewList.map((r) => (
            <div
              key={r.id}
              className="rounded-xl border-2 bg-background p-5 hover:border-primary/40 transition-colors"
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <span className="text-base font-bold">{r.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {programLabel(r.programSlug)}
                    </Badge>
                    <span className="inline-flex">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </span>
                  </div>
                  <p className="text-base text-foreground/90 leading-relaxed line-clamp-3">
                    &ldquo;{r.content}&rdquo;
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <ReviewActions
                    id={r.id}
                    isPublished={r.isPublished}
                    mode="toggle"
                  />
                  <ReviewActions
                    id={r.id}
                    isPublished={r.isPublished}
                    mode="delete"
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
