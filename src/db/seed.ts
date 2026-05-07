/* eslint-disable no-console */
import "dotenv/config";
import * as fs from "fs";
import * as path from "path";

// .env.local 로드
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, "utf-8")
    .split("\n")
    .forEach((line) => {
      const m = line.match(/^([^=]+)=(.*)$/);
      if (m && !process.env[m[1].trim()]) {
        process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, "");
      }
    });
}

import bcrypt from "bcryptjs";
import { db } from "./index";
import { users, programs, products, reviews } from "./schema";
import { programs as programData } from "../data/programs";
import { products as productData } from "../data/products";

async function main() {
  // 1. 관리자 계정
  const adminEmail = process.env.ADMIN_EMAIL || "admin@odifarm.co.kr";
  const adminPassword = process.env.ADMIN_PASSWORD || "changeme123!";
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  console.log(`[seed] 관리자 계정 생성: ${adminEmail}`);
  await db
    .insert(users)
    .values({
      email: adminEmail,
      passwordHash,
      name: "관리자",
    })
    .onConflictDoNothing({ target: users.email });

  // 2. 프로그램
  console.log(`[seed] 프로그램 ${programData.length}개 등록`);
  for (const [i, p] of programData.entries()) {
    await db
      .insert(programs)
      .values({
        slug: p.slug,
        title: p.title,
        subtitle: p.subtitle,
        description: p.description,
        image: p.image,
        duration: p.duration,
        capacity: p.capacity,
        target: p.target,
        season: p.season,
        highlights: p.highlights,
        schedule: p.schedule,
        faq: p.faq,
        sortOrder: i,
        isPublished: true,
      })
      .onConflictDoNothing({ target: programs.slug });
  }

  // 3. 상품
  console.log(`[seed] 상품 ${productData.length}개 등록`);
  for (const [i, p] of productData.entries()) {
    await db.insert(products).values({
      name: p.name,
      description: p.description,
      price: p.price,
      image: p.image,
      storeUrl: p.storeUrl,
      badge: p.badge ?? null,
      sortOrder: i,
      isPublished: true,
    });
  }

  // 4. 후기 (programs 데이터에서 추출)
  console.log(`[seed] 후기 등록`);
  for (const p of programData) {
    for (const r of p.reviews) {
      await db.insert(reviews).values({
        programSlug: p.slug,
        name: r.name,
        content: r.content,
        rating: r.rating,
        isPublished: true,
      });
    }
  }

  console.log("[seed] 완료!");
  console.log(`이메일: ${adminEmail}`);
  console.log(`비밀번호: ${adminPassword}  (꼭 변경하세요)`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("[seed] 오류:", err);
    process.exit(1);
  });
