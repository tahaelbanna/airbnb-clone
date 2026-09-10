"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2, Upload, X } from "lucide-react";
import { useCountries, useCities } from "@/features/locations/hooks/use-locations";
import { useCategories } from "@/features/categories/hooks/use-categories";
import { useState, useRef } from "react";
import type { Unit } from "@/features/units/types";

export const unitFormSchema = z.object({
  unit_title: z.string().min(3).max(100),
  unit_description: z.string().max(1000),
  unit_address: z.string().min(4).max(1000),
  unit_cost_per_night: z.coerce.number().min(0),
  unit_country_id: z.string().min(1, "Country is required"),
  unit_city_id: z.string().min(1, "City is required"),
  unit_category_id: z.string().min(1, "Category is required"),
  unit_rooms_count: z.coerce.number().min(0),
  unit_adults_count: z.coerce.number().min(1),
  unit_kids_count: z.coerce.number().min(0),
  has_internet_service: z.boolean(),
  has_kitchen: z.boolean(),
  has_private_garage: z.boolean(),
});

export type UnitFormValues = z.infer<typeof unitFormSchema>;

interface UnitFormProps {
  initialValues?: Partial<Unit>;
  onSubmit: (data: UnitFormValues, files?: File[]) => Promise<void> | void;
  isSubmitting: boolean;
  isEditMode?: boolean;
}

export function UnitForm({ initialValues, onSubmit, isSubmitting, isEditMode }: UnitFormProps) {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<UnitFormValues>({
    resolver: zodResolver(unitFormSchema),
    defaultValues: {
      unit_title: initialValues?.unit_title || "",
      unit_description: initialValues?.unit_description || "",
      unit_address: initialValues?.unit_address || "",
      unit_cost_per_night: initialValues?.unit_cost_per_night || 0,
      unit_country_id: initialValues?.unit_country_id || "",
      unit_city_id: initialValues?.unit_city_id || "",
      unit_category_id: initialValues?.unit_category_id || "",
      unit_rooms_count: initialValues?.unit_rooms_count || 1,
      unit_adults_count: initialValues?.unit_adults_count || 1,
      unit_kids_count: initialValues?.unit_kids_count || 0,
      has_internet_service: initialValues?.has_internet_service ?? false,
      has_kitchen: initialValues?.has_kitchen ?? false,
      has_private_garage: initialValues?.has_private_garage ?? false,
    },
  });

  const selectedCountry = useWatch({ control: form.control, name: "unit_country_id" });

  const { data: countriesRes } = useCountries({ ignoreLimit: true });
  const { data: citiesRes } = useCities(selectedCountry ? { country_id: selectedCountry, ignoreLimit: true } : { ignoreLimit: true });
  const { data: categoriesRes } = useCategories({ ignoreLimit: true });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selected = Array.from(e.target.files);
      if (files.length + selected.length > 5) {
        alert("Maximum 5 photos allowed.");
        return;
      }
      setFiles((prev) => [...prev, ...selected]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (data: UnitFormValues) => {
    if (!isEditMode && files.length === 0) {
      alert("At least one photo is required.");
      return;
    }
    try {
      await onSubmit(data, files);
    } catch (err: any) {
      const errors = err.response?.data?.errors;
      if (Array.isArray(errors)) {
        errors.forEach((e: any) => {
          if (e.field && e.message) {
            form.setError(e.field as any, { type: "server", message: e.message });
          }
        });
      } else {
        const msg = err.response?.data?.message || "An unexpected error occurred.";
        alert(typeof msg === "string" ? msg : JSON.stringify(msg));
      }
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
      {/* Basic Info */}
      <div className="bg-white p-6 rounded-2xl border border-zinc-200">
        <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
        <div className="space-y-4">
          <div>
            <Label>Title <span className="text-red-500">*</span></Label>
            <Input {...form.register("unit_title")} placeholder="e.g. Cozy Beachfront Villa" />
            {form.formState.errors.unit_title && <p className="text-sm text-red-500 mt-1">{form.formState.errors.unit_title.message}</p>}
          </div>

          <div>
            <Label>Description <span className="text-red-500">*</span></Label>
            <textarea 
              {...form.register("unit_description")} 
              className="w-full min-h-[100px] p-3 rounded-xl border border-input bg-transparent text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              placeholder="Describe your place..."
            />
            {form.formState.errors.unit_description && <p className="text-sm text-red-500 mt-1">{form.formState.errors.unit_description.message}</p>}
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="bg-white p-6 rounded-2xl border border-zinc-200">
        <h2 className="text-xl font-semibold mb-4">Location</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label>Country <span className="text-red-500">*</span></Label>
            <select 
              {...form.register("unit_country_id")} 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              onChange={(e) => {
                form.setValue("unit_country_id", e.target.value);
                form.setValue("unit_city_id", "");
              }}
            >
              <option value="">Select Country</option>
              {countriesRes?.data.map(c => <option key={c._id} value={c._id}>{c.country_name}</option>)}
            </select>
            {form.formState.errors.unit_country_id && <p className="text-sm text-red-500 mt-1">{form.formState.errors.unit_country_id.message}</p>}
          </div>

          <div>
            <Label>City <span className="text-red-500">*</span></Label>
            <select 
              {...form.register("unit_city_id")} 
              disabled={!selectedCountry}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50"
            >
              <option value="">Select City</option>
              {citiesRes?.data.map(c => <option key={c._id} value={c._id}>{c.city_name}</option>)}
            </select>
            {form.formState.errors.unit_city_id && <p className="text-sm text-red-500 mt-1">{form.formState.errors.unit_city_id.message}</p>}
          </div>
        </div>
        <div>
          <Label>Address Line <span className="text-red-500">*</span></Label>
          <Input {...form.register("unit_address")} placeholder="123 Ocean Drive" />
          {form.formState.errors.unit_address && <p className="text-sm text-red-500 mt-1">{form.formState.errors.unit_address.message}</p>}
        </div>
      </div>

      {/* Details */}
      <div className="bg-white p-6 rounded-2xl border border-zinc-200">
        <h2 className="text-xl font-semibold mb-4">Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label>Category <span className="text-red-500">*</span></Label>
            <select 
              {...form.register("unit_category_id")} 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">Select Category</option>
              {categoriesRes?.data.map(c => <option key={c._id} value={c._id}>{c.unit_categories_name}</option>)}
            </select>
            {form.formState.errors.unit_category_id && <p className="text-sm text-red-500 mt-1">{form.formState.errors.unit_category_id.message}</p>}
          </div>
          <div>
            <Label>Price per night ($) <span className="text-red-500">*</span></Label>
            <Input type="number" step="0.01" {...form.register("unit_cost_per_night")} />
            {form.formState.errors.unit_cost_per_night && <p className="text-sm text-red-500 mt-1">{form.formState.errors.unit_cost_per_night.message}</p>}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label>Rooms <span className="text-red-500">*</span></Label>
            <Input type="number" {...form.register("unit_rooms_count")} />
          </div>
          <div>
            <Label>Max Adults <span className="text-red-500">*</span></Label>
            <Input type="number" {...form.register("unit_adults_count")} />
          </div>
          <div>
            <Label>Max Kids <span className="text-red-500">*</span></Label>
            <Input type="number" {...form.register("unit_kids_count")} />
          </div>
        </div>
      </div>

      {/* Amenities */}
      <div className="bg-white p-6 rounded-2xl border border-zinc-200">
        <h2 className="text-xl font-semibold mb-4">Amenities</h2>
        <div className="space-y-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" {...form.register("has_internet_service")} className="rounded border-zinc-300 text-primary focus:ring-primary" />
            <span className="text-sm">WiFi / Internet</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" {...form.register("has_kitchen")} className="rounded border-zinc-300 text-primary focus:ring-primary" />
            <span className="text-sm">Kitchen</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" {...form.register("has_private_garage")} className="rounded border-zinc-300 text-primary focus:ring-primary" />
            <span className="text-sm">Private Garage</span>
          </label>
        </div>
      </div>

      {/* Photos (Only for creation here, editing photos is handled separately) */}
      {!isEditMode && (
        <div className="bg-white p-6 rounded-2xl border border-zinc-200">
          <h2 className="text-xl font-semibold mb-4">Photos</h2>
          <div className="space-y-4">
            <div className="flex gap-4 flex-wrap">
              {files.map((file, idx) => (
                <div key={idx} className="relative w-24 h-24 rounded-lg overflow-hidden border">
                  <img src={URL.createObjectURL(file)} alt="preview" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => removeFile(idx)} className="absolute top-1 right-1 bg-black/50 rounded-full p-1 text-white hover:bg-black/70">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              {files.length < 5 && (
                <button 
                  type="button" 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-24 h-24 rounded-lg border-2 border-dashed border-zinc-300 flex flex-col items-center justify-center text-zinc-500 hover:bg-zinc-50 transition-colors"
                >
                  <Upload className="w-6 h-6 mb-1" />
                  <span className="text-xs">Add</span>
                </button>
              )}
            </div>
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/png, image/jpeg, image/jpg"
              multiple
              className="hidden" 
            />
            <p className="text-xs text-muted">You can upload up to 5 photos (Max 5MB each). PNG, JPG, JPEG.</p>
          </div>
        </div>
      )}

      <div className="flex justify-end pt-4">
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isEditMode ? "Save Changes" : "Create Listing"}
        </Button>
      </div>
    </form>
  );
}
