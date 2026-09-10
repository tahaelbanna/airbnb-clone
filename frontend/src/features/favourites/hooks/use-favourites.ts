import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { getFavourites, addFavourite, removeFavourite } from "../api/queries";
import type { FavouritesQuery } from "../types";

export function useFavourites(query?: FavouritesQuery, enabled: boolean = true) {
  return useQuery({
    queryKey: ["favourites", query],
    queryFn: () => getFavourites(query),
    placeholderData: keepPreviousData,
    enabled: enabled,
  });
}

export function useToggleFavourite() {
  const queryClient = useQueryClient();

  const addMut = useMutation({
    mutationFn: addFavourite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favourites"] });
    },
  });

  const removeMut = useMutation({
    mutationFn: removeFavourite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favourites"] });
    },
  });

  return { addMut, removeMut };
}
