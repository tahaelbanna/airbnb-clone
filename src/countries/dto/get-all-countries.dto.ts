import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetAllCountriesDto extends PaginationDto {
    @ApiPropertyOptional({
        description: 'Filter by country name',
        example: 'Egypt',
    })
    @IsOptional()
    @IsString()
    country_name: string;

    @ApiPropertyOptional({
        description: 'Filter by country code',
        example: 'EG',
    })
    @IsOptional()
    @IsString()
    country_code: string;
}
