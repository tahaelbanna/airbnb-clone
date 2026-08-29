import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCurrencyDto {
    @ApiProperty({ description: 'Currency name', example: 'Egyptian Pound' })
    @IsNotEmpty()
    @IsString()
    currency_name: string;

    @ApiPropertyOptional({ description: 'ISO currency code', example: 'EGP' })
    @IsNotEmpty()
    @IsString()
    currency_code: string;
}
