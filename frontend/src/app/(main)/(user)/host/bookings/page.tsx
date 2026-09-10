"use client";

import { useMyBookings } from "@/features/bookings/hooks/use-bookings";
import { useHostBookingMutations } from "@/features/bookings/hooks/use-host-bookings";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Suspense, useState } from "react";
import { Loader2, CheckCircle2, XCircle, Ban, CheckSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { CancelModal } from "@/features/bookings/components/cancel-modal";

function HostBookingsPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);
  const statusFilter = searchParams.get("status") || "";

  // user_type="host" to get bookings for my units
  const { data, isLoading, error } = useMyBookings({
    page,
    limit: 10,
    user_type: "host",
    ...(statusFilter && { status: statusFilter }),
  });

  const { changeStatus } = useHostBookingMutations();
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [cancelModalId, setCancelModalId] = useState<string | null>(null);

  const setPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleStatusChange = async (id: string, newStatus: "confirmed" | "declined" | "completed", data?: any) => {
    setProcessingId(id);
    try {
      await changeStatus.mutateAsync({ id, data: { status: newStatus, ...data } });
      setCancelModalId(null);
    } catch (err: unknown) {
      const msg = (err as import('axios').AxiosError<{message: string}>)?.response?.data?.message || "Failed to update booking status";
      alert(typeof msg === "string" ? msg : JSON.stringify(msg));
    } finally {
      setProcessingId(null);
    }
  };

  const handleCancelBooking = async (reason: string) => {
    if (!cancelModalId) return;
    setProcessingId(cancelModalId);
    try {
      await changeStatus.mutateAsync({ id: cancelModalId, data: { status: "cancelled", cancellation_reason: reason } });
      setCancelModalId(null);
    } catch (err: unknown) {
      const msg = (err as import('axios').AxiosError<{message: string}>)?.response?.data?.message || "Failed to cancel booking";
      alert(typeof msg === "string" ? msg : JSON.stringify(msg));
    } finally {
      setProcessingId(null);
    }
  };

  const pagination = data?.meta;
  const bookings = data?.data || [];

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex-1 max-w-5xl">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reservations</h1>
          <p className="text-muted mt-2">Manage incoming guest bookings for your properties.</p>
        </div>
        <select 
          className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
          value={statusFilter}
          onChange={(e) => {
            const params = new URLSearchParams(searchParams);
            if (e.target.value) {
              params.set("status", e.target.value);
            } else {
              params.delete("status");
            }
            params.set("page", "1");
            router.push(`${pathname}?${params.toString()}`);
          }}
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
          <option value="declined">Declined</option>
        </select>
      </div>

      {error ? (
        <div className="flex flex-col items-center justify-center py-24 text-center border rounded-2xl bg-zinc-50">
          <h3 className="text-lg font-semibold text-foreground">Unable to load reservations</h3>
          <p className="mt-2 text-sm text-muted">
            {(error as import('axios').AxiosError<{message: string}>)?.response?.data?.message || "An unexpected error occurred."}
          </p>
        </div>
      ) : isLoading ? (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-32 rounded-2xl bg-zinc-100 animate-pulse" />
          ))}
        </div>
      ) : bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center border rounded-2xl bg-zinc-50">
          <h3 className="text-xl font-semibold text-foreground">No reservations found</h3>
          <p className="mt-2 text-muted max-w-md">
            You don&apos;t have any bookings matching the current filters.
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {bookings.map((booking) => {
              const checkIn = new Date(booking.check_in);
              const checkOut = new Date(booking.check_out);
              const isPending = booking.status === "pending";
              const isConfirmed = booking.status === "confirmed";

              return (
                <div key={booking._id} className="flex flex-col md:flex-row gap-6 p-5 rounded-2xl border border-border bg-background shadow-sm">
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-foreground">
                          Unit: {booking.unit_id && typeof booking.unit_id === 'object' ? (booking.unit_id as any).unit_title || 'Unknown Unit' : String(booking.unit_id || 'Unknown')}
                        </h3>
                        <Badge 
                          className={cn(
                            "px-2.5 py-0.5 font-medium uppercase tracking-wider text-[10px]",
                            booking.status === "pending" && "bg-amber-100 text-amber-800 hover:bg-amber-100",
                            booking.status === "confirmed" && "bg-blue-100 text-blue-800 hover:bg-blue-100",
                            booking.status === "completed" && "bg-emerald-100 text-emerald-800 hover:bg-emerald-100",
                            booking.status === "cancelled" && "bg-zinc-100 text-zinc-800 hover:bg-zinc-100",
                            booking.status === "declined" && "bg-red-100 text-red-800 hover:bg-red-100"
                          )}
                          variant="secondary"
                        >
                          {booking.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm text-muted-foreground">
                        <div>
                          <p className="text-xs font-medium text-muted uppercase">Guest</p>
                          <p className="text-foreground">
                            {booking.guest_id && typeof booking.guest_id === 'object' ? (booking.guest_id as any).name || 'Unknown Guest' : String(booking.guest_id || 'Unknown')}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted uppercase">Check-in</p>
                          <p className="text-foreground">{checkIn.toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted uppercase">Check-out</p>
                          <p className="text-foreground">{checkOut.toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted uppercase">Amount</p>
                          <p className="text-foreground font-semibold">${booking.total_amount}</p>
                        </div>
                      </div>
                      
                      {booking.notes && (
                        <div className="mt-4 p-3 bg-zinc-50 rounded-lg text-sm border">
                          <span className="font-medium text-zinc-700">Guest Note:</span> {booking.notes}
                        </div>
                      )}
                    </div>

                    {isPending && (
                      <div className="mt-6 flex flex-wrap gap-3 pt-4 border-t border-border">
                        <Button 
                          size="sm" 
                          onClick={() => handleStatusChange(booking._id, "confirmed")}
                          disabled={processingId === booking._id}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                          {processingId === booking._id ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          ) : (
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                          )}
                          Approve
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleStatusChange(booking._id, "declined")}
                          disabled={processingId === booking._id}
                          className="text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200"
                        >
                          {processingId === booking._id ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          ) : (
                            <XCircle className="h-4 w-4 mr-2" />
                          )}
                          Decline
                        </Button>
                      </div>
                    )}
                    
                    {isConfirmed && (
                      <div className="mt-6 flex flex-wrap gap-3 pt-4 border-t border-border">
                        <Button 
                          size="sm" 
                          onClick={() => handleStatusChange(booking._id, "completed")}
                          disabled={processingId === booking._id}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          {processingId === booking._id ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          ) : (
                            <CheckSquare className="h-4 w-4 mr-2" />
                          )}
                          Mark as Completed
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setCancelModalId(booking._id)}
                          disabled={processingId === booking._id}
                          className="text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                        >
                          <Ban className="h-4 w-4 mr-2" />
                          Cancel Reservation
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {pagination && pagination.pageCount > 1 && (
            <div className="mt-8 flex items-center justify-center gap-4">
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
          
          <CancelModal 
            isOpen={!!cancelModalId}
            onClose={() => setCancelModalId(null)}
            onSubmit={handleCancelBooking}
            isSubmitting={!!processingId}
          />
        </>
      )}
    </div>
  );
}

export default function HostBookingsPage() {
  return (
    <Suspense 
      fallback={
        <div className="flex flex-1 items-center justify-center py-24">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <HostBookingsPageContent />
    </Suspense>
  );
}
