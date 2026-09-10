import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookingRequestDto {
    @ApiProperty({
        description: 'The check-in date',
        example: 1638364800,
        required: false,
    })
    @IsOptional()
    check_in?: number | Date;

    @ApiProperty({
        description: 'The check-out date',
        example: 1638451200,
        required: false,
    })
    @IsOptional()
    check_out?: number | Date;

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

    @ApiProperty({
        description: 'The notes for the booking',
        example: 'Please arrive early.',
        required: false,
    })
    @IsOptional()
    @IsString()
    notes?: string;
}
