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
import { programs } from "@/data/programs";
import { cn } from "@/lib/utils";
import {
  TreePine,
  Sun,
  CalendarCheck,
  ArrowRight,
  Star,
} from "lucide-react";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-secondary/30 to-accent/20 py-16 sm:py-24 md:py-32">
        <div className="container mx-auto px-5 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-5 sm:mb-6 leading-snug sm:leading-tight">
            김해장유에서 만나는
            <br />
            <span className="text-primary">오디·감귤 체험농장</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            탐스러운 오디를 따고, 새콤달콤한 감귤을 수확하고, 직접 잼도 만들어요.
            <br className="hidden sm:block" />
            가족과 함께 자연 속 특별한 하루를 선물하세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/programs"
              className={cn(
                buttonVariants({ size: "lg" }),
                "text-base h-12 px-6"
              )}
            >
              프로그램 둘러보기
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/reservation"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "text-base h-12 px-6"
              )}
            >
              네이버 예약하기
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-14 sm:py-20 bg-background">
        <div className="container mx-auto px-5 sm:px-6">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
              왜 농촌 체험인가요?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
              직접 따고, 만들고, 맛보는 오디·감귤 체험으로 아이들의 감수성과
              창의력을 키워줍니다.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-5 sm:p-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
                <TreePine className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold text-base sm:text-lg mb-2">
                자연과 교감
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                오디 농장과 감귤 하우스에서 직접 과일을 따며 자연의 소중함을
                배웁니다.
              </p>
            </div>
            <div className="text-center p-5 sm:p-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
                <Sun className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold text-base sm:text-lg mb-2">
                체험 중심 학습
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                오디잼, 감귤청 만들기 등 오감 체험으로 교과서에서 배울 수 없는
                살아있는 교육을 합니다.
              </p>
            </div>
            <div className="text-center p-5 sm:p-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
                <CalendarCheck className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold text-base sm:text-lg mb-2">
                간편한 예약
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                네이버 예약을 통해 원하는 날짜에 간편하게 프로그램을 예약할 수
                있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Preview */}
      <section className="py-14 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-5 sm:px-6">
          <div className="flex items-center justify-between mb-8 sm:mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">
                체험 프로그램
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                오디·감귤과 함께하는 다양한 체험을 만나보세요
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {programs.map((program) => (
              <Link key={program.slug} href={`/programs/${program.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group pt-0">
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-primary/5 to-accent/5 rounded-t-lg overflow-hidden">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <CardHeader className="pb-2 px-4 sm:px-6">
                    <CardTitle className="text-base sm:text-lg">
                      {program.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 text-sm">
                      {program.subtitle}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-4 sm:px-6">
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
              className={buttonVariants({ variant: "outline" })}
            >
              전체 프로그램 보기
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-14 sm:py-20 bg-background">
        <div className="container mx-auto px-5 sm:px-6">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
              참가자 후기
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              체험에 참여하신 분들의 생생한 후기입니다
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 max-w-4xl mx-auto">
            {programs
              .flatMap((p) =>
                p.reviews.map((r) => ({ ...r, programTitle: p.title }))
              )
              .slice(0, 3)
              .map((review, i) => (
                <Card key={i}>
                  <CardContent className="pt-5 sm:pt-6">
                    <div className="flex gap-0.5 mb-3">
                      {Array.from({ length: review.rating }).map((_, j) => (
                        <Star
                          key={j}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      &ldquo;{review.content}&rdquo;
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">
                        {review.name}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {review.programTitle}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-5 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
            특별한 체험을 시작하세요
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8 text-sm sm:text-base">
            네이버 예약으로 간편하게 원하는 프로그램을 예약하고, 자연 속에서 잊지
            못할 추억을 만들어 보세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/reservation"
              className={cn(
                buttonVariants({ size: "lg", variant: "secondary" }),
                "text-base h-12 px-6"
              )}
            >
              지금 예약하기
            </Link>
            <Link
              href="/store"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "text-base h-12 px-6 bg-transparent border-white/60 text-white hover:bg-white/10"
              )}
            >
              스토어 방문하기
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
