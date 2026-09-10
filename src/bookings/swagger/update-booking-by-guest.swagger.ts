import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { BookingResponseDto } from '../dtos/booking-response.dto';
import { UpdateBookingRequestDto } from '../dtos/update-booking.dto';

export function UpdateBookingByGuestSwagger() {
    return applyDecorators(
        ApiOperation({
            summary: 'Update booking by guest',
            description: 'Update an existing booking request by its guest.',
        }),
        ApiParam({ name: 'id', type: String }),
        ApiBody({ type: UpdateBookingRequestDto }),
        ApiResponse({ status: 200, type: BookingResponseDto }),
        ApiResponse({
            status: 400,
            description: 'Bad Request - Validation or booking rule errors',
        }),
        ApiResponse({ status: 403, description: 'Forbidden' }),
        ApiResponse({ status: 404, description: 'Booking not found' }),
        ApiResponse({ status: 500, description: 'Internal server error' }),
    );
}
