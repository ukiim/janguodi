"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Star } from "lucide-react";
import { toast } from "sonner";
import { createReview } from "./actions";
import { BigInput, BigTextarea, BigToggle } from "@/components/admin/big-input";
import { cn } from "@/lib/utils";

export function NewReviewDialog({
  programs,
}: {
  programs: { slug: string; title: string }[];
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, start] = useTransition();
  const [programSlug, setProgramSlug] = useState(programs[0]?.slug ?? "");
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [isPublished, setIsPublished] = useState(true);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!programSlug) {
      toast.error("프로그램을 선택해 주세요.");
      return;
    }
    if (!name.trim() || !content.trim()) {
      toast.error("작성자와 내용을 입력해 주세요.");
      return;
    }
    start(async () => {
      try {
        await createReview({ programSlug, name, content, rating, isPublished });
        toast.success("후기가 추가되었습니다.");
        setOpen(false);
        setName("");
        setContent("");
        setRating(5);
        setIsPublished(true);
        router.refresh();
      } catch (err) {
        toast.error("추가 중 오류");
        console.error(err);
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <button
            type="button"
            className={cn(
              "h-14 px-6 rounded-md text-base font-bold inline-flex items-center gap-1.5",
              "bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
            )}
          >
            <Plus className="h-5 w-5" />
            새 후기 추가
          </button>
        }
      />

      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl">새 후기 추가</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-5">
          {/* 프로그램 선택 — 라디오 형태로 더 명확하게 */}
          <div className="space-y-2">
            <label className="block text-base font-semibold">
              어느 프로그램의 후기인가요? <span className="text-destructive">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {programs.map((p) => (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => setProgramSlug(p.slug)}
                  className={cn(
                    "h-12 px-4 rounded-md border-2 text-sm font-medium text-left transition-colors",
                    p.slug === programSlug
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-background hover:bg-muted/30"
                  )}
                >
                  {p.title}
                </button>
              ))}
            </div>
          </div>

          <BigInput
            label="작성자 이름"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="예: 김○○"
          />

          <BigTextarea
            label="후기 내용"
            required
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="참가자가 어떤 점이 좋았는지 적어주세요."
          />

          {/* 별점 — 클릭 가능한 별 5개 */}
          <div className="space-y-2">
            <label className="block text-base font-semibold">평점</label>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setRating(n)}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Star
                    className={cn(
                      "h-9 w-9",
                      n <= rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground/30"
                    )}
                  />
                </button>
              ))}
              <span className="ml-2 self-center text-base font-semibold text-muted-foreground">
                {rating}점
              </span>
            </div>
          </div>

          <BigToggle
            label="후기 공개"
            checked={isPublished}
            onChange={setIsPublished}
            onText="사이트에 보이기"
            offText="숨기기"
          />

          <div className="flex gap-2 pt-4 border-t">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="h-12 px-5 rounded-md border-2 text-base font-medium hover:bg-muted/50 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={pending}
              className="h-12 px-6 rounded-md text-base font-bold bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-60 transition-colors flex-1"
            >
              {pending ? "추가 중…" : "후기 추가하기"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
