import Link from "next/link";
import { Star, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import type { Unit } from "../types";
import { FavoriteButton } from "@/features/favourites/components/favorite-button";
import { useState, useCallback } from "react";

interface UnitCardProps {
  unit: Unit;
}

export function UnitCard({ unit }: UnitCardProps) {
  const photos = unit.unit_photos?.length ? unit.unit_photos : ["https://placehold.co/600x400?text=No+Image"];
  const hasMultiple = photos.length > 1;
  const [currentIndex, setCurrentIndex] = useState(0);

  const goTo = useCallback((e: React.MouseEvent, direction: "prev" | "next") => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => {
      if (direction === "prev") return prev <= 0 ? photos.length - 1 : prev - 1;
      return prev >= photos.length - 1 ? 0 : prev + 1;
    });
  }, [photos.length]);

  return (
    <div className="group relative">
      <div className="absolute right-4 sm:right-6 top-4 sm:top-6 z-20 bg-surface/80 backdrop-blur-sm rounded-full p-1 sm:p-1.5 shadow-sm transition-transform duration-300 hover:scale-110">
        <FavoriteButton unitId={unit._id} />
      </div>
          <div className="flex flex-col relative rounded-t-full rounded-b-3xl overflow-hidden bg-[#F2ECE4] border-2 border-primary p-1.5 sm:p-2 group-hover:bg-[#EAE4DB] transition-colors duration-300 isolate">
            <Link href={`/units/${unit._id}`} className="flex flex-col gap-2 sm:gap-3 rounded-b-2xl">
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-2xl bg-[#F7F3ED]">
                <img
                  src={photos[currentIndex]}
                  alt={unit.unit_title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Image+Unavailable";
                  }}
                />
                {hasMultiple && (
                  <>
                    <button
                      onClick={(e) => goTo(e, "prev")}
                      className="absolute left-1.5 sm:left-2 top-1/2 -translate-y-1/2 z-10 h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-sm opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 hover:bg-white active:scale-95 touch-manipulation"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-4 w-4 text-foreground" />
                    </button>
                    <button
                      onClick={(e) => goTo(e, "next")}
                      className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 z-10 h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-sm opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 hover:bg-white active:scale-95 touch-manipulation"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-4 w-4 text-foreground" />
                    </button>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1">
                      {photos.map((_, idx) => (
                        <span
                          key={idx}
                          className={`block h-1.5 w-1.5 rounded-full transition-colors duration-200 ${
                            idx === currentIndex ? "bg-white" : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
              <div className="flex flex-col gap-1 sm:gap-2 px-1 sm:px-2 pt-0.5 sm:pt-1 pb-1 sm:pb-2 rounded-b-2xl">
                <div className="flex items-start justify-between gap-1 sm:gap-2">
                  <h3 className="font-semibold text-foreground line-clamp-2 font-sans text-xs sm:text-lg tracking-tight uppercase">
                    {unit.unit_title}
                  </h3>
                  <div className="flex items-center gap-0.5 sm:gap-1 text-xs sm:text-sm font-medium mt-0.5 sm:mt-1 shrink-0">
                    <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-current text-primary" />
                    <span>
                      {typeof unit.unit_avg_rate === 'number' && unit.unit_avg_rate > 0 
                        ? unit.unit_avg_rate.toFixed(1) 
                        : "0.0"}
                    </span>
                  </div>
                </div>
                <p className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm text-muted font-light line-clamp-1">
                  <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-muted/80 shrink-0" />
                  <span className="line-clamp-1 uppercase tracking-widest text-[10px] sm:text-xs">{unit.unit_address}</span>
                </p>
                <div className="mt-1 sm:mt-2 pt-1 sm:pt-2 border-t border-border flex items-center justify-between">
                  <span className="text-foreground text-[9px] sm:text-xs uppercase tracking-wider font-semibold">From</span>
                  <div>
                    <span className="font-semibold text-foreground text-sm sm:text-lg">${unit.unit_cost_per_night}</span>
                    <span className="text-[10px] sm:text-sm text-muted font-light">/night</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
    </div>
  );
}

export function UnitCardSkeleton() {
  return (
    <div className="relative">
      <div 
        className="flex flex-col relative rounded-t-full rounded-b-3xl overflow-hidden bg-[#F2ECE4] border-2 border-primary p-1.5 sm:p-2 isolate"
      >
        <div className="aspect-[4/5] rounded-t-full rounded-b-2xl bg-muted/20 animate-pulse" />
        <div className="flex flex-col gap-2 sm:gap-3 px-1 pt-1.5 sm:pt-2 pb-1 sm:pb-2 rounded-b-2xl">
          <div className="h-4 sm:h-5 w-3/4 rounded-md bg-muted/20 animate-pulse" />
          <div className="h-3 sm:h-4 w-1/2 rounded-md bg-muted/20 animate-pulse" />
          <div className="h-4 sm:h-5 w-1/4 rounded-md bg-muted/20 animate-pulse mt-0.5 sm:mt-1" />
        </div>
      </div>
    </div>
  );
}
