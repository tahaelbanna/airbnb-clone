import { BookingStatus } from '../enums/booking-status.enum';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeBookingStatusDto {
    @ApiProperty({
        description: 'The new status of the booking',
        enum: BookingStatus,
        example: BookingStatus.CONFIRMED,
    })
    @IsNotEmpty()
    @IsEnum(BookingStatus)
    status: BookingStatus;

    @ApiProperty({
        description: 'The reason for canceling the booking',
        example: 'Change of plans',
        required: false,
    })
    @IsOptional()
    @IsString()
    cancellation_reason?: string;
}
