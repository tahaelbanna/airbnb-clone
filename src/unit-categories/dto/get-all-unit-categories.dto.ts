import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class getAllUnitCategoriesDto extends PaginationDto {
    @ApiPropertyOptional({
        description: 'Filter by unit category name',
        example: 'Apartment',
    })
    @IsOptional()
    @IsString()
    unit_categories_name: string;

    @ApiPropertyOptional({
        description: 'Filter by icon',
        example: 'fa-building',
    })
    @IsOptional()
    @IsString()
    icon: string;
}
