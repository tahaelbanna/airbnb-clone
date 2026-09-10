import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios";
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from "./token-storage";
import type { ApiResponse, PaginatedResponse } from "@/types/api";
import type { AuthTokens } from "@/types/auth";

// ---------------------------------------------------------------------------
// Axios instance
// ---------------------------------------------------------------------------

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

// ---------------------------------------------------------------------------
// Request interceptor — attach access token
// ---------------------------------------------------------------------------

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---------------------------------------------------------------------------
// Response interceptor — unwrap data envelope & handle 401 refresh
// ---------------------------------------------------------------------------

/** Tracks whether a token refresh is already in progress */
let isRefreshing = false;

/** Queue of requests waiting for the token to be refreshed */
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null): void {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token!);
    }
  });
  failedQueue = [];
}

apiClient.interceptors.response.use(
  // Success — pass through (data extraction happens in helpers below)
  (response) => response,

  // Error — handle 401 with token refresh
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Only attempt refresh on 401 and if we haven't already retried
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      // No refresh token — force logout
      handleAuthFailure();
      return Promise.reject(error);
    }

    if (isRefreshing) {
      // Another request is already refreshing — queue this one
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((newToken) => {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      // Call refresh endpoint directly with a plain axios call to avoid
      // interceptor loops. The response is wrapped: { data: { accessToken, refreshToken } }
      const { data: envelope } = await axios.post<ApiResponse<AuthTokens>>(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
        { refreshToken },
      );

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        envelope.data;

      setTokens(newAccessToken, newRefreshToken);
      processQueue(null, newAccessToken);

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return apiClient(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      handleAuthFailure();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

// ---------------------------------------------------------------------------
// Auth failure handler
// ---------------------------------------------------------------------------

function handleAuthFailure(): void {
  clearTokens();

  // Dynamic import to avoid circular dependency with the store
  import("@/store/auth-store").then(({ useAuthStore }) => {
    useAuthStore.getState().reset();
  });

  // Redirect to login if running in the browser.
  // Using window.location.href intentionally — this runs inside an Axios
  // interceptor (not a React component), so useRouter is unavailable.
  // A hard navigation also ensures all React state is fully reset.
  if (typeof window !== "undefined") {
    // eslint-disable-next-line @next/next/no-location-assign-relative-destination
    window.location.href = "/login";
  }
}

// ---------------------------------------------------------------------------
// Typed helper functions
// ---------------------------------------------------------------------------

/**
 * GET a single-resource endpoint. Unwraps the `{ data: T }` envelope.
 */
export async function apiGet<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response = await apiClient.get<ApiResponse<T>>(url, config);
  return response.data?.data as T;
}

/**
 * GET a paginated endpoint. Returns the full `{ data: T[], meta }` object.
 */
export async function apiGetPaginated<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<PaginatedResponse<T>> {
  const response = await apiClient.get<PaginatedResponse<T>>(url, config);
  return response.data;
}

/**
 * POST to an endpoint. Unwraps the `{ data: T }` envelope.
 */
export async function apiPost<T>(
  url: string,
  body?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response = await apiClient.post<ApiResponse<T>>(url, body, config);
  return response.data?.data as T;
}

/**
 * PATCH an endpoint. Unwraps the `{ data: T }` envelope.
 */
export async function apiPatch<T>(
  url: string,
  body?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response = await apiClient.patch<ApiResponse<T>>(url, body, config);
  return response.data?.data as T;
}

/**
 * PUT an endpoint. Unwraps the `{ data: T }` envelope.
 */
export async function apiPut<T>(
  url: string,
  body?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response = await apiClient.put<ApiResponse<T>>(url, body, config);
  return response.data?.data as T;
}

/**
 * DELETE an endpoint. Unwraps the `{ data: T }` envelope.
 */
export async function apiDelete<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response = await apiClient.delete<ApiResponse<T>>(url, config);
  return response.data?.data as T;
}
