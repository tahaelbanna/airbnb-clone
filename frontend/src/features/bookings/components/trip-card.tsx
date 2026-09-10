"use client";

import { useUnit } from "@/features/units/hooks/use-units";
import type { Booking } from "../types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useBookingMutations } from "../hooks/use-bookings";
import { useState } from "react";
import { Loader2 } from "lucide-react";

import { ReviewModal } from "./review-modal";

interface TripCardProps {
  booking: Booking;
}

export function TripCard({ booking }: TripCardProps) {
  const { cancelBooking } = useBookingMutations();
  // Safely extract populated unit data
  const unit = typeof booking.unit_id === 'object' && booking.unit_id !== null ? booking.unit_id as any : null;
  const [isCancelling, setIsCancelling] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const handleCancel = () => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      setIsCancelling(true);
      cancelBooking.mutate(
        { id: booking._id, data: { cancellation_reason: "User requested cancellation" } },
        {
          onSettled: () => setIsCancelling(false),
          onError: (err: unknown) => {
            alert((err as { response?: { data?: { message?: string } } })?.response?.data?.message || "Failed to cancel booking");
          }
        }
      );
    }
  };

  const getStatusBadge = () => {
    switch (booking.status) {
      case "pending": return <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-100">Pending</Badge>;
      case "confirmed": return <Badge variant="default" className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Confirmed</Badge>;
      case "cancelled": return <Badge variant="destructive">Cancelled</Badge>;
      case "declined": return <Badge variant="destructive">Declined</Badge>;
      case "completed": return <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Completed</Badge>;
      default: return <Badge variant="secondary">{booking.status}</Badge>;
    }
  };

  const canCancel = booking.status === "pending" || booking.status === "confirmed";
  const canReview = booking.status === "completed" && !booking.guest_review;

  return (
    <>
      <div className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl border border-border bg-background shadow-sm hover:shadow-md transition-shadow">
        {/* Unit Image & Info */}
        <div className="w-full md:w-1/3 aspect-video md:aspect-square relative rounded-xl overflow-hidden bg-zinc-100 flex-shrink-0">
          {unit ? (
            <img 
              src={unit.unit_photos?.[0] || "https://placehold.co/600x400?text=No+Image"} 
              alt={`Image of ${unit.unit_title}`}
              className="h-full w-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Image+Unavailable"; }}
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-muted">Unknown Unit</div>
          )}
        </div>

        {/* Booking Details */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h3 className="text-xl font-semibold text-foreground">
                  {unit?.unit_title || "Unknown Unit"}
                </h3>
                <p className="text-muted text-sm mt-1">
                  {unit?.unit_address || "Location unavailable"}
                </p>
              </div>
              {getStatusBadge()}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-zinc-50 p-3 rounded-lg border border-border">
                <p className="text-xs font-semibold uppercase text-muted">Check-in</p>
                <p className="text-sm font-medium mt-1">
                  {new Date(booking.check_in).toLocaleDateString(undefined, {
                    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
                  })}
                </p>
              </div>
              <div className="bg-zinc-50 p-3 rounded-lg border border-border">
                <p className="text-xs font-semibold uppercase text-muted">Check-out</p>
                <p className="text-sm font-medium mt-1">
                  {new Date(booking.check_out).toLocaleDateString(undefined, {
                    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
                  })}
                </p>
              </div>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground">
              <div>
                <span className="text-muted">Total amount: </span>
                <span className="font-semibold">${booking.total_amount}</span>
              </div>
              <div>
                <span className="text-muted">Guests: </span>
                <span className="font-semibold">
                  {(booking.adults_count || 0) + (booking.kids_count || 0)}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-wrap items-center gap-3 justify-end pt-4 border-t border-border">
            {canCancel && (
              <Button 
                variant="outline" 
                className="text-destructive hover:bg-destructive/10 border-destructive/20"
                onClick={handleCancel}
                disabled={isCancelling}
              >
                {isCancelling && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Cancel Reservation
              </Button>
            )}
            
            {canReview && (
              <Button variant="primary" onClick={() => setIsReviewOpen(true)}>
                Leave a Review
              </Button>
            )}
            
            {booking.guest_review && (
              <span className="text-sm text-muted italic">You reviewed this stay</span>
            )}
          </div>
        </div>
      </div>
      
      <ReviewModal 
        bookingId={booking._id} 
        isOpen={isReviewOpen} 
        onClose={() => setIsReviewOpen(false)} 
      />
    </>
  );
}
