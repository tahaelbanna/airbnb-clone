import {
    IsBoolean,
    IsMongoId,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUnitDto {
    @ApiProperty({
        description: 'Unit title',
        example: 'Cozy apartment in downtown',
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    unit_title: string;

    @ApiProperty({
        description: 'Unit description',
        example:
            'A bright apartment close to restaurants and public transport.',
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(0)
    @MaxLength(1000)
    unit_description: string;

    @ApiProperty({
        description: 'Unit address',
        example: '12 Main Street, Cairo',
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(1000)
    unit_address: string;

    @ApiPropertyOptional({
        description: 'Unit photo URLs',
        type: [String],
        example: ['https://example.com/unit-1.jpg'],
    })
    @IsOptional()
    unit_photos: string[];

    @ApiProperty({ description: 'Cost per night', example: 125 })
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    unit_cost_per_night: number;

    @ApiProperty({
        description: 'Country ID',
        example: '65a1b2c3d4e5f67890123456',
    })
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    unit_country_id: string;

    @ApiProperty({
        description: 'City ID',
        example: '65a1b2c3d4e5f67890123457',
    })
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    unit_city_id: string;

    @ApiProperty({
        description: 'Unit category ID',
        example: '65a1b2c3d4e5f67890123458',
    })
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    unit_category_id: string;

    @ApiProperty({ description: 'Number of rooms', example: 3 })
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    unit_rooms_count: number;

    @ApiProperty({ description: 'Maximum number of adults', example: 4 })
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    unit_adults_count: number;

    @ApiProperty({ description: 'Maximum number of kids', example: 2 })
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    unit_kids_count: number;

    @ApiProperty({
        description: 'Whether the unit has internet service',
        example: true,
    })
    @IsNotEmpty()
    @IsBoolean()
    @Transform(({ value }) => value === 'true' || value === true)
    has_internet_service: boolean;

    @ApiProperty({
        description: 'Whether the unit has a kitchen',
        example: true,
    })
    @IsNotEmpty()
    @IsBoolean()
    @Transform(({ value }) => value === 'true' || value === true)
    has_kitchen: boolean;

    @ApiProperty({
        description: 'Whether the unit has a private garage',
        example: false,
    })
    @IsNotEmpty()
    @IsBoolean()
    @Transform(({ value }) => value === 'true' || value === true)
    has_private_garage: boolean;
}
