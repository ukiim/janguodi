import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db, notices } from "@/db";
import { and, eq } from "drizzle-orm";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}

async function loadNotice(id: number) {
  const [n] = await db
    .select()
    .from(notices)
    .where(and(eq(notices.id, id), eq(notices.isPublished, true)))
    .limit(1);
  return n;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const n = await loadNotice(Number(id));
  if (!n) return {};
  return { title: n.title, description: n.content.slice(0, 100) };
}

export default async function NoticeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const noticeId = Number(id);
  if (!Number.isFinite(noticeId)) notFound();

  const notice = await loadNotice(noticeId);
  if (!notice) notFound();

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link
          href="/notices"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "mb-4"
          )}
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          공지사항 목록
        </Link>

        <Card>
          <CardContent className="pt-8 pb-8">
            <div className="flex items-center gap-2 flex-wrap mb-3">
              {notice.isImportant && (
                <Badge className="text-xs bg-destructive text-destructive-foreground border-0">
                  <AlertCircle className="h-3 w-3 mr-0.5" />
                  중요
                </Badge>
              )}
              <span className="text-sm text-muted-foreground">
                {formatDate(notice.createdAt)}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-6">
              {notice.title}
            </h1>
            <div className="prose prose-sm max-w-none whitespace-pre-wrap text-foreground/90 leading-relaxed">
              {notice.content}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
