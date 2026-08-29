import { IsOptional, Max, Min } from 'class-validator';

export class UpsertAppSettingsDto {
    @IsOptional()
    @Min(0)
    @Max(25)
    vat_rate: number;

    @IsOptional()
    @Min(0)
    min_price: number;
}
