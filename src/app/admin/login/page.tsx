import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-sm bg-background rounded-xl border p-8 shadow-sm">
        <h1 className="text-xl font-bold mb-1">어드민 로그인</h1>
        <p className="text-sm text-muted-foreground mb-6">
          관리자 계정으로 로그인하세요.
        </p>
        <LoginForm />
      </div>
    </div>
  );
}
