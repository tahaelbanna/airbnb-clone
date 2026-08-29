import { Expose, Exclude } from 'class-transformer';

export class UnitCategoryResponseDto {
    @Expose()
    _id: string;

    @Expose()
    unit_categories_name: string;

    @Expose()
    icon: string;

    @Exclude()
    __v: number;
}
