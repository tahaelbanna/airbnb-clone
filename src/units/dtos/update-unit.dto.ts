import {
    IsArray,
    IsBoolean,
    IsMongoId,
    IsOptional,
    IsNumber,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUnitDto {
    @ApiPropertyOptional({
        description: 'Unit title',
        example: 'Cozy apartment in downtown',
    })
    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    unit_title: string;

    @ApiPropertyOptional({
        description: 'Unit description',
        example:
            'A bright apartment close to restaurants and public transport.',
    })
    @IsOptional()
    @IsString()
    @MinLength(0)
    @MaxLength(1000)
    unit_description: string;

    @ApiPropertyOptional({
        description: 'Unit address',
        example: '12 Main Street, Cairo',
    })
    @IsOptional()
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
    @IsArray()
    unit_photos: string[];

    @ApiPropertyOptional({ description: 'Cost per night', example: 125 })
    @IsOptional()
    @IsNumber()
    unit_cost_per_night: number;

    @ApiPropertyOptional({
        description: 'Country ID',
        example: '65a1b2c3d4e5f67890123456',
    })
    @IsOptional()
    @IsString()
    @IsMongoId()
    unit_country_id: string;

    @ApiPropertyOptional({
        description: 'City ID',
        example: '65a1b2c3d4e5f67890123457',
    })
    @IsOptional()
    @IsString()
    @IsMongoId()
    unit_city_id: string;

    @ApiPropertyOptional({
        description: 'Unit category ID',
        example: '65a1b2c3d4e5f67890123458',
    })
    @IsOptional()
    @IsString()
    @IsMongoId()
    unit_category_id: string;

    @ApiPropertyOptional({ description: 'Number of rooms', example: 3 })
    @IsOptional()
    @IsNumber()
    unit_rooms_count: number;

    @ApiPropertyOptional({
        description: 'Maximum number of adults',
        example: 4,
    })
    @IsOptional()
    @IsNumber()
    unit_adults_count: number;

    @ApiPropertyOptional({
        description: 'Maximum number of kids',
        example: 2,
    })
    @IsOptional()
    @IsNumber()
    unit_kids_count: number;

    @ApiPropertyOptional({
        description: 'Whether the unit has internet service',
        example: true,
    })
    @IsOptional()
    @IsBoolean()
    has_internet_service: boolean;

    @ApiPropertyOptional({
        description: 'Whether the unit has a kitchen',
        example: true,
    })
    @IsOptional()
    @IsBoolean()
    has_kitchen: boolean;

    @ApiPropertyOptional({
        description: 'Whether the unit has a private garage',
        example: false,
    })
    @IsOptional()
    @IsBoolean()
    has_private_garage: boolean;
}
