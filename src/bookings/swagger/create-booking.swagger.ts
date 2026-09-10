import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BookingRequestDto } from '../dtos/booking-request.dto';
import { BookingResponseDto } from '../dtos/booking-response.dto';

export function CreateBookingSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a booking',
      description: 'Create a booking request for the authenticated user.',
    }),
    ApiBody({ type: BookingRequestDto }),
    ApiResponse({ status: 201, type: BookingResponseDto }),
    ApiResponse({
      status: 400,
      description: 'Bad Request - Validation or booking rule errors',
    }),
    ApiResponse({ status: 404, description: 'Unit not found' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
}
