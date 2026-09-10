"use client";

import { UnitForm, type UnitFormValues } from "@/features/units/components/unit-form";
import { useHostUnitMutations } from "@/features/units/hooks/use-host-units";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CreateListingPage() {
  const router = useRouter();
  const { createUnit } = useHostUnitMutations();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: UnitFormValues, files?: File[]) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      
      // Append form fields
      Object.entries(data).forEach(([key, value]) => {
        if (typeof value === "boolean") {
          // Backend might expect true/false strings or just 'true'/'false'
          formData.append(key, value.toString());
        } else if (value !== null && value !== undefined) {
          formData.append(key, value.toString());
        }
      });
      
      // Append files
      if (files) {
        files.forEach((file) => {
          formData.append("unit_photos", file);
        });
      }

      await createUnit.mutateAsync(formData);
      router.push("/listings");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-4xl">
      <div className="mb-6">
        <Link href="/listings" className="inline-flex items-center text-sm font-medium text-muted hover:text-foreground mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Listings
        </Link>
        <h1 className="text-3xl font-bold text-foreground">Create New Listing</h1>
        <p className="text-muted mt-2">Fill in the details to publish your new property.</p>
      </div>

      <UnitForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}
