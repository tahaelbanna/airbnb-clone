import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { BookingResponseDto } from '../dtos/booking-response.dto';
import { ChangeBookingStatusDto } from '../dtos/change-booking-status.dto';

export function ChangeBookingStatusByHostSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Change booking status by host',
      description: 'Change a booking status as the host of the booked unit.',
    }),
    ApiParam({ name: 'id', type: String }),
    ApiBody({ type: ChangeBookingStatusDto }),
    ApiResponse({ status: 200, type: BookingResponseDto }),
    ApiResponse({ status: 400, description: 'Bad Request - Invalid status' }),
    ApiResponse({ status: 403, description: 'Forbidden' }),
    ApiResponse({ status: 404, description: 'Booking not found' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
}
