"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Save, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * 화면 하단 고정 저장 바.
 * - 변경사항 표시
 * - 페이지 떠나려 할 때 경고 (변경사항 있을 때)
 */
export function StickyFormActions({
  saving,
  isDirty,
  isEdit,
  onSubmit,
}: {
  saving: boolean;
  isDirty: boolean;
  isEdit: boolean;
  onSubmit?: () => void;
}) {
  const router = useRouter();

  // 변경사항 있는 채로 페이지 떠날 때 브라우저 경고
  React.useEffect(() => {
    if (!isDirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty]);

  function handleCancel() {
    if (
      isDirty &&
      !confirm("저장하지 않은 변경사항이 있습니다. 정말 취소할까요?")
    ) {
      return;
    }
    router.back();
  }

  return (
    <>
      {/* 폼 아래 여백 (sticky 바에 가려지지 않도록) */}
      <div className="h-24" />

      <div className="fixed bottom-0 left-0 md:left-60 right-0 z-30 bg-background border-t-2 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
        <div className="px-4 sm:px-8 py-3 sm:py-4 flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={handleCancel}
              className={cn(
                "h-12 px-4 sm:px-5 rounded-md border-2 text-sm sm:text-base font-medium",
                "border-border bg-background hover:bg-muted/50 transition-colors",
                "flex items-center gap-1.5 sm:gap-2"
              )}
            >
              <X className="h-4 w-4" />
              취소
            </button>
            {isDirty && (
              <span className="hidden lg:inline-flex items-center gap-1.5 text-sm text-amber-700">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                저장하지 않은 변경사항이 있습니다
              </span>
            )}
          </div>
          <button
            type={onSubmit ? "button" : "submit"}
            onClick={onSubmit}
            disabled={saving}
            className={cn(
              "h-12 sm:h-14 min-w-[140px] sm:min-w-[200px] px-4 sm:px-8 rounded-md text-sm sm:text-base font-bold",
              "bg-primary text-primary-foreground hover:bg-primary/90 transition-colors",
              "flex items-center justify-center gap-1.5 sm:gap-2",
              "disabled:opacity-60 disabled:cursor-not-allowed"
            )}
          >
            <Save className="h-4 w-4 sm:h-5 sm:w-5" />
            {saving ? "저장 중…" : isEdit ? "수정 저장하기" : "새로 만들기"}
          </button>
        </div>
      </div>
    </>
  );
}
