import { Expose, Exclude } from 'class-transformer';

export class UnitResponseDto {
    @Expose()
    _id: string;

    @Expose()
    unit_title: string;

    @Expose()
    unit_description: string;

    @Expose()
    unit_address: string;

    @Expose()
    unit_photos: string[];

    @Expose()
    unit_cost_per_night: number;

    @Expose()
    unit_country_id: string;

    @Expose()
    unit_city_id: string;

    @Expose()
    unit_category_id: string;

    @Expose()
    unit_owner_id: string;

    @Expose()
    unit_rooms_count: number;

    @Expose()
    unit_adults_count: number;

    @Expose()
    unit_kids_count: number;

    @Expose()
    has_internet_service: boolean;

    @Expose()
    has_kitchen: boolean;

    @Expose()
    has_private_garage: boolean;

    @Expose()
    isDeleted: boolean;

    @Expose()
    isActive: boolean;

    @Exclude()
    __v: number;
}
