import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetAllCurrenciesDto extends PaginationDto {
    @ApiPropertyOptional({
        description: 'Filter by currency name',
        example: 'Egyptian Pound',
    })
    @IsOptional()
    @IsString()
    currency_name: string;

    @ApiPropertyOptional({
        description: 'Filter by currency code',
        example: 'EGP',
    })
    @IsOptional()
    @IsString()
    currency_code: string;
}
