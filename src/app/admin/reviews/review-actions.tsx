"use client";

import { useTransition } from "react";
import { Trash2, Eye, EyeOff } from "lucide-react";
import { togglePublishReview, deleteReview } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function ReviewActions({
  id,
  isPublished,
  mode,
}: {
  id: number;
  isPublished: boolean;
  mode: "toggle" | "delete";
}) {
  const [pending, start] = useTransition();
  const router = useRouter();

  if (mode === "toggle") {
    return (
      <button
        type="button"
        disabled={pending}
        onClick={() =>
          start(async () => {
            try {
              await togglePublishReview(id, !isPublished);
              router.refresh();
            } catch (err) {
              toast.error("변경 중 오류");
              console.error(err);
            }
          })
        }
        className={cn(
          "h-10 px-4 rounded-md text-sm font-semibold inline-flex items-center gap-1.5 border-2 transition-colors",
          isPublished
            ? "border-primary/40 text-primary bg-primary/5 hover:bg-primary/10"
            : "border-border bg-muted/30 text-muted-foreground hover:bg-muted/50"
        )}
      >
        {isPublished ? (
          <>
            <Eye className="h-3.5 w-3.5" />
            게시중
          </>
        ) : (
          <>
            <EyeOff className="h-3.5 w-3.5" />
            숨김
          </>
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!confirm("이 후기를 삭제할까요? 되돌릴 수 없습니다.")) return;
        start(async () => {
          try {
            await deleteReview(id);
            toast.success("후기가 삭제되었습니다.");
            router.refresh();
          } catch (err) {
            toast.error("삭제 중 오류");
            console.error(err);
          }
        });
      }}
      className={cn(
        "h-10 px-3 rounded-md text-sm font-semibold inline-flex items-center gap-1.5",
        "border-2 border-destructive/40 text-destructive bg-background",
        "hover:bg-destructive/10 hover:border-destructive transition-colors",
        "disabled:opacity-50"
      )}
    >
      <Trash2 className="h-3.5 w-3.5" />
      삭제
    </button>
  );
}
