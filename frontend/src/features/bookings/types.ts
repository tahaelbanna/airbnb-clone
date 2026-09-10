import type { PaginationParams } from "@/types/api";

export interface Booking {
  _id: string;
  unit_id: string;
  host_id: string;
  guest_id: string;
  cancellation_reason?: string;
  check_in: string; // Date string
  check_out: string; // Date string
  adults_count?: number;
  kids_count?: number;
  price_per_night: number;
  nights_count: number;
  booking_amount: number;
  vat: number;
  vat_amount: number;
  total_amount: number;
  status: "pending" | "confirmed" | "cancelled" | "declined" | "completed";
  notes?: string;
  guest_review?: {
    rating: number;
    comment?: string;
  };
}

export interface BookingsQuery extends PaginationParams {
  status?: string;
  unit_id?: string;
  check_in?: string;
  check_out?: string;
  sort_by_created_at?: string;
  sort_by_total_amount?: string;
  user_type: "guest" | "host";
}

export interface CheckAvailabilityRequest {
  unit_id: string;
  check_in: string | number;
  check_out: string | number;
  adults_count?: number;
  kids_count?: number;
}

export interface AvailabilityResponse {
  available: boolean;
  nights_count: number;
  price_per_night: number;
  booking_amount: number;
  vat_amount: number;
  total_amount: number;
}

export interface BookingRequest {
  unit_id: string;
  check_in: string | number;
  check_out: string | number;
  adults_count?: number;
  kids_count?: number;
  notes?: string;
}

export interface CancelBookingRequest {
  cancellation_reason?: string;
}

export interface GuestReviewRequest {
  rating: number;
  comment?: string;
}
