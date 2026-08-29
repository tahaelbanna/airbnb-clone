import { Expose, Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CurrencyResponseDto {
    @ApiProperty({
        description: 'Currency ID',
        example: '60d21b4967d0d8992e610c85',
    })
    @Expose()
    _id: string;

    @ApiProperty({ description: 'Currency name', example: 'Egyptian Pound' })
    @Expose()
    currency_name: string;

    @ApiProperty({ description: 'ISO currency code', example: 'EGP' })
    @Expose()
    currency_code: string;

    @Exclude()
    __v: number;
}
