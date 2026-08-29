import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCurrencyDto {
    @IsNotEmpty()
    @IsString()
    currency_name: string;

    @IsNotEmpty()
    @IsString()
    currency_code: string;
}
