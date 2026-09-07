import { BookingStatus } from '../enums/booking-status.enum';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ChangeBookingStatusDto {
    @IsNotEmpty()
    @IsEnum(BookingStatus)
    status: BookingStatus;

    @IsOptional()
    @IsString()
    cancellation_reason?: string;
}
