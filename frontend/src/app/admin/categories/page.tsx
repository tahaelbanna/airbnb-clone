"use client";

import { useState } from "react";
import { useCategories, useCategoryMutations } from "@/features/categories/hooks/use-categories";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Edit, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import type { Category } from "@/features/categories/types";

const schema = z.object({
  unit_categories_name: z.string().min(2, "Name must be at least 2 characters"),
  icon: z.string().min(1, "Icon is required"),
});

type FormData = z.infer<typeof schema>;

export default function AdminCategoriesPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);
  const { data, isLoading } = useCategories({ page, limit: 10 });
  const { create, update, remove } = useCategoryMutations();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { unit_categories_name: "", icon: "" },
  });

  const onSubmit = async (values: FormData) => {
    try {
      if (editingCategory) {
        await update.mutateAsync({ id: editingCategory._id, data: values });
      } else {
        await create.mutateAsync(values);
      }
      setIsFormOpen(false);
      form.reset();
      setEditingCategory(null);
    } catch (error: unknown) {
      alert((error as import('axios').AxiosError<{message: string}>)?.response?.data?.message || "Failed to save category");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      await remove.mutateAsync(id);
    } catch (error: unknown) {
      alert((error as import('axios').AxiosError<{message: string}>)?.response?.data?.message || "Failed to delete category");
    }
  };

  const openEdit = (category: Category) => {
    setEditingCategory(category);
    form.reset({ unit_categories_name: category.unit_categories_name, icon: category.icon });
    setIsFormOpen(true);
  };

  const openCreate = () => {
    setEditingCategory(null);
    form.reset({ unit_categories_name: "", icon: "" });
    setIsFormOpen(true);
  };

  const pagination = data?.meta;

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-serif tracking-tight text-foreground">Categories</h1>
          <p className="text-muted mt-2 font-light">Manage unit categories available on the platform.</p>
        </div>
        <Button onClick={openCreate} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Category
        </Button>
      </div>

      {isFormOpen && (
        <div className="mb-10 p-8 bg-surface border border-border/40 rounded-[2rem] shadow-sm">
          <h2 className="text-2xl font-serif mb-6">{editingCategory ? "Edit Category" : "Add Category"}</h2>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium mb-1">Category Name</label>
              <Input {...form.register("unit_categories_name")} placeholder="e.g. Apartment" />
              {form.formState.errors.unit_categories_name && (
                <p className="text-sm text-red-500 mt-1">{form.formState.errors.unit_categories_name.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Icon (FontAwesome / String)</label>
              <Input {...form.register("icon")} placeholder="e.g. fa-building" />
              {form.formState.errors.icon && (
                <p className="text-sm text-red-500 mt-1">{form.formState.errors.icon.message}</p>
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
                <th className="px-6 py-4 font-medium">Icon</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {data?.data.map((category) => (
                <tr key={category._id} className="hover:bg-background/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{category.unit_categories_name}</td>
                  <td className="px-6 py-4 text-muted">{category.icon || "-"}</td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm" onClick={() => openEdit(category)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(category._id)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
              {data?.data.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-muted font-light">No categories found.</td>
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
