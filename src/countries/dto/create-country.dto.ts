import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCountryDto {
    @ApiProperty({ description: 'Country name', example: 'Egypt' })
    @IsNotEmpty()
    @IsString()
    country_name: string;

    @ApiPropertyOptional({ description: 'ISO country code', example: 'EG' })
    @IsNotEmpty()
    @IsString()
    country_code: string;
}
