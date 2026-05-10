import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/site-settings";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, ExternalLink, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "소식",
  description:
    "김해장유오디감귤체험농장의 인스타그램과 네이버 블로그에서 다양한 소식을 만나보세요.",
};

function buildCameraUrl(s: { instagram_url: string; instagram_handle: string }) {
  if (s.instagram_url.trim()) return s.instagram_url.trim();
  if (s.instagram_handle.trim())
    return `https://www.instagram.com/${s.instagram_handle.trim().replace(/^@/, "")}/`;
  return "";
}

function buildNaverBlogUrl(s: { naver_blog_url: string; naver_blog_id: string }) {
  if (s.naver_blog_url.trim()) return s.naver_blog_url.trim();
  if (s.naver_blog_id.trim())
    return `https://blog.naver.com/${s.naver_blog_id.trim()}`;
  return "";
}

function buildNaverBlogEmbedUrl(s: { naver_blog_url: string; naver_blog_id: string }) {
  // 네이버 블로그 위젯 (PrologueList) 임베드
  let id = s.naver_blog_id.trim();
  if (!id && s.naver_blog_url.trim()) {
    const m = s.naver_blog_url.match(/blog\.naver\.com\/([a-zA-Z0-9_-]+)/);
    if (m) id = m[1];
  }
  if (!id) return "";
  return `https://blog.naver.com/PostList.nhn?blogId=${id}&widgetTypeCall=true&directAccess=true`;
}

export default async function SnsPage() {
  const settings = await getSiteSettings();
  const instagramUrl = buildCameraUrl(settings);
  const blogUrl = buildNaverBlogUrl(settings);
  const blogEmbed = buildNaverBlogEmbedUrl(settings);

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/20 to-background py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="h-3.5 w-3.5 mr-1" />
            농장 소식
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">소식</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            인스타그램과 블로그에서 농장의 일상과 체험 후기를 만나보세요.
          </p>
        </div>
      </section>

      {/* Camera */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground">
              <Camera className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">인스타그램</h2>
              <p className="text-sm text-muted-foreground">
                농장의 일상을 사진으로 공유합니다.
              </p>
            </div>
            {instagramUrl && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-11"
                )}
              >
                인스타그램 열기
                <ExternalLink className="ml-1.5 h-4 w-4" />
              </a>
            )}
          </div>

          {instagramUrl ? (
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gradient-to-br from-secondary via-muted to-secondary p-12 text-center hover:opacity-90 transition-opacity"
                >
                  <Camera className="h-16 w-16 mx-auto mb-4 text-primary" />
                  <p className="text-lg font-semibold mb-2">
                    {settings.instagram_handle
                      ? `@${settings.instagram_handle}`
                      : "인스타그램에서 보기"}
                  </p>
                  <p className="text-sm text-muted-foreground mb-6">
                    인스타그램은 외부 사이트 정책상 사이트 안에서 직접 표시되지
                    않습니다.
                    <br />
                    아래 버튼을 눌러 인스타그램에서 더 많은 소식을 확인하세요.
                  </p>
                  <span
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "h-13 px-7"
                    )}
                  >
                    인스타그램 방문하기
                    <ExternalLink className="ml-1.5 h-4 w-4" />
                  </span>
                </a>
              </CardContent>
            </Card>
          ) : (
            <ComingSoonCard label="인스타그램 계정 설정 후 이곳에 표시됩니다." />
          )}
        </div>
      </section>

      {/* Naver Blog */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground text-lg font-extrabold">
              N
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">네이버 블로그</h2>
              <p className="text-sm text-muted-foreground">
                체험 후기와 자세한 안내를 블로그에서 만나보세요.
              </p>
            </div>
            {blogUrl && (
              <a
                href={blogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-11"
                )}
              >
                블로그 열기
                <ExternalLink className="ml-1.5 h-4 w-4" />
              </a>
            )}
          </div>

          {blogEmbed ? (
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <iframe
                  src={blogEmbed}
                  className="w-full"
                  style={{ height: "720px", border: "0" }}
                  loading="lazy"
                  title="네이버 블로그"
                />
              </CardContent>
            </Card>
          ) : (
            <ComingSoonCard label="네이버 블로그 ID 설정 후 이곳에 표시됩니다." />
          )}
        </div>
      </section>
    </>
  );
}

function ComingSoonCard({ label }: { label: string }) {
  return (
    <Card>
      <CardContent className="pt-12 pb-12 text-center text-muted-foreground">
        <Sparkles className="h-10 w-10 mx-auto mb-3 opacity-40" />
        <p className="text-base">{label}</p>
        <p className="text-xs mt-1 opacity-70">
          어드민 → 설정에서 입력할 수 있습니다.
        </p>
      </CardContent>
    </Card>
  );
}
