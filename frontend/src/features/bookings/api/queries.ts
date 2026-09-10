import { apiGet, apiGetPaginated, apiPost, apiPatch } from "@/lib/api/client";
import type { PaginatedResponse } from "@/types/api";
import type {
  Booking,
  BookingsQuery,
  CheckAvailabilityRequest,
  AvailabilityResponse,
  BookingRequest,
  CancelBookingRequest,
  GuestReviewRequest,
} from "../types";

export async function checkAvailability(
  query: CheckAvailabilityRequest
): Promise<AvailabilityResponse> {
  const params = new URLSearchParams();
  params.append("unit_id", query.unit_id);
  params.append("check_in", query.check_in.toString());
  params.append("check_out", query.check_out.toString());
  if (query.adults_count) params.append("adults_count", query.adults_count.toString());
  if (query.kids_count) params.append("kids_count", query.kids_count.toString());

  return apiGet<AvailabilityResponse>(`/bookings/check-availability?${params.toString()}`);
}

export async function requestBooking(data: BookingRequest): Promise<Booking> {
  return apiPost<Booking>("/bookings", data);
}

export async function getMyBookings(
  query: BookingsQuery
): Promise<PaginatedResponse<Booking>> {
  const params = new URLSearchParams();
  
  if (query.page) params.append("page", query.page.toString());
  if (query.limit) params.append("limit", query.limit.toString());
  if (query.ignoreLimit) params.append("ignoreLimit", "true");
  
  if (query.status) params.append("status", query.status);
  if (query.unit_id) params.append("unit_id", query.unit_id);
  if (query.check_in) params.append("check_in", query.check_in);
  if (query.check_out) params.append("check_out", query.check_out);
  if (query.sort_by_created_at) params.append("sort_by_created_at", query.sort_by_created_at);
  if (query.sort_by_total_amount) params.append("sort_by_total_amount", query.sort_by_total_amount);
  
  params.append("user_type", query.user_type);

  const queryString = params.toString();
  return apiGetPaginated<Booking>(`/bookings/my-bookings?${queryString}`);
}

export async function getAllBookings(
  query: Omit<BookingsQuery, "user_type">
): Promise<PaginatedResponse<Booking>> {
  const params = new URLSearchParams();
  
  if (query.page) params.append("page", query.page.toString());
  if (query.limit) params.append("limit", query.limit.toString());
  if (query.ignoreLimit) params.append("ignoreLimit", "true");
  
  if (query.status) params.append("status", query.status);
  if (query.unit_id) params.append("unit_id", query.unit_id);
  if (query.check_in) params.append("check_in", query.check_in);
  if (query.check_out) params.append("check_out", query.check_out);
  if (query.sort_by_created_at) params.append("sort_by_created_at", query.sort_by_created_at);
  if (query.sort_by_total_amount) params.append("sort_by_total_amount", query.sort_by_total_amount);

  const queryString = params.toString();
  return apiGetPaginated<Booking>(`/bookings?${queryString}`);
}

export async function cancelBookingByGuest(
  id: string,
  data: CancelBookingRequest
): Promise<Booking> {
  return apiPatch<Booking>(`/bookings/${id}/cancel`, data);
}

export async function reviewBooking(
  id: string,
  data: GuestReviewRequest
): Promise<Booking> {
  return apiPatch<Booking>(`/bookings/${id}/submit-review`, data);
}

export async function changeBookingStatusByHost(
  id: string,
  data: { status: "confirmed" | "declined" | "completed" | "cancelled" | "pending"; cancellation_reason?: string }
): Promise<Booking> {
  return apiPatch<Booking>(`/bookings/${id}/status`, data);
}
