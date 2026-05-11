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
          연락처·오시는길·소셜·스토어·푸터 정보를 한 곳에서 관리합니다.
          저장하면 홈페이지 전체에 즉시 반영됩니다.
        </p>
      </div>
      <SettingsForm initial={settings} />
    </div>
  );
}
