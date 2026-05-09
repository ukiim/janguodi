import { getSiteSettings } from "@/lib/site-settings";
import { SettingsForm } from "./settings-form";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold">사이트 설정</h1>
        <p className="text-base text-muted-foreground mt-2">
          소셜 미디어 주소를 입력하면 <b>소식</b> 페이지에 자동으로 표시됩니다.
        </p>
      </div>
      <SettingsForm initial={settings} />
    </div>
  );
}
