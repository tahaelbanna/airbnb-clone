import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { BookingResponseDto } from '../dtos/booking-response.dto';

export function GetBookingByIdSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get booking by ID',
      description: 'Retrieve a booking by its ID.',
    }),
    ApiParam({ name: 'id', type: String }),
    ApiResponse({ status: 200, type: BookingResponseDto }),
    ApiResponse({ status: 403, description: 'Forbidden' }),
    ApiResponse({ status: 404, description: 'Booking not found' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
}
