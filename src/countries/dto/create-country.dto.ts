import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCountryDto {
    @IsNotEmpty()
    @IsString()
    country_name: string;

    @IsNotEmpty()
    @IsString()
    country_code: string;
}
