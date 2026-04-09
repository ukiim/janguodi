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
    "김해 장유 오디·감귤 체험농장. 오디 수확, 감귤 따기, 잼 만들기 등 가족·단체 농촌 체험 프로그램. 네이버 예약으로 간편하게 신청하세요.",
  keywords: [
    "김해체험농장",
    "장유체험농장",
    "오디체험",
    "감귤체험",
    "오디수확",
    "감귤따기",
    "농촌체험",
    "체험학습",
    "김해장유오디감귤체험농장",
    "김해가볼만한곳",
    "장유가볼만한곳",
    "아이와가볼만한곳",
    "오디잼만들기",
    "감귤청만들기",
  ],
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
