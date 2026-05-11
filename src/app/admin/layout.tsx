import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/sidebar";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "어드민 | 김해장유오디감귤체험농장",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 미들웨어가 /admin/* 의 인증을 보장 (로그인 페이지 제외).
  // 로그인 페이지에서는 session=null 이므로 사이드바 없이 표시.
  const session = await auth();
  return (
    <div className="min-h-screen bg-background">
      {session ? (
        <div className="flex">
          <AdminSidebar userEmail={session.user?.email} />
          <main className="flex-1 p-8">{children}</main>
        </div>
      ) : (
        <main>{children}</main>
      )}
      <Toaster />
    </div>
  );
}
