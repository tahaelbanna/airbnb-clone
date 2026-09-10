import {
    IsNotEmpty,
    IsOptional,
    IsString,
    Max,
    MaxLength,
    Min,
    MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GuestReviewDto {
    @ApiProperty({
        description: 'The rating given by the guest',
        example: 5,
        required: true,
    })
    @IsNotEmpty()
    @Min(1)
    @Max(5)
    rating: number;

    @ApiProperty({
        description: 'The comment provided by the guest',
        example: 'Great stay! Highly recommended.',
        required: false,
    })
    @IsOptional()
    @IsString()
    @MinLength(5)
    @MaxLength(1000)
    comment?: string;
}
