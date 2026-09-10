"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useUnits } from "@/features/units/hooks/use-units";
import { UnitGrid } from "@/features/units/components/unit-grid";
import { SearchBar } from "@/features/units/components/search-bar";
import { CategoryBar } from "@/features/categories/components/category-bar";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

function HomePageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);
  const unit_title = searchParams.get("unit_title") || undefined;
  
  const { data, isLoading, error } = useUnits({ page, limit: 20, unit_title });

  const clearFilters = () => {
    router.push(pathname);
  };

  const setPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const pagination = data?.meta;

  return (
    <div className="flex flex-col flex-1 pb-16">
      {/* Discovery Header - Sticky Search & Categories */}
      <div className="sticky top-16 z-40 w-full bg-background border-b border-border shadow-sm">
        <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <SearchBar />
        </div>
        <CategoryBar />
      </div>

      <div className="container mx-auto mt-8 px-4 sm:px-6 lg:px-8 flex-1">
        <UnitGrid 
          units={data?.data || []} 
          isLoading={isLoading} 
          error={error as Error | null}
          onClearFilters={unit_title ? clearFilters : undefined}
        />

        {/* Pagination Controls */}
        {!isLoading && !error && pagination && pagination.pageCount > 1 && (
          <div className="mt-16 flex items-center justify-center gap-4">
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
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense 
      fallback={
        <div className="flex flex-1 items-center justify-center py-24">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <HomePageContent />
    </Suspense>
  );
}
