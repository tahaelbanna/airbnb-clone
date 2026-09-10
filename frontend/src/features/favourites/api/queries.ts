import { apiGetPaginated, apiPost, apiDelete } from "@/lib/api/client";
import type { PaginatedResponse } from "@/types/api";
import type { UnitFavourite, FavouritesQuery } from "../types";

export async function getFavourites(
  query?: FavouritesQuery
): Promise<PaginatedResponse<UnitFavourite>> {
  const params = new URLSearchParams();
  
  if (query?.page) params.append("page", query.page.toString());
  if (query?.limit) params.append("limit", query.limit.toString());
  if (query?.ignoreLimit) params.append("ignoreLimit", "true");

  const queryString = params.toString();
  const url = `/unit-favourites${queryString ? `?${queryString}` : ""}`;
  
  return apiGetPaginated<UnitFavourite>(url);
}

export async function addFavourite(unitId: string): Promise<void> {
  return apiPost<void>(`/unit-favourites/${unitId}`);
}

export async function removeFavourite(unitId: string): Promise<void> {
  return apiDelete<void>(`/unit-favourites/${unitId}`);
}
