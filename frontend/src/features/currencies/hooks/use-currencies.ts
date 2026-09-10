import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  getCurrencies,
  createCurrency,
  updateCurrency,
  deleteCurrency
} from "../api/queries";
import type { CurrenciesQuery } from "../types";

export function useCurrencies(query?: CurrenciesQuery) {
  return useQuery({
    queryKey: ["currencies", query],
    queryFn: () => getCurrencies(query),
  });
}

export function useCurrencyMutations() {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: createCurrency,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["currencies"] }),
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof updateCurrency>[1] }) => updateCurrency(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["currencies"] }),
  });

  const remove = useMutation({
    mutationFn: deleteCurrency,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["currencies"] }),
  });

  return { create, update, remove };
}
