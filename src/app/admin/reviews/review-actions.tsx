"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { togglePublishReview, deleteReview } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
      <input
        type="checkbox"
        checked={isPublished}
        disabled={pending}
        onChange={(e) =>
          start(async () => {
            try {
              await togglePublishReview(id, e.target.checked);
              router.refresh();
            } catch (err) {
              toast.error("변경 중 오류");
              console.error(err);
            }
          })
        }
        className="h-4 w-4"
      />
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      disabled={pending}
      onClick={() => {
        if (!confirm("이 후기를 삭제하시겠어요?")) return;
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
    >
      <Trash2 className="h-3.5 w-3.5 text-destructive" />
    </Button>
  );
}
