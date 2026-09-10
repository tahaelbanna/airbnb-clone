import { apiGetPaginated, apiPost, apiPatch, apiDelete } from "@/lib/api/client";
import type { PaginatedResponse } from "@/types/api";
import type { Currency, CurrenciesQuery } from "../types";

export async function getCurrencies(
  query?: CurrenciesQuery
): Promise<PaginatedResponse<Currency>> {
  const params = new URLSearchParams();
  
  if (query?.page) params.append("page", query.page.toString());
  if (query?.limit) params.append("limit", query.limit.toString());
  if (query?.ignoreLimit) params.append("ignoreLimit", "true");

  const queryString = params.toString();
  return apiGetPaginated<Currency>(`/currencies${queryString ? `?${queryString}` : ""}`);
}

export async function createCurrency(data: { currency_name: string; currency_code?: string }): Promise<Currency> {
  return apiPost<Currency>("/currencies", data);
}

export async function updateCurrency(id: string, data: { currency_name?: string; currency_code?: string }): Promise<Currency> {
  return apiPatch<Currency>(`/currencies/${id}`, data);
}

export async function deleteCurrency(id: string): Promise<void> {
  return apiDelete(`/currencies/${id}`);
}
