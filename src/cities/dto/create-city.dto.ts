import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateCityDto {
    @IsNotEmpty()
    @IsString()
    city_name: string;

    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    country_id: string;
}
