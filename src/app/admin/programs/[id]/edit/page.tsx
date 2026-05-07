import { notFound } from "next/navigation";
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
      <h1 className="text-2xl font-bold">프로그램 수정</h1>
      <ProgramForm initial={program} />
    </div>
  );
}
