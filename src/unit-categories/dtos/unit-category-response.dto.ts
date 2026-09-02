import { Expose, Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UnitCategoryResponseDto {
    @ApiProperty({
        description: 'Unit category ID',
        example: '60d21b4967d0d8992e610c85',
    })
    @Expose()
    _id: string;

    @ApiProperty({ description: 'Unit category name', example: 'Apartment' })
    @Expose()
    unit_categories_name: string;

    @ApiProperty({
        description: 'Icon identifier or URL',
        example: 'fa-building',
    })
    @Expose()
    icon: string;

    @Exclude()
    __v: number;
}
