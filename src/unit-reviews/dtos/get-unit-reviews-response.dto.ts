import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GuestReviewResponseDto {
    @ApiProperty({
        description: 'The ID of the guest',
        example: '507f1f77bcf86cd00892931b',
    })
    @Expose()
    _id: string;

    @ApiProperty({
        description: 'The name of the guest',
        example: 'John Doe',
    })
    @Expose()
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
        description: 'The rating given by the guest',
        example: 4,
    })
    @Expose()
    rating: number;

    @ApiProperty({
        description: 'The comment given by the guest',
        example: 'Great experience!',
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
