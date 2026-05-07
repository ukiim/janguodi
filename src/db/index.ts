import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

let cached: NeonHttpDatabase<typeof schema> | null = null;

function getDb(): NeonHttpDatabase<typeof schema> {
  if (cached) return cached;
  const url = process.env.POSTGRES_URL || process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "POSTGRES_URL (또는 DATABASE_URL) 환경변수가 설정되지 않았습니다. Vercel Postgres(Neon) 연결을 확인하세요."
    );
  }
  const sql = neon(url);
  cached = drizzle(sql, { schema });
  return cached;
}

// Proxy: 임포트 시점에는 throw 하지 않고, 실제 사용 시점에 lazy 초기화
export const db: NeonHttpDatabase<typeof schema> = new Proxy(
  {} as NeonHttpDatabase<typeof schema>,
  {
    get(_target, prop) {
      const real = getDb() as unknown as Record<string | symbol, unknown>;
      const value = real[prop];
      return typeof value === "function" ? (value as Function).bind(real) : value;
    },
  }
);

export * from "./schema";
