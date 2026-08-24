import { IsOptional, IsString } from 'class-validator';

export class GetAllCountriesDto {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    countryCode: string;
}
