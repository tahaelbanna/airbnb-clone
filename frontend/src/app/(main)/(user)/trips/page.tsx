"use client";

import { useMyBookings } from "@/features/bookings/hooks/use-bookings";
import { TripCard } from "@/features/bookings/components/trip-card";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

function TripsPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);
  
  const { data, isLoading, error } = useMyBookings({ 
    page, 
    limit: 10,
    user_type: "guest",
    sort_by_created_at: "desc"
  });

  const setPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const pagination = data?.meta;
  const bookings = data?.data || [];

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex-1">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Your Trips</h1>
        <p className="text-muted mt-2">Manage your past and upcoming reservations.</p>
      </div>

      {error ? (
        <div className="flex flex-col items-center justify-center py-24 text-center border rounded-2xl bg-zinc-50">
          <h3 className="text-lg font-semibold text-foreground">Unable to load trips</h3>
          <p className="mt-2 text-sm text-muted">
            {(error as { response?: { data?: { message?: string } } })?.response?.data?.message || "An unexpected error occurred."}
          </p>
        </div>
      ) : isLoading ? (
        <div className="flex flex-col gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-64 rounded-2xl bg-zinc-100 animate-pulse" />
          ))}
        </div>
      ) : bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center border rounded-2xl bg-zinc-50">
          <h3 className="text-xl font-semibold text-foreground">No trips booked yet</h3>
          <p className="mt-2 text-muted max-w-md">
            Time to dust off your bags and start planning your next adventure.
          </p>
          <Button onClick={() => router.push("/")} className="mt-6">
            Start searching
          </Button>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-6">
            {bookings.map((booking) => (
              <TripCard key={booking._id} booking={booking} />
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

export default function TripsPage() {
  return (
    <Suspense 
      fallback={
        <div className="flex flex-1 items-center justify-center py-24">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <TripsPageContent />
    </Suspense>
  );
}
