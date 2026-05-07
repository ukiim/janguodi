import { db, analyticsEvents, programs, products, reviews } from "@/db";
import { count, gte, sql, eq, and } from "drizzle-orm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, MousePointerClick, MessageCircle, Sprout } from "lucide-react";

export const dynamic = "force-dynamic";

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}
function daysAgo(n: number) {
  return startOfDay(new Date(Date.now() - n * 24 * 60 * 60 * 1000));
}

export default async function AdminDashboard() {
  const today = startOfDay(new Date());
  const last7 = daysAgo(7);
  const last30 = daysAgo(30);

  const [
    [{ c: pageViewsToday }],
    [{ c: pageViews7d }],
    [{ c: pageViews30d }],
    [{ c: reservationClicks30d }],
    [{ c: contactClicks30d }],
    [{ c: programCount }],
    [{ c: productCount }],
    [{ c: reviewCount }],
    topPaths,
  ] = await Promise.all([
    db
      .select({ c: count() })
      .from(analyticsEvents)
      .where(
        and(
          eq(analyticsEvents.type, "pageview"),
          gte(analyticsEvents.createdAt, today)
        )
      ),
    db
      .select({ c: count() })
      .from(analyticsEvents)
      .where(
        and(
          eq(analyticsEvents.type, "pageview"),
          gte(analyticsEvents.createdAt, last7)
        )
      ),
    db
      .select({ c: count() })
      .from(analyticsEvents)
      .where(
        and(
          eq(analyticsEvents.type, "pageview"),
          gte(analyticsEvents.createdAt, last30)
        )
      ),
    db
      .select({ c: count() })
      .from(analyticsEvents)
      .where(
        and(
          eq(analyticsEvents.type, "reservation_click"),
          gte(analyticsEvents.createdAt, last30)
        )
      ),
    db
      .select({ c: count() })
      .from(analyticsEvents)
      .where(
        and(
          eq(analyticsEvents.type, "contact_click"),
          gte(analyticsEvents.createdAt, last30)
        )
      ),
    db.select({ c: count() }).from(programs),
    db.select({ c: count() }).from(products),
    db.select({ c: count() }).from(reviews),
    db
      .select({
        path: analyticsEvents.pagePath,
        c: count(),
      })
      .from(analyticsEvents)
      .where(
        and(
          eq(analyticsEvents.type, "pageview"),
          gte(analyticsEvents.createdAt, last30)
        )
      )
      .groupBy(analyticsEvents.pagePath)
      .orderBy(sql`count(*) desc`)
      .limit(5),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">대시보드</h1>
        <p className="text-sm text-muted-foreground mt-1">
          사이트 방문 통계와 콘텐츠 현황을 확인하세요.
        </p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Eye className="h-4 w-4" />}
          label="오늘 방문자"
          value={pageViewsToday}
        />
        <StatCard
          icon={<Eye className="h-4 w-4" />}
          label="최근 7일"
          value={pageViews7d}
        />
        <StatCard
          icon={<Eye className="h-4 w-4" />}
          label="최근 30일"
          value={pageViews30d}
        />
        <StatCard
          icon={<MousePointerClick className="h-4 w-4" />}
          label="예약 클릭(30일)"
          value={reservationClicks30d}
        />
        <StatCard
          icon={<MessageCircle className="h-4 w-4" />}
          label="문의 클릭(30일)"
          value={contactClicks30d}
        />
        <StatCard
          icon={<Sprout className="h-4 w-4" />}
          label="등록 프로그램"
          value={programCount}
        />
        <StatCard
          icon={<Sprout className="h-4 w-4" />}
          label="등록 상품"
          value={productCount}
        />
        <StatCard
          icon={<Sprout className="h-4 w-4" />}
          label="등록 후기"
          value={reviewCount}
        />
      </div>

      {/* 인기 페이지 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">최근 30일 인기 페이지</CardTitle>
        </CardHeader>
        <CardContent>
          {topPaths.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              아직 통계 데이터가 없습니다.
            </p>
          ) : (
            <ul className="space-y-2 text-sm">
              {topPaths.map((row) => (
                <li
                  key={row.path}
                  className="flex justify-between border-b pb-2 last:border-0 last:pb-0"
                >
                  <span className="truncate font-mono text-xs">
                    {row.path}
                  </span>
                  <span className="font-semibold">{row.c}</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          {icon}
          <span>{label}</span>
        </div>
        <div className="text-2xl font-bold">{value.toLocaleString()}</div>
      </CardContent>
    </Card>
  );
}
