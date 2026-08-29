import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetAllCitiesDto extends PaginationDto {
    @ApiPropertyOptional({
        description: 'Filter by city name',
        example: 'Cairo',
    })
    @IsOptional()
    @IsString()
    city_name: string;

    @ApiPropertyOptional({
        description: 'Filter by country ID',
        example: '60d21b4967d0d8992e610c85',
    })
    @IsOptional()
    @IsString()
    @IsMongoId()
    country_id: string;
}
