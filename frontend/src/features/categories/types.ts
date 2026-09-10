export interface Category {
  _id: string;
  unit_categories_name: string;
  icon: string;
}

export interface CategoriesQuery {
  page?: number;
  limit?: number;
  ignoreLimit?: boolean;
  unit_categories_name?: string;
  icon?: string;
}
