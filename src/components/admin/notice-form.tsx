"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  createNotice,
  updateNotice,
  type NoticeFormData,
} from "@/app/admin/notices/actions";
import type { Notice } from "@/db";
import {
  BigInput,
  BigTextarea,
  BigToggle,
  FormSection,
} from "@/components/admin/big-input";
import { StickyFormActions } from "@/components/admin/sticky-form-actions";

const empty: NoticeFormData = {
  title: "",
  content: "",
  isImportant: false,
  isPublished: true,
};

export function NoticeForm({ initial }: { initial?: Notice }) {
  const isEdit = !!initial;
  const [pending, start] = useTransition();
  const [data, setData] = useState<NoticeFormData>(
    initial
      ? {
          title: initial.title,
          content: initial.content,
          isImportant: initial.isImportant,
          isPublished: initial.isPublished,
        }
      : empty
  );
  const [isDirty, setIsDirty] = useState(false);

  function update<K extends keyof NoticeFormData>(
    key: K,
    value: NoticeFormData[K]
  ) {
    setData((d) => ({ ...d, [key]: value }));
    setIsDirty(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!data.title.trim()) {
      toast.error("제목을 입력해 주세요.");
      return;
    }
    if (!data.content.trim()) {
      toast.error("내용을 입력해 주세요.");
      return;
    }
    start(async () => {
      try {
        if (isEdit) await updateNotice(initial!.id, data);
        else await createNotice(data);
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
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <FormSection title="공지 내용" step={1}>
        <BigInput
          label="제목"
          required
          value={data.title}
          onChange={(e) => update("title", e.target.value)}
          placeholder="예: 2026년 봄 체험 일정 안내"
        />
        <BigTextarea
          label="내용"
          required
          rows={10}
          value={data.content}
          onChange={(e) => update("content", e.target.value)}
          placeholder="공지사항 본문을 적어주세요. 줄 바꿈도 그대로 표시됩니다."
        />
      </FormSection>

      <FormSection title="설정" step={2}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BigToggle
            label="홈페이지에 보이기"
            checked={data.isPublished}
            onChange={(v) => update("isPublished", v)}
          />
          <BigToggle
            label="중요 공지"
            checked={data.isImportant}
            onChange={(v) => update("isImportant", v)}
            onText="중요 표시"
            offText="일반 공지"
          />
        </div>
        <p className="text-sm text-muted-foreground">
          중요 공지는 목록 위에 빨간 배지와 함께 강조 표시됩니다.
        </p>
      </FormSection>

      <StickyFormActions saving={pending} isDirty={isDirty} isEdit={isEdit} />
    </form>
  );
}
