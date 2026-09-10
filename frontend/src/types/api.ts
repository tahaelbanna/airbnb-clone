/** Backend API response envelope for a single resource */
export interface ApiResponse<T> {
  data: T;
}

/** Backend API response envelope for paginated resources */
export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

/** Pagination metadata returned by the backend */
export interface PaginationMeta {
  totalCount: number;
  page: number;
  limit: number;
  pageCount: number;
}

/** Common pagination query parameters accepted by the backend */
export interface PaginationParams {
  page?: number;
  limit?: number;
  ignoreLimit?: boolean;
}
