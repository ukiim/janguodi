"use client";

import Link from "next/link";
import { trackClick } from "@/components/analytics-tracker";

type EventType = "reservation_click" | "contact_click" | "store_click";

function currentPath() {
  return typeof window !== "undefined" ? window.location.pathname : "";
}

/**
 * 클릭 시 analytics 이벤트를 기록하는 링크.
 * - external=true → 외부 <a target="_blank">
 * - external=false → 내부 next/link
 */
export function TrackedLink({
  href,
  event,
  external = false,
  children,
  className,
}: {
  href: string;
  event: EventType;
  external?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  const handle = () => trackClick(event, currentPath());

  if (external) {
    return (
      <a
        href={href}
        onClick={handle}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} onClick={handle} className={className}>
      {children}
    </Link>
  );
}

/**
 * 전화번호 — 유효하면 tel: 링크 + contact_click 기록, 아니면 일반 텍스트.
 */
export function TrackedPhone({
  phone,
  className,
}: {
  phone: string;
  className?: string;
}) {
  const digits = phone.replace(/[^0-9+]/g, "");
  const valid = digits.length >= 8;

  if (!valid) {
    return <span className={className}>{phone}</span>;
  }
  return (
    <a
      href={`tel:${digits}`}
      onClick={() => trackClick("contact_click", currentPath())}
      className={className}
    >
      {phone}
    </a>
  );
}
