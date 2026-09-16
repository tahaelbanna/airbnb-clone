"use client";

import { Search } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/use-debounce";

export function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const initialTitle = searchParams.get("unit_title") || "";
  const [searchTerm, setSearchTerm] = useState(initialTitle);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    // Only update if the debounced term differs from the URL param
    // to avoid unnecessary router pushes.
    const currentParam = searchParams.get("unit_title") || "";
    if (debouncedSearchTerm !== currentParam) {
      const params = new URLSearchParams(searchParams);
      if (debouncedSearchTerm) {
        params.set("unit_title", debouncedSearchTerm);
      } else {
        params.delete("unit_title");
      }
      
      // Reset page to 1 when searching
      params.delete("page");
      
      router.push(`${pathname}?${params.toString()}`);
    }
  }, [debouncedSearchTerm, pathname, router, searchParams]);

  return (
    <div className="relative mx-auto w-full max-w-3xl">
      <div className="flex h-16 w-full items-center overflow-hidden rounded-full border border-border bg-surface px-6 shadow-md transition-shadow hover:shadow-lg focus-within:border-primary focus-within:ring-1 focus-within:ring-primary focus-within:shadow-lg">
        <Search className="h-6 w-6 text-muted" />
        <input
          type="text"
          placeholder="Where to? Search by destination or title..."
          className="h-full w-full bg-transparent px-4 text-base outline-none placeholder:text-muted-foreground font-medium text-foreground"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-border text-muted-foreground transition-colors hover:bg-muted hover:text-surface"
          >
            <span className="sr-only">Clear</span>
            &times;
          </button>
        )}
      </div>
    </div>
  );
}
