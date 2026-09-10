import { create } from "zustand";
import type { CurrentUser, Role } from "@/types/auth";

export interface AuthState {
  /** The current user profile (null when not authenticated) */
  user: CurrentUser | null;
  /** The user's role: "user" or "admin" (null when not authenticated) */
  role: Role | null;
  /** Whether the initial session restoration (GET /auth/me) has completed */
  isInitialized: boolean;
  /** Whether the session is currently being restored */
  isLoading: boolean;
}

export interface AuthActions {
  /** Set user + role after login, register, or GET /auth/me */
  setAuth: (user: CurrentUser, role: Role) => void;
  /** Clear the authenticated state (logout) */
  reset: () => void;
  /** Mark initialization as complete */
  setInitialized: () => void;
  /** Set the loading state during session restoration */
  setLoading: (loading: boolean) => void;
}

const initialState: AuthState = {
  user: null,
  role: null,
  isInitialized: false,
  isLoading: true,
};

export const useAuthStore = create<AuthState & AuthActions>()((set) => ({
  ...initialState,

  setAuth: (user, role) => set({ user, role, isInitialized: true, isLoading: false }),

  reset: () => set({ ...initialState, isInitialized: true, isLoading: false }),

  setInitialized: () => set({ isInitialized: true, isLoading: false }),

  setLoading: (loading) => set({ isLoading: loading }),
}));

// ---------------------------------------------------------------------------
// Derived selectors (not hooks — can be used anywhere)
// ---------------------------------------------------------------------------

export const selectIsAuthenticated = (state: AuthState) =>
  state.user !== null;

export const selectIsAdmin = (state: AuthState) =>
  state.role === "admin";

export const selectIsUser = (state: AuthState) =>
  state.role === "user";
