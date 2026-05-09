"use client";

import * as React from "react";
import Image from "next/image";
import { FolderOpen, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IMAGE_CATALOG } from "./image-picker";

/**
 * 갤러리 사진 여러 장을 관리하는 컴포넌트.
 * - "사진 추가" 버튼 → 갤러리에서 한 번에 여러 장 선택 가능
 * - 각 사진을 카드로 표시 (썸네일 + 위/아래 순서 변경 + 삭제)
 */
export function GalleryPicker({
  label = "갤러리 사진",
  help = "프로그램 상세 페이지에서 보여줄 사진들입니다. 6장 정도 추천.",
  value,
  onChange,
  catalog = "program",
}: {
  label?: string;
  help?: string;
  value: string[];
  onChange: (next: string[]) => void;
  catalog?: "program" | "product";
}) {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<string[]>([]);
  const items = IMAGE_CATALOG[catalog];

  function openPicker() {
    setSelected([]);
    setOpen(true);
  }

  function toggleSelect(path: string) {
    setSelected((s) =>
      s.includes(path) ? s.filter((p) => p !== path) : [...s, path]
    );
  }

  function confirmAdd() {
    const merged = [...value, ...selected.filter((s) => !value.includes(s))];
    onChange(merged);
    setOpen(false);
  }

  function remove(idx: number) {
    if (!confirm("이 사진을 갤러리에서 빼시겠어요?")) return;
    onChange(value.filter((_, i) => i !== idx));
  }

  function move(idx: number, dir: -1 | 1) {
    const next = [...value];
    const target = idx + dir;
    if (target < 0 || target >= next.length) return;
    [next[idx], next[target]] = [next[target], next[idx]];
    onChange(next);
  }

  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-base font-semibold">{label}</h3>
        <p className="text-sm text-muted-foreground mt-1">{help}</p>
      </div>

      {value.length === 0 ? (
        <p className="text-sm text-muted-foreground italic px-1">
          아직 사진이 없습니다. 아래 버튼을 눌러 추가해 주세요.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {value.map((path, idx) => (
            <div
              key={`${path}-${idx}`}
              className="border-2 rounded-lg overflow-hidden bg-background"
            >
              <div className="relative aspect-[4/3] bg-muted/30">
                <Image
                  src={path}
                  alt={`사진 ${idx + 1}`}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <span className="absolute top-2 left-2 inline-flex items-center justify-center w-7 h-7 rounded-full bg-background/90 text-sm font-bold shadow">
                  {idx + 1}
                </span>
              </div>
              <div className="flex justify-between items-center p-2 bg-muted/20">
                <div className="flex gap-1">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => move(idx, -1)}
                    className="h-8 w-8 inline-flex items-center justify-center rounded border bg-background hover:bg-muted disabled:opacity-30"
                    title="앞으로"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    disabled={idx === value.length - 1}
                    onClick={() => move(idx, 1)}
                    className="h-8 w-8 inline-flex items-center justify-center rounded border bg-background hover:bg-muted disabled:opacity-30"
                    title="뒤로"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => remove(idx)}
                  className="h-8 px-2 inline-flex items-center gap-1 rounded border-2 border-destructive/40 text-destructive bg-background hover:bg-destructive/10 text-xs font-semibold"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  빼기
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          render={
            <button
              type="button"
              onClick={openPicker}
              className={cn(
                "w-full h-14 rounded-lg border-2 border-dashed border-primary/40",
                "text-primary text-base font-semibold bg-primary/5",
                "hover:bg-primary/10 hover:border-primary transition-colors",
                "flex items-center justify-center gap-2"
              )}
            >
              <FolderOpen className="h-5 w-5" />
              사진 추가하기
            </button>
          }
        />
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl">갤러리에 추가할 사진 선택</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            여러 장을 한 번에 선택할 수 있습니다. (이미 추가된 사진은 비활성화)
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[55vh] overflow-y-auto py-2">
            {items.map((it) => {
              const already = value.includes(it.path);
              const checked = selected.includes(it.path);
              return (
                <button
                  type="button"
                  key={it.path}
                  disabled={already}
                  onClick={() => toggleSelect(it.path)}
                  className={cn(
                    "rounded-lg overflow-hidden border-2 text-left transition-all relative",
                    already
                      ? "opacity-40 cursor-not-allowed border-transparent"
                      : checked
                        ? "border-primary ring-2 ring-primary/30"
                        : "border-transparent hover:border-primary/50"
                  )}
                >
                  <div className="aspect-[4/3] bg-muted overflow-hidden">
                    <Image
                      src={it.path}
                      alt={it.label}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="px-3 py-2 text-sm font-medium bg-background">
                    {it.label}
                    {already && (
                      <span className="ml-2 text-xs text-muted-foreground">
                        (이미 추가됨)
                      </span>
                    )}
                  </div>
                  {checked && !already && (
                    <span className="absolute top-2 right-2 inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold shadow">
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <div className="flex gap-2 pt-3 border-t">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="h-12 px-5 rounded-md border-2 text-base font-medium hover:bg-muted/50"
            >
              취소
            </button>
            <button
              type="button"
              disabled={selected.length === 0}
              onClick={confirmAdd}
              className="flex-1 h-12 px-5 rounded-md text-base font-bold bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              {selected.length > 0
                ? `${selected.length}장 추가하기`
                : "사진을 선택하세요"}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
