"use client";

import { useState } from "react";
import { useCountries, useCountryMutations } from "@/features/locations/hooks/use-locations";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Edit, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import type { Country } from "@/features/locations/types";

const schema = z.object({
  country_name: z.string().min(2, "Name must be at least 2 characters"),
  country_code: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function AdminCountriesPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);
  const { data, isLoading } = useCountries({ page, limit: 10 });
  const { create, update, remove } = useCountryMutations();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCountry, setEditingCountry] = useState<Country | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { country_name: "", country_code: "" },
  });

  const onSubmit = async (values: FormData) => {
    try {
      if (editingCountry) {
        await update.mutateAsync({ id: editingCountry._id, data: values });
      } else {
        await create.mutateAsync(values);
      }
      setIsFormOpen(false);
      form.reset();
      setEditingCountry(null);
    } catch (error: unknown) {
      alert((error as import('axios').AxiosError<{message: string}>)?.response?.data?.message || "Failed to save country");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this country?")) return;
    try {
      await remove.mutateAsync(id);
    } catch (error: unknown) {
      alert((error as import('axios').AxiosError<{message: string}>)?.response?.data?.message || "Failed to delete country");
    }
  };

  const openEdit = (country: Country) => {
    setEditingCountry(country);
    form.reset({ country_name: country.country_name, country_code: country.country_code || "" });
    setIsFormOpen(true);
  };

  const openCreate = () => {
    setEditingCountry(null);
    form.reset({ country_name: "", country_code: "" });
    setIsFormOpen(true);
  };

  const pagination = data?.meta;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Countries</h1>
          <p className="text-zinc-500 mt-1">Manage countries available on the platform.</p>
        </div>
        <Button onClick={openCreate} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Country
        </Button>
      </div>

      {isFormOpen && (
        <div className="mb-8 p-6 bg-white border border-zinc-200 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">{editingCountry ? "Edit Country" : "Add Country"}</h2>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium mb-1">Country Name</label>
              <Input {...form.register("country_name")} placeholder="e.g. United States" />
              {form.formState.errors.country_name && (
                <p className="text-sm text-red-500 mt-1">{form.formState.errors.country_name.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Country Code (ISO)</label>
              <Input {...form.register("country_code")} placeholder="e.g. US" />
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
        <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Code</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {data?.data.map((country) => (
                <tr key={country._id} className="hover:bg-zinc-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-zinc-900">{country.country_name}</td>
                  <td className="px-6 py-4 text-zinc-500">{country.country_code || "-"}</td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm" onClick={() => openEdit(country)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(country._id)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
              {data?.data.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-zinc-500">No countries found.</td>
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
