/** Backend role enum — matches Roles in common/constants/roles.constans.ts */
export type Role = "user" | "admin";

/** User data returned by GET /auth/me (matches CurrentUserData interface) */
export interface CurrentUser {
  _id: string;
  name: string;
  email: string;
}

/** Principal returned by GET /auth/me */
export interface AuthMeResponse {
  user: CurrentUser;
  role: Role;
}

/** Response from POST /auth/login and POST /auth/refresh-token (AuthResponseDto) */
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

/** Response from POST /auth/register (RegisterResponseDto) */
export interface RegisterResponse {
  user: UserProfile;
  accessToken: string;
  refreshToken: string;
}

/** User profile embedded in register response (UserResponseDto) */
export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
}

/** Login request body — matches loginDto */
export interface LoginRequest {
  email: string;
  password: string;
  role: Role;
}

/** Register request body — matches registerDto */
export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
}

/** Refresh token request body — matches refreshTokenDto */
export interface RefreshTokenRequest {
  refreshToken: string;
}
