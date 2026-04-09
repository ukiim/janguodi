import Link from "next/link";
import { Leaf, Phone, Mail, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 브랜드 */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold text-primary">
                김해장유오디감귤체험농장
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              자연 속에서 배우고 체험하는 농촌 프로그램으로
              <br />
              특별한 경험을 선사합니다.
            </p>
          </div>

          {/* 바로가기 */}
          <div>
            <h3 className="font-semibold mb-4">바로가기</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/programs"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  체험 프로그램
                </Link>
              </li>
              <li>
                <Link
                  href="/reservation"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  예약하기
                </Link>
              </li>
              <li>
                <Link
                  href="/store"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  스토어
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  센터 소개
                </Link>
              </li>
            </ul>
          </div>

          {/* 연락처 */}
          <div>
            <h3 className="font-semibold mb-4">연락처</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>02-2262-6549</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@janguodi.org</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>서울특별시 종로구 광화문역 인근</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} 김해장유오디감귤체험농장. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
