import Link from "next/link";
import { Phone, Mail, MapPin, Camera } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { getSiteSettings, withFallback } from "@/lib/site-settings";

const FALLBACKS = {
  companyName: "김해장유오디감귤체험농장",
  description:
    "자연 속에서 배우고 체험하는 농촌 프로그램으로\n특별한 경험을 선사합니다.",
  phone: "준비 중",
  email: "준비 중",
  address: "주소 등록 예정",
};

function buildInstagramUrl(s: {
  instagram_url: string;
  instagram_handle: string;
}) {
  if (s.instagram_url.trim()) return s.instagram_url.trim();
  if (s.instagram_handle.trim())
    return `https://www.instagram.com/${s.instagram_handle.trim().replace(/^@/, "")}/`;
  return "";
}

function buildNaverBlogUrl(s: {
  naver_blog_url: string;
  naver_blog_id: string;
}) {
  if (s.naver_blog_url.trim()) return s.naver_blog_url.trim();
  if (s.naver_blog_id.trim())
    return `https://blog.naver.com/${s.naver_blog_id.trim()}`;
  return "";
}

export async function Footer() {
  const s = await getSiteSettings();

  const companyName = withFallback(s.footer_company_name, FALLBACKS.companyName);
  const description = withFallback(s.footer_description, FALLBACKS.description);
  const phone = withFallback(s.contact_phone, FALLBACKS.phone);
  const email = withFallback(s.contact_email, FALLBACKS.email);
  const address = withFallback(s.location_address, FALLBACKS.address);
  const businessInfo = s.footer_business_info.trim();
  const copyright = withFallback(
    s.footer_copyright,
    `© ${new Date().getFullYear()} ${companyName}. All rights reserved.`
  );

  const instagramUrl = buildInstagramUrl(s);
  const blogUrl = buildNaverBlogUrl(s);

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 브랜드 */}
          <div>
            <div className="mb-4">
              <span className="text-lg font-bold text-primary">
                {companyName}
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {description}
            </p>

            {/* 소셜 아이콘 */}
            {(instagramUrl || blogUrl) && (
              <div className="flex items-center gap-2 mt-5">
                {instagramUrl && (
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="인스타그램"
                    className="inline-flex items-center justify-center w-11 h-11 rounded-md border border-border bg-background text-primary hover:bg-accent transition-colors"
                  >
                    <Camera className="h-4 w-4" />
                  </a>
                )}
                {blogUrl && (
                  <a
                    href={blogUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="네이버 블로그"
                    className="inline-flex items-center justify-center w-11 h-11 rounded-md border border-border bg-background text-primary hover:bg-accent transition-colors font-extrabold text-sm"
                  >
                    N
                  </a>
                )}
              </div>
            )}
          </div>

          {/* 바로가기 */}
          <div>
            <h3 className="font-semibold mb-4">바로가기</h3>
            <ul className="text-sm -mt-2">
              <li>
                <Link
                  href="/programs"
                  className="block py-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  체험 프로그램
                </Link>
              </li>
              <li>
                <Link
                  href="/reservation"
                  className="block py-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  예약하기
                </Link>
              </li>
              <li>
                <Link
                  href="/store"
                  className="block py-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  스토어
                </Link>
              </li>
              <li>
                <Link
                  href="/notices"
                  className="block py-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  공지사항
                </Link>
              </li>
            </ul>
          </div>

          {/* 연락처 */}
          <div>
            <h3 className="font-semibold mb-4">연락처</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>{phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>{email}</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                <span>{address}</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="text-center text-sm text-muted-foreground space-y-1">
          {businessInfo && <p className="whitespace-pre-line">{businessInfo}</p>}
          <p>{copyright}</p>
        </div>
      </div>
    </footer>
  );
}
