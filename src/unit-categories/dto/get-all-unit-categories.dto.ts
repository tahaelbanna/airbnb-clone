import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../common/dto/pagination.dto';

export class getAllUnitCategoriesDto extends PaginationDto {
    @IsOptional()
    @IsString()
    unit_categories_name: string;

    @IsOptional()
    @IsString()
    icon: string;
}
