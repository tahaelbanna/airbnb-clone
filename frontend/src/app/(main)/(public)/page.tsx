"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useUnits } from "@/features/units/hooks/use-units";
import { UnitGrid } from "@/features/units/components/unit-grid";
import { SearchBar } from "@/features/units/components/search-bar";
import { CategoryBar } from "@/features/categories/components/category-bar";
import { Button } from "@/components/ui/button";
import { Loader2, Globe, Shield, Home as HomeIcon } from "lucide-react";
import Link from "next/link";
import { useAuthStore, selectIsAuthenticated } from "@/store/auth-store";

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

function LandingPageContent() {
  return (
    <div className="flex flex-col flex-1">
      {/* Hero Section */}
      <section className="relative w-full py-20 lg:py-32 bg-zinc-50 border-b border-border overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground max-w-4xl mx-auto">
            Find your perfect <span className="text-primary">StayScape</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-muted max-w-2xl mx-auto">
            Discover unique homes and experiences around the world. Book with confidence and start your next adventure today.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login">
              <Button size="lg" variant="primary" className="w-full sm:w-auto px-8">
                Explore stays
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline" className="w-full sm:w-auto px-8">
                Create account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
                <Globe className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Find unique stays</h3>
              <p className="mt-4 text-muted">
                From cozy cabins to beachfront villas, explore properties that make your trip unforgettable.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Secure booking</h3>
              <p className="mt-4 text-muted">
                Our platform ensures your payments and personal information are always protected.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
                <HomeIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Easy hosting</h3>
              <p className="mt-4 text-muted">
                Turn your extra space into extra income. List your property and start hosting today.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hosting CTA Section */}
      <section className="w-full py-20 bg-zinc-50 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary/5 rounded-3xl p-8 sm:p-16 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-8 border border-primary/10">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                Ready to share your space?
              </h2>
              <p className="mt-4 text-lg text-muted">
                Join thousands of hosts and earn money by welcoming guests to your home.
              </p>
            </div>
            <Link href="/register">
              <Button size="lg" variant="primary" className="whitespace-nowrap">
                Become a host
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function PageController() {
  const isInitialized = useAuthStore((s) => s.isInitialized);
  const isLoading = useAuthStore((s) => s.isLoading);
  const isAuthenticated = useAuthStore(selectIsAuthenticated);

  if (!isInitialized || isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isAuthenticated) {
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

  return <LandingPageContent />;
}

export default function HomePage() {
  return <PageController />;
}
