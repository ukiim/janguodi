"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Sprout,
  ShoppingBag,
  Star,
  Megaphone,
  Settings,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LogoutButton } from "./logout-button";

const navItems = [
  { href: "/admin", label: "대시보드", icon: LayoutDashboard, exact: true },
  { href: "/admin/programs", label: "프로그램", icon: Sprout },
  { href: "/admin/products", label: "상품", icon: ShoppingBag },
  { href: "/admin/reviews", label: "후기", icon: Star },
  { href: "/admin/notices", label: "공지사항", icon: Megaphone },
  { href: "/admin/settings", label: "설정", icon: Settings },
];

export function AdminSidebar({ userEmail }: { userEmail?: string | null }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItem = (item: (typeof navItems)[number], onClick?: () => void) => {
    const Icon = item.icon;
    const active = item.exact
      ? pathname === item.href
      : pathname.startsWith(item.href);
    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={onClick}
        className={cn(
          "flex items-center gap-2.5 px-3 py-3 rounded-md text-base transition-colors",
          active
            ? "bg-primary text-primary-foreground"
            : "text-foreground/80 hover:bg-muted"
        )}
      >
        <Icon className="h-4 w-4" />
        {item.label}
      </Link>
    );
  };

  return (
    <>
      {/* 모바일 상단 바 */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-background border-b flex items-center justify-between px-3">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="inline-flex items-center justify-center w-11 h-11 rounded-md hover:bg-muted"
          aria-label="메뉴 열기"
        >
          <Menu className="h-5 w-5" />
        </button>
        <Link href="/admin" className="font-bold text-base">
          김해장유 어드민
        </Link>
        <div className="w-11" />
      </div>

      {/* 모바일 본문 여백 */}
      <div className="md:hidden h-14" aria-hidden />

      {/* 데스크톱 사이드바 */}
      <aside className="hidden md:flex w-60 bg-muted/30 border-r flex-col h-screen sticky top-0">
        <div className="p-5 border-b">
          <Link href="/admin" className="font-bold text-base">
            김해장유 어드민
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => navItem(item))}
        </nav>
        <div className="p-3 border-t space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground hover:text-foreground"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            사이트 보기
          </Link>
          {userEmail && (
            <div className="px-3 text-xs text-muted-foreground truncate">
              {userEmail}
            </div>
          )}
          <LogoutButton />
        </div>
      </aside>

      {/* 모바일 오버레이 사이드바 */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <aside className="absolute top-0 left-0 bottom-0 w-72 bg-background border-r flex flex-col shadow-xl">
            <div className="p-5 border-b flex items-center justify-between">
              <Link
                href="/admin"
                className="font-bold text-base"
                onClick={() => setMobileOpen(false)}
              >
                김해장유 어드민
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center w-11 h-11 rounded-md hover:bg-muted"
                aria-label="메뉴 닫기"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
              {navItems.map((item) =>
                navItem(item, () => setMobileOpen(false))
              )}
            </nav>
            <div className="p-3 border-t space-y-2">
              <Link
                href="/"
                target="_blank"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <ExternalLink className="h-4 w-4" />
                사이트 보기
              </Link>
              {userEmail && (
                <div className="px-3 text-sm text-muted-foreground truncate">
                  {userEmail}
                </div>
              )}
              <LogoutButton />
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
