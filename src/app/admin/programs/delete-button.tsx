"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteProgram } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function DeleteProgramButton({ id, title }: { id: number; title: string }) {
  const [pending, start] = useTransition();
  const router = useRouter();
  return (
    <Button
      variant="outline"
      size="sm"
      disabled={pending}
      onClick={() => {
        if (!confirm(`"${title}" 프로그램을 삭제하시겠어요?`)) return;
        start(async () => {
          try {
            await deleteProgram(id);
            toast.success("프로그램이 삭제되었습니다.");
            router.refresh();
          } catch (e) {
            toast.error("삭제 중 오류가 발생했습니다.");
            console.error(e);
          }
        });
      }}
    >
      <Trash2 className="h-3.5 w-3.5 mr-1 text-destructive" />
      삭제
    </Button>
  );
}
