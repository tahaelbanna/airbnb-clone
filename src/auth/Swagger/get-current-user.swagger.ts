import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function GetCurrentUserSwagger() {
    return applyDecorators(
        ApiOperation({ summary: 'Get the current user' }),
        ApiResponse({ status: 200 }),
    );
}
