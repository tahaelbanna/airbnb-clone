import { apiGet, apiPost } from "@/lib/api/client";
import type {
  AuthMeResponse,
  AuthTokens,
  LoginRequest,
  RegisterRequest,
  RegisterResponse,
} from "@/types/auth";

/** POST /auth/login */
export function login(body: LoginRequest): Promise<AuthTokens> {
  return apiPost<AuthTokens>("/auth/login", body);
}

/** POST /auth/register */
export function register(body: RegisterRequest): Promise<RegisterResponse> {
  return apiPost<RegisterResponse>("/auth/register", body);
}

/** POST /auth/refresh-token */
export function refreshToken(token: string): Promise<AuthTokens> {
  return apiPost<AuthTokens>("/auth/refresh-token", { refreshToken: token });
}

/** GET /auth/me */
export function getMe(): Promise<AuthMeResponse> {
  return apiGet<AuthMeResponse>("/auth/me");
}
