"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";
import { getMe } from "@/features/auth/api";
import { getAccessToken, clearTokens } from "@/lib/api/token-storage";

/**
 * AuthProvider restores the user session on app load.
 *
 * If an access token exists in storage, it calls GET /auth/me to fetch
 * the current user profile and role, then populates the Zustand store.
 *
 * If the token is invalid or expired, the Axios interceptor will attempt
 * a refresh automatically. If that also fails, the store is reset.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setAuth = useAuthStore((s) => s.setAuth);
  const reset = useAuthStore((s) => s.reset);
  const setInitialized = useAuthStore((s) => s.setInitialized);
  const setLoading = useAuthStore((s) => s.setLoading);

  useEffect(() => {
    async function restoreSession() {
      const token = getAccessToken();
      if (!token) {
        setInitialized();
        return;
      }

      setLoading(true);
      try {
        const { user, role } = await getMe();
        setAuth(user, role);
      } catch {
        clearTokens();
        reset();
      }
    }

    restoreSession();
  }, [setAuth, reset, setInitialized, setLoading]);

  return <>{children}</>;
}
