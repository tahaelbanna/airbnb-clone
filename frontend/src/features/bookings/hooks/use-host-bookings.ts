import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeBookingStatusByHost } from "../api/queries";

export function useHostBookingMutations() {
  const queryClient = useQueryClient();

  const changeStatus = useMutation({
    mutationFn: ({ id, data }: { id: string; data: { status: "confirmed" | "declined" | "completed" | "cancelled" | "pending"; cancellation_reason?: string } }) => 
      changeBookingStatusByHost(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myBookings"] }); // Since host bookings also use myBookings with user_type=host
    }
  });

  return { changeStatus };
}
