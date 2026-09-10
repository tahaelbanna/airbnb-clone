import { Expose, Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
export class UnitResponseDto {
    @ApiProperty({
        description: 'Unit ID',
        example: '65a1b2c3d4e5f67890123456',
    })
    @Expose()
    _id: string;

    @ApiProperty({
        description: 'Unit title',
        example: 'Cozy apartment in downtown',
    })
    @Expose()
    unit_title: string;

    @ApiProperty({
        description: 'Unit description',
        example:
            'A bright apartment close to restaurants and public transport.',
    })
    @Expose()
    unit_description: string;

    @ApiProperty({
        description: 'Unit address',
        example: '12 Main Street, Cairo',
    })
    @Expose()
    unit_address: string;

    @ApiProperty({
        description: 'Unit photo URLs',
        type: [String],
        example: ['https://example.com/unit-1.jpg'],
    })
    @Expose()
    unit_photos: string[];

    @ApiProperty({ description: 'Cost per night', example: 125 })
    @Expose()
    unit_cost_per_night: number;

    @ApiProperty({
        description: 'Country ID',
        example: '65a1b2c3d4e5f67890123456',
    })
    @Expose()
    unit_country_id: string;

    @ApiProperty({
        description: 'City ID',
        example: '65a1b2c3d4e5f67890123457',
    })
    @Expose()
    unit_city_id: string;

    @ApiProperty({
        description: 'Unit category ID',
        example: '65a1b2c3d4e5f67890123458',
    })
    @Expose()
    unit_category_id: string;

    @ApiProperty({
        description: 'Unit owner ID',
        example: '65a1b2c3d4e5f67890123459',
    })
    @Expose()
    unit_owner_id: string;

    @ApiProperty({ description: 'Average unit rating', example: 4.8 })
    @Expose()
    unit_avg_rate: number;

    @ApiProperty({ description: 'Number of unit reviews', example: 24 })
    @Expose()
    unit_reviews_count: number;

    @ApiProperty({ description: 'Number of rooms', example: 3 })
    @Expose()
    unit_rooms_count: number;

    @ApiProperty({ description: 'Maximum number of adults', example: 4 })
    @Expose()
    unit_adults_count: number;

    @ApiProperty({ description: 'Maximum number of kids', example: 2 })
    @Expose()
    unit_kids_count: number;

    @ApiProperty({
        description: 'Whether the unit has internet service',
        example: true,
    })
    @Expose()
    has_internet_service: boolean;

    @ApiProperty({
        description: 'Whether the unit has a kitchen',
        example: true,
    })
    @Expose()
    has_kitchen: boolean;

    @ApiProperty({
        description: 'Whether the unit has a private garage',
        example: false,
    })
    @Expose()
    has_private_garage: boolean;

    @ApiProperty({ description: 'Whether the unit is deleted', example: false })
    @Expose()
    isDeleted: boolean;

    @ApiProperty({ description: 'Whether the unit is active', example: true })
    @Expose()
    isActive: boolean;

    @Exclude()
    __v: number;
}
