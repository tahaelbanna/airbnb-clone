import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CheckAvailabilityDto {
    @ApiProperty({
        description: 'The ID of the unit to check availability for',
        example: '5f9b8c9d0e1f2a3b4c5d6e7f',
    })
    @IsMongoId()
    unit_id: string;

    @ApiProperty({
        description: 'The check-in date',
        example: 1638364800,
    })
    @IsNotEmpty()
    check_in: number | Date;

    @ApiProperty({
        description: 'The check-out date',
        example: 1638451200,
    })
    @IsNotEmpty()
    check_out: number | Date;

    @ApiProperty({
        description: 'The number of adults',
        example: 2,
        required: false,
    })
    @IsOptional()
    adults_count?: number;

    @ApiProperty({
        description: 'The number of children',
        example: 1,
        required: false,
    })
    @IsOptional()
    kids_count?: number;
}
