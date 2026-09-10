export interface Unit {
  _id: string;
  unit_title: string;
  unit_description: string;
  unit_address: string;
  unit_photos: string[];
  unit_cost_per_night: number;
  unit_country_id: string;
  unit_city_id: string;
  unit_category_id: string;
  unit_owner_id: string;
  unit_avg_rate: number;
  unit_reviews_count: number;
  unit_rooms_count: number;
  unit_adults_count: number;
  unit_kids_count: number;
  has_internet_service: boolean;
  has_kitchen: boolean;
  has_private_garage: boolean;
  isDeleted: boolean;
  isActive: boolean;
}

export interface UnitsQuery {
  page?: number;
  limit?: number;
  ignoreLimit?: boolean;
  unit_title?: string;
  unit_country_id?: string;
  unit_city_id?: string;
}

export interface UnitReview {
  guest: {
    _id: string;
    name: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
}
