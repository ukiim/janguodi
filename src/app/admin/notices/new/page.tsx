import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { NoticeForm } from "@/components/admin/notice-form";

export default function NewNoticePage() {
  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/notices"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          공지사항 목록으로
        </Link>
        <h1 className="text-3xl font-bold mt-2">새 공지사항 만들기</h1>
        <p className="text-base text-muted-foreground mt-2">
          제목과 내용을 적고 맨 아래 <b>새로 만들기</b> 버튼을 눌러 주세요.
        </p>
      </div>
      <NoticeForm />
    </div>
  );
}
