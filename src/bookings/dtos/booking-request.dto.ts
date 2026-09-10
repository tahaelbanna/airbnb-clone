import {
    IsString,
    IsMongoId,
    IsNumber,
    IsOptional,
    IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BookingRequestDto {
    @ApiProperty({
        description: 'The ID of the unit to book',
        example: '507f1f77bcf86cd00892931b',
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
    })
    @IsNumber()
    @IsOptional()
    adults_count?: number;

    @ApiProperty({
        description: 'The number of children',
        example: 1,
    })
    @IsNumber()
    @IsOptional()
    kids_count?: number;

    @ApiProperty({
        description: 'Additional notes about the booking',
        example: 'Arriving early',
        required: false,
    })
    @IsString()
    @IsOptional()
    notes?: string;
}
