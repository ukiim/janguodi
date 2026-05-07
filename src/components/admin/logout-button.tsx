"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export function LogoutButton() {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="w-full justify-start text-xs"
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
    >
      <LogOut className="h-3.5 w-3.5 mr-2" />
      로그아웃
    </Button>
  );
}
