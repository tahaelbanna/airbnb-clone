import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCityDto {
    @ApiProperty({ description: 'City name', example: 'Cairo' })
    @IsNotEmpty()
    @IsString()
    city_name: string;

    @ApiProperty({
        description: 'Country MongoDB ID',
        example: '60d21b4967d0d8992e610c85',
    })
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    country_id: string;
}
