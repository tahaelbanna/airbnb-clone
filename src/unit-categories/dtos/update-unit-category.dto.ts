import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUnitCategoryDto {
    @ApiPropertyOptional({
        description: 'Unit category name',
        example: 'Apartment',
    })
    @IsOptional()
    @IsString()
    unit_categories_name?: string;

    @ApiPropertyOptional({
        description: 'Icon identifier or URL',
        example: 'fa-building',
    })
    @IsOptional()
    @IsString()
    icon?: string;
}
