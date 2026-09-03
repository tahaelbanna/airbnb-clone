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

export class CreateUnitDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    unit_title: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(0)
    @MaxLength(1000)
    unit_description: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(1000)
    unit_address: string;

    @IsOptional()
    unit_photos: string[];

    @IsNotEmpty()
    @IsNumber()
    unit_cost_per_night: number;

    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    unit_country_id: string;

    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    unit_city_id: string;

    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    unit_category_id: string;

    @IsNotEmpty()
    @IsNumber()
    unit_rooms_count: number;

    @IsNotEmpty()
    @IsNumber()
    unit_adults_count: number;

    @IsNotEmpty()
    @IsNumber()
    unit_kids_count: number;

    @IsNotEmpty()
    @IsBoolean()
    has_internet_service: boolean;

    @IsNotEmpty()
    @IsBoolean()
    has_kitchen: boolean;

    @IsNotEmpty()
    @IsBoolean()
    has_private_garage: boolean;
}
