import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
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
import { Clock, Users, Target, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "체험 프로그램",
  description:
    "논농사, 텃밭 가꾸기, 전통 공예, 곤충 생태 탐험 등 다양한 농촌 체험 프로그램을 소개합니다.",
};

export default function ProgramsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/20 to-background py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            농촌 체험 프로그램
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            자연 속에서 배우고 체험하는 다양한 프로그램을 만나보세요.
            <br />
            계절마다 특별한 경험이 여러분을 기다리고 있습니다.
          </p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs.map((program) => (
              <Link key={program.slug} href={`/programs/${program.slug}`} className="group">
                <Card className="overflow-hidden hover:shadow-lg transition-shadow pt-0 h-full cursor-pointer">
                  <div className="relative aspect-[16/9] bg-gradient-to-br from-primary/5 to-accent/5 overflow-hidden">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline">{program.season}</Badge>
                    </div>
                    <CardTitle className="text-xl">{program.title}</CardTitle>
                    <CardDescription className="text-base">
                      {program.subtitle}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {program.description}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {program.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {program.capacity}
                      </span>
                      <span className="flex items-center gap-1">
                        <Target className="h-4 w-4" />
                        {program.target}
                      </span>
                    </div>
                    <span className={buttonVariants()}>
                      자세히 보기
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">
            원하는 프로그램을 찾으셨나요?
          </h2>
          <p className="text-muted-foreground mb-6">
            네이버 예약으로 간편하게 신청하세요
          </p>
          <Link href="/reservation" className={buttonVariants({ size: "lg" })}>
            예약하기
          </Link>
        </div>
      </section>
    </>
  );
}
