"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CalendarCheck, ExternalLink } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const BOOKING_ID = process.env.NEXT_PUBLIC_NAVER_BOOKING_ID;

export function NaverReservation() {
  // 네이버 예약 비즈니스 ID로 예약 페이지 URL 구성
  const bookingUrl = BOOKING_ID
    ? `https://booking.naver.com/booking/13/bizes/${BOOKING_ID}`
    : "";

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between gap-2 mb-6 flex-wrap">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <CalendarCheck className="h-5 w-5 text-primary" />
            네이버 예약
          </h2>
          {bookingUrl && (
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              새 창에서 열기
              <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
            </a>
          )}
        </div>

        {bookingUrl ? (
          <>
            {/* 네이버 예약 페이지 임베드 */}
            <div className="rounded-lg overflow-hidden border bg-muted/20">
              <iframe
                src={bookingUrl}
                title="네이버 예약"
                className="w-full"
                style={{ height: "640px", border: "0" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-3 text-center">
              예약 화면이 보이지 않으면 위 <b>새 창에서 열기</b> 버튼을 눌러
              주세요.
            </p>
          </>
        ) : (
          <div className="min-h-[400px] border-2 border-dashed border-muted rounded-lg flex flex-col items-center justify-center p-8 text-center">
            <CalendarCheck className="h-16 w-16 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">
              네이버 예약 위젯 영역
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                NEXT_PUBLIC_NAVER_BOOKING_ID
              </code>{" "}
              환경변수를 설정하면 예약 화면이 표시됩니다.
            </p>
            <a
              href="https://booking.naver.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-sm text-primary hover:underline"
            >
              네이버 예약 관리자 바로가기 →
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
