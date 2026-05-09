"use client";

import * as React from "react";
import { Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * 카드형 동적 배열 입력. 각 항목을 카드로 명확히 구분.
 * 60대 사용자가 잘못 삭제하지 않도록 큰 텍스트 버튼 + 확인 다이얼로그.
 */
export function ArrayCardField<T>({
  label,
  itemLabel,
  help,
  items,
  renderItem,
  onAdd,
  onRemove,
  addText = "+ 항목 추가하기",
  emptyText = "아직 항목이 없습니다. 아래 버튼을 눌러 추가해 주세요.",
  confirmDeleteText = "이 항목을 삭제할까요?",
}: {
  label: string;
  itemLabel: string; // e.g. "포인트", "일정", "질문"
  help?: string;
  items: T[];
  renderItem: (item: T, idx: number) => React.ReactNode;
  onAdd: () => void;
  onRemove: (idx: number) => void;
  addText?: string;
  emptyText?: string;
  confirmDeleteText?: string;
}) {
  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-base font-semibold">{label}</h3>
        {help && <p className="text-sm text-muted-foreground mt-1">{help}</p>}
      </div>

      <div className="space-y-3">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground italic px-1">
            {emptyText}
          </p>
        ) : (
          items.map((item, idx) => (
            <div
              key={idx}
              className="border-2 border-border rounded-lg p-4 bg-muted/20 space-y-3"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold text-muted-foreground">
                  {itemLabel} {idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(confirmDeleteText)) onRemove(idx);
                  }}
                  className={cn(
                    "inline-flex items-center gap-1 h-10 px-3 rounded-md text-sm font-medium",
                    "border-2 border-destructive/40 text-destructive bg-background",
                    "hover:bg-destructive/10 hover:border-destructive transition-colors"
                  )}
                >
                  <Trash2 className="h-4 w-4" />
                  삭제
                </button>
              </div>
              <div>{renderItem(item, idx)}</div>
            </div>
          ))
        )}
      </div>

      <button
        type="button"
        onClick={onAdd}
        className={cn(
          "w-full h-14 rounded-lg border-2 border-dashed border-primary/40",
          "text-primary text-base font-semibold bg-primary/5",
          "hover:bg-primary/10 hover:border-primary transition-colors",
          "flex items-center justify-center gap-2"
        )}
      >
        <Plus className="h-5 w-5" />
        {addText}
      </button>
    </div>
  );
}
