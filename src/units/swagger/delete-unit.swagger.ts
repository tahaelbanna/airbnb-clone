import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export function DeleteUnitSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete unit',
      description: 'Soft delete a unit owned by the authenticated user.',
    }),
    ApiParam({ name: 'id', type: String }),
    ApiResponse({ status: 204, description: 'Unit deleted successfully' }),
    ApiResponse({ status: 403, description: 'Forbidden' }),
    ApiResponse({ status: 404, description: 'Unit not found' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
}
