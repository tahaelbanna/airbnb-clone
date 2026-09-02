import { Expose, Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CityResponseDto {
    @ApiProperty({
        description: 'City ID',
        example: '60d21b4967d0d8992e610c85',
    })
    @Expose()
    _id: string;

    @ApiProperty({
        description: 'Country ID',
        example: '60d21b4967d0d8992e610c85',
    })
    @Expose()
    country_id: string;

    @ApiProperty({ description: 'City name', example: 'Cairo' })
    @Expose()
    city_name: string;

    @Exclude()
    __v: number;
}
