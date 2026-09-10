"use client";

import { useUnit } from "@/features/units/hooks/use-units";
import { MapPin, Users, Star, Home, UserPlus, Wifi, Utensils, Car } from "lucide-react";
import { FavoriteButton } from "@/features/favourites/components/favorite-button";
import { BookingWidget } from "@/features/bookings/components/booking-widget";
import { UnitReviews } from "@/features/units/components/unit-reviews";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function UnitDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { data: unit, isLoading, error } = useUnit(id);

  if (error) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <h3 className="text-2xl font-bold text-foreground">Unit not found</h3>
        <p className="mt-2 text-muted max-w-md">
          {error.message || "We couldn't load the details for this unit."}
        </p>
        <Button className="mt-6" onClick={() => router.push("/")}>
          Back to home
        </Button>
      </div>
    );
  }

  if (isLoading || !unit) {
    return (
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="h-8 w-2/3 rounded-lg bg-zinc-200 animate-pulse mb-6" />
        <div className="grid h-[50vh] grid-cols-1 gap-2 rounded-xl overflow-hidden md:grid-cols-2">
          <div className="h-full w-full bg-zinc-200 animate-pulse" />
          <div className="hidden grid-cols-2 grid-rows-2 gap-2 md:grid">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-full w-full bg-zinc-200 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const photos = unit.unit_photos?.length ? unit.unit_photos : ["https://placehold.co/1200x800?text=No+Image"];

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Title & Info */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {unit.unit_title}
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-4 text-sm font-medium text-muted">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-current text-primary" />
              <span className="text-foreground">
                {typeof unit.unit_avg_rate === 'number' && unit.unit_avg_rate > 0 
                  ? unit.unit_avg_rate.toFixed(1) 
                  : "0.0"}
              </span>
              <span>
                &middot; {unit.unit_reviews_count || 0} {unit.unit_reviews_count === 1 ? 'review' : 'reviews'}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span className="underline">{unit.unit_address}</span>
            </div>
          </div>
        </div>
        
        <FavoriteButton unitId={unit._id} className="h-10 w-10 flex-shrink-0 bg-zinc-100 hover:bg-zinc-200" />
      </div>

      {/* Image Gallery */}
      <div className="grid h-[50vh] min-h-[300px] grid-cols-1 gap-2 rounded-xl overflow-hidden md:grid-cols-2">
        <div className="relative h-full w-full">
          <img
            src={photos[0]}
            alt={unit.unit_title}
            className="h-full w-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/1200x800?text=Image+Unavailable"; }}
          />
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
      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-3">
        
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-foreground">About this place</h2>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-foreground">
              <div className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 shadow-sm">
                <Home className="h-4 w-4 text-muted-foreground" />
                <span>{unit.unit_rooms_count || 1} Rooms</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 shadow-sm">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{unit.unit_adults_count || 1} Adults</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 shadow-sm">
                <UserPlus className="h-4 w-4 text-muted-foreground" />
                <span>{unit.unit_kids_count || 0} Kids</span>
              </div>
            </div>
            <p className="mt-6 whitespace-pre-wrap leading-relaxed text-muted whitespace-pre-line">
              {unit.unit_description}
            </p>
          </div>

          <hr className="border-border" />

          <div>
            <h2 className="text-xl font-semibold text-foreground">What this place offers</h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className={`flex items-center gap-3 ${unit.has_internet_service ? 'text-foreground' : 'text-muted-foreground line-through opacity-50'}`}>
                <Wifi className="h-5 w-5" />
                <span>Wifi</span>
              </div>
              <div className={`flex items-center gap-3 ${unit.has_kitchen ? 'text-foreground' : 'text-muted-foreground line-through opacity-50'}`}>
                <Utensils className="h-5 w-5" />
                <span>Kitchen</span>
              </div>
              <div className={`flex items-center gap-3 ${unit.has_private_garage ? 'text-foreground' : 'text-muted-foreground line-through opacity-50'}`}>
                <Car className="h-5 w-5" />
                <span>Free parking on premises</span>
              </div>
            </div>
          </div>

          <UnitReviews unitId={unit._id} />
        </div>

        {/* Right Column - Booking Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-28">
            <BookingWidget 
              unitId={unit._id} 
              pricePerNight={unit.unit_cost_per_night} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
