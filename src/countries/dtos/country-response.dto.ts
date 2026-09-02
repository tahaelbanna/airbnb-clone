import { Expose, Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CountryResponseDto {
    @ApiProperty({
        description: 'Country ID',
        example: '60d21b4967d0d8992e610c85',
    })
    @Expose()
    _id: string;

    @ApiProperty({ description: 'Country name', example: 'Egypt' })
    @Expose()
    country_name: string;

    @ApiProperty({ description: 'ISO country code', example: 'EG' })
    @Expose()
    country_code: string;

    @Exclude()
    __v: number;
}
