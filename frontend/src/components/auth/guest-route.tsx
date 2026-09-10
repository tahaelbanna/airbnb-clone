"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore, selectIsAuthenticated } from "@/store/auth-store";
import { Loader2 } from "lucide-react";

interface GuestRouteProps {
  children: React.ReactNode;
}

/**
 * Guard for guest-only routes (e.g. login, register).
 * Redirects to / if authenticated.
 * Renders a full-page loading spinner while auth state is resolving.
 */
export function GuestRoute({ children }: GuestRouteProps) {
  const router = useRouter();
  
  const isInitialized = useAuthStore((s) => s.isInitialized);
  const isLoading = useAuthStore((s) => s.isLoading);
  const isAuthenticated = useAuthStore(selectIsAuthenticated);

  useEffect(() => {
    if (!isInitialized || isLoading) return;

    if (isAuthenticated) {
      const isAdmin = useAuthStore.getState().role === "admin";
      router.replace(isAdmin ? "/admin" : "/");
    }
  }, [isInitialized, isLoading, isAuthenticated, router]);

  const isAllowed = isInitialized && !isLoading && !isAuthenticated;

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
