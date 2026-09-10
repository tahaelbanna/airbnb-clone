import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  getCountries, getCities, 
  createCountry, updateCountry, deleteCountry,
  createCity, updateCity, deleteCity
} from "../api/queries";
import type { CountriesQuery, CitiesQuery } from "../types";

// Countries
export function useCountries(query?: CountriesQuery) {
  return useQuery({
    queryKey: ["countries", query],
    queryFn: () => getCountries(query),
  });
}

export function useCountryMutations() {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: createCountry,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["countries"] }),
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof updateCountry>[1] }) => updateCountry(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["countries"] }),
  });

  const remove = useMutation({
    mutationFn: deleteCountry,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["countries"] }),
  });

  return { create, update, remove };
}

// Cities
export function useCities(query?: CitiesQuery) {
  return useQuery({
    queryKey: ["cities", query],
    queryFn: () => getCities(query),
    enabled: !query || !query.country_id || query.country_id !== "", 
  });
}

export function useCityMutations() {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: createCity,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cities"] }),
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof updateCity>[1] }) => updateCity(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cities"] }),
  });

  const remove = useMutation({
    mutationFn: deleteCity,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cities"] }),
  });

  return { create, update, remove };
}
