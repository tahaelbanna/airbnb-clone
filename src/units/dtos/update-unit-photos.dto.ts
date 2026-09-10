import { ApiProperty } from '@nestjs/swagger';

export class UpdateUnitPhotosDto {
    @ApiProperty({
        description: 'The URLs of the unit photos',
        type: [String],
        example: ['https://example.com/unit-1.jpg'],
    })
    unit_photos?: string[];
}
