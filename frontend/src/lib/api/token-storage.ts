/**
 * Token storage abstraction.
 *
 * Currently uses localStorage because the backend returns tokens in the
 * response body. This is NOT inherently secure — localStorage is accessible
 * to any JS running on the page (XSS risk). However, it is the practical
 * solution given the current backend contract.
 *
 * This module isolates all token persistence so it can be swapped to
 * HttpOnly cookie storage if the backend adds Set-Cookie support later.
 */

const ACCESS_TOKEN_KEY = "airbnb_access_token";
const REFRESH_TOKEN_KEY = "airbnb_refresh_token";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function getAccessToken(): string | null {
  if (!isBrowser()) return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  if (!isBrowser()) return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function setTokens(accessToken: string, refreshToken: string): void {
  if (!isBrowser()) return;
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

export function clearTokens(): void {
  if (!isBrowser()) return;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}
