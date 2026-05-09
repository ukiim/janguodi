"use client";

import * as React from "react";
import { ChevronDown, ChevronUp, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * 한글 → 영문/하이픈 슬러그 변환 (간단 음역).
 * 한글 음절을 한글 그대로 두기보다는 단순화된 영문 변환을 사용.
 * 정확한 한영 변환 라이브러리는 무겁기에, 한글은 코드포인트 기반 음절-자모 분해 후
 * 단순 매핑하는 방식을 쓴다. 실패 시 fallback으로 hyphen-separated.
 */

const CHO = [
  "g", "kk", "n", "d", "tt", "r", "m", "b", "pp", "s",
  "ss", "", "j", "jj", "ch", "k", "t", "p", "h",
];
const JUNG = [
  "a", "ae", "ya", "yae", "eo", "e", "yeo", "ye", "o", "wa",
  "wae", "oe", "yo", "u", "wo", "we", "wi", "yu", "eu", "ui", "i",
];
const JONG = [
  "", "g", "kk", "gs", "n", "nj", "nh", "d", "l", "lg",
  "lm", "lb", "ls", "lt", "lp", "lh", "m", "b", "bs", "s",
  "ss", "ng", "j", "ch", "k", "t", "p", "h",
];

function romanizeKorean(input: string): string {
  let out = "";
  for (const ch of input) {
    const code = ch.charCodeAt(0);
    if (code >= 0xac00 && code <= 0xd7a3) {
      const offset = code - 0xac00;
      const cho = Math.floor(offset / 588);
      const jung = Math.floor((offset % 588) / 28);
      const jong = offset % 28;
      out += CHO[cho] + JUNG[jung] + JONG[jong];
    } else if (/[a-zA-Z0-9]/.test(ch)) {
      out += ch.toLowerCase();
    } else if (/\s|-|_/.test(ch)) {
      out += "-";
    }
    // 그 외 문자는 무시
  }
  return out
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function generateSlug(title: string): string {
  return romanizeKorean(title.trim());
}

export function SlugInput({
  title,
  value,
  onChange,
  isEdit,
}: {
  title: string;
  value: string;
  onChange: (next: string) => void;
  isEdit: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const [autoGenerate, setAutoGenerate] = React.useState(!isEdit);

  // 자동 생성 모드: 제목 변경 시 슬러그 업데이트
  React.useEffect(() => {
    if (autoGenerate && !isEdit) {
      const slug = generateSlug(title);
      if (slug && slug !== value) onChange(slug);
    }
  }, [title, autoGenerate, isEdit, onChange, value]);

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        {open ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
        고급 설정 (페이지 주소)
      </button>

      {open && (
        <div className="space-y-2 p-4 rounded-md bg-muted/30 border">
          <label className="block text-sm font-semibold">페이지 주소</label>
          <p className="text-xs text-muted-foreground">
            웹사이트 URL의 마지막 부분입니다. (예: odifarm.co.kr/programs/
            <span className="font-mono font-semibold text-foreground">
              {value || "..."}
            </span>
            )
          </p>
          {isEdit ? (
            <div className="flex items-center gap-2 h-12 px-4 rounded-md border bg-muted/50 text-muted-foreground">
              <Lock className="h-4 w-4" />
              <span className="font-mono text-sm">{value}</span>
              <span className="text-xs ml-auto">
                기존 주소는 변경할 수 없습니다
              </span>
            </div>
          ) : (
            <>
              <input
                type="text"
                value={value}
                onChange={(e) => {
                  setAutoGenerate(false);
                  onChange(e.target.value);
                }}
                placeholder="자동 생성됩니다"
                className={cn(
                  "w-full h-12 px-4 rounded-md border bg-background",
                  "text-sm font-mono",
                  "focus:outline-none focus:ring-2 focus:ring-primary/40"
                )}
              />
              <p className="text-xs text-muted-foreground">
                {autoGenerate
                  ? "제목을 입력하면 자동으로 만들어집니다."
                  : "직접 수정 중. 영문 소문자·숫자·하이픈(-)만 사용하세요."}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
