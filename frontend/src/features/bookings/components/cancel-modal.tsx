"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X, Loader2 } from "lucide-react";

const cancelSchema = z.object({
  cancellation_reason: z.string().min(5, "Reason must be at least 5 characters").max(500),
});

type CancelFormValues = z.infer<typeof cancelSchema>;

interface CancelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
  isSubmitting: boolean;
}

export function CancelModal({ isOpen, onClose, onSubmit, isSubmitting }: CancelModalProps) {
  const form = useForm<CancelFormValues>({
    resolver: zodResolver(cancelSchema),
    defaultValues: {
      cancellation_reason: "",
    },
  });

  const handleSubmit = (data: CancelFormValues) => {
    onSubmit(data.cancellation_reason);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-2xl bg-background p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">Cancel Reservation</h2>
          <button 
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-full p-2 hover:bg-zinc-100 transition-colors"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label>Please provide a reason for cancellation</Label>
            <textarea
              className="flex min-h-[120px] w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              placeholder="e.g. Unit is undergoing maintenance..."
              {...form.register("cancellation_reason")}
            />
            {form.formState.errors.cancellation_reason && (
              <p className="text-xs text-destructive">{form.formState.errors.cancellation_reason.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={onClose} disabled={isSubmitting}>
              Keep Booking
            </Button>
            <Button type="submit" variant="secondary" className="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirm Cancellation
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
