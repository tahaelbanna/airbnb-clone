"use client";

import { useAdminBookings } from "@/features/bookings/hooks/use-bookings";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

export default function AdminBookingsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);
  const statusFilter = searchParams.get("status") || "";

  const { data, isLoading, error } = useAdminBookings({
    page,
    limit: 10,
    ...(statusFilter && { status: statusFilter as import("@/features/bookings/types").BookingsQuery["status"] }),
  });

  const setPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const pagination = data?.meta;
  const bookings = data?.data || [];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Platform Bookings</h1>
          <p className="text-zinc-500 mt-2">View all bookings across the platform. Note: Admins can only view bookings, not modify them.</p>
        </div>
        <select 
          className="h-10 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
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
        <div className="flex flex-col items-center justify-center py-24 text-center border border-red-100 rounded-2xl bg-red-50">
          <h3 className="text-lg font-semibold text-red-900">Unable to load bookings</h3>
          <p className="mt-2 text-sm text-red-700">
            {(error as import('axios').AxiosError<{message: string}>)?.response?.data?.message || "An unexpected error occurred."}
          </p>
        </div>
      ) : isLoading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : (
        <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500">
              <tr>
                <th className="px-6 py-4 font-medium">Booking ID</th>
                <th className="px-6 py-4 font-medium">Unit / Host</th>
                <th className="px-6 py-4 font-medium">Guest</th>
                <th className="px-6 py-4 font-medium">Dates</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {bookings.map((booking) => {
                const checkIn = new Date(booking.check_in);
                const checkOut = new Date(booking.check_out);

                return (
                  <tr key={booking._id} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-6 py-4 text-zinc-500 text-xs font-mono">{booking._id.slice(-6)}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-zinc-900">
                        {booking.unit_id && typeof booking.unit_id === 'object' ? (booking.unit_id as any).unit_title || 'Unknown Unit' : String(booking.unit_id || 'Unknown')}
                      </div>
                      <div className="text-xs text-zinc-500">
                        Host: {booking.host_id && typeof booking.host_id === 'object' ? (booking.host_id as any).name || 'Unknown Host' : String(booking.host_id || 'Unknown')}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-zinc-900">
                      {booking.guest_id && typeof booking.guest_id === 'object' ? (booking.guest_id as any).name || 'Unknown Guest' : String(booking.guest_id || 'Unknown')}
                    </td>
                    <td className="px-6 py-4 text-zinc-500 text-xs">
                      {checkIn.toLocaleDateString()} &rarr; {checkOut.toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 font-medium text-zinc-900">${booking.total_amount}</td>
                    <td className="px-6 py-4">
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
                    </td>
                  </tr>
                );
              })}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-zinc-500">No bookings found.</td>
                </tr>
              )}
            </tbody>
          </table>
          
          {pagination && pagination.pageCount > 1 && (
            <div className="px-6 py-4 border-t border-zinc-200 flex items-center justify-between">
              <span className="text-sm text-zinc-500">Page {page} of {pagination.pageCount}</span>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled={page <= 1}
                  onClick={() => setPage(page - 1)}
                >
                  Previous
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled={page >= pagination.pageCount}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
