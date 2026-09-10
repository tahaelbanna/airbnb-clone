import Link from "next/link";
import { Star } from "lucide-react";
import type { Unit } from "../types";
import { FavoriteButton } from "@/features/favourites/components/favorite-button";

interface UnitCardProps {
  unit: Unit;
}

export function UnitCard({ unit }: UnitCardProps) {
  const imageUrl = unit.unit_photos?.[0] || "https://placehold.co/600x400?text=No+Image";

  return (
    <div className="group flex flex-col gap-3 relative">
      <div className="absolute right-3 top-3 z-10">
        <FavoriteButton unitId={unit._id} />
      </div>
      <Link href={`/units/${unit._id}`} className="flex flex-col gap-3">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-zinc-100">
          <img
            src={imageUrl}
            alt={unit.unit_title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Image+Unavailable";
            }}
          />
        </div>

      
      <div className="flex flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground line-clamp-1">
            {unit.unit_title}
          </h3>
          <div className="flex items-center gap-1 text-sm font-medium">
            <Star className="h-4 w-4 fill-current text-primary" />
            <span>
              {typeof unit.unit_avg_rate === 'number' && unit.unit_avg_rate > 0 
                ? unit.unit_avg_rate.toFixed(1) 
                : "0.0"}
            </span>
          </div>
        </div>
        
        <p className="text-sm text-muted line-clamp-1">
          {unit.unit_address}
        </p>
        
        <div className="mt-1 flex items-center gap-1">
          <span className="font-semibold text-foreground">
            ${unit.unit_cost_per_night}
          </span>
          <span className="text-sm text-muted">night</span>
        </div>
      </div>
    </Link>
    </div>
  );
}

export function UnitCardSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="aspect-square rounded-xl bg-zinc-200 animate-pulse" />
      <div className="flex flex-col gap-2">
        <div className="h-4 w-3/4 rounded bg-zinc-200 animate-pulse" />
        <div className="h-4 w-1/2 rounded bg-zinc-200 animate-pulse" />
        <div className="h-4 w-1/4 rounded bg-zinc-200 animate-pulse" />
      </div>
    </div>
  );
}
