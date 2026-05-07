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
  const session = await auth();
  // 로그인 페이지는 사이드바 없이 표시
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
