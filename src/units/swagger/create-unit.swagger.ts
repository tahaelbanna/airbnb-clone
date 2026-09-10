import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { UnitResponseDto } from '../dtos/unit-response.dto';

export function CreateUnitSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a unit',
      description:
        'Create a new unit for the authenticated user with uploaded photos.',
    }),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        required: [
          'photos',
          'title',
          'description',
          'address',
          'costPerDay',
          'country',
          'city',
          'unitCategory',
          'roomsCount',
          'adultsCount',
          'kidsCount',
          'hasInternetService',
          'hasKitchen',
        ],
        properties: {
          photos: {
            type: 'array',
            items: { type: 'string', format: 'binary' },
          },
          title: { type: 'string', example: 'Modern apartment in Cairo' },
          description: {
            type: 'string',
            example: 'Comfortable apartment near downtown Cairo.',
          },
          address: { type: 'string', example: '12 Nile Street, Cairo' },
          costPerDay: { type: 'number', example: 1200 },
          country: { type: 'string', example: '60d21b4967d0d8992e610c85' },
          city: { type: 'string', example: '60d21b4967d0d8992e610c85' },
          unitCategory: {
            type: 'string',
            example: '60d21b4967d0d8992e610c85',
          },
          roomsCount: { type: 'number', example: 2 },
          adultsCount: { type: 'number', example: 2 },
          kidsCount: { type: 'number', example: 1 },
          hasInternetService: { type: 'boolean', example: true },
          hasKitchen: { type: 'boolean', example: true },
          hasPrivateGarage: { type: 'boolean', example: false },
        },
      },
    }),
    ApiResponse({ status: 201, type: UnitResponseDto }),
    ApiResponse({
      status: 400,
      description: 'Bad Request - Validation errors',
    }),
    ApiResponse({
      status: 415,
      description: 'Unsupported Media Type - Invalid file upload',
    }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
}
