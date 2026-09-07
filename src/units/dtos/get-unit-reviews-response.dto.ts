import { Expose, Type } from 'class-transformer';

export class GuestReviewResponseDto {
    @Expose()
    _id: string;

    @Expose()
    name: string;
}

export class GetUnitReviewResponseDto {
    @Expose()
    @Type(() => GuestReviewResponseDto)
    guest: GuestReviewResponseDto;

    @Expose()
    rating: number;

    @Expose()
    comment: string;

    @Expose()
    createdAt: Date;
}
