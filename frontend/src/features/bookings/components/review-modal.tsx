"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useBookingMutations } from "../hooks/use-bookings";
import { Star, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const reviewSchema = z.object({
  rating: z.number().min(1, "Rating must be at least 1").max(5),
  comment: z.string().min(5, "Comment must be at least 5 characters").max(1000).optional().or(z.literal("")),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

interface ReviewModalProps {
  bookingId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ReviewModal({ bookingId, isOpen, onClose }: ReviewModalProps) {
  const { submitReview } = useBookingMutations();
  const [hoveredRating, setHoveredRating] = useState(0);

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  const rating = useWatch({ control: form.control, name: "rating" });

  const onSubmit = (data: ReviewFormValues) => {
    submitReview.mutate(
      { id: bookingId, data },
      {
        onSuccess: () => {
          onClose();
          form.reset();
        },
      }
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-2xl bg-background p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">Leave a Review</h2>
          <button 
            onClick={onClose}
            className="rounded-full p-2 hover:bg-zinc-100 transition-colors"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col items-center gap-2">
            <Label className="text-base">How was your stay?</Label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="p-1 focus:outline-none"
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => {
                    form.setValue("rating", star, { shouldValidate: true });
                  }}
                >
                  <Star 
                    className={cn(
                      "h-10 w-10 transition-colors",
                      (hoveredRating || rating) >= star 
                        ? "fill-amber-400 text-amber-400" 
                        : "text-zinc-200"
                    )} 
                  />
                </button>
              ))}
            </div>
            {form.formState.errors.rating && (
              <p className="text-xs text-destructive">{form.formState.errors.rating.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Share your experience (Optional)</Label>
            <textarea
              className="flex min-h-[120px] w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              placeholder="What did you love? What could be improved?"
              {...form.register("comment")}
            />
            {form.formState.errors.comment && (
              <p className="text-xs text-destructive">{form.formState.errors.comment.message}</p>
            )}
          </div>

          {submitReview.error && (
            <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
              {(submitReview.error as { response?: { data?: { message?: string } } })?.response?.data?.message || "Failed to submit review."}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={onClose} disabled={submitReview.isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitReview.isPending || rating === 0}>
              {submitReview.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Review
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
