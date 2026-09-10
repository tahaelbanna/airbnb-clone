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
    <div className="relative mx-auto w-full max-w-2xl">
      <div className="flex h-14 w-full items-center overflow-hidden rounded-full border border-border bg-background px-4 shadow-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
        <Search className="h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by title..."
          className="h-full w-full bg-transparent px-4 text-sm outline-none placeholder:text-muted-foreground"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="rounded-full p-1 text-muted-foreground hover:bg-zinc-100 hover:text-foreground"
          >
            <span className="sr-only">Clear</span>
            &times;
          </button>
        )}
      </div>
    </div>
  );
}
