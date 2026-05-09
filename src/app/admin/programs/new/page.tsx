import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProgramForm } from "@/components/admin/program-form";

export default function NewProgramPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/programs"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          프로그램 목록으로
        </Link>
        <h1 className="text-3xl font-bold mt-2">새 프로그램 만들기</h1>
        <p className="text-base text-muted-foreground mt-2">
          아래 항목을 채우고 맨 아래 <b>새로 만들기</b> 버튼을 눌러 주세요.
          별표(*)는 꼭 입력해야 하는 항목입니다.
        </p>
      </div>
      <ProgramForm />
    </div>
  );
}
