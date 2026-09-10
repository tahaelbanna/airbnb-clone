import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
export class GuestReviewResponseDto {
    @Expose()
    @ApiProperty({
        description: 'Guest ID',
        example: '65a1b2c3d4e5f67890123456',
    })
    _id: string;

    @Expose()
    @ApiProperty({
        description: 'Guest name',
        example: 'John Doe',
    })
    name: string;
}

export class GetUnitReviewResponseDto {
    @ApiProperty({
        description: 'Guest user details or ID',
        example: '60d21b4967d0d8992e610c85',
    })
    @Expose()
    @Type(() => GuestReviewResponseDto)
    guest: GuestReviewResponseDto;

    @ApiProperty({
        description: 'Review rating',
        example: 5,
    })
    @Expose()
    rating: number;

    @ApiProperty({
        description: 'Review comment',
        example: 'Great place to stay!',
    })
    @Expose()
    comment: string;

    @ApiProperty({
        description: 'The date when the review was created',
        example: '2023-01-01T00:00:00.000Z',
    })
    @Expose()
    createdAt: Date;
}
