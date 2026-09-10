import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { UnitFavouritesResponseDto } from '../dtos/unit-favourites-response.dto';

export function FindUnitFavoritesSwagger() {
    return applyDecorators(
        ApiOperation({
            summary: 'Get my unit favorites',
            description:
                'Retrieve a paginated list of favorite units for the authenticated user.',
        }),
        ApiQuery({ name: 'page', required: false, type: Number }),
        ApiQuery({ name: 'limit', required: false, type: Number }),
        ApiQuery({ name: 'ignoreLimit', required: false, type: Boolean }),
        ApiResponse({ status: 200, type: [UnitFavouritesResponseDto] }),
        ApiResponse({ status: 500, description: 'Internal server error' }),
    );
}
