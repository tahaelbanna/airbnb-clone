import { IsOptional, IsString } from 'class-validator';

export class UpdateCountryDto {
    @IsOptional()
    @IsString()
    country_name?: string;

    @IsOptional()
    @IsString()
    country_code?: string;
}
