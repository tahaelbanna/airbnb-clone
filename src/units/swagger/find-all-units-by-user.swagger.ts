import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { UnitResponseDto } from '../dtos/unit-response.dto';

export function FindAllUnitsByUserSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get my units',
      description:
        'Retrieve a paginated list of units owned by the authenticated user.',
    }),
    ApiQuery({ name: 'page', required: false, type: Number }),
    ApiQuery({ name: 'limit', required: false, type: Number }),
    ApiQuery({ name: 'ignoreLimit', required: false, type: Boolean }),
    ApiQuery({ name: 'title', required: false, type: String }),
    ApiQuery({ name: 'country', required: false, type: String }),
    ApiQuery({ name: 'city', required: false, type: String }),
    ApiResponse({ status: 200, type: [UnitResponseDto] }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
}
