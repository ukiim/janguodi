import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { TrackedLink } from "@/components/tracked-link";
import { db, programs as programsTable, reviews as reviewsTable } from "@/db";
import { asc, desc, eq } from "drizzle-orm";
import { cn } from "@/lib/utils";
import {
  TreePine,
  Sun,
  CalendarCheck,
  ArrowRight,
  Star,
  Sprout,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [programs, recentReviews] = await Promise.all([
    db
      .select()
      .from(programsTable)
      .where(eq(programsTable.isPublished, true))
      .orderBy(asc(programsTable.sortOrder), asc(programsTable.id))
      .limit(3),
    db
      .select({
        id: reviewsTable.id,
        name: reviewsTable.name,
        content: reviewsTable.content,
        rating: reviewsTable.rating,
        programSlug: reviewsTable.programSlug,
        programTitle: programsTable.title,
      })
      .from(reviewsTable)
      .leftJoin(programsTable, eq(reviewsTable.programSlug, programsTable.slug))
      .where(eq(reviewsTable.isPublished, true))
      .orderBy(desc(reviewsTable.createdAt))
      .limit(3),
  ]);

  // 콜라주용 사진 (대표 이미지 3장 — 부족 시 갤러리에서 보충)
  const collageImages = programs
    .map((p) => p.image)
    .filter(Boolean)
    .slice(0, 3);

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative bg-background overflow-hidden py-20 md:py-28 lg:py-32">
        {/* 옅은 잎사귀 워터마크 */}
        <div
          aria-hidden
          className="absolute -top-20 -right-20 w-[480px] h-[480px] rounded-full bg-secondary/40 blur-3xl"
        />
        <div className="container mx-auto px-5 sm:px-6 relative">
          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
            {/* 텍스트 */}
            <div className="animate-fade-in">
              <Badge
                variant="secondary"
                className="mb-5 text-xs font-semibold tracking-wide"
              >
                <Sprout className="h-3.5 w-3.5 mr-1" />
                김해 장유 농촌 체험
              </Badge>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground mb-6 leading-[1.15]">
                자연이 길러낸
                <br />
                <span className="text-primary">오디·감귤</span> 체험농장
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
                탐스러운 오디를 따고, 새콤달콤한 감귤을 수확하고, 직접 잼도
                만들어요. 가족과 함께 자연 속 특별한 하루를 선물하세요.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/programs"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "text-base h-13 px-7 shadow-sm"
                  )}
                >
                  프로그램 둘러보기
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <TrackedLink
                  href="/reservation"
                  event="reservation_click"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "text-base h-13 px-7"
                  )}
                >
                  네이버 예약하기
                </TrackedLink>
              </div>
            </div>

            {/* 사진 콜라주 (lg 이상에서만 표시) */}
            {collageImages.length >= 1 && (
              <div className="hidden lg:grid grid-cols-3 grid-rows-2 gap-3 h-[480px] animate-fade-in">
                {collageImages[0] && (
                  <div className="relative col-span-2 row-span-2 rounded-2xl overflow-hidden border-2 border-border shadow-sm">
                    <Image
                      src={collageImages[0]}
                      alt="농장 사진 1"
                      fill
                      className="object-cover"
                      sizes="40vw"
                      priority
                    />
                  </div>
                )}
                {collageImages[1] && (
                  <div className="relative col-span-1 row-span-1 rounded-2xl overflow-hidden border-2 border-border shadow-sm">
                    <Image
                      src={collageImages[1]}
                      alt="농장 사진 2"
                      fill
                      className="object-cover"
                      sizes="20vw"
                    />
                  </div>
                )}
                {collageImages[2] && (
                  <div className="relative col-span-1 row-span-1 rounded-2xl overflow-hidden border-2 border-border shadow-sm">
                    <Image
                      src={collageImages[2]}
                      alt="농장 사진 3"
                      fill
                      className="object-cover"
                      sizes="20vw"
                    />
                  </div>
                )}
              </div>
            )}
            {/* 모바일/태블릿: 단일 메인 사진 */}
            {collageImages[0] && (
              <div className="relative lg:hidden aspect-[4/3] rounded-2xl overflow-hidden border-2 border-border shadow-sm">
                <Image
                  src={collageImages[0]}
                  alt="농장 사진"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-5 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">
              왜 농촌 체험인가요?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
              직접 따고, 만들고, 맛보는 오디·감귤 체험으로 아이들의 감수성과
              창의력을 키워줍니다.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                icon: TreePine,
                title: "자연과 교감",
                desc: "오디 농장과 감귤 하우스에서 직접 과일을 따며 자연의 소중함을 배웁니다.",
              },
              {
                icon: Sun,
                title: "체험 중심 학습",
                desc: "오디잼, 감귤청 만들기 등 오감 체험으로 살아있는 교육을 합니다.",
              },
              {
                icon: CalendarCheck,
                title: "간편한 예약",
                desc: "네이버 예약을 통해 원하는 날짜에 간편하게 신청할 수 있습니다.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl bg-background border-2 border-border p-6 text-center hover:border-primary/40 hover:-translate-y-0.5 transition-all"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-secondary mb-4">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROGRAMS PREVIEW ============ */}
      <section className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-5 sm:px-6">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2">
                체험 프로그램
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                오디·감귤과 함께하는 다양한 체험을 만나보세요.
              </p>
            </div>
            <Link
              href="/programs"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "hidden sm:inline-flex"
              )}
            >
              전체보기
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program) => (
              <Link key={program.slug} href={`/programs/${program.slug}`}>
                <Card className="h-full hover:border-primary hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group pt-0 border-2">
                  <div className="relative aspect-[3/2] bg-muted rounded-t-lg overflow-hidden">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <CardHeader className="pb-2 px-5">
                    <CardTitle className="text-lg">{program.title}</CardTitle>
                    <CardDescription className="line-clamp-2 text-sm">
                      {program.subtitle}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-5 pb-5">
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="secondary" className="text-xs">
                        {program.duration}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {program.target}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center sm:hidden">
            <Link
              href="/programs"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "w-full h-12 text-base"
              )}
            >
              전체 프로그램 보기
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ REVIEWS ============ */}
      <section className="py-12 md:py-16 bg-muted relative overflow-hidden">
        {/* 거대한 인용부호 워터마크 */}
        <div
          aria-hidden
          className="absolute top-0 left-1/2 -translate-x-1/2 text-[280px] md:text-[400px] leading-none font-heading text-secondary select-none pointer-events-none"
        >
          “
        </div>
        <div className="container mx-auto px-5 sm:px-6 relative">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2">
              참가자 후기
            </h2>
            <p className="text-sm text-muted-foreground">
              체험에 참여하신 분들의 생생한 이야기입니다.
            </p>
          </div>
          {recentReviews.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {recentReviews.map((review) => (
                <div
                  key={review.id}
                  className="rounded-xl bg-background border-2 border-border p-5 hover:border-primary/40 transition-colors"
                >
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star
                        key={j}
                        className="h-4 w-4 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-foreground/90 mb-4 leading-relaxed line-clamp-4">
                    {review.content}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <span className="text-sm font-semibold">{review.name}</span>
                    {review.programTitle && (
                      <Badge variant="outline" className="text-xs">
                        {review.programTitle}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="relative py-20 md:py-28 bg-primary text-primary-foreground overflow-hidden">
        {/* 옅은 식물 패턴 (점) */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--color-cream, #fff) 1.5px, transparent 1.5px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="container mx-auto px-5 sm:px-6 text-center relative">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">
            특별한 체험을 시작하세요
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8 text-sm sm:text-base">
            네이버 예약으로 간편하게 원하는 프로그램을 예약하고, 자연 속에서
            잊지 못할 추억을 만들어 보세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <TrackedLink
              href="/reservation"
              event="reservation_click"
              className={cn(
                buttonVariants({ size: "lg", variant: "secondary" }),
                "text-base h-13 px-7"
              )}
            >
              지금 예약하기
            </TrackedLink>
            <TrackedLink
              href="/store"
              event="store_click"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "text-base h-13 px-7 bg-transparent border-primary-foreground/60 text-primary-foreground hover:bg-primary-foreground/10"
              )}
            >
              스토어 방문하기
            </TrackedLink>
          </div>
        </div>
      </section>
    </>
  );
}
