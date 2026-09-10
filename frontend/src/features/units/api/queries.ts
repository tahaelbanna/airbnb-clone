import { apiGet, apiGetPaginated, apiPatch, apiDelete, apiClient } from "@/lib/api/client";
import type { PaginatedResponse } from "@/types/api";
import type { Unit, UnitsQuery, UnitReview } from "../types";
import { getAccessToken } from "@/lib/api/token-storage";

export async function getUnitReviews(
  id: string,
  page: number = 1,
  limit: number = 10
): Promise<PaginatedResponse<UnitReview>> {
  return apiGetPaginated<UnitReview>(`/units/${id}/reviews?page=${page}&limit=${limit}`);
}

export async function getUnits(
  query?: UnitsQuery
): Promise<PaginatedResponse<Unit>> {
  const params = new URLSearchParams();
  
  if (query?.page) params.append("page", query.page.toString());
  if (query?.limit) params.append("limit", query.limit.toString());
  if (query?.ignoreLimit) params.append("ignoreLimit", "true");
  if (query?.unit_title) params.append("unit_title", query.unit_title);
  if (query?.unit_country_id) params.append("unit_country_id", query.unit_country_id);
  if (query?.unit_city_id) params.append("unit_city_id", query.unit_city_id);

  const queryString = params.toString();
  const url = `/units${queryString ? `?${queryString}` : ""}`;
  
  return apiGetPaginated<Unit>(url);
}

export async function getUnitById(id: string): Promise<Unit> {
  return apiGet<Unit>(`/units/${id}`);
}

// ---------------------------------------------------------------------------
// Host Specific API
// ---------------------------------------------------------------------------

export async function getHostUnits(
  query?: UnitsQuery
): Promise<PaginatedResponse<Unit>> {
  const params = new URLSearchParams();
  if (query?.page) params.append("page", query.page.toString());
  if (query?.limit) params.append("limit", query.limit.toString());
  
  const queryString = params.toString();
  return apiGetPaginated<Unit>(`/units/by-user${queryString ? `?${queryString}` : ""}`);
}

export async function createUnit(formData: FormData): Promise<Unit> {
  // Uses direct axios call since we need to send multipart/form-data
  const token = getAccessToken();
  const res = await apiClient.post(`/units`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...(token && { Authorization: `Bearer ${token}` })
    }
  });
  return res.data.data;
}

export async function updateUnit(id: string, data: Partial<Unit>): Promise<Unit> {
  return apiPatch<Unit>(`/units/${id}`, data);
}

export async function softDeleteUnit(id: string): Promise<void> {
  return apiDelete<void>(`/units/${id}/soft-delete`);
}

export async function activateUnit(id: string): Promise<void> {
  return apiPatch<void>(`/units/${id}/activate`);
}

export async function deactivateUnit(id: string): Promise<void> {
  return apiPatch<void>(`/units/${id}/deactivate`);
}

export async function deleteUnitPhotos(id: string, photos: string[]): Promise<void> {
  const token = getAccessToken();
  await apiClient.delete(`/units/${id}/delete-photos`, {
    data: { unit_photos: photos },
    headers: {
      ...(token && { Authorization: `Bearer ${token}` })
    }
  });
}

export async function uploadUnitPhotos(id: string, formData: FormData): Promise<Unit> {
  const token = getAccessToken();
  const res = await apiClient.patch(`/units/${id}/update-photos`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...(token && { Authorization: `Bearer ${token}` })
    }
  });
  return res.data.data;
}
