import { ArrayNotEmpty, IsArray, IsString } from 'class-validator';

export class DeleteUnitPhotosDto {
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    unit_photos: string[];
}
