import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class GetAllCountriesDto extends PaginationDto {
    @IsOptional()
    @IsString()
    country_name: string;

    @IsOptional()
    @IsString()
    country_code: string;
}
