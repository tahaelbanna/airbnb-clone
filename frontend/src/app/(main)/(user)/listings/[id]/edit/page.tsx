"use client";

import { useQuery } from "@tanstack/react-query";
import { getUnitById } from "@/features/units/api/queries";
import { UnitForm, type UnitFormValues } from "@/features/units/components/unit-form";
import { UnitPhotoManager } from "@/features/units/components/unit-photo-manager";
import { useHostUnitMutations } from "@/features/units/hooks/use-host-units";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function EditListingPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { data: unit, isLoading, error } = useQuery({
    queryKey: ["unit", id],
    queryFn: () => getUnitById(id),
  });

  const { updateUnit } = useHostUnitMutations();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: UnitFormValues) => {
    setIsSubmitting(true);
    try {
      await updateUnit.mutateAsync({ id, data });
      alert("Listing updated successfully!");
      router.push("/listings");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !unit) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center py-24 text-center border rounded-2xl bg-zinc-50">
          <h3 className="text-xl font-semibold text-foreground">Listing not found</h3>
          <p className="mt-2 text-muted">The listing you are trying to edit does not exist or you do not have permission.</p>
          <Button onClick={() => router.push("/listings")} className="mt-6" variant="outline">Back to Listings</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-4xl">
      <div className="mb-6">
        <Link href="/listings" className="inline-flex items-center text-sm font-medium text-muted hover:text-foreground mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Listings
        </Link>
        <h1 className="text-3xl font-bold text-foreground">Edit Listing</h1>
        <p className="text-muted mt-2">Update information for {unit.unit_title}</p>
      </div>

      <UnitForm 
        isEditMode 
        initialValues={unit} 
        onSubmit={handleSubmit} 
        isSubmitting={isSubmitting} 
      />

      <UnitPhotoManager unit={unit} />
    </div>
  );
}

// Ensure Button is available for the error state
import { Button } from "@/components/ui/button";
