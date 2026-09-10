import { ArrayNotEmpty, IsArray, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteUnitPhotosDto {
    @ApiProperty({
        description: 'List of unit photo URLs to delete',
        type: [String],
        example: ['https://example.com/unit-1.jpg'],
    })
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    unit_photos: string[];
}
