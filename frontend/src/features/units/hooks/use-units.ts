import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getUnits, getUnitById, getUnitReviews } from "../api/queries";
import type { UnitsQuery } from "../types";

export function useUnits(query?: UnitsQuery) {
  return useQuery({
    queryKey: ["units", query],
    queryFn: () => getUnits(query),
    placeholderData: keepPreviousData,
  });
}

export function useUnit(id: string) {
  return useQuery({
    queryKey: ["unit", id],
    queryFn: () => getUnitById(id),
    enabled: !!id,
  });
}

export function useUnitReviews(id: string, page: number = 1, limit: number = 5) {
  return useQuery({
    queryKey: ["unit", id, "reviews", page, limit],
    queryFn: () => getUnitReviews(id, page, limit),
    enabled: !!id,
    placeholderData: keepPreviousData,
  });
}
