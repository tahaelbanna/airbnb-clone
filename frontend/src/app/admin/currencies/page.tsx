"use client";

import { useState } from "react";
import { useCurrencies, useCurrencyMutations } from "@/features/currencies/hooks/use-currencies";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Edit, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import type { Currency } from "@/features/currencies/types";

const schema = z.object({
  currency_name: z.string().min(2, "Name must be at least 2 characters"),
  currency_code: z.string().min(2, "Code must be at least 2 characters"),
});

type FormData = z.infer<typeof schema>;

export default function AdminCurrenciesPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);
  const { data, isLoading } = useCurrencies({ page, limit: 10 });
  const { create, update, remove } = useCurrencyMutations();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCurrency, setEditingCurrency] = useState<Currency | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { currency_name: "", currency_code: "" },
  });

  const onSubmit = async (values: FormData) => {
    try {
      if (editingCurrency) {
        await update.mutateAsync({ id: editingCurrency._id, data: values });
      } else {
        await create.mutateAsync(values);
      }
      setIsFormOpen(false);
      form.reset();
      setEditingCurrency(null);
    } catch (error: unknown) {
      alert((error as import('axios').AxiosError<{message: string}>)?.response?.data?.message || "Failed to save currency");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this currency?")) return;
    try {
      await remove.mutateAsync(id);
    } catch (error: unknown) {
      alert((error as import('axios').AxiosError<{message: string}>)?.response?.data?.message || "Failed to delete currency");
    }
  };

  const openEdit = (currency: Currency) => {
    setEditingCurrency(currency);
    form.reset({ currency_name: currency.currency_name, currency_code: currency.currency_code || "" });
    setIsFormOpen(true);
  };

  const openCreate = () => {
    setEditingCurrency(null);
    form.reset({ currency_name: "", currency_code: "" });
    setIsFormOpen(true);
  };

  const pagination = data?.meta;

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-serif tracking-tight text-foreground">Currencies</h1>
          <p className="text-muted mt-2 font-light">Manage currencies available on the platform.</p>
        </div>
        <Button onClick={openCreate} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Currency
        </Button>
      </div>

      {isFormOpen && (
        <div className="mb-10 p-8 bg-surface border border-border/40 rounded-[2rem] shadow-sm">
          <h2 className="text-2xl font-serif mb-6">{editingCurrency ? "Edit Currency" : "Add Currency"}</h2>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium mb-1">Currency Name</label>
              <Input {...form.register("currency_name")} placeholder="e.g. US Dollar" />
              {form.formState.errors.currency_name && (
                <p className="text-sm text-red-500 mt-1">{form.formState.errors.currency_name.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Currency Code (ISO)</label>
              <Input {...form.register("currency_code")} placeholder="e.g. USD" />
              {form.formState.errors.currency_code && (
                <p className="text-sm text-red-500 mt-1">{form.formState.errors.currency_code.message}</p>
              )}
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={create.isPending || update.isPending}>
                {(create.isPending || update.isPending) && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                Save
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : (
        <div className="bg-surface border border-border/40 rounded-[2rem] overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-background border-b border-border/40 text-muted font-light">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Code</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {data?.data.map((currency) => (
                <tr key={currency._id} className="hover:bg-background/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{currency.currency_name}</td>
                  <td className="px-6 py-4 text-muted">{currency.currency_code || "-"}</td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm" onClick={() => openEdit(currency)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(currency._id)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
              {data?.data.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-muted font-light">No currencies found.</td>
                </tr>
              )}
            </tbody>
          </table>
          
          {pagination && pagination.pageCount > 1 && (
            <div className="px-6 py-5 border-t border-border/40 flex items-center justify-between bg-background">
              <span className="text-sm text-muted font-light">Page {page} of {pagination.pageCount}</span>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled={page <= 1}
                  onClick={() => router.push(`${pathname}?page=${page - 1}`)}
                >
                  Previous
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled={page >= pagination.pageCount}
                  onClick={() => router.push(`${pathname}?page=${page + 1}`)}
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
