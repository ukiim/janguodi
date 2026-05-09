"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { saveSettings, type SettingsFormData } from "./actions";
import { BigInput, FormSection } from "@/components/admin/big-input";
import { StickyFormActions } from "@/components/admin/sticky-form-actions";
import { Camera } from "lucide-react";

export function SettingsForm({ initial }: { initial: SettingsFormData }) {
  const [pending, start] = useTransition();
  const [data, setData] = useState<SettingsFormData>(initial);
  const [isDirty, setIsDirty] = useState(false);

  function update(key: keyof SettingsFormData, value: string) {
    setData((d) => ({ ...d, [key]: value }));
    setIsDirty(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    start(async () => {
      try {
        await saveSettings(data);
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormSection title="인스타그램" step={1}>
        <BigInput
          label="인스타그램 아이디"
          value={data.instagram_handle}
          onChange={(e) => update("instagram_handle", e.target.value)}
          placeholder="janguodi (앞에 @ 빼고 입력)"
          help="인스타그램 프로필 주소의 마지막 부분입니다."
          example="janguodi  →  instagram.com/janguodi"
        />
        <BigInput
          label="(선택) 전체 주소 직접 입력"
          value={data.instagram_url}
          onChange={(e) => update("instagram_url", e.target.value)}
          placeholder="https://www.instagram.com/janguodi/"
          help="아이디 대신 전체 주소를 쓰고 싶으면 여기에 입력하세요. (입력하면 위 아이디는 무시됩니다)"
        />
      </FormSection>

      <FormSection title="네이버 블로그" step={2}>
        <BigInput
          label="네이버 블로그 ID"
          value={data.naver_blog_id}
          onChange={(e) => update("naver_blog_id", e.target.value)}
          placeholder="janguodi"
          help="네이버 블로그 주소의 마지막 부분입니다."
          example="janguodi  →  blog.naver.com/janguodi"
        />
        <BigInput
          label="(선택) 전체 주소 직접 입력"
          value={data.naver_blog_url}
          onChange={(e) => update("naver_blog_url", e.target.value)}
          placeholder="https://blog.naver.com/janguodi"
          help="ID 대신 전체 주소를 쓰고 싶으면 여기에 입력하세요."
        />
      </FormSection>

      <div className="rounded-xl border bg-muted/30 p-5 flex items-start gap-3">
        <Camera className="h-5 w-5 mt-0.5 text-muted-foreground shrink-0" />
        <div className="text-sm text-muted-foreground">
          <p className="font-medium text-foreground mb-1">참고</p>
          <p>
            저장 후 <b>홈페이지 → 소식</b> 메뉴에서 입력한 인스타그램과 네이버
            블로그가 자동으로 표시됩니다.
          </p>
        </div>
      </div>

      <StickyFormActions saving={pending} isDirty={isDirty} isEdit={true} />
    </form>
  );
}
