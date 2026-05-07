import { NextRequest, NextResponse } from "next/server";
import { db, analyticsEvents } from "@/db";

const ALLOWED_TYPES = new Set([
  "pageview",
  "reservation_click",
  "contact_click",
  "store_click",
]);

export async function POST(req: NextRequest) {
  try {
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
