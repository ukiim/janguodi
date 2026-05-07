import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoginPage = pathname === "/admin/login";
  const isAdminRoute = pathname.startsWith("/admin");

  if (!isAdminRoute) return NextResponse.next();

  // 로그인 안 된 상태에서 /admin/* 접근 시 로그인 페이지로
  if (!req.auth && !isLoginPage) {
    const loginUrl = new URL("/admin/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 로그인 되어 있는 상태에서 로그인 페이지 접근 시 대시보드로
  if (req.auth && isLoginPage) {
    return NextResponse.redirect(new URL("/admin", req.nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
