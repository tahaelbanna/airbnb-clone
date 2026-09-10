import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function RemoveUnitFavoriteSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Remove unit favorite',
      description: 'Remove a unit from the authenticated user favorites.',
    }),
    ApiParam({ name: 'unitId', type: String }),
    ApiResponse({ status: 204, description: 'Favorite removed successfully' }),
    ApiResponse({ status: 404, description: 'Favorite or unit not found' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
}
