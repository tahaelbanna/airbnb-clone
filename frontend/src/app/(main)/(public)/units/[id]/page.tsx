"use client";

import { useState, useCallback } from "react";
import { useUnit } from "@/features/units/hooks/use-units";
import { MapPin, Users, Star, Home, UserPlus, Wifi, Utensils, Car, ChevronLeft, ChevronRight } from "lucide-react";
import { FavoriteButton } from "@/features/favourites/components/favorite-button";
import { BookingWidget } from "@/features/bookings/components/booking-widget";
import { UnitReviews } from "@/features/units/components/unit-reviews";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";

export default function UnitDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { data: unit, isLoading, error } = useUnit(id);
  const currentUser = useAuthStore((s) => s.user);

  const [currentIndex, setCurrentIndex] = useState(0);
  
  const goTo = useCallback((e: React.MouseEvent, direction: "prev" | "next") => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => {
      const totalPhotos = unit?.unit_photos?.length || 1;
      if (direction === "prev") return prev <= 0 ? totalPhotos - 1 : prev - 1;
      return prev >= totalPhotos - 1 ? 0 : prev + 1;
    });
  }, [unit?.unit_photos?.length]);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex min-h-[50vh] flex-col items-center justify-center py-24 text-center bg-surface rounded-[2.5rem] border border-border/40">
          <h3 className="text-4xl font-serif tracking-tight text-foreground">Unit not found</h3>
          <p className="mt-4 text-lg font-light text-muted max-w-md">
            {error.message || "We couldn't load the details for this unit."}
          </p>
          <Button className="mt-8 rounded-full px-8 h-12" onClick={() => router.push("/")}>
            Back to home
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading || !unit) {
    return (
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="h-12 w-2/3 rounded-xl bg-surface border border-border/30 animate-pulse mb-8" />
        <div className="grid h-[60vh] min-h-[400px] grid-cols-1 gap-3 rounded-[2rem] overflow-hidden md:grid-cols-2">
          <div className="h-full w-full bg-surface border border-border/30 animate-pulse" />
          <div className="hidden grid-cols-2 grid-rows-2 gap-3 md:grid">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-full w-full bg-surface border border-border/30 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const photos = unit.unit_photos?.length ? unit.unit_photos : ["https://placehold.co/1200x800?text=No+Image"];
  const isOwner = !!(currentUser && unit.unit_owner_id && currentUser._id === unit.unit_owner_id);



  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Title & Info */}
      <div className="mb-10 flex items-start justify-between gap-6">
        <div>
          <h1 className="text-4xl font-serif font-medium tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-tight">
            {unit.unit_title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-6 text-sm font-medium text-muted">
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-current text-primary" />
              <span className="text-foreground text-base">
                {typeof unit.unit_avg_rate === 'number' && unit.unit_avg_rate > 0 
                  ? unit.unit_avg_rate.toFixed(1) 
                  : "0.0"}
              </span>
              <span className="text-base text-muted/80">
                &middot; {unit.unit_reviews_count || 0} {unit.unit_reviews_count === 1 ? 'review' : 'reviews'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-base">
              <MapPin className="h-4 w-4" />
              <span className="underline decoration-border underline-offset-4">{unit.unit_address}</span>
            </div>
          </div>
        </div>
        
        <FavoriteButton unitId={unit._id} className="h-12 w-12 flex-shrink-0 rounded-full bg-surface hover:bg-primary-light transition-colors border border-border shadow-sm" />
      </div>

      {/* Image Gallery */}
      <div className="grid h-[60vh] min-h-[400px] grid-cols-1 gap-3 rounded-[2rem] overflow-hidden md:grid-cols-2 shadow-sm border border-border/50">
        <div className="relative h-full w-full">
          {/* Mobile Image (interactive) */}
          <img
            src={photos[currentIndex]}
            alt={unit.unit_title}
            className="h-full w-full object-cover md:hidden"
            onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/1200x800?text=Image+Unavailable"; }}
          />
          {/* Desktop Main Image (static first image) */}
          <img
            src={photos[0]}
            alt={unit.unit_title}
            className="hidden md:block h-full w-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/1200x800?text=Image+Unavailable"; }}
          />
          {photos.length > 1 && (
            <>
              <button
                onClick={(e) => goTo(e, "prev")}
                className="md:hidden absolute left-3 top-1/2 -translate-y-1/2 z-10 h-10 w-10 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-sm transition-opacity duration-200 hover:bg-white active:scale-95 touch-manipulation"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6 text-foreground" />
              </button>
              <button
                onClick={(e) => goTo(e, "next")}
                className="md:hidden absolute right-3 top-1/2 -translate-y-1/2 z-10 h-10 w-10 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-sm transition-opacity duration-200 hover:bg-white active:scale-95 touch-manipulation"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6 text-foreground" />
              </button>
              <div className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
                {photos.map((_, idx) => (
                  <span
                    key={idx}
                    className={`block rounded-full transition-all duration-200 ${
                      idx === currentIndex ? "h-2 w-2 bg-white" : "h-1.5 w-1.5 bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        <div className="hidden grid-cols-2 grid-rows-2 gap-2 md:grid">
          {Array.from({ length: 4 }).map((_, i) => {
            const photoSrc = photos[i + 1] || "https://placehold.co/600x400?text=More+photos+soon";
            return (
              <div key={i} className="relative h-full w-full">
                <img
                  src={photoSrc}
                  alt={`${unit.unit_title} - Photo ${i + 2}`}
                  className="h-full w-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Unavailable"; }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className={`mt-12 grid grid-cols-1 gap-16 ${isOwner ? '' : 'lg:grid-cols-3'}`}>
        
        {/* Left Column - Details */}
        <div className={`${isOwner ? '' : 'lg:col-span-2'} space-y-12`}>
          <div>
            <h2 className="text-3xl font-serif text-foreground tracking-tight">About this space</h2>
            <div className="mt-8 flex flex-wrap gap-4 text-sm text-foreground">
              <div className="flex items-center gap-3 rounded-2xl bg-surface border border-border/50 px-5 py-3 shadow-sm">
                <Home className="h-5 w-5 text-primary" />
                <span className="font-medium text-base">{unit.unit_rooms_count || 1} Rooms</span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-surface border border-border/50 px-5 py-3 shadow-sm">
                <Users className="h-5 w-5 text-primary" />
                <span className="font-medium text-base">{unit.unit_adults_count || 1} Adults</span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-surface border border-border/50 px-5 py-3 shadow-sm">
                <UserPlus className="h-5 w-5 text-primary" />
                <span className="font-medium text-base">{unit.unit_kids_count || 0} Kids</span>
              </div>
            </div>
            <p className="mt-8 whitespace-pre-wrap leading-relaxed text-muted font-light text-lg whitespace-pre-line">
              {unit.unit_description}
            </p>
          </div>

          <hr className="border-border/60" />

          <div>
            <h2 className="text-3xl font-serif text-foreground tracking-tight">What this place offers</h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className={`flex items-center gap-4 text-lg font-light ${unit.has_internet_service ? 'text-foreground' : 'text-muted line-through opacity-50'}`}>
                <Wifi className="h-6 w-6 text-primary" />
                <span>Fast Wifi</span>
              </div>
              <div className={`flex items-center gap-4 text-lg font-light ${unit.has_kitchen ? 'text-foreground' : 'text-muted line-through opacity-50'}`}>
                <Utensils className="h-6 w-6 text-primary" />
                <span>Kitchen</span>
              </div>
              <div className={`flex items-center gap-4 text-lg font-light ${unit.has_private_garage ? 'text-foreground' : 'text-muted line-through opacity-50'}`}>
                <Car className="h-6 w-6 text-primary" />
                <span>Free parking on premises</span>
              </div>
            </div>
          </div>

          <UnitReviews unitId={unit._id} />
        </div>

        {/* Right Column - Booking Card (hidden for unit owner) */}
        {!isOwner && (
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <BookingWidget 
                unitId={unit._id} 
                pricePerNight={unit.unit_cost_per_night} 
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
