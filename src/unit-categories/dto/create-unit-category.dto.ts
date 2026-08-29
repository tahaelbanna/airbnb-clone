import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUnitCategoryDto {
    @ApiProperty({ description: 'Unit category name', example: 'Apartment' })
    @IsString()
    @IsNotEmpty()
    unit_categories_name: string;

    @ApiProperty({
        description: 'Icon identifier or URL',
        example: 'fa-building',
    })
    @IsString()
    icon: string;
}
