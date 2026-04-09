"use client";

import Script from "next/script";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarCheck } from "lucide-react";

const BOOKING_ID = process.env.NEXT_PUBLIC_NAVER_BOOKING_ID;

export function NaverReservation() {
  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <CalendarCheck className="h-5 w-5 text-primary" />
          네이버 예약
        </h2>

        {BOOKING_ID ? (
          <>
            {/* 실제 네이버 예약 위젯 */}
            <div
              id="naver-booking-widget-container"
              className="min-h-[500px]"
            />
            <Script
              src={`https://booking.naver.com/booking/widget/${BOOKING_ID}.js`}
              strategy="lazyOnload"
            />
          </>
        ) : (
          /*
            개발 모드 Placeholder
            네이버 예약 관리자에서 발급받은 예약 ID를 .env.local에 설정하세요:
            NEXT_PUBLIC_NAVER_BOOKING_ID=your_booking_id

            또는 이 영역을 네이버 예약 관리자에서 복사한 위젯 코드로 직접 교체해도 됩니다.
          */
          <div className="min-h-[500px] border-2 border-dashed border-muted rounded-lg flex flex-col items-center justify-center p-8 text-center">
            <CalendarCheck className="h-16 w-16 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">
              네이버 예약 위젯 영역
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                .env.local
              </code>
              {" "}파일에 아래 환경변수를 설정하세요:
            </p>
            <code className="mt-2 bg-muted px-3 py-1.5 rounded text-xs block">
              NEXT_PUBLIC_NAVER_BOOKING_ID=예약ID
            </code>
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
