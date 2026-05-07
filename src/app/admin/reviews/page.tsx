import { db, reviews, programs } from "@/db";
import { desc } from "drizzle-orm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">후기 관리</h1>
          <p className="text-sm text-muted-foreground mt-1">
            게시 여부를 토글하거나 후기를 추가/삭제합니다.
          </p>
        </div>
        <NewReviewDialog programs={programList} />
      </div>

      <div className="rounded-md border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>프로그램</TableHead>
              <TableHead>작성자</TableHead>
              <TableHead>내용</TableHead>
              <TableHead className="w-16">평점</TableHead>
              <TableHead className="w-20">게시</TableHead>
              <TableHead className="text-right">작업</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviewList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                  등록된 후기가 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              reviewList.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="text-xs">
                    {programLabel(r.programSlug)}
                  </TableCell>
                  <TableCell>{r.name}</TableCell>
                  <TableCell className="max-w-md">
                    <p className="line-clamp-2 text-sm">{r.content}</p>
                  </TableCell>
                  <TableCell>{"★".repeat(r.rating)}</TableCell>
                  <TableCell>
                    <ReviewActions
                      id={r.id}
                      isPublished={r.isPublished}
                      mode="toggle"
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <ReviewActions
                      id={r.id}
                      isPublished={r.isPublished}
                      mode="delete"
                    />
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
