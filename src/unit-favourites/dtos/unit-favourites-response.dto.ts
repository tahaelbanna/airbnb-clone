import { Exclude, Expose } from 'class-transformer';

export class UnitFavouritesResponseDto {
    @Expose()
    _id: string;

    @Expose()
    unit_title: string;

    @Expose()
    unit_cost_per_night: number;

    @Expose()
    unit_photos: string[];

    @Exclude()
    __v: number;
}
