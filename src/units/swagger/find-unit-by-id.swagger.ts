import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { UnitResponseDto } from '../dtos/unit-response.dto';

export function FindUnitByIdSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get unit by ID',
      description: 'Retrieve a single active unit by its ID.',
    }),
    ApiParam({ name: 'id', type: String }),
    ApiResponse({ status: 200, type: UnitResponseDto }),
    ApiResponse({ status: 404, description: 'Unit not found' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
}
