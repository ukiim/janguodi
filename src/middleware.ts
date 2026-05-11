import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

/**
 * /admin/* 경로 보호.
 * NextAuth v5의 auth() wrapper 대신 getToken 직접 사용 — Edge 런타임에서도 동작.
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isLoginPage = pathname === "/admin/login";

  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
    // NextAuth v5 cookie 이름 (Vercel은 secure prefix 사용)
    cookieName: process.env.NODE_ENV === "production"
      ? "__Secure-authjs.session-token"
      : "authjs.session-token",
  });

  const isAuthed = !!token;

  // 로그인 안 됨 + 로그인 페이지가 아님 → 로그인으로
  if (!isAuthed && !isLoginPage) {
    const loginUrl = new URL("/admin/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 이미 로그인 + 로그인 페이지 접근 → 대시보드
  if (isAuthed && isLoginPage) {
    return NextResponse.redirect(new URL("/admin", req.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
