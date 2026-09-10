import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer/types/decorators/expose.decorator';
export class CalculateRatingAvgAndCountDto {
    @ApiProperty({
        description: 'The average rating of the unit',
        example: 4.5,
    })
    @Expose()
    rating_avg: number;
    @ApiProperty({
        description: 'The count of ratings for the unit',
        example: 10,
    })
    @Expose()
    rating_count: number;
}
