import { ProgramForm } from "@/components/admin/program-form";

export default function NewProgramPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">새 프로그램</h1>
      <ProgramForm />
    </div>
  );
}
