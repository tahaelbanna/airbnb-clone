import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { GetUnitReviewResponseDto } from '../dtos/get-unit-reviews-response.dto';

export function FindUnitReviewsSwagger() {
    return applyDecorators(
        ApiOperation({
            summary: 'Get unit reviews',
            description: 'Retrieve a paginated list of reviews for a unit.',
        }),
        ApiParam({ name: 'id', type: String }),
        ApiQuery({ name: 'page', required: false, type: Number }),
        ApiQuery({ name: 'limit', required: false, type: Number }),
        ApiQuery({ name: 'ignoreLimit', required: false, type: Boolean }),
        ApiResponse({ status: 200, type: [GetUnitReviewResponseDto] }),
        ApiResponse({ status: 404, description: 'Unit not found' }),
        ApiResponse({ status: 500, description: 'Internal server error' }),
    );
}
