import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { UnitResponseDto } from '../dtos/unit-response.dto';

export function UpdateUnitPhotosSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update unit photos',
      description: 'Upload replacement photos for a unit.',
    }),
    ApiParam({ name: 'id', type: String }),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        required: ['photos'],
        properties: {
          photos: {
            type: 'array',
            items: { type: 'string', format: 'binary' },
          },
        },
      },
    }),
    ApiResponse({ status: 200, type: UnitResponseDto }),
    ApiResponse({ status: 403, description: 'Forbidden' }),
    ApiResponse({ status: 404, description: 'Unit not found' }),
    ApiResponse({
      status: 415,
      description: 'Unsupported Media Type - Invalid file upload',
    }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
}
