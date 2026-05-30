"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "홈" },
  { href: "/programs", label: "체험 프로그램" },
  { href: "/store", label: "스토어" },
  { href: "/notices", label: "공지사항" },
  { href: "/contact", label: "문의하기" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-background/90 backdrop-blur transition-all border-b",
        scrolled
          ? "border-border shadow-sm"
          : "border-transparent"
      )}
    >
      <div className="container mx-auto flex h-16 md:h-18 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="font-heading text-base md:text-lg font-bold text-primary">
            김해장유오디감귤체험농장
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium transition-colors rounded-md",
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary hover:bg-accent"
                )}
              >
                {item.label}
                {active && (
                  <span className="absolute -bottom-px left-3 right-3 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            );
          })}
          <Link
            href="/reservation"
            className={cn(buttonVariants({ size: "sm" }), "ml-3 h-10 px-5")}
          >
            예약하기
          </Link>
        </nav>

        {/* Mobile Nav */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "md:hidden h-11 w-11"
            )}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">메뉴 열기</span>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px]">
            <nav className="flex flex-col gap-1 mt-8">
              {navItems.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "px-4 py-3 text-base font-medium rounded-md transition-colors",
                      active
                        ? "bg-secondary text-primary"
                        : "text-foreground hover:text-primary hover:bg-accent"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/reservation"
                onClick={() => setOpen(false)}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "mt-4 h-12 text-base"
                )}
              >
                예약하기
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
