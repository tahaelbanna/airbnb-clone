import { apiGetPaginated, apiPost, apiPatch, apiDelete } from "@/lib/api/client";
import type { PaginatedResponse } from "@/types/api";
import type { Country, City, CountriesQuery, CitiesQuery } from "../types";

// Countries
export async function getCountries(
  query?: CountriesQuery
): Promise<PaginatedResponse<Country>> {
  const params = new URLSearchParams();
  
  if (query?.page) params.append("page", query.page.toString());
  if (query?.limit) params.append("limit", query.limit.toString());
  if (query?.ignoreLimit) params.append("ignoreLimit", "true");
  if (query?.country_name) params.append("country_name", query.country_name);
  if (query?.country_code) params.append("country_code", query.country_code);

  const queryString = params.toString();
  return apiGetPaginated<Country>(`/countries${queryString ? `?${queryString}` : ""}`);
}

export async function createCountry(data: { country_name: string; country_code?: string }): Promise<Country> {
  return apiPost<Country>("/countries", data);
}

export async function updateCountry(id: string, data: { country_name?: string; country_code?: string }): Promise<Country> {
  return apiPatch<Country>(`/countries/${id}`, data);
}

export async function deleteCountry(id: string): Promise<void> {
  return apiDelete(`/countries/${id}`);
}

// Cities
export async function getCities(
  query?: CitiesQuery
): Promise<PaginatedResponse<City>> {
  const params = new URLSearchParams();
  
  if (query?.page) params.append("page", query.page.toString());
  if (query?.limit) params.append("limit", query.limit.toString());
  if (query?.ignoreLimit) params.append("ignoreLimit", "true");
  if (query?.city_name) params.append("city_name", query.city_name);
  if (query?.country_id) params.append("country_id", query.country_id);

  const queryString = params.toString();
  return apiGetPaginated<City>(`/cities${queryString ? `?${queryString}` : ""}`);
}

export async function createCity(data: { city_name: string; country_id: string }): Promise<City> {
  return apiPost<City>("/cities", data);
}

export async function updateCity(id: string, data: { city_name?: string; country_id?: string }): Promise<City> {
  return apiPatch<City>(`/cities/${id}`, data);
}

export async function deleteCity(id: string): Promise<void> {
  return apiDelete(`/cities/${id}`);
}
