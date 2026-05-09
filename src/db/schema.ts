import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
  varchar,
  index,
} from "drizzle-orm/pg-core";

// ============================================================
// 관리자 계정
// ============================================================
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: varchar("name", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================================
// 체험 프로그램
// ============================================================
export const programs = pgTable("programs", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  title: varchar("title", { length: 200 }).notNull(),
  subtitle: text("subtitle").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  duration: varchar("duration", { length: 50 }).notNull(),
  capacity: varchar("capacity", { length: 50 }).notNull(),
  target: varchar("target", { length: 100 }).notNull(),
  season: varchar("season", { length: 100 }).notNull(),
  highlights: jsonb("highlights").$type<string[]>().notNull().default([]),
  schedule: jsonb("schedule")
    .$type<{ time: string; activity: string }[]>()
    .notNull()
    .default([]),
  faq: jsonb("faq")
    .$type<{ question: string; answer: string }[]>()
    .notNull()
    .default([]),
  gallery: jsonb("gallery").$type<string[]>().notNull().default([]),
  sortOrder: integer("sort_order").notNull().default(0),
  isPublished: boolean("is_published").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ============================================================
// 상품
// ============================================================
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  image: text("image").notNull(),
  storeUrl: text("store_url").notNull(),
  badge: varchar("badge", { length: 50 }),
  sortOrder: integer("sort_order").notNull().default(0),
  isPublished: boolean("is_published").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ============================================================
// 후기
// ============================================================
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  programSlug: varchar("program_slug", { length: 100 }).notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  content: text("content").notNull(),
  rating: integer("rating").notNull(),
  isPublished: boolean("is_published").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================================
// 통계 이벤트
// ============================================================
export const analyticsEvents = pgTable(
  "analytics_events",
  {
    id: serial("id").primaryKey(),
    type: varchar("type", { length: 50 }).notNull(), // pageview | reservation_click | contact_click | store_click
    pagePath: text("page_path").notNull(),
    referrer: text("referrer"),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    typeIdx: index("analytics_type_idx").on(table.type),
    createdAtIdx: index("analytics_created_at_idx").on(table.createdAt),
  })
);

// ============================================================
// 공지사항
// ============================================================
export const notices = pgTable("notices", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  content: text("content").notNull(),
  isImportant: boolean("is_important").notNull().default(false),
  isPublished: boolean("is_published").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ============================================================
// 사이트 설정 (소셜 URL 등)
// ============================================================
export const siteSettings = pgTable("site_settings", {
  key: varchar("key", { length: 100 }).primaryKey(),
  value: text("value").notNull().default(""),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Notice = typeof notices.$inferSelect;
export type NewNotice = typeof notices.$inferInsert;
export type SiteSetting = typeof siteSettings.$inferSelect;

export type Program = typeof programs.$inferSelect;
export type NewProgram = typeof programs.$inferInsert;
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type Review = typeof reviews.$inferSelect;
export type NewReview = typeof reviews.$inferInsert;
export type User = typeof users.$inferSelect;
export type AnalyticsEvent = typeof analyticsEvents.$inferSelect;
