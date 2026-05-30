import { NextRequest, NextResponse } from "next/server";
import { db, analyticsEvents } from "@/db";

const ALLOWED_TYPES = new Set([
  "pageview",
  "reservation_click",
  "contact_click",
  "store_click",
]);

// 간단한 IP 기반 rate limit (인메모리, 분당 한도)
// 서버리스 인스턴스별이라 완벽하진 않지만 단일 클라이언트 폭주는 차단.
const RATE_LIMIT = 80; // 분당 80회 (정상 페이지뷰+클릭엔 충분)
const RATE_WINDOW = 60_000;
const hits = new Map<string, { count: number; reset: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + RATE_WINDOW });
    // 맵이 무한정 커지지 않도록 만료 항목 정리
    if (hits.size > 5000) {
      for (const [k, v] of hits) if (now > v.reset) hits.delete(k);
    }
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    if (rateLimited(ip)) {
      return NextResponse.json({ error: "too many requests" }, { status: 429 });
    }

    const body = (await req.json()) as {
      type?: string;
      pagePath?: string;
    };
    if (!body.type || !ALLOWED_TYPES.has(body.type)) {
      return NextResponse.json({ error: "invalid type" }, { status: 400 });
    }
    if (!body.pagePath) {
      return NextResponse.json({ error: "missing path" }, { status: 400 });
    }

    const userAgent = req.headers.get("user-agent")?.slice(0, 500) ?? null;
    const referrer = req.headers.get("referer")?.slice(0, 500) ?? null;

    await db.insert(analyticsEvents).values({
      type: body.type,
      pagePath: body.pagePath.slice(0, 500),
      userAgent,
      referrer,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[analytics] error", err);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
