import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AppSettingsResponseDto {
    @ApiProperty({ description: 'VAT rate percentage (0-25)', example: 14 })
    @Expose()
    vat_rate: number;
    @ApiProperty({ description: 'Minimum listing price', example: 100 })
    @Expose()
    min_price: number;

    @Exclude()
    __v: number;
}
