import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../common/dto/pagination.dto';

export class GetAllCitiesDto extends PaginationDto {
    @IsOptional()
    @IsString()
    city_name: string;

    @IsOptional()
    @IsString()
    @IsMongoId()
    country_id: string;
}
