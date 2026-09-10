"use client";

import { useHostUnits, useHostUnitMutations } from "@/features/units/hooks/use-host-units";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, Edit, Trash2, Power, PowerOff, Image as ImageIcon } from "lucide-react";
import { Suspense, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

function ListingsPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);
  
  const { data, isLoading, error } = useHostUnits({ page, limit: 10 });
  const { activateUnit, deactivateUnit, softDeleteUnit } = useHostUnitMutations();
  const [processingId, setProcessingId] = useState<string | null>(null);

  const setPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleToggleActive = async (id: string, currentlyActive: boolean) => {
    setProcessingId(id);
    try {
      if (currentlyActive) {
        await deactivateUnit.mutateAsync(id);
      } else {
        await activateUnit.mutateAsync(id);
      }
    } catch (err: unknown) {
      const msg = (err as import('axios').AxiosError<{message: string}>)?.response?.data?.message || "Failed to update status";
      alert(msg);
    } finally {
      setProcessingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;
    setProcessingId(id);
    try {
      await softDeleteUnit.mutateAsync(id);
    } catch (err: unknown) {
      const msg = (err as import('axios').AxiosError<{message: string}>)?.response?.data?.message || "Failed to delete listing";
      alert(msg);
    } finally {
      setProcessingId(null);
    }
  };

  const pagination = data?.meta;
  const units = data?.data || [];

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex-1">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Listings</h1>
          <p className="text-muted mt-2">Manage your properties and visibility.</p>
        </div>
        <Button onClick={() => router.push("/listings/new")} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create New Listing
        </Button>
      </div>

      {error ? (
        <div className="flex flex-col items-center justify-center py-24 text-center border rounded-2xl bg-zinc-50">
          <h3 className="text-lg font-semibold text-foreground">Unable to load listings</h3>
          <p className="mt-2 text-sm text-muted">
            {(error as import('axios').AxiosError<{message: string}>)?.response?.data?.message || "An unexpected error occurred."}
          </p>
        </div>
      ) : isLoading ? (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-32 rounded-2xl bg-zinc-100 animate-pulse" />
          ))}
        </div>
      ) : units.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center border rounded-2xl bg-zinc-50">
          <h3 className="text-xl font-semibold text-foreground">No listings found</h3>
          <p className="mt-2 text-muted max-w-md">
            You haven&apos;t added any properties yet. Start hosting today!
          </p>
          <Button onClick={() => router.push("/listings/new")} className="mt-6">
            Create Listing
          </Button>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {units.map((unit) => {
              if (unit.isDeleted) return null; // Backend might not filter soft deleted?
              return (
                <div key={unit._id} className="flex flex-col md:flex-row gap-6 p-4 rounded-2xl border border-border bg-background shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-full md:w-48 aspect-video relative rounded-xl overflow-hidden bg-zinc-100 flex-shrink-0">
                    {unit.unit_photos?.[0] ? (
                      <img 
                        src={unit.unit_photos[0]} 
                        alt={unit.unit_title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-muted">
                        <ImageIcon className="h-8 w-8 opacity-20" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">{unit.unit_title}</h3>
                          <p className="text-sm text-muted mt-1">{unit.unit_address}</p>
                        </div>
                        <Badge variant={unit.isActive ? "default" : "secondary"} className={cn(unit.isActive ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100" : "")}>
                          {unit.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <div className="mt-4 flex gap-4 text-sm">
                        <div><span className="font-semibold">${unit.unit_cost_per_night}</span> / night</div>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2 justify-end pt-4 border-t border-border">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleToggleActive(unit._id, unit.isActive)}
                        disabled={processingId === unit._id}
                      >
                        {processingId === unit._id ? <Loader2 className="h-4 w-4 animate-spin" /> : unit.isActive ? <PowerOff className="h-4 w-4 mr-2" /> : <Power className="h-4 w-4 mr-2" />}
                        {unit.isActive ? "Deactivate" : "Activate"}
                      </Button>
                      
                      <Link href={`/listings/${unit._id}/edit`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </Link>

                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-destructive hover:bg-destructive/10 border-destructive/20"
                        onClick={() => handleDelete(unit._id)}
                        disabled={processingId === unit._id}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {pagination && pagination.pageCount > 1 && (
            <div className="mt-8 flex items-center justify-center gap-4">
              <Button
                variant="outline"
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </Button>
              <span className="text-sm font-medium text-foreground">
                Page {page} of {pagination.pageCount}
              </span>
              <Button
                variant="outline"
                disabled={page >= pagination.pageCount}
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function ListingsPage() {
  return (
    <Suspense 
      fallback={
        <div className="flex flex-1 items-center justify-center py-24">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <ListingsPageContent />
    </Suspense>
  );
}
