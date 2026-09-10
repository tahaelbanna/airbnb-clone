export interface Country {
  _id: string;
  country_name: string;
  country_code: string;
}

export interface City {
  _id: string;
  city_name: string;
  country_id: string;
}

export interface CountriesQuery {
  page?: number;
  limit?: number;
  ignoreLimit?: boolean;
  country_name?: string;
  country_code?: string;
}

export interface CitiesQuery {
  page?: number;
  limit?: number;
  ignoreLimit?: boolean;
  city_name?: string;
  country_id?: string;
}
