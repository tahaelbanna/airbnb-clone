"use client";

import { useState } from "react";
import { useCities, useCityMutations, useCountries } from "@/features/locations/hooks/use-locations";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Edit, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import type { City } from "@/features/locations/types";

const schema = z.object({
  city_name: z.string().min(2, "Name must be at least 2 characters"),
  country_id: z.string().min(1, "Country is required"),
});

type FormData = z.infer<typeof schema>;

export default function AdminCitiesPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);
  
  const { data: countriesRes } = useCountries({ ignoreLimit: true });
  const { data, isLoading } = useCities({ page, limit: 10, ignoreLimit: false });
  const { create, update, remove } = useCityMutations();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCity, setEditingCity] = useState<City | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { city_name: "", country_id: "" },
  });

  const onSubmit = async (values: FormData) => {
    try {
      if (editingCity) {
        await update.mutateAsync({ id: editingCity._id, data: values });
      } else {
        await create.mutateAsync(values);
      }
      setIsFormOpen(false);
      form.reset();
      setEditingCity(null);
    } catch (error: unknown) {
      alert((error as import('axios').AxiosError<{message: string}>)?.response?.data?.message || "Failed to save city");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this city?")) return;
    try {
      await remove.mutateAsync(id);
    } catch (error: unknown) {
      alert((error as import('axios').AxiosError<{message: string}>)?.response?.data?.message || "Failed to delete city");
    }
  };

  const openEdit = (city: City) => {
    setEditingCity(city);
    form.reset({ 
      city_name: city.city_name, 
      country_id: typeof city.country_id === 'string' ? city.country_id : (city.country_id as { _id: string })?._id || "" 
    });
    setIsFormOpen(true);
  };

  const openCreate = () => {
    setEditingCity(null);
    form.reset({ city_name: "", country_id: "" });
    setIsFormOpen(true);
  };

  const pagination = data?.meta;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">Cities</h1>
          <p className="text-zinc-500 mt-1">Manage cities available on the platform.</p>
        </div>
        <Button onClick={openCreate} className="gap-2">
          <Plus className="h-4 w-4" />
          Add City
        </Button>
      </div>

      {isFormOpen && (
        <div className="mb-8 p-6 bg-white border border-zinc-200 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">{editingCity ? "Edit City" : "Add City"}</h2>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium mb-1">City Name</label>
              <Input {...form.register("city_name")} placeholder="e.g. New York" />
              {form.formState.errors.city_name && (
                <p className="text-sm text-red-500 mt-1">{form.formState.errors.city_name.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <select 
                {...form.register("country_id")} 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Select Country</option>
                {countriesRes?.data.map(c => (
                  <option key={c._id} value={c._id}>{c.country_name}</option>
                ))}
              </select>
              {form.formState.errors.country_id && (
                <p className="text-sm text-red-500 mt-1">{form.formState.errors.country_id.message}</p>
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
        <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500">
              <tr>
                <th className="px-6 py-4 font-medium">City Name</th>
                <th className="px-6 py-4 font-medium">Country ID</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {data?.data.map((city) => (
                <tr key={city._id} className="hover:bg-zinc-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-zinc-900">{city.city_name}</td>
                  <td className="px-6 py-4 text-zinc-500">
                    {typeof city.country_id === 'object' ? (city.country_id as { country_name: string }).country_name : city.country_id}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm" onClick={() => openEdit(city)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(city._id)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
              {data?.data.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-zinc-500">No cities found.</td>
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
