"use client";

import { useCategories } from "../hooks/use-categories";
import { Palmtree, Mountain, Tent, Castle, Building } from "lucide-react";

// Fallback icons since backend 'icon' strings might be custom classes like 'fa-building'
// which we don't have. We map names generically.
const iconMap: Record<string, React.ReactNode> = {
  default: <Building className="h-6 w-6" />,
  apartment: <Building className="h-6 w-6" />,
  cabin: <Tent className="h-6 w-6" />,
  villa: <Castle className="h-6 w-6" />,
  beachfront: <Palmtree className="h-6 w-6" />,
  mountain: <Mountain className="h-6 w-6" />
};

export function CategoryBar() {
  const { data, isLoading } = useCategories();

  if (isLoading) {
    return (
      <div className="flex h-24 items-center justify-center space-x-8 overflow-hidden px-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-zinc-200 animate-pulse" />
            <div className="h-3 w-16 rounded bg-zinc-200 animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  const categories = data?.data || [];

  if (categories.length === 0) return null;

  return (
    <div className="relative flex items-center bg-background py-4">
      <div className="no-scrollbar flex w-full gap-8 overflow-x-auto px-4 pb-2 sm:px-6 lg:px-8">
        {categories.map((category) => {
          const name = category.unit_categories_name.toLowerCase();
          const Icon = Object.keys(iconMap).find(k => name.includes(k)) 
            ? iconMap[Object.keys(iconMap).find(k => name.includes(k))!] 
            : iconMap.default;

          return (
            <div 
              key={category._id}
              className="flex min-w-fit cursor-default flex-col items-center gap-2 text-muted transition-colors hover:text-foreground"
              title="Category filtering is coming soon"
            >
              {Icon}
              <span className="text-xs font-medium">{category.unit_categories_name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
