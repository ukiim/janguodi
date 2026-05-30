"use client";

import * as React from "react";
import Image from "next/image";
import { ImageIcon, FolderOpen, Upload, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { FieldShell } from "./big-input";
import { uploadImageFile } from "./upload-image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

/**
 * 사용 가능한 사진 카탈로그 (미리 준비된 기본 사진).
 */
const PROGRAM_IMAGES = [
  { path: "/images/mulberry-picking.jpg", label: "오디 수확" },
  { path: "/images/citrus-picking.jpg", label: "감귤 수확" },
  { path: "/images/mulberry-jam.jpg", label: "오디잼" },
  { path: "/images/farm-nature.jpg", label: "농장 자연" },
];

const PRODUCT_IMAGES = [
  { path: "/images/product-mulberry-jam.jpg", label: "오디잼" },
  { path: "/images/product-mulberry-juice.jpg", label: "오디 주스" },
  { path: "/images/product-fresh-citrus.jpg", label: "감귤" },
  { path: "/images/product-citrus-cheong.jpg", label: "감귤청" },
  { path: "/images/product-mulberry-vinegar.jpg", label: "오디 식초" },
  { path: "/images/product-gift-set.jpg", label: "선물세트" },
];

export const IMAGE_CATALOG = {
  program: PROGRAM_IMAGES,
  product: PRODUCT_IMAGES,
};

export function ImagePicker({
  label = "대표 사진",
  value,
  onChange,
  catalog = "program",
  required,
  help = "내 컴퓨터에서 사진을 올리거나, 준비된 사진 중에서 고를 수 있습니다.",
}: {
  label?: string;
  value: string;
  onChange: (next: string) => void;
  catalog?: "program" | "product";
  required?: boolean;
  help?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [imgError, setImgError] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setImgError(false);
  }, [value]);

  const items = IMAGE_CATALOG[catalog];

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = ""; // 같은 파일 재선택 가능하도록
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImageFile(file);
      onChange(url);
      toast.success("사진이 업로드되었습니다.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "업로드 실패");
    } finally {
      setUploading(false);
    }
  }

  return (
    <FieldShell label={label} required={required} help={help}>
      <div className="flex flex-col sm:flex-row gap-4">
        {/* 미리보기 */}
        <div className="w-full sm:w-48 aspect-[4/3] rounded-lg border-2 bg-muted/30 overflow-hidden flex items-center justify-center shrink-0 relative">
          {value && !imgError ? (
            <Image
              src={value}
              alt="미리보기"
              width={400}
              height={300}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
              unoptimized
            />
          ) : (
            <div className="text-center text-muted-foreground p-4">
              <ImageIcon className="h-10 w-10 mx-auto mb-2 opacity-50" />
              <p className="text-sm">
                {imgError ? "사진을 찾을 수 없습니다" : "사진 미리보기"}
              </p>
            </div>
          )}
          {uploading && (
            <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
              <Loader2 className="h-7 w-7 animate-spin text-primary" />
            </div>
          )}
        </div>

        {/* 버튼들 */}
        <div className="flex-1 space-y-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFile}
          />
          <button
            type="button"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "w-full h-14 rounded-lg border-2 border-primary bg-primary",
              "text-primary-foreground text-base font-semibold hover:bg-primary/90",
              "flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
            )}
          >
            {uploading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Upload className="h-5 w-5" />
            )}
            {uploading ? "올리는 중…" : "내 컴퓨터에서 사진 올리기"}
          </button>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
              render={
                <button
                  type="button"
                  className={cn(
                    "w-full h-12 rounded-lg border-2 border-primary/40 bg-primary/5",
                    "text-primary text-sm font-semibold hover:bg-primary/10",
                    "flex items-center justify-center gap-2 transition-colors"
                  )}
                >
                  <FolderOpen className="h-4 w-4" />
                  준비된 사진에서 고르기
                </button>
              }
            />
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle className="text-xl">사진 선택</DialogTitle>
              </DialogHeader>
              <p className="text-sm text-muted-foreground">
                아래 사진 중 사용할 사진을 클릭하세요.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[60vh] overflow-y-auto py-2">
                {items.map((it) => {
                  const selected = it.path === value;
                  return (
                    <button
                      type="button"
                      key={it.path}
                      onClick={() => {
                        onChange(it.path);
                        setOpen(false);
                      }}
                      className={cn(
                        "rounded-lg overflow-hidden border-2 transition-all text-left",
                        selected
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
                      </div>
                    </button>
                  );
                })}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </FieldShell>
  );
}
