import type { PaginationParams } from "@/types/api";

export interface Currency {
  _id: string;
  currency_name: string;
  currency_code?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CurrenciesQuery extends PaginationParams {
  ignoreLimit?: boolean;
}
