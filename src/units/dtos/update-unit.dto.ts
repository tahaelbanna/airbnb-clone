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

export class UpdateUnitDto {
    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    unit_title: string;

    @IsOptional()
    @IsString()
    @MinLength(0)
    @MaxLength(1000)
    unit_description: string;

    @IsOptional()
    @IsString()
    @MinLength(4)
    @MaxLength(1000)
    unit_address: string;

    @IsOptional()
    @IsArray()
    unit_photos: string[];

    @IsOptional()
    @IsNumber()
    unit_cost_per_night: number;

    @IsOptional()
    @IsString()
    @IsMongoId()
    unit_country_id: string;

    @IsOptional()
    @IsString()
    @IsMongoId()
    unit_city_id: string;

    @IsOptional()
    @IsString()
    @IsMongoId()
    unit_category_id: string;

    @IsOptional()
    @IsNumber()
    unit_rooms_count: number;

    @IsOptional()
    @IsNumber()
    unit_adults_count: number;

    @IsOptional()
    @IsNumber()
    unit_kids_count: number;

    @IsOptional()
    @IsBoolean()
    has_internet_service: boolean;

    @IsOptional()
    @IsBoolean()
    has_kitchen: boolean;

    @IsOptional()
    @IsBoolean()
    has_private_garage: boolean;
}
