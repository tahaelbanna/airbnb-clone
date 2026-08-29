import { Expose, Exclude } from 'class-transformer';

export class CurrencyResponseDto {
    @Expose()
    _id: string;

    @Expose()
    currency_name: string;

    @Expose()
    currency_code: string;

    @Exclude()
    __v: number;
}
