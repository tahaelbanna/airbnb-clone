import {
    IsNotEmpty,
    IsOptional,
    IsString,
    Max,
    MaxLength,
    Min,
    MinLength,
    IsMongoId,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUnitReviewDto {
    @ApiProperty({
        description: 'The ID of the booking',
        example: '507f1f77bcf86cd00892931b',
    })
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    booking_id: string;

    @ApiProperty({
        description: 'The ID of the unit',
        example: '507f1f77bcf86cd00892931b',
    })
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    unit_id: string;

    @ApiProperty({
        description: 'The ID of the guest',
        example: '507f1f77bcf86cd00892931b',
    })
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    guest_id: string;

    @ApiProperty({
        description: 'The rating given by the guest',
        example: 4,
    })
    @IsNotEmpty()
    @Min(1)
    @Max(5)
    rating: number;

    @ApiProperty({
        description: 'The comment given by the guest',
        example: 'Great experience!',
    })
    @IsOptional()
    @IsString()
    @MinLength(5)
    @MaxLength(1000)
    comment: string;
}
