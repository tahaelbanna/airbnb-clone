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

export function adminLogin(body: LoginRequest): Promise<AuthTokens> {
  return apiPost<AuthTokens>("/auth/admin/login", body);
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

/** POST /otp/send */
export function sendOtp(body: import("@/types/auth").SendOtpRequest): Promise<void> {
  return apiPost<void>("/otp/send", body);
}

/** POST /otp/resend */
export function resendOtp(body: import("@/types/auth").SendOtpRequest): Promise<void> {
  return apiPost<void>("/otp/resend", body);
}

/** POST /otp/verify */
export function verifyOtp(body: import("@/types/auth").VerifyOtpRequest): Promise<void> {
  return apiPost<void>("/otp/verify", body);
}

/** POST /forget-password/send */
export function sendForgetPasswordOtp(body: import("@/types/auth").SendForgetPasswordOtpRequest): Promise<void> {
  return apiPost<void>("/forget-password/send", body);
}

/** POST /forget-password/verify */
export function verifyForgetPasswordOtp(body: import("@/types/auth").VerifyForgetPasswordOtpRequest): Promise<void> {
  return apiPost<void>("/forget-password/verify", body);
}

/** POST /forget-password/reset */
export function resetPassword(body: import("@/types/auth").ResetPasswordRequest): Promise<void> {
  return apiPost<void>("/forget-password/reset", body);
}
