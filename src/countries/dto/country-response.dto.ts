import { Expose, Exclude } from 'class-transformer';

export class CountryResponseDto {
    @Expose()
    _id: string;

    @Expose()
    country_name: string;

    @Expose()
    country_code: string;

    @Exclude()
    __v: number;
}
