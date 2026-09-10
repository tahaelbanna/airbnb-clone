import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateUnitAvgRateAndCountDto {
    @ApiProperty({
        description: 'The ID of the unit',
        example: '507f1f77bcf86cd00892931b',
    })
    @IsNotEmpty()
    unit_id: string;

    @ApiProperty({
        description: 'The number of reviews for the unit',
        example: 24,
    })
    @IsNotEmpty()
    unit_reviews_count: number;

    @ApiProperty({
        description: 'The average rating for the unit',
        example: 4.8,
    })
    @IsNotEmpty()
    unit_avg_rate: number;
}
