import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCityDto {
    @ApiPropertyOptional({ description: 'City name', example: 'Cairo' })
    @IsOptional()
    @IsString()
    city_name?: string;

    @ApiPropertyOptional({
        description: 'Country MongoDB ID',
        example: '60d21b4967d0d8992e610c85',
    })
    @IsOptional()
    @IsString()
    @IsMongoId()
    country_id?: string;
}
