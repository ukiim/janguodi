import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const notoSansKR = Noto_Sans_KR({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "김해장유오디감귤체험농장 | 농촌 체험 프로그램",
    template: "%s | 김해장유오디감귤체험농장",
  },
  description:
    "자연 속에서 배우는 농촌 체험 프로그램. 네이버 예약으로 간편하게 신청하세요.",
  keywords: ["농촌체험", "체험학습", "자연체험", "김해장유오디감귤체험농장"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSansKR.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans text-[15px] leading-relaxed md:text-base">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
