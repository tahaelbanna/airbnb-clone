import { UnitCard, UnitCardSkeleton } from "./unit-card";
import type { Unit } from "../types";

interface UnitGridProps {
  units: Unit[];
  isLoading: boolean;
  error: Error | null;
  onClearFilters?: () => void;
}

export function UnitGrid({ units, isLoading, error, onClearFilters }: UnitGridProps) {
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <h3 className="text-lg font-semibold text-foreground">Unable to load units</h3>
        <p className="mt-2 text-sm text-muted max-w-md">
          {error.message || "An unexpected error occurred. Please try again later."}
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <UnitCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!units || units.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <h3 className="text-lg font-semibold text-foreground">No units found</h3>
        <p className="mt-2 text-sm text-muted">
          We couldn&apos;t find any units matching your search.
        </p>
        {onClearFilters && (
          <button 
            onClick={onClearFilters}
            className="mt-6 rounded-xl border border-border px-4 py-2 text-sm font-medium hover:bg-zinc-50"
          >
            Clear filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {units.map((unit) => (
        <UnitCard key={unit._id} unit={unit} />
      ))}
    </div>
  );
}
