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
      <div className="mt-12 pt-8 border-t border-border">
        <h2 className="text-xl font-semibold text-foreground mb-6">Reviews</h2>
        <div className="flex flex-col items-center justify-center p-8 text-center rounded-2xl bg-zinc-50 border border-zinc-100">
          <MessageSquare className="h-10 w-10 text-zinc-300 mb-3" />
          <h3 className="font-medium text-zinc-700">No reviews yet</h3>
          <p className="text-sm text-zinc-500 mt-1">Be the first to review this place after your stay.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 pt-8 border-t border-border">
      <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
        <Star className="h-5 w-5 fill-current text-primary" />
        Reviews ({data.meta.totalCount})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {reviews.map((review, i) => (
          <div key={i} className="flex flex-col space-y-3 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-200 text-sm font-semibold text-zinc-700">
                  {review.guest?.name ? review.guest.name.charAt(0).toUpperCase() : "?"}
                </div>
                <div>
                  <p className="font-medium text-foreground">{review.guest?.name || "Anonymous Guest"}</p>
                  <p className="text-xs text-muted">
                    {new Date(review.createdAt).toLocaleDateString(undefined, {
                      year: 'numeric', month: 'long'
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-zinc-100 px-2 py-1 rounded-md">
                <Star className="h-3 w-3 fill-current text-primary" />
                <span className="text-xs font-semibold">{review.rating}</span>
              </div>
            </div>
            {review.comment && (
              <p className="text-sm text-zinc-700 mt-2 leading-relaxed">
                "{review.comment}"
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
