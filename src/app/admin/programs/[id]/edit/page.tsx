import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { db, programs } from "@/db";
import { eq } from "drizzle-orm";
import { ProgramForm } from "@/components/admin/program-form";

export const dynamic = "force-dynamic";

export default async function EditProgramPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const programId = Number(id);
  if (!Number.isFinite(programId)) notFound();

  const [program] = await db
    .select()
    .from(programs)
    .where(eq(programs.id, programId))
    .limit(1);
  if (!program) notFound();

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
        <h1 className="text-3xl font-bold mt-2">
          프로그램 수정 — <span className="text-primary">{program.title}</span>
        </h1>
        <p className="text-base text-muted-foreground mt-2">
          내용을 고치고 맨 아래 <b>수정 저장하기</b> 버튼을 눌러 주세요.
        </p>
      </div>
      <ProgramForm initial={program} />
    </div>
  );
}
