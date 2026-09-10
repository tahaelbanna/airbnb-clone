import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function AddUnitFavoriteSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Add unit favorite',
      description: 'Add a unit to the authenticated user favorites.',
    }),
    ApiParam({ name: 'unitId', type: String }),
    ApiResponse({ status: 204, description: 'Favorite added successfully' }),
    ApiResponse({ status: 400, description: 'Bad Request - Invalid unit' }),
    ApiResponse({ status: 404, description: 'Unit not found' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
}
