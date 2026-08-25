import { IsOptional, IsString } from 'class-validator';

export class UpdateCurrencyDto {
    @IsOptional()
    @IsString()
    currency_name?: string;

    @IsOptional()
    @IsString()
    currency_code?: string;
}
