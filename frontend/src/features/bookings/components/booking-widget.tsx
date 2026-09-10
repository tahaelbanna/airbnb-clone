"use client";


import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAvailability, useBookingMutations } from "../hooks/use-bookings";
import { useAuthStore, selectIsAuthenticated, selectIsAdmin } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { Loader2, Info } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";

const bookingSchema = z.object({
  check_in: z.string().min(1, "Check-in date is required"),
  check_out: z.string().min(1, "Check-out date is required"),
  adults_count: z.number().min(1, "At least 1 adult is required"),
  kids_count: z.number().min(0),
}).refine((data) => {
  const start = new Date(data.check_in).getTime();
  const end = new Date(data.check_out).getTime();
  return end > start;
}, {
  message: "Check-out must be after check-in",
  path: ["check_out"],
});

type BookingFormValues = z.infer<typeof bookingSchema>;

interface BookingWidgetProps {
  unitId: string;
  pricePerNight: number;
}

export function BookingWidget({ unitId, pricePerNight }: BookingWidgetProps) {
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const isAdmin = useAuthStore(selectIsAdmin);
  const router = useRouter();
  const { createBooking } = useBookingMutations();
  
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      check_in: "",
      check_out: "",
      adults_count: 1,
      kids_count: 0,
    },
  });

  const watchAll = useWatch({ control: form.control });
  
  // Debounce the form values to avoid spamming the availability check endpoint
  const debouncedValues = useDebounce(watchAll, 500);

  // Determine if we should check availability
  const isFormValid = 
    debouncedValues.check_in && 
    debouncedValues.check_out &&
    debouncedValues.adults_count !== undefined &&
    debouncedValues.kids_count !== undefined &&
    new Date(debouncedValues.check_out).getTime() > new Date(debouncedValues.check_in).getTime();

  const { data: availability, isLoading: isChecking, error: checkError } = useAvailability(
    isFormValid
      ? {
          unit_id: unitId,
          check_in: debouncedValues.check_in!,
          check_out: debouncedValues.check_out!,
          adults_count: debouncedValues.adults_count,
          kids_count: debouncedValues.kids_count,
        }
      : null
  );

  const onSubmit = (data: BookingFormValues) => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    createBooking.mutate(
      {
        unit_id: unitId,
        check_in: data.check_in,
        check_out: data.check_out,
        adults_count: data.adults_count,
        kids_count: data.kids_count,
      },
      {
        onSuccess: () => {
          router.push("/trips");
        },
      }
    );
  };

  // Get today's date in YYYY-MM-DD for the min attribute
  const today = new Date().toISOString().split("T")[0];
  const minCheckOut = watchAll.check_in 
    ? new Date(new Date(watchAll.check_in).getTime() + 86400000).toISOString().split("T")[0]
    : today;

  return (
    <div className="rounded-2xl border border-border bg-background p-6 shadow-xl">
      <div className="flex items-end gap-1 mb-6">
        <span className="text-2xl font-bold text-foreground">
          ${pricePerNight}
        </span>
        <span className="text-base text-muted mb-1">night</span>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-2 rounded-xl border border-border overflow-hidden p-1">
          <div className="flex flex-col p-2 bg-zinc-50 rounded-lg">
            <Label className="text-xs font-bold uppercase text-foreground mb-1">Check-in</Label>
            <input
              type="date"
              min={today}
              className="bg-transparent outline-none text-sm w-full"
              {...form.register("check_in")}
            />
          </div>
          <div className="flex flex-col p-2 bg-zinc-50 rounded-lg">
            <Label className="text-xs font-bold uppercase text-foreground mb-1">Check-out</Label>
            <input
              type="date"
              min={minCheckOut}
              className="bg-transparent outline-none text-sm w-full"
              {...form.register("check_out")}
            />
          </div>
        </div>
        {(form.formState.errors.check_in || form.formState.errors.check_out) && (
          <p className="text-xs text-destructive">
            {form.formState.errors.check_in?.message || form.formState.errors.check_out?.message}
          </p>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col space-y-2">
            <Label>Adults</Label>
            <input
              type="number"
              min={1}
              className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              {...form.register("adults_count", { valueAsNumber: true })}
            />
            {form.formState.errors.adults_count && (
              <p className="text-xs text-destructive">{form.formState.errors.adults_count.message}</p>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <Label>Kids</Label>
            <input
              type="number"
              min={0}
              className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              {...form.register("kids_count", { valueAsNumber: true })}
            />
            {form.formState.errors.kids_count && (
              <p className="text-xs text-destructive">{form.formState.errors.kids_count.message}</p>
            )}
          </div>
        </div>

        {/* Dynamic Pricing / Availability Status */}
        {isChecking && (
          <div className="flex items-center justify-center py-4 text-muted">
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
            <span className="text-sm">Checking availability...</span>
          </div>
        )}

        {!isChecking && checkError && (
          <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive mt-4">
            {(checkError as { response?: { data?: { message?: string } } })?.response?.data?.message || "Failed to check availability."}
          </div>
        )}

        {!isChecking && availability && (
          <div className="mt-6 space-y-4">
            {availability.available ? (
              <>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-muted">
                    <span>${availability.price_per_night} x {availability.nights_count} nights</span>
                    <span>${availability.booking_amount}</span>
                  </div>
                  {availability.vat_amount > 0 && (
                    <div className="flex justify-between text-muted">
                      <span>Taxes & fees</span>
                      <span>${availability.vat_amount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t pt-2 mt-4 flex justify-between font-bold text-foreground">
                    <span>Total</span>
                    <span>${availability.total_amount}</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 flex gap-2">
                <Info className="h-5 w-5 shrink-0" />
                <p>These dates are not available. Please try selecting different dates.</p>
              </div>
            )}
          </div>
        )}

        {createBooking.error && (
          <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive mt-4">
            {(createBooking.error as { response?: { data?: { message?: string } } })?.response?.data?.message || "Failed to reserve. Please try again."}
          </div>
        )}

        <Button
          type="submit"
          className="w-full mt-6 h-12 text-lg font-semibold"
          disabled={!isFormValid || isChecking || (availability && !availability.available) || createBooking.isPending || isAdmin}
        >
          {createBooking.isPending ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : isAdmin ? (
            "Admins cannot reserve"
          ) : !isAuthenticated ? (
            "Log in to reserve"
          ) : (
            "Reserve"
          )}
        </Button>
      </form>
    </div>
  );
}
