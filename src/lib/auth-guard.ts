import { auth } from "@/lib/auth";

/**
 * 서버 액션·API에서 관리자 인증을 강제한다.
 * 미들웨어(proxy.ts)는 /admin/* 페이지 라우팅만 보호하므로,
 * 서버 액션은 반드시 이 가드를 첫 줄에서 호출해야 한다.
 * (서버 액션은 공개 페이지에서도 직접 POST 호출이 가능하기 때문)
 */
export async function requireAdmin() {
  const session = await auth();
  if (!session) {
    throw new Error("권한이 없습니다. 다시 로그인해 주세요.");
  }
  return session;
}
