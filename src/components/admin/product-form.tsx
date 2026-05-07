"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  createProduct,
  updateProduct,
  type ProductFormData,
} from "@/app/admin/products/actions";
import type { Product } from "@/db";

const empty: ProductFormData = {
  name: "",
  description: "",
  price: 0,
  image: "",
  storeUrl: "",
  badge: null,
  sortOrder: 0,
  isPublished: true,
};

export function ProductForm({ initial }: { initial?: Product }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [data, setData] = useState<ProductFormData>(
    initial
      ? {
          name: initial.name,
          description: initial.description,
          price: initial.price,
          image: initial.image,
          storeUrl: initial.storeUrl,
          badge: initial.badge,
          sortOrder: initial.sortOrder,
          isPublished: initial.isPublished,
        }
      : empty
  );

  function update<K extends keyof ProductFormData>(
    key: K,
    value: ProductFormData[K]
  ) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    start(async () => {
      try {
        if (initial) await updateProduct(initial.id, data);
        else await createProduct(data);
        toast.success("저장되었습니다.");
      } catch (err) {
        const msg = err instanceof Error ? err.message : "저장 중 오류";
        if (msg.includes("NEXT_REDIRECT")) return;
        toast.error(msg);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <Field label="상품명" required>
        <Input
          value={data.name}
          onChange={(e) => update("name", e.target.value)}
          required
        />
      </Field>

      <Field label="상품 설명" required>
        <Textarea
          rows={4}
          value={data.description}
          onChange={(e) => update("description", e.target.value)}
          required
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="가격 (원)" required>
          <Input
            type="number"
            min={0}
            value={data.price}
            onChange={(e) => update("price", Number(e.target.value))}
            required
          />
        </Field>
        <Field label="배지" help="예: 인기, 제철, NEW">
          <Input
            value={data.badge ?? ""}
            onChange={(e) => update("badge", e.target.value || null)}
          />
        </Field>
      </div>

      <Field label="이미지 경로" required help="예: /images/product-mulberry-jam.jpg">
        <Input
          value={data.image}
          onChange={(e) => update("image", e.target.value)}
          required
        />
      </Field>

      <Field label="네이버 스마트스토어 URL" required>
        <Input
          type="url"
          value={data.storeUrl}
          onChange={(e) => update("storeUrl", e.target.value)}
          required
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="정렬 순서">
          <Input
            type="number"
            value={data.sortOrder}
            onChange={(e) => update("sortOrder", Number(e.target.value))}
          />
        </Field>
        <Field label="게시 상태">
          <label className="flex items-center gap-2 h-9">
            <input
              type="checkbox"
              checked={data.isPublished}
              onChange={(e) => update("isPublished", e.target.checked)}
            />
            <span className="text-sm">스토어에 표시</span>
          </label>
        </Field>
      </div>

      <div className="flex gap-2 pt-4 border-t">
        <Button type="submit" disabled={pending}>
          {pending ? "저장 중…" : initial ? "수정" : "생성"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          취소
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  help,
  children,
}: {
  label: string;
  required?: boolean;
  help?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm">
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </Label>
      {children}
      {help && <p className="text-xs text-muted-foreground">{help}</p>}
    </div>
  );
}
