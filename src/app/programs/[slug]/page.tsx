import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NaverMapEmbed } from "@/components/naver-map-embed";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { programs } from "@/data/programs";
import {
  Clock,
  Users,
  Target,
  CalendarDays,
  Star,
  MapPin,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";

export function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = programs.find((p) => p.slug === slug);
  if (!program) return {};
  return {
    title: program.title,
    description: program.subtitle,
  };
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = programs.find((p) => p.slug === slug);
  if (!program) notFound();

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/20 to-background py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Link
            href="/programs"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "mb-4")}
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            프로그램 목록
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            {program.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            {program.subtitle}
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {program.duration}
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              {program.capacity}
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Target className="h-3.5 w-3.5" />
              {program.target}
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <CalendarDays className="h-3.5 w-3.5" />
              {program.season}
            </Badge>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold mb-4">프로그램 소개</h2>
              <p className="text-muted-foreground leading-relaxed">
                {program.description}
              </p>
            </div>

            {/* Highlights */}
            <div>
              <h2 className="text-2xl font-bold mb-4">체험 내용</h2>
              <ul className="space-y-3">
                {program.highlights.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Schedule */}
            <div>
              <h2 className="text-2xl font-bold mb-4">일정표</h2>
              <div className="space-y-0">
                {program.schedule.map((item, i) => (
                  <div key={i} className="flex gap-4 py-3 border-b last:border-0">
                    <span className="text-sm font-mono font-semibold text-primary w-14 shrink-0">
                      {item.time}
                    </span>
                    <span className="text-sm">{item.activity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery Placeholder */}
            <div>
              <h2 className="text-2xl font-bold mb-4">갤러리</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center"
                  >
                    <span className="text-sm text-muted-foreground">
                      사진 {i}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div>
              <h2 className="text-2xl font-bold mb-4">참가 후기</h2>
              <div className="space-y-4">
                {program.reviews.map((review, i) => (
                  <Card key={i}>
                    <CardContent className="pt-6">
                      <div className="flex gap-0.5 mb-2">
                        {Array.from({ length: review.rating }).map((_, j) => (
                          <Star
                            key={j}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                        &ldquo;{review.content}&rdquo;
                      </p>
                      <span className="text-sm font-medium">{review.name}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-2xl font-bold mb-4">자주 묻는 질문</h2>
              <Accordion className="w-full">
                {program.faq.map((item, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger className="text-left">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Reservation Card */}
            <Card className="sticky top-24">
              <CardContent className="pt-6 space-y-4">
                <h3 className="font-bold text-lg">예약 안내</h3>
                <Separator />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">소요시간</span>
                    <span className="font-medium">{program.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">인원</span>
                    <span className="font-medium">{program.capacity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">대상</span>
                    <span className="font-medium">{program.target}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">운영 시기</span>
                    <span className="font-medium">{program.season}</span>
                  </div>
                </div>
                <Separator />
                <Link
                  href="/reservation"
                  className={cn(buttonVariants({ size: "lg" }), "w-full")}
                >
                  네이버 예약하기
                </Link>
                <p className="text-xs text-muted-foreground text-center">
                  단체 예약(20인 이상)은 전화 문의 바랍니다
                </p>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  오시는 길
                </h3>
                <NaverMapEmbed
                  address="서울특별시 종로구 광화문역"
                  title="오시는 길"
                  className="aspect-[4/3] rounded-lg overflow-hidden mb-3"
                />
                <p className="text-sm text-muted-foreground">
                  서울특별시 종로구 광화문역 인근
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Tel. 02-2262-6549
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
