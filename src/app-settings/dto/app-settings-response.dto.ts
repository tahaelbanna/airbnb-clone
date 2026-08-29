import { Exclude, Expose } from 'class-transformer';
export class AppSettingsResponseDto {
    @Expose()
    vat_rate: number;

    @Expose()
    min_price: number;

    @Exclude()
    __v: number;
}
