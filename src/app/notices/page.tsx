import type { Metadata } from "next";
import Link from "next/link";
import { db, notices } from "@/db";
import { desc, eq } from "drizzle-orm";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, ChevronRight, Megaphone } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "공지사항",
  description:
    "김해장유오디감귤체험농장의 공지사항을 확인하세요. 체험 일정, 휴무 안내, 이벤트 소식 등.",
};

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}

export default async function NoticesPage() {
  const list = await db
    .select()
    .from(notices)
    .where(eq(notices.isPublished, true))
    .orderBy(desc(notices.isImportant), desc(notices.createdAt));

  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 via-secondary/20 to-background py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">공지사항</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            체험 일정과 휴무, 운영 안내를 모았습니다.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {list.length === 0 ? (
            <Card>
              <CardContent className="pt-10 pb-10 text-center text-muted-foreground">
                <Megaphone className="h-10 w-10 mx-auto mb-3 opacity-40" />
                아직 등록된 공지사항이 없습니다.
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {list.map((n) => (
                <Link
                  key={n.id}
                  href={`/notices/${n.id}`}
                  className="block group"
                >
                  <Card className="hover:border-primary/40 transition-colors cursor-pointer">
                    <CardContent className="pt-5 pb-5">
                      <div className="flex items-center gap-3 flex-wrap mb-1.5">
                        {n.isImportant && (
                          <Badge className="text-xs bg-primary text-primary-foreground border-0 font-bold">
                            <AlertCircle className="h-3 w-3 mr-0.5" />
                            중요
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {formatDate(n.createdAt)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-base sm:text-lg font-semibold group-hover:text-primary transition-colors flex-1 min-w-0">
                          {n.title}
                        </h3>
                        <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                        {n.content}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
