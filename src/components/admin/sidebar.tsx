"use client";

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
  return (
    <aside className="w-60 bg-muted/30 border-r flex flex-col h-screen sticky top-0">
      <div className="p-5 border-b">
        <Link href="/admin" className="font-bold text-base">
          김해장유 어드민
        </Link>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/80 hover:bg-muted"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
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
  );
}
