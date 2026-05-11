"use client";

import { usePathname } from "next/navigation";
import { Header } from "./header";
import { AnalyticsTracker } from "@/components/analytics-tracker";

/**
 * 클라이언트 wrapper — pathname을 검사해서 /admin에서는 헤더/푸터를 숨김.
 * Footer는 async 서버 컴포넌트이므로 prop으로 받음.
 */
export function SiteChrome({
  children,
  footer,
}: {
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      {footer}
      <AnalyticsTracker />
    </>
  );
}
