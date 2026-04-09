import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { NaverMapEmbed } from "@/components/naver-map-embed";

export const metadata: Metadata = {
  title: "문의하기",
  description: "김해장유오디감귤체험농장 연락처 및 오시는 길 안내입니다.",
};

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/20 to-background py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">문의하기</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            궁금한 점이 있으시면 편하게 연락해 주세요.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">연락처 안내</h2>

              {/* Seoul Center */}
              <Card>
                <CardContent className="pt-6">
                  <Badge className="mb-3">서울센터</Badge>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-primary shrink-0" />
                      <span className="font-medium">02-2262-6549</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-primary shrink-0" />
                      <span>info@lifeinsedu.org</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>서울특별시 종로구 광화문역 인근</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-primary shrink-0" />
                      <span>평일 09:00 ~ 18:00 (주말·공휴일 휴무)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Busan Center */}
              <Card>
                <CardContent className="pt-6">
                  <Badge variant="secondary" className="mb-3">
                    부산센터
                  </Badge>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-primary shrink-0" />
                      <span className="font-medium">070-7542-7807</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>부산광역시 부산진구 범내골역 인근</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-primary shrink-0" />
                      <span>평일 09:00 ~ 18:00 (주말·공휴일 휴무)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Inquiry Types */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    문의 유형 안내
                  </h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>
                      <strong>프로그램 문의</strong> — 체험 프로그램 내용, 일정,
                      비용 등
                    </p>
                    <p>
                      <strong>단체 예약</strong> — 20인 이상 단체 예약 및 맞춤
                      프로그램
                    </p>
                    <p>
                      <strong>제휴 문의</strong> — 학교, 기관, 기업 등 제휴 협력
                    </p>
                    <p>
                      <strong>기타 문의</strong> — 기타 궁금한 사항
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Map */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">오시는 길</h2>

              {/* Seoul Map */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">서울센터</h3>
                  <NaverMapEmbed
                    address="서울특별시 종로구 광화문역"
                    title="서울센터 지도"
                    className="aspect-[4/3] rounded-lg overflow-hidden mb-4"
                  />
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>
                      <strong>지하철</strong>: 5호선 광화문역 6번 출구 도보 5분
                    </p>
                    <p>
                      <strong>버스</strong>: 광화문 정류장 하차
                    </p>
                    <p>
                      <strong>주차</strong>: 건물 지하 주차장 이용 가능
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Busan Map */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">부산센터</h3>
                  <NaverMapEmbed
                    address="부산광역시 부산진구 범내골역"
                    title="부산센터 지도"
                    className="aspect-[4/3] rounded-lg overflow-hidden mb-4"
                  />
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>
                      <strong>지하철</strong>: 2호선 범내골역 1번 출구 도보 3분
                    </p>
                    <p>
                      <strong>버스</strong>: 범내골역 정류장 하차
                    </p>
                    <p>
                      <strong>주차</strong>: 인근 공영주차장 이용
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
