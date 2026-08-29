import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class GetAllCurrenciesDto extends PaginationDto {
    @IsOptional()
    @IsString()
    currency_name: string;

    @IsOptional()
    @IsString()
    currency_code: string;
}
