import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { db, notices } from "@/db";
import { eq } from "drizzle-orm";
import { NoticeForm } from "@/components/admin/notice-form";

export const dynamic = "force-dynamic";

export default async function EditNoticePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const noticeId = Number(id);
  if (!Number.isFinite(noticeId)) notFound();

  const [notice] = await db
    .select()
    .from(notices)
    .where(eq(notices.id, noticeId))
    .limit(1);
  if (!notice) notFound();

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/notices"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          공지사항 목록으로
        </Link>
        <h1 className="text-3xl font-bold mt-2">
          공지 수정 — <span className="text-primary">{notice.title}</span>
        </h1>
      </div>
      <NoticeForm initial={notice} />
    </div>
  );
}
