import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

export class GetAllUnitsDto extends PaginationDto {
    @IsOptional()
    @IsString()
    unit_title?: string;

    @IsOptional()
    @IsMongoId()
    @IsString()
    unit_country_id?: string;

    @IsOptional()
    @IsMongoId()
    @IsString()
    unit_city_id?: string;
}
