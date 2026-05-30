"use client";

import * as React from "react";
import Image from "next/image";
import { ImagePlus, Pencil, Trash2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { uploadImageFile } from "./upload-image";

const SLOT_COUNT = 6;

/**
 * 갤러리 사진 — 6장 고정 슬롯 카드 UI.
 * - 채워진 슬롯: 사진 + [수정][삭제]
 * - 첫 빈 슬롯: 플레이스홀더 + [사진 넣기]
 * - 그 외 빈 슬롯: 플레이스홀더(비활성)
 * - 컴퓨터에서 사진 업로드
 */
export function GalleryPicker({
  label = "갤러리 사진",
  help = "프로그램 상세 페이지에 표시됩니다. 최대 6장까지 넣을 수 있어요.",
  value,
  onChange,
}: {
  label?: string;
  help?: string;
  value: string[];
  onChange: (next: string[]) => void;
  /** 호환용 (사용 안 함) */
  catalog?: "program" | "product";
}) {
  const [uploadingSlot, setUploadingSlot] = React.useState<number | null>(null);
  const [targetSlot, setTargetSlot] = React.useState<number | null>(null);
  const fileRef = React.useRef<HTMLInputElement>(null);

  const filled = value.filter(Boolean);
  const filledCount = filled.length;

  function pickFileFor(slot: number) {
    setTargetSlot(slot);
    fileRef.current?.click();
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || targetSlot === null) return;

    const slot = targetSlot;
    setUploadingSlot(slot);
    try {
      const url = await uploadImageFile(file);
      const next = [...filled];
      if (slot < next.length) {
        next[slot] = url; // 수정(교체)
      } else {
        next.push(url); // 추가
      }
      onChange(next.slice(0, SLOT_COUNT));
      toast.success("사진이 업로드되었습니다.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "업로드 실패");
    } finally {
      setUploadingSlot(null);
      setTargetSlot(null);
    }
  }

  function removeSlot(slot: number) {
    if (!confirm("이 사진을 갤러리에서 삭제할까요?")) return;
    const next = filled.filter((_, i) => i !== slot);
    onChange(next);
  }

  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-base font-semibold">{label}</h3>
        <p className="text-sm text-muted-foreground mt-1">{help}</p>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFile}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {Array.from({ length: SLOT_COUNT }, (_, i) => {
          const url = filled[i] ?? null;
          const isUploading = uploadingSlot === i;
          const isFirstEmpty = !url && i === filledCount;

          // 채워진 슬롯
          if (url) {
            return (
              <div
                key={i}
                className="border-2 rounded-lg overflow-hidden bg-background"
              >
                <div className="relative aspect-[4/3] bg-muted/30">
                  <Image
                    src={url}
                    alt={`갤러리 사진 ${i + 1}`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <span className="absolute top-2 left-2 inline-flex items-center justify-center w-7 h-7 rounded-full bg-background/90 text-sm font-bold shadow">
                    {i + 1}
                  </span>
                  {isUploading && (
                    <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  )}
                </div>
                <div className="flex border-t">
                  <button
                    type="button"
                    disabled={isUploading}
                    onClick={() => pickFileFor(i)}
                    className="flex-1 h-10 inline-flex items-center justify-center gap-1 text-sm font-medium hover:bg-muted transition-colors disabled:opacity-50"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    수정
                  </button>
                  <div className="w-px bg-border" />
                  <button
                    type="button"
                    disabled={isUploading}
                    onClick={() => removeSlot(i)}
                    className="flex-1 h-10 inline-flex items-center justify-center gap-1 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    삭제
                  </button>
                </div>
              </div>
            );
          }

          // 빈 슬롯 (플레이스홀더)
          return (
            <div
              key={i}
              className={cn(
                "border-2 border-dashed rounded-lg overflow-hidden",
                isFirstEmpty ? "border-primary/40" : "border-border"
              )}
            >
              <button
                type="button"
                disabled={!isFirstEmpty || isUploading}
                onClick={() => pickFileFor(i)}
                className={cn(
                  "w-full aspect-[4/3] flex flex-col items-center justify-center gap-2 transition-colors",
                  isFirstEmpty
                    ? "bg-primary/5 hover:bg-primary/10 cursor-pointer text-primary"
                    : "bg-muted/20 text-muted-foreground/40 cursor-default"
                )}
              >
                {isUploading ? (
                  <Loader2 className="h-7 w-7 animate-spin" />
                ) : (
                  <>
                    <ImagePlus className="h-8 w-8" />
                    <span className="text-sm font-medium">
                      {isFirstEmpty ? "사진 넣기" : "사진 없음"}
                    </span>
                  </>
                )}
              </button>
              {/* 슬롯 번호 */}
              <span className="sr-only">슬롯 {i + 1}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
