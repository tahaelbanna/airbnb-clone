"use client";

import { Suspense } from "react";
import { useFavourites } from "@/features/favourites/hooks/use-favourites";
import { UnitCard, UnitCardSkeleton } from "@/features/units/components/unit-card";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

function FavouritesPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);
  
  const { data, isLoading, error } = useFavourites({ page, limit: 12 });

  const setPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const pagination = data?.meta;
  const units = data?.data || [];

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex-1">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Your Favorites</h1>
        <p className="text-muted mt-2">Places you&apos;ve saved for later.</p>
      </div>

      {error ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <h3 className="text-lg font-semibold text-foreground">Unable to load favorites</h3>
          <p className="mt-2 text-sm text-muted">
            {(error as Error).message || "An unexpected error occurred."}
          </p>
        </div>
      ) : isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <UnitCardSkeleton key={i} />
          ))}
        </div>
      ) : units.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <h3 className="text-lg font-semibold text-foreground">No favorites yet</h3>
          <p className="mt-2 text-sm text-muted">
            You haven&apos;t saved any places to your favorites yet.
          </p>
          <Button onClick={() => router.push("/")} className="mt-6">
            Explore places
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {units.map((unit) => (
              <UnitCard key={unit._id} unit={unit as unknown as import("@/features/units/types").Unit} />
            ))}
          </div>

          {pagination && pagination.pageCount > 1 && (
            <div className="mt-16 flex items-center justify-center gap-4">
              <Button
                variant="outline"
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </Button>
              <span className="text-sm font-medium text-foreground">
                Page {page} of {pagination.pageCount}
              </span>
              <Button
                variant="outline"
                disabled={page >= pagination.pageCount}
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function FavouritesPage() {
  return (
    <Suspense 
      fallback={
        <div className="flex flex-1 items-center justify-center py-24">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <FavouritesPageContent />
    </Suspense>
  );
}
