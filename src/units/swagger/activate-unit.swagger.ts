import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { UnitResponseDto } from '../dtos/unit-response.dto';

export function ActivateUnitSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Activate unit',
      description: 'Activate a unit owned by the authenticated user.',
    }),
    ApiParam({ name: 'id', type: String }),
    ApiResponse({ status: 200, type: UnitResponseDto }),
    ApiResponse({ status: 403, description: 'Forbidden' }),
    ApiResponse({ status: 404, description: 'Unit not found' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
}
