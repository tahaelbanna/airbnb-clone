"use client";

import { useEffect } from "react";
import { useAppSettings, useAppSettingsMutations } from "@/features/settings/hooks/use-settings";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  vat_rate: z.coerce.number().min(0).max(25, "VAT cannot exceed 25%"),
  min_price: z.coerce.number().min(0, "Price cannot be negative"),
});

type FormData = z.infer<typeof schema>;

export default function AdminSettingsPage() {
  const { data: settings, isLoading } = useAppSettings();
  const { update } = useAppSettingsMutations();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { vat_rate: 0, min_price: 0 },
  });

  useEffect(() => {
    if (settings) {
      form.reset({
        vat_rate: settings.vat_rate || 0,
        min_price: settings.min_price || 0,
      });
    }
  }, [settings, form]);

  const onSubmit = async (values: FormData) => {
    try {
      await update.mutateAsync(values);
      alert("Settings saved successfully!");
    } catch (error: unknown) {
      alert((error as import('axios').AxiosError<{message: string}>)?.response?.data?.message || "Failed to save settings");
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900">Platform Settings</h1>
        <p className="text-zinc-500 mt-1">Configure global application settings and rules.</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : (
        <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm p-6 md:p-8">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-900">VAT Rate (%)</label>
                <p className="text-sm text-zinc-500">The value-added tax percentage applied to bookings (0-25%).</p>
                <Input 
                  type="number" 
                  step="0.1" 
                  {...form.register("vat_rate")} 
                  className="max-w-xs"
                />
                {form.formState.errors.vat_rate && (
                  <p className="text-sm text-red-500">{form.formState.errors.vat_rate.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-900">Minimum Listing Price</label>
                <p className="text-sm text-zinc-500">The absolute minimum price per night a host can set.</p>
                <Input 
                  type="number" 
                  step="0.01" 
                  {...form.register("min_price")} 
                  className="max-w-xs"
                />
                {form.formState.errors.min_price && (
                  <p className="text-sm text-red-500">{form.formState.errors.min_price.message}</p>
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-100 flex justify-end">
              <Button type="submit" disabled={update.isPending} className="gap-2">
                {update.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
