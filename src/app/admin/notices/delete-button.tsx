"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteNotice } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function DeleteNoticeButton({ id, title }: { id: number; title: string }) {
  const [pending, start] = useTransition();
  const router = useRouter();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!confirm(`"${title}" 공지를 삭제할까요?`)) return;
        if (!confirm("정말 삭제하시겠어요? 이 작업은 되돌릴 수 없습니다.")) return;
        start(async () => {
          try {
            await deleteNotice(id);
            toast.success("공지가 삭제되었습니다.");
            router.refresh();
          } catch (e) {
            toast.error("삭제 중 오류가 발생했습니다.");
            console.error(e);
          }
        });
      }}
      className={cn(
        "h-12 px-5 rounded-md text-base font-semibold inline-flex items-center",
        "border-2 border-destructive/40 text-destructive bg-background",
        "hover:bg-destructive/10 hover:border-destructive transition-colors",
        "disabled:opacity-50"
      )}
    >
      <Trash2 className="h-4 w-4 mr-1.5" />
      삭제하기
    </button>
  );
}
