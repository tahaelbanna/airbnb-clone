import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { GetUnitFavouritesDto } from '../dtos/get-unit-favourites.dto';
import { UnitFavouritesResponseDto } from '../dtos/unit-favourites-response.dto';
export const AddFavoriteSwagger = () =>
    applyDecorators(
        ApiOperation({ summary: 'Add unit to favorites' }),
        ApiParam({ name: 'unitId' }),
        ApiResponse({ status: 201 }),
    );
export const RemoveFavoriteSwagger = () =>
    applyDecorators(
        ApiOperation({ summary: 'Remove unit from favorites' }),
        ApiParam({ name: 'unitId' }),
        ApiResponse({ status: 200 }),
    );
export const GetFavoritesSwagger = () =>
    applyDecorators(
        ApiOperation({ summary: 'Get favorite units' }),
        ApiQuery({ type: GetUnitFavouritesDto }),
        ApiResponse({ status: 200, type: UnitFavouritesResponseDto }),
    );
