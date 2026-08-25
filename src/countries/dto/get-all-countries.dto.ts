import { IsOptional, IsString } from 'class-validator';

export class GetAllCountriesDto {
    @IsOptional()
    @IsString()
    country_name: string;

    @IsOptional()
    @IsString()
    country_code: string;

    @IsOptional()
    page?: number;

    @IsOptional()
    limit?: number;

    @IsOptional()
    ignoreLimit?: boolean;
}
