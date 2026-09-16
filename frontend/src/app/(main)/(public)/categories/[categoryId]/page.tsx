"use client";

import { useSearchParams, useRouter, usePathname, useParams } from "next/navigation";
import { useUnits } from "@/features/units/hooks/use-units";
import { useCategory } from "@/features/categories/hooks/use-categories";
import { UnitGrid } from "@/features/units/components/unit-grid";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import React from "react";

export default function CategoryPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useParams();
  const categoryId = params?.categoryId as string;

  const page = parseInt(searchParams.get("page") || "1", 10);
  
  const { data: categoryData, isLoading: isLoadingCategory } = useCategory(categoryId);
  const { data: unitsData, isLoading: isLoadingUnits, error } = useUnits({ 
    page, 
    limit: 20, 
    unit_category_id: categoryId 
  });

  const setPage = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", newPage.toString());
    router.push(`${pathname}?${newParams.toString()}`);
  };

  const pagination = unitsData?.meta;
  const categoryName = categoryData?.unit_categories_name || "Category";

  return (
    <div className="flex flex-col flex-1 pb-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-6">
        <button 
          onClick={() => router.push("/")} 
          className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </button>
        
        <div className="flex items-center gap-4">
          {isLoadingCategory ? (
            <div className="h-12 w-64 rounded-lg bg-zinc-200 animate-pulse" />
          ) : (
            <h1 className="text-4xl sm:text-5xl font-serif tracking-tight text-foreground">
              {categoryName}
            </h1>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        <UnitGrid 
          units={unitsData?.data || []} 
          isLoading={isLoadingUnits} 
          error={error as Error | null}
        />

        {/* Pagination Controls */}
        {!isLoadingUnits && !error && pagination && pagination.pageCount > 1 && (
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
