"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";
import {
  createProgram,
  updateProgram,
  type ProgramFormData,
} from "@/app/admin/programs/actions";
import type { Program } from "@/db";

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
  sortOrder: 0,
  isPublished: true,
};

export function ProgramForm({ initial }: { initial?: Program }) {
  const router = useRouter();
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
          faq: initial.faq.length ? initial.faq : [{ question: "", answer: "" }],
          sortOrder: initial.sortOrder,
          isPublished: initial.isPublished,
        }
      : empty
  );

  function update<K extends keyof ProgramFormData>(
    key: K,
    value: ProgramFormData[K]
  ) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    start(async () => {
      try {
        if (initial) {
          await updateProgram(initial.id, data);
        } else {
          await createProgram(data);
        }
        toast.success("저장되었습니다.");
      } catch (err) {
        const msg = err instanceof Error ? err.message : "저장 중 오류";
        // redirect() throws — 정상 흐름이므로 무시
        if (msg.includes("NEXT_REDIRECT")) return;
        toast.error(msg);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="제목" required>
          <Input
            value={data.title}
            onChange={(e) => update("title", e.target.value)}
            required
          />
        </Field>
        <Field label="슬러그 (URL)" required help="영문/하이픈만, 예: mulberry-picking">
          <Input
            value={data.slug}
            onChange={(e) => update("slug", e.target.value)}
            pattern="[a-z0-9-]+"
            required
          />
        </Field>
      </div>

      <Field label="부제목" required>
        <Input
          value={data.subtitle}
          onChange={(e) => update("subtitle", e.target.value)}
          required
        />
      </Field>

      <Field label="설명" required>
        <Textarea
          rows={5}
          value={data.description}
          onChange={(e) => update("description", e.target.value)}
          required
        />
      </Field>

      <Field label="대표 이미지 경로" required help="예: /images/mulberry-picking.jpg">
        <Input
          value={data.image}
          onChange={(e) => update("image", e.target.value)}
          required
        />
      </Field>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Field label="소요 시간" required>
          <Input
            value={data.duration}
            onChange={(e) => update("duration", e.target.value)}
            required
          />
        </Field>
        <Field label="수용 인원" required>
          <Input
            value={data.capacity}
            onChange={(e) => update("capacity", e.target.value)}
            required
          />
        </Field>
        <Field label="대상" required>
          <Input
            value={data.target}
            onChange={(e) => update("target", e.target.value)}
            required
          />
        </Field>
        <Field label="시즌" required>
          <Input
            value={data.season}
            onChange={(e) => update("season", e.target.value)}
            required
          />
        </Field>
      </div>

      {/* Highlights */}
      <ArrayField
        label="주요 포인트"
        items={data.highlights}
        renderItem={(val, idx) => (
          <Input
            value={val}
            onChange={(e) => {
              const arr = [...data.highlights];
              arr[idx] = e.target.value;
              update("highlights", arr);
            }}
            placeholder="포인트 내용"
          />
        )}
        onAdd={() => update("highlights", [...data.highlights, ""])}
        onRemove={(idx) =>
          update(
            "highlights",
            data.highlights.filter((_, i) => i !== idx)
          )
        }
      />

      {/* Schedule */}
      <ArrayField
        label="일정"
        items={data.schedule}
        renderItem={(item, idx) => (
          <div className="grid grid-cols-[120px_1fr] gap-2">
            <Input
              value={item.time}
              onChange={(e) => {
                const arr = [...data.schedule];
                arr[idx] = { ...arr[idx], time: e.target.value };
                update("schedule", arr);
              }}
              placeholder="09:30"
            />
            <Input
              value={item.activity}
              onChange={(e) => {
                const arr = [...data.schedule];
                arr[idx] = { ...arr[idx], activity: e.target.value };
                update("schedule", arr);
              }}
              placeholder="활동 내용"
            />
          </div>
        )}
        onAdd={() =>
          update("schedule", [...data.schedule, { time: "", activity: "" }])
        }
        onRemove={(idx) =>
          update(
            "schedule",
            data.schedule.filter((_, i) => i !== idx)
          )
        }
      />

      {/* FAQ */}
      <ArrayField
        label="자주 묻는 질문"
        items={data.faq}
        renderItem={(item, idx) => (
          <div className="space-y-2">
            <Input
              value={item.question}
              onChange={(e) => {
                const arr = [...data.faq];
                arr[idx] = { ...arr[idx], question: e.target.value };
                update("faq", arr);
              }}
              placeholder="질문"
            />
            <Textarea
              rows={2}
              value={item.answer}
              onChange={(e) => {
                const arr = [...data.faq];
                arr[idx] = { ...arr[idx], answer: e.target.value };
                update("faq", arr);
              }}
              placeholder="답변"
            />
          </div>
        )}
        onAdd={() =>
          update("faq", [...data.faq, { question: "", answer: "" }])
        }
        onRemove={(idx) =>
          update(
            "faq",
            data.faq.filter((_, i) => i !== idx)
          )
        }
      />

      <div className="grid grid-cols-2 gap-4">
        <Field label="정렬 순서" help="작은 숫자가 먼저 표시">
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
            <span className="text-sm">사이트에 표시</span>
          </label>
        </Field>
      </div>

      <div className="flex gap-2 pt-4 border-t">
        <Button type="submit" disabled={pending}>
          {pending ? "저장 중…" : initial ? "수정" : "생성"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
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

function ArrayField<T>({
  label,
  items,
  renderItem,
  onAdd,
  onRemove,
}: {
  label: string;
  items: T[];
  renderItem: (item: T, idx: number) => React.ReactNode;
  onAdd: () => void;
  onRemove: (idx: number) => void;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-sm">{label}</Label>
      <div className="space-y-2">
        {items.map((item, idx) => (
          <div key={idx} className="flex gap-2 items-start">
            <div className="flex-1">{renderItem(item, idx)}</div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onRemove(idx)}
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
        ))}
      </div>
      <Button type="button" variant="outline" size="sm" onClick={onAdd}>
        <Plus className="h-3.5 w-3.5 mr-1" />
        항목 추가
      </Button>
    </div>
  );
}
