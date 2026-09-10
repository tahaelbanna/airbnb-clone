import { apiGet, apiPut } from "@/lib/api/client";
import type { AppSettings } from "../types";

export async function getAppSettings(): Promise<AppSettings> {
  return apiGet<AppSettings>("/app-settings");
}

export async function updateAppSettings(data: AppSettings): Promise<AppSettings> {
  return apiPut<AppSettings>("/app-settings", data);
}
