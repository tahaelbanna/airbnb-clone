import { Expose, Exclude } from 'class-transformer';

export class BookingResponseDto {
    @Expose()
    _id: string;

    @Expose()
    unit_id: string;

    @Expose()
    host_id: string;

    @Expose()
    guest_id: string;

    @Expose()
    cancellationReason?: string;

    @Expose()
    check_in: Date;

    @Expose()
    check_out: Date;

    @Expose()
    adults_count?: number;

    @Expose()
    kids_count?: number;

    @Expose()
    price_per_night: number;

    @Expose()
    nights_count: number;

    @Expose()
    booking_amount: number;

    @Expose()
    vat: number;

    @Expose()
    vat_amount: number;

    @Expose()
    total_amount: number;

    @Expose()
    status: string;

    @Expose()
    notes?: string;

    @Exclude()
    _v: number;
}
