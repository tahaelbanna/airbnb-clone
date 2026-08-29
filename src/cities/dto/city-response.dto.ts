import { Expose, Exclude } from 'class-transformer';

export class CityResponseDto {
    @Expose()
    _id: string;

    @Expose()
    country_id: string;

    @Expose()
    city_name: string;

    @Exclude()
    __v: number;
}
