import type { PaginationParams } from "@/types/api";

export interface UnitFavourite {
  _id: string; // The favorite entry ID, or is this the unit ID? Let's check backend... Wait, UnitFavouritesResponseDto says _id, unit_title, unit_cost_per_night, unit_photos. This implies _id is the unit ID because there's no unit_id returned! So we can use _id as the unit ID.
  unit_title: string;
  unit_cost_per_night: number;
  unit_photos: string[];
}

export type FavouritesQuery = PaginationParams;
