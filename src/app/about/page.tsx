import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Leaf, Heart, Users, Award, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "센터 소개",
  description: "김해장유오디감귤체험농장를 소개합니다. 자연과 함께하는 체험 교육의 가치를 전합니다.",
};

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/20 to-background py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">센터 소개</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            자연과 함께하는 체험 교육으로 건강한 성장을 돕는
            김해장유오디감귤체험농장입니다.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">우리의 미션</h2>
              <p className="text-muted-foreground leading-relaxed">
                김해장유오디감귤체험농장는 도시의 아이들과 가족들에게 농촌의 가치를
                전달하고, 자연 속 체험을 통해 생명의 소중함과 환경에 대한
                감수성을 키워주는 것을 목표로 합니다.
              </p>
            </div>

            <Separator className="my-12" />

            {/* Values */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <Heart className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-semibold text-lg mb-2">생명 존중</h3>
                  <p className="text-sm text-muted-foreground">
                    식물과 곤충, 작은 생명들을 돌보는 경험을 통해 생명의
                    소중함을 배웁니다.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <BookOpen className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-semibold text-lg mb-2">체험 교육</h3>
                  <p className="text-sm text-muted-foreground">
                    교실이 아닌 자연에서 직접 보고, 만지고, 느끼는 살아있는
                    교육을 지향합니다.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <Users className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-semibold text-lg mb-2">함께하는 성장</h3>
                  <p className="text-sm text-muted-foreground">
                    가족, 친구, 이웃과 함께하는 체험을 통해 소통과 협력을
                    배웁니다.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <Award className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-semibold text-lg mb-2">전문 운영</h3>
                  <p className="text-sm text-muted-foreground">
                    전문 강사진이 안전하고 체계적인 프로그램을 운영하여 질 높은
                    체험을 제공합니다.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Separator className="my-12" />

            {/* History */}
            <div>
              <h2 className="text-2xl font-bold mb-8 text-center">센터 연혁</h2>
              <div className="space-y-6">
                {[
                  { year: "2024", event: "농촌 체험 프로그램 런칭" },
                  { year: "2023", event: "부산센터 개소" },
                  { year: "2020", event: "온라인 교육 프로그램 도입" },
                  { year: "2018", event: "서울센터 확장 이전" },
                  { year: "2015", event: "김해장유오디감귤체험농장 설립" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <Badge
                      variant="outline"
                      className="text-sm font-mono shrink-0 mt-0.5"
                    >
                      {item.year}
                    </Badge>
                    <p className="text-muted-foreground">{item.event}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
