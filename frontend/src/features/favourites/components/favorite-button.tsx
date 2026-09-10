"use client";

import { Heart } from "lucide-react";
import { useAuthStore, selectIsAuthenticated, selectIsAdmin } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { useFavourites, useToggleFavourite } from "../hooks/use-favourites";
import { cn } from "@/lib/utils/cn";

interface FavoriteButtonProps {
  unitId: string;
  className?: string;
}

export function FavoriteButton({ unitId, className }: FavoriteButtonProps) {
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const isAdmin = useAuthStore(selectIsAdmin);
  const router = useRouter();
  
  // We use the first page of favorites to check if it's favorited. 
  // If there are many pages, this isn't perfect, but it's the best we can do
  // without a specific `is_favorite` flag on the unit endpoint.
  const { data: favouritesData } = useFavourites(
    isAuthenticated ? { page: 1, limit: 100 } : undefined,
    isAuthenticated
  );
  const { addMut, removeMut } = useToggleFavourite();

  const isFavorited = favouritesData?.data.some((f) => f._id === unitId) ?? false;

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating if this is inside a Link
    e.stopPropagation();

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (addMut.isPending || removeMut.isPending) return;

    if (isFavorited) {
      removeMut.mutate(unitId);
    } else {
      addMut.mutate(unitId);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      disabled={addMut.isPending || removeMut.isPending || isAdmin}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-sm transition-transform hover:scale-110 active:scale-95 disabled:opacity-50",
        className
      )}
      aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart
        className={cn(
          "h-5 w-5 transition-colors",
          isFavorited ? "fill-rose-500 text-rose-500" : "text-zinc-600"
        )}
      />
    </button>
  );
}
