import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CancelBookingByGuestDto {
    @ApiProperty({
        description: 'The reason for canceling the booking',
        example: 'Change of plans',
        required: false,
    })
    @IsOptional()
    @IsString()
    cancellation_reason?: string;
}
