"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  createProgram,
  updateProgram,
  type ProgramFormData,
} from "@/app/admin/programs/actions";
import type { Program } from "@/db";
import {
  BigInput,
  BigTextarea,
  BigToggle,
  FormSection,
} from "@/components/admin/big-input";
import { ArrayCardField } from "@/components/admin/array-card-field";
import { ImagePicker } from "@/components/admin/image-picker";
import { GalleryPicker } from "@/components/admin/gallery-picker";
import { StickyFormActions } from "@/components/admin/sticky-form-actions";
import { SlugInput } from "@/components/admin/slug-input";

const empty: ProgramFormData = {
  slug: "",
  title: "",
  subtitle: "",
  description: "",
  image: "",
  duration: "",
  capacity: "",
  target: "",
  season: "",
  highlights: [""],
  schedule: [{ time: "", activity: "" }],
  faq: [{ question: "", answer: "" }],
  gallery: [],
  sortOrder: 0,
  isPublished: true,
};

export function ProgramForm({ initial }: { initial?: Program }) {
  const isEdit = !!initial;
  const [pending, start] = useTransition();
  const [data, setData] = useState<ProgramFormData>(
    initial
      ? {
          slug: initial.slug,
          title: initial.title,
          subtitle: initial.subtitle,
          description: initial.description,
          image: initial.image,
          duration: initial.duration,
          capacity: initial.capacity,
          target: initial.target,
          season: initial.season,
          highlights: initial.highlights.length ? initial.highlights : [""],
          schedule: initial.schedule.length
            ? initial.schedule
            : [{ time: "", activity: "" }],
          faq: initial.faq.length
            ? initial.faq
            : [{ question: "", answer: "" }],
          gallery: initial.gallery ?? [],
          sortOrder: initial.sortOrder,
          isPublished: initial.isPublished,
        }
      : empty
  );
  const [isDirty, setIsDirty] = useState(false);

  function update<K extends keyof ProgramFormData>(
    key: K,
    value: ProgramFormData[K]
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
    if (!data.image.trim()) {
      toast.error("대표 사진을 선택해 주세요.");
      return;
    }
    start(async () => {
      try {
        if (isEdit) {
          await updateProgram(initial!.id, data);
        } else {
          await createProgram(data);
        }
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
          label="프로그램 제목"
          required
          value={data.title}
          onChange={(e) => update("title", e.target.value)}
          placeholder="예: 오디 수확 체험"
          help="홈페이지 카드에 크게 표시되는 이름입니다."
        />
        <BigInput
          label="짧은 한 줄 설명 (부제목)"
          required
          value={data.subtitle}
          onChange={(e) => update("subtitle", e.target.value)}
          placeholder="예: 탐스러운 오디를 직접 따고, 잼과 주스도 만들어요"
          help="제목 아래 작게 표시됩니다."
        />
        <BigTextarea
          label="자세한 설명"
          required
          rows={6}
          value={data.description}
          onChange={(e) => update("description", e.target.value)}
          placeholder="프로그램에 대해 자세히 적어주세요. 어떤 활동을 하는지, 무엇을 배우는지 등을 설명하면 좋아요."
          help="프로그램 상세 페이지에 표시됩니다."
        />
        <BigInput
          label="운영 시기"
          required
          value={data.season}
          onChange={(e) => update("season", e.target.value)}
          example="여름 (6~7월), 연중 운영"
          help="언제 이 체험을 할 수 있는지 적어주세요."
        />
      </FormSection>

      {/* 2. 체험 정보 */}
      <FormSection title="체험 정보" step={2}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <BigInput
            label="소요 시간"
            required
            value={data.duration}
            onChange={(e) => update("duration", e.target.value)}
            example="2시간 30분"
          />
          <BigInput
            label="수용 인원"
            required
            value={data.capacity}
            onChange={(e) => update("capacity", e.target.value)}
            example="20~40명"
          />
          <BigInput
            label="대상"
            required
            value={data.target}
            onChange={(e) => update("target", e.target.value)}
            example="유아(5세) 이상"
          />
        </div>
      </FormSection>

      {/* 3. 사진 */}
      <FormSection title="사진" step={3}>
        <ImagePicker
          label="대표 사진"
          required
          value={data.image}
          onChange={(v) => update("image", v)}
          catalog="program"
        />
        <div className="border-t pt-6">
          <GalleryPicker
            value={data.gallery}
            onChange={(v) => update("gallery", v)}
            catalog="program"
          />
        </div>
      </FormSection>

      {/* 4. 체험 내용 */}
      <FormSection title="체험 내용" step={4}>
        <ArrayCardField
          label="주요 포인트"
          itemLabel="포인트"
          help="이 체험의 핵심 매력을 짧게 적어주세요. 3~5개 추천."
          items={data.highlights}
          onAdd={() => update("highlights", [...data.highlights, ""])}
          onRemove={(idx) =>
            update(
              "highlights",
              data.highlights.filter((_, i) => i !== idx)
            )
          }
          renderItem={(val, idx) => (
            <input
              type="text"
              value={val}
              onChange={(e) => {
                const arr = [...data.highlights];
                arr[idx] = e.target.value;
                update("highlights", arr);
              }}
              placeholder="예: 잘 익은 오디 직접 수확 체험"
              className="w-full h-12 px-4 rounded-md border border-input bg-background text-[17px] focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          )}
        />

        <div className="border-t pt-6">
          <ArrayCardField
            label="시간별 일정"
            itemLabel="일정"
            help="시작 시간부터 마무리까지 단계별로 적어주세요."
            items={data.schedule}
            onAdd={() =>
              update("schedule", [
                ...data.schedule,
                { time: "", activity: "" },
              ])
            }
            onRemove={(idx) =>
              update(
                "schedule",
                data.schedule.filter((_, i) => i !== idx)
              )
            }
            renderItem={(item, idx) => (
              <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-3">
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">
                    시간
                  </label>
                  <input
                    type="text"
                    value={item.time}
                    onChange={(e) => {
                      const arr = [...data.schedule];
                      arr[idx] = { ...arr[idx], time: e.target.value };
                      update("schedule", arr);
                    }}
                    placeholder="09:30"
                    className="w-full h-12 px-4 rounded-md border bg-background text-[17px] font-mono focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">
                    활동 내용
                  </label>
                  <input
                    type="text"
                    value={item.activity}
                    onChange={(e) => {
                      const arr = [...data.schedule];
                      arr[idx] = { ...arr[idx], activity: e.target.value };
                      update("schedule", arr);
                    }}
                    placeholder="예: 집합 및 오리엔테이션"
                    className="w-full h-12 px-4 rounded-md border bg-background text-[17px] focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
              </div>
            )}
          />
        </div>
      </FormSection>

      {/* 5. 자주 묻는 질문 */}
      <FormSection title="자주 묻는 질문" step={5}>
        <ArrayCardField
          label="질문과 답변"
          itemLabel="질문"
          help="참가자들이 자주 묻는 질문과 답변을 적어주세요."
          items={data.faq}
          onAdd={() =>
            update("faq", [...data.faq, { question: "", answer: "" }])
          }
          onRemove={(idx) =>
            update(
              "faq",
              data.faq.filter((_, i) => i !== idx)
            )
          }
          renderItem={(item, idx) => (
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-muted-foreground mb-1">
                  질문
                </label>
                <input
                  type="text"
                  value={item.question}
                  onChange={(e) => {
                    const arr = [...data.faq];
                    arr[idx] = { ...arr[idx], question: e.target.value };
                    update("faq", arr);
                  }}
                  placeholder="예: 준비물은 무엇인가요?"
                  className="w-full h-12 px-4 rounded-md border bg-background text-[17px] focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">
                  답변
                </label>
                <textarea
                  rows={3}
                  value={item.answer}
                  onChange={(e) => {
                    const arr = [...data.faq];
                    arr[idx] = { ...arr[idx], answer: e.target.value };
                    update("faq", arr);
                  }}
                  placeholder="예: 편한 옷차림과 모자, 장갑을 준비해 주세요."
                  className="w-full px-4 py-3 rounded-md border bg-background text-[17px] leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary/40 resize-y"
                />
              </div>
            </div>
          )}
        />
      </FormSection>

      {/* 6. 공개 설정 */}
      <FormSection title="공개 설정" step={6}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BigToggle
            label="홈페이지에 보이기"
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
        <SlugInput
          title={data.title}
          value={data.slug}
          onChange={(v) => update("slug", v)}
          isEdit={isEdit}
        />
      </FormSection>

      {/* 하단 고정 저장 바 */}
      <StickyFormActions
        saving={pending}
        isDirty={isDirty}
        isEdit={isEdit}
      />
    </form>
  );
}
