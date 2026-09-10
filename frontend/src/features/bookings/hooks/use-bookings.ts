import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import {
  checkAvailability,
  requestBooking,
  getMyBookings,
  getAllBookings,
  cancelBookingByGuest,
  reviewBooking,
} from "../api/queries";
import type { BookingsQuery, CheckAvailabilityRequest, CancelBookingRequest, GuestReviewRequest } from "../types";

export function useAvailability(query: CheckAvailabilityRequest | null) {
  return useQuery({
    queryKey: ["availability", query],
    queryFn: () => checkAvailability(query!),
    enabled: !!query,
  });
}

export function useMyBookings(query: BookingsQuery) {
  return useQuery({
    queryKey: ["myBookings", query],
    queryFn: () => getMyBookings(query),
    placeholderData: keepPreviousData,
  });
}

export function useAdminBookings(query: Omit<BookingsQuery, "user_type">) {
  return useQuery({
    queryKey: ["adminBookings", query],
    queryFn: () => getAllBookings(query),
    placeholderData: keepPreviousData,
  });
}

export function useBookingMutations() {
  const queryClient = useQueryClient();

  const createBooking = useMutation({
    mutationFn: requestBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myBookings"] });
      // We could also invalidate availability if we knew the exact unit, but the user is navigating away
    },
  });

  const cancelBooking = useMutation({
    mutationFn: ({ id, data }: { id: string; data: unknown }) => cancelBookingByGuest(id, data as CancelBookingRequest),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myBookings"] });
    },
  });

  const submitReview = useMutation({
    mutationFn: ({ id, data }: { id: string; data: unknown }) => reviewBooking(id, data as GuestReviewRequest),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myBookings"] });
      // Invalidate the unit so the new review/rating shows up
      queryClient.invalidateQueries({ queryKey: ["unit"] });
      queryClient.invalidateQueries({ queryKey: ["units"] });
    },
  });

  return {
    createBooking,
    cancelBooking,
    submitReview,
  };
}
