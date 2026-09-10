"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore, selectIsAuthenticated, selectIsAdmin } from "@/store/auth-store";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

/**
 * Guard for authenticated routes.
 * Redirects to /login if unauthenticated.
 * Redirects to / if requireAdmin is true but user is not admin.
 * Renders a full-page loading spinner while auth state is resolving.
 */
export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  
  const isInitialized = useAuthStore((s) => s.isInitialized);
  const isLoading = useAuthStore((s) => s.isLoading);
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const isAdmin = useAuthStore(selectIsAdmin);

  useEffect(() => {
    if (!isInitialized || isLoading) return;

    if (!isAuthenticated) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    if (requireAdmin && !isAdmin) {
      router.replace("/");
      return;
    }
  }, [isInitialized, isLoading, isAuthenticated, isAdmin, requireAdmin, pathname, router]);

  const isAllowed = isInitialized && !isLoading && isAuthenticated && (!requireAdmin || isAdmin);

  if (!isAllowed) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-sm text-muted">Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
}
