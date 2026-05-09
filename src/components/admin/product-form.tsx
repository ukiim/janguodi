"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  createProduct,
  updateProduct,
  type ProductFormData,
} from "@/app/admin/products/actions";
import type { Product } from "@/db";
import {
  BigInput,
  BigTextarea,
  BigToggle,
  FormSection,
} from "@/components/admin/big-input";
import { ImagePicker } from "@/components/admin/image-picker";
import { StickyFormActions } from "@/components/admin/sticky-form-actions";

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
  const isEdit = !!initial;
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
  const [isDirty, setIsDirty] = useState(false);

  function update<K extends keyof ProductFormData>(
    key: K,
    value: ProductFormData[K]
  ) {
    setData((d) => ({ ...d, [key]: value }));
    setIsDirty(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!data.name.trim()) {
      toast.error("상품명을 입력해 주세요.");
      return;
    }
    if (!data.image.trim()) {
      toast.error("상품 사진을 선택해 주세요.");
      return;
    }
    if (!data.storeUrl.trim()) {
      toast.error("스마트스토어 주소를 입력해 주세요.");
      return;
    }
    start(async () => {
      try {
        if (isEdit) await updateProduct(initial!.id, data);
        else await createProduct(data);
        setIsDirty(false);
        toast.success("저장되었습니다.");
      } catch (err) {
        const msg = err instanceof Error ? err.message : "저장 중 오류";
        if (msg.includes("NEXT_REDIRECT")) return;
        toast.error(`저장 실패: ${msg}`);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {/* 1. 기본 정보 */}
      <FormSection title="기본 정보" step={1}>
        <BigInput
          label="상품명"
          required
          value={data.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="예: 수제 오디잼 (300g)"
          help="스토어 카드에 표시되는 이름입니다."
        />
        <BigTextarea
          label="상품 설명"
          required
          rows={4}
          value={data.description}
          onChange={(e) => update("description", e.target.value)}
          placeholder="상품의 특징과 추천 이유를 간단히 적어주세요."
          help="상품 카드에 작게 표시됩니다."
        />
      </FormSection>

      {/* 2. 가격과 배지 */}
      <FormSection title="가격과 배지" step={2}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BigInput
            label="가격 (원)"
            required
            type="number"
            min={0}
            value={data.price}
            onChange={(e) => update("price", Number(e.target.value))}
            example="15000"
            help="원 단위, 숫자만 입력 (콤마 자동)"
          />
          <BigInput
            label="배지 (선택)"
            value={data.badge ?? ""}
            onChange={(e) => update("badge", e.target.value || null)}
            placeholder="예: 인기, 제철, NEW"
            help="상품 카드 좌상단에 표시됩니다."
          />
        </div>
      </FormSection>

      {/* 3. 사진 */}
      <FormSection title="상품 사진" step={3}>
        <ImagePicker
          label="상품 사진"
          required
          value={data.image}
          onChange={(v) => update("image", v)}
          catalog="product"
        />
      </FormSection>

      {/* 4. 네이버 스마트스토어 연결 */}
      <FormSection title="네이버 스마트스토어 연결" step={4}>
        <BigInput
          label="스마트스토어 상품 주소"
          required
          type="url"
          value={data.storeUrl}
          onChange={(e) => update("storeUrl", e.target.value)}
          placeholder="https://smartstore.naver.com/janguodi/products/1234567890"
          help="이 주소로 클릭이 연결됩니다. 네이버 스마트스토어 관리자에서 상품 URL을 복사해 붙여넣으세요."
        />
      </FormSection>

      {/* 5. 공개 설정 */}
      <FormSection title="공개 설정" step={5}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BigToggle
            label="스토어에 보이기"
            checked={data.isPublished}
            onChange={(v) => update("isPublished", v)}
          />
          <BigInput
            label="표시 순서"
            type="number"
            value={data.sortOrder}
            onChange={(e) => update("sortOrder", Number(e.target.value))}
            help="작은 숫자가 먼저 표시됩니다 (예: 1, 2, 3)."
          />
        </div>
      </FormSection>

      <StickyFormActions
        saving={pending}
        isDirty={isDirty}
        isEdit={isEdit}
      />
    </form>
  );
}
