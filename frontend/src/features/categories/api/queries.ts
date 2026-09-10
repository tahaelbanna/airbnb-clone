import { apiGetPaginated, apiPost, apiPatch, apiDelete } from "@/lib/api/client";
import type { PaginatedResponse } from "@/types/api";
import type { Category, CategoriesQuery } from "../types";

export async function getCategories(
  query?: CategoriesQuery
): Promise<PaginatedResponse<Category>> {
  const params = new URLSearchParams();
  
  if (query?.page) params.append("page", query.page.toString());
  if (query?.limit) params.append("limit", query.limit.toString());
  if (query?.ignoreLimit) params.append("ignoreLimit", "true");
  if (query?.unit_categories_name) params.append("unit_categories_name", query.unit_categories_name);
  if (query?.icon) params.append("icon", query.icon);

  const queryString = params.toString();
  const url = `/unit-categories${queryString ? `?${queryString}` : ""}`;
  
  return apiGetPaginated<Category>(url);
}

export async function createCategory(data: { unit_categories_name: string; icon: string }): Promise<Category> {
  return apiPost<Category>("/unit-categories", data);
}

export async function updateCategory(id: string, data: { unit_categories_name?: string; icon?: string }): Promise<Category> {
  return apiPatch<Category>(`/unit-categories/${id}`, data);
}

export async function deleteCategory(id: string): Promise<void> {
  return apiDelete(`/unit-categories/${id}`);
}
