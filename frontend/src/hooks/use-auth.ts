"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore, selectIsAuthenticated, selectIsAdmin, selectIsUser } from "@/store/auth-store";
import { login as loginApi, register as registerApi, getMe } from "@/features/auth/api";
import { setTokens, clearTokens } from "@/lib/api/token-storage";
import type { LoginRequest, RegisterRequest } from "@/types/auth";

/**
 * Hook encapsulating all auth operations.
 *
 * Provides login, register, logout, and session state derived from
 * the Zustand store.
 */
export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const user = useAuthStore((s) => s.user);
  const role = useAuthStore((s) => s.role);
  const isInitialized = useAuthStore((s) => s.isInitialized);
  const isLoading = useAuthStore((s) => s.isLoading);
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const isAdmin = useAuthStore(selectIsAdmin);
  const isUser = useAuthStore(selectIsUser);
  const setAuth = useAuthStore((s) => s.setAuth);
  const reset = useAuthStore((s) => s.reset);

  const login = useCallback(
    async (body: LoginRequest) => {
      const tokens = await loginApi(body);
      setTokens(tokens.accessToken, tokens.refreshToken);

      // Fetch the full user profile + role from /auth/me
      const { user: currentUser, role: currentRole } = await getMe();
      setAuth(currentUser, currentRole);
    },
    [setAuth],
  );

  const register = useCallback(
    async (body: RegisterRequest) => {
      const response = await registerApi(body);
      setTokens(response.accessToken, response.refreshToken);

      // Fetch the full user profile + role from /auth/me
      const { user: currentUser, role: currentRole } = await getMe();
      setAuth(currentUser, currentRole);
    },
    [setAuth],
  );

  const logout = useCallback(() => {
    clearTokens();
    reset();
    queryClient.clear();
    router.push("/login");
  }, [reset, router, queryClient]);

  return {
    user,
    role,
    isInitialized,
    isLoading,
    isAuthenticated,
    isAdmin,
    isUser,
    login,
    register,
    logout,
  };
}
