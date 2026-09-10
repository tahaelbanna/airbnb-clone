import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UnitFavouritesResponseDto {
    @ApiProperty({
        description: 'The ID of the unit favourite',
        example: '507f1f77bcf86cd00892931b',
    })
    @Expose()
    _id: string;

    @ApiProperty({
        description: 'The title of the unit',
        example: 'Cozy Studio Apartment',
    })
    @Expose()
    unit_title: string;

    @ApiProperty({
        description: 'The ID of the unit',
        example: '507f1f77bcf86cd00892931b',
    })
    @Expose()
    unit_id: string;

    @ApiProperty({
        description: 'The cost per night of the unit',
        example: 100,
    })
    @Expose()
    unit_cost_per_night: number;

    @ApiProperty({
        description: 'The photos of the unit',
        example: ['photo1.jpg', 'photo2.jpg'],
    })
    @Expose()
    unit_photos: string[];

    @Exclude()
    __v: number;
}
