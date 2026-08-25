import { IsOptional, IsString } from 'class-validator';

export class UpdateUnitCategoryDto {
    @IsOptional()
    @IsString()
    unit_categories_name?: string;

    @IsOptional()
    @IsString()
    icon?: string;
}
