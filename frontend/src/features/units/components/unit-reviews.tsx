"use client";

import { useUnitReviews } from "@/features/units/hooks/use-units";
import { Star, MessageSquare } from "lucide-react";

interface UnitReviewsProps {
  unitId: string;
}

export function UnitReviews({ unitId }: UnitReviewsProps) {
  const { data, isLoading, error } = useUnitReviews(unitId, 1, 50); // Fetch up to 50 reviews for display

  if (isLoading) {
    return (
      <div className="mt-8 animate-pulse space-y-4">
        <div className="h-6 w-32 rounded bg-zinc-200"></div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="h-24 rounded-xl bg-zinc-100"></div>
          <div className="h-24 rounded-xl bg-zinc-100"></div>
        </div>
      </div>
    );
  }

  if (error || !data || !data.data) {
    return null;
  }

  const reviews = data.data;

  if (reviews.length === 0) {
    return (
      <div className="mt-16 pt-12 border-t border-border/60">
        <h2 className="text-3xl font-serif text-foreground tracking-tight mb-8">Reviews</h2>
        <div className="flex flex-col items-center justify-center p-12 text-center rounded-[2rem] bg-surface border border-border/40">
          <MessageSquare className="h-12 w-12 text-muted-foreground/30 mb-4" />
          <h3 className="text-xl font-serif text-foreground">No reviews yet</h3>
          <p className="text-lg font-light text-muted mt-2">Be the first to review this place after your stay.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-16 pt-12 border-t border-border/60">
      <h2 className="text-3xl font-serif text-foreground tracking-tight mb-10 flex items-center gap-3">
        <Star className="h-6 w-6 fill-current text-primary" />
        Reviews ({data.meta.totalCount})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {reviews.map((review, i) => (
          <div key={i} className="flex flex-col space-y-4 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface border border-border/50 text-lg font-serif text-primary shadow-sm">
                  {review.guest?.name ? review.guest.name.charAt(0).toUpperCase() : "?"}
                </div>
                <div>
                  <p className="font-medium text-foreground text-base">{review.guest?.name || "Anonymous Guest"}</p>
                  <p className="text-sm text-muted font-light">
                    {new Date(review.createdAt).toLocaleDateString(undefined, {
                      year: 'numeric', month: 'long'
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 bg-surface border border-border/50 px-3 py-1.5 rounded-full shadow-sm">
                <Star className="h-3.5 w-3.5 fill-current text-primary" />
                <span className="text-sm font-semibold">{review.rating}</span>
              </div>
            </div>
            {review.comment && (
              <p className="text-base text-muted leading-relaxed font-light mt-2">
                "{review.comment}"
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
