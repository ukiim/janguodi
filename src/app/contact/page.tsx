import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, Clock, MessageCircle, Car, Bus } from "lucide-react";
import { NaverMapEmbed } from "@/components/naver-map-embed";
import { getSiteSettings, withFallback } from "@/lib/site-settings";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "문의하기",
  description: "김해장유오디감귤체험농장 연락처 및 오시는 길 안내입니다.",
};

export default async function ContactPage() {
  const s = await getSiteSettings();

  const phone = withFallback(s.contact_phone, "준비 중");
  const email = withFallback(s.contact_email, "준비 중");
  const hours = withFallback(s.contact_hours, "평일 09:00~18:00 (주말·공휴일 휴무)");
  const address = withFallback(s.location_address, "주소 등록 예정");
  const directions = s.location_directions.trim();
  const parking = s.location_parking.trim();
  const companyName = withFallback(s.footer_company_name, "김해장유오디감귤체험농장");

  return (
    <>
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
            {/* 연락처 */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-2">연락처</h2>

              <Card>
                <CardContent className="pt-6">
                  <Badge className="mb-4">{companyName}</Badge>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-primary shrink-0" />
                      <span className="font-medium">{phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-primary shrink-0" />
                      <span>{email}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>{address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-primary shrink-0" />
                      <span>{hours}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 문의 유형 안내 */}
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

            {/* 오시는 길 */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-2">오시는 길</h2>

              <Card>
                <CardContent className="pt-6">
                  <NaverMapEmbed
                    address={address}
                    title="농장 지도"
                    className="aspect-[4/3] rounded-lg overflow-hidden mb-4"
                  />
                  <div className="text-sm text-muted-foreground space-y-3">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>{address}</span>
                    </div>
                    {directions && (
                      <div className="flex items-start gap-2">
                        <Bus className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span className="whitespace-pre-line">{directions}</span>
                      </div>
                    )}
                    {parking && (
                      <div className="flex items-start gap-2">
                        <Car className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span>{parking}</span>
                      </div>
                    )}
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
