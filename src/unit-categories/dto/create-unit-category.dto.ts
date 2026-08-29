import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUnitCategoryDto {
    @IsString()
    @IsNotEmpty()
    unit_categories_name: string;

    @IsString()
    icon: string;
}
