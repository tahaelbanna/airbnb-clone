import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { BookingResponseDto } from '../dtos/booking-response.dto';
import { CancelBookingByGuestDto } from '../dtos/booking-cancelation.dto';

export function CancelBookingByGuestSwagger() {
    return applyDecorators(
        ApiOperation({
            summary: 'Cancel booking by guest',
            description: 'Cancel a booking as the authenticated guest.',
        }),
        ApiParam({ name: 'id', type: String }),
        ApiBody({ type: CancelBookingByGuestDto }),
        ApiResponse({ status: 200, type: BookingResponseDto }),
        ApiResponse({
            status: 400,
            description: 'Bad Request - Invalid booking',
        }),
        ApiResponse({ status: 403, description: 'Forbidden' }),
        ApiResponse({ status: 404, description: 'Booking not found' }),
        ApiResponse({ status: 500, description: 'Internal server error' }),
    );
}
