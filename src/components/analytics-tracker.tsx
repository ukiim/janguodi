"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    void fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "pageview", pagePath: pathname }),
      keepalive: true,
    }).catch(() => {});
  }, [pathname]);

  return null;
}

export function trackClick(
  type: "reservation_click" | "contact_click" | "store_click",
  pagePath: string
) {
  void fetch("/api/analytics/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, pagePath }),
    keepalive: true,
  }).catch(() => {});
}
