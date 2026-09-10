import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { DeleteUnitPhotosDto } from '../dtos/delete-unit-photos.dto';

export function DeleteUnitPhotosSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete unit photos',
      description: 'Delete one or more photos from a unit.',
    }),
    ApiParam({ name: 'id', type: String }),
    ApiBody({ type: DeleteUnitPhotosDto }),
    ApiResponse({
      status: 200,
      description: 'Unit photos deleted successfully',
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request - Validation errors',
    }),
    ApiResponse({ status: 403, description: 'Forbidden' }),
    ApiResponse({ status: 404, description: 'Unit not found' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
}
