"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * 60대·IT 비숙련 사용자를 위한 큰 라벨 + 큰 입력 + 도움말 한 세트
 */

type FieldShellProps = {
  label: string;
  required?: boolean;
  help?: string;
  example?: string;
  children: React.ReactNode;
};

export function FieldShell({
  label,
  required,
  help,
  example,
  children,
}: FieldShellProps) {
  return (
    <div className="space-y-2">
      <label className="block text-base font-semibold text-foreground">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      {children}
      {(help || example) && (
        <div className="text-sm text-muted-foreground space-y-0.5">
          {help && <p>{help}</p>}
          {example && (
            <p>
              <span className="text-foreground/70 font-medium">예시:</span>{" "}
              {example}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

type BigInputProps = React.ComponentProps<"input"> & {
  label: string;
  required?: boolean;
  help?: string;
  example?: string;
};

export function BigInput({
  label,
  required,
  help,
  example,
  className,
  ...inputProps
}: BigInputProps) {
  return (
    <FieldShell label={label} required={required} help={help} example={example}>
      <input
        className={cn(
          "w-full h-12 px-4 rounded-md border border-input bg-background",
          "text-[17px] text-foreground placeholder:text-muted-foreground/60",
          "focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
        {...inputProps}
      />
    </FieldShell>
  );
}

type BigTextareaProps = React.ComponentProps<"textarea"> & {
  label: string;
  required?: boolean;
  help?: string;
  example?: string;
};

export function BigTextarea({
  label,
  required,
  help,
  example,
  className,
  rows = 5,
  ...textareaProps
}: BigTextareaProps) {
  return (
    <FieldShell label={label} required={required} help={help} example={example}>
      <textarea
        rows={rows}
        className={cn(
          "w-full px-4 py-3 rounded-md border border-input bg-background",
          "text-[17px] leading-relaxed text-foreground placeholder:text-muted-foreground/60",
          "focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary",
          "resize-y",
          className
        )}
        {...textareaProps}
      />
    </FieldShell>
  );
}

/** 큰 ON/OFF 토글 (게시 상태) */
export function BigToggle({
  label,
  checked,
  onChange,
  onText = "사이트에 보이기",
  offText = "숨기기",
}: {
  label: string;
  checked: boolean;
  onChange: (next: boolean) => void;
  onText?: string;
  offText?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-base font-semibold text-foreground">
        {label}
      </label>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={cn(
          "flex items-center gap-3 h-12 px-4 rounded-md border-2 transition-colors min-w-[200px]",
          checked
            ? "border-primary bg-primary/5 text-primary"
            : "border-input bg-muted/30 text-muted-foreground"
        )}
        aria-pressed={checked}
      >
        <span
          className={cn(
            "inline-block w-12 h-6 rounded-full relative transition-colors",
            checked ? "bg-primary" : "bg-muted-foreground/40"
          )}
        >
          <span
            className={cn(
              "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform",
              checked && "translate-x-6"
            )}
          />
        </span>
        <span className="text-base font-medium">
          {checked ? onText : offText}
        </span>
      </button>
    </div>
  );
}

/** 섹션 헤더 (큰 제목 + 옅은 배경) */
export function FormSection({
  title,
  step,
  children,
}: {
  title: string;
  step?: number;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border bg-background overflow-hidden">
      <header className="bg-muted/40 px-6 py-4 border-b">
        <h2 className="text-xl font-bold flex items-center gap-3">
          {step !== undefined && (
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm">
              {step}
            </span>
          )}
          {title}
        </h2>
      </header>
      <div className="p-6 space-y-6">{children}</div>
    </section>
  );
}
