import { Expose, Exclude } from 'class-transformer';
import { GuestReview } from '../schemas/subdocument/guest-review.schema';
import { ApiProperty } from '@nestjs/swagger';

export class BookingResponseDto {
    @ApiProperty({
        description: 'The ID of the booking',
        example: '507f1f77bcf86cd00892931b',
    })
    @Expose()
    _id: string;

    @ApiProperty({
        description: 'The ID of the unit',
        example: '507f1f77bcf86cd00892931b',
    })
    @Expose()
    unit_id: string;

    @ApiProperty({
        description: 'The ID of the host',
        example: '507f1f77bcf86cd00892931b',
    })
    @Expose()
    host_id: string;

    @ApiProperty({
        description: 'The ID of the guest',
        example: '507f1f77bcf86cd00892931b',
    })
    @Expose()
    guest_id: string;

    @ApiProperty({
        description: 'The reason for canceling the booking',
        example: 'Change of plans',
        required: false,
    })
    @Expose()
    cancellation_reason?: string;

    @ApiProperty({
        description: 'The check-in date',
        example: 1638364800,
    })
    @Expose()
    check_in: Date;

    @ApiProperty({
        description: 'The check-out date',
        example: 1638451200,
    })
    @Expose()
    check_out: Date;
    @ApiProperty({
        description: 'The number of adults',
        example: 2,
    })
    @Expose()
    adults_count?: number;

    @ApiProperty({
        description: 'The number of children',
        example: 1,
    })
    @Expose()
    kids_count?: number;

    @ApiProperty({
        description: 'The price per night for the booking',
        example: 100,
    })
    @Expose()
    price_per_night: number;

    @ApiProperty({
        description: 'The number of nights in the booking',
        example: 5,
    })
    @Expose()
    nights_count: number;

    @ApiProperty({
        description: 'The booking amount before VAT',
        example: 500,
    })
    @Expose()
    booking_amount: number;

    @ApiProperty({
        description: 'The VAT rate applied to the booking',
        example: 10,
    })
    @Expose()
    vat: number;

    @ApiProperty({
        description: 'The VAT amount for the booking',
        example: 50,
    })
    @Expose()
    vat_amount: number;

    @ApiProperty({
        description: 'The total booking amount including VAT',
        example: 550,
    })
    @Expose()
    total_amount: number;

    @ApiProperty({
        description: 'The current status of the booking',
        example: 'confirmed',
    })
    @Expose()
    status: string;

    @ApiProperty({
        description: 'Additional notes for the booking',
        example: 'Guest requested late check-in',
        required: false,
    })
    @Expose()
    notes?: string;

    @ApiProperty({
        description: 'The guest review for the booking',
        type: () => GuestReview,
        required: false,
    })
    @Expose()
    guest_review?: GuestReview;

    @Exclude()
    _v: number;
}
