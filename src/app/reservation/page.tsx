import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarCheck, Phone, Clock, Info } from "lucide-react";
import { NaverReservation } from "@/components/naver-reservation";

export const metadata: Metadata = {
  title: "예약하기",
  description: "네이버 예약으로 농촌 체험 프로그램을 간편하게 예약하세요.",
};

export default function ReservationPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/20 to-background py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4">
            <CalendarCheck className="h-3.5 w-3.5 mr-1" />
            네이버 예약
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">예약하기</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            네이버 예약을 통해 원하는 프로그램과 날짜를 선택하여 간편하게
            예약하세요.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Reservation Widget */}
          <div className="lg:col-span-2">
            <NaverReservation />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6 space-y-4">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  예약 안내
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Clock className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>
                      예약은 체험일 <strong>3일 전</strong>까지 가능합니다.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CalendarCheck className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>
                      예약 취소는 체험일 <strong>2일 전</strong>까지 무료입니다.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Phone className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>
                      20인 이상 단체 예약은 전화 문의 바랍니다.
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 space-y-4">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  전화 예약
                </h3>
                <p className="text-sm text-muted-foreground">
                  온라인 예약이 어려우시면 전화로 예약하실 수 있습니다.
                </p>
                <div className="space-y-2">
                  <p className="font-semibold">02-2262-6549</p>
                  <p className="text-xs text-muted-foreground">
                    평일 09:00 ~ 18:00 (주말·공휴일 휴무)
                  </p>
                </div>
              </CardContent>
            </Card>

            <Link
              href="/programs"
              className={cn(buttonVariants({ variant: "outline" }), "w-full")}
            >
              프로그램 둘러보기
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
