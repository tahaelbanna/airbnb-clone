import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class UpdateCityDto {
    @IsOptional()
    @IsString()
    city_name?: string;

    @IsOptional()
    @IsString()
    @IsMongoId()
    country_id?: string;
}
