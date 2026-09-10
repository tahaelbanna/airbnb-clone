import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { AvailabilityResponseDto } from '../dtos/availability-response.dto';

export function CheckAvailabilitySwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Check unit availability',
      description:
        'Check whether a unit is available for the requested dates and return pricing details.',
    }),
    ApiQuery({ name: 'unit', required: true, type: String }),
    ApiQuery({ name: 'checkIn', required: true, type: String }),
    ApiQuery({ name: 'checkOut', required: true, type: String }),
    ApiQuery({ name: 'adultsCount', required: false, type: Number }),
    ApiQuery({ name: 'kidsCount', required: false, type: Number }),
    ApiResponse({ status: 200, type: AvailabilityResponseDto }),
    ApiResponse({
      status: 400,
      description: 'Bad Request - Validation errors',
    }),
    ApiResponse({ status: 404, description: 'Unit not found' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
}
