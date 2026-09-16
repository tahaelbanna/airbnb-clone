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
      <div className="flex flex-col items-center justify-center py-32 text-center bg-surface rounded-[2.5rem] border border-border/40 my-8">
        <h3 className="text-3xl font-serif text-foreground tracking-tight">Unable to load units</h3>
        <p className="mt-4 text-muted text-lg font-light max-w-md">
          {error.message || "An unexpected error occurred. Please try again later."}
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <UnitCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!units || units.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center bg-surface rounded-[2.5rem] border border-border/40 my-8">
        <h3 className="text-3xl font-serif text-foreground tracking-tight">No units found</h3>
        <p className="mt-4 text-muted text-lg font-light max-w-sm">
          We couldn&apos;t find any units matching your search. Try adjusting your filters.
        </p>
        {onClearFilters && (
          <button 
            onClick={onClearFilters}
            className="mt-8 rounded-full border border-border bg-background px-8 py-3 text-sm font-medium hover:bg-zinc-50/50 shadow-sm transition-all"
          >
            Clear filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {units.map((unit) => (
        <UnitCard key={unit._id} unit={unit} />
      ))}
    </div>
  );
}
