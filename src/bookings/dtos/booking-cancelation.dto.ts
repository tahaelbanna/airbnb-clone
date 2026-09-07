import { IsOptional, IsString } from 'class-validator';

export class CancelBookingByGuestDto {
    @IsOptional()
    @IsString()
    cancellation_reason?: string;
}
