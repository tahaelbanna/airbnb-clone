"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore, selectIsAdmin } from "@/store/auth-store";
import { Loader2 } from "lucide-react";

interface RequireNormalUserProps {
  children: React.ReactNode;
}

/**
 * Guard to prevent Admins from accessing the normal user UI.
 * Redirects admins to /admin.
 */
export function RequireNormalUser({ children }: RequireNormalUserProps) {
  const router = useRouter();
  
  const isInitialized = useAuthStore((s) => s.isInitialized);
  const isLoading = useAuthStore((s) => s.isLoading);
  const isAdmin = useAuthStore(selectIsAdmin);

  useEffect(() => {
    if (!isInitialized || isLoading) return;

    if (isAdmin) {
      router.replace("/admin");
    }
  }, [isInitialized, isLoading, isAdmin, router]);

  const isAllowed = isInitialized && !isLoading && !isAdmin;

  if (!isAllowed) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-sm text-muted">Redirecting...</p>
      </div>
    );
  }

  return <>{children}</>;
}
