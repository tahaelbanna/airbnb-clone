import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SendEmailDto } from '../dtos/send-email.dto';

export function SendEmailSwagger() {
    return applyDecorators(
        ApiOperation({
            summary: 'Send email',
            description: 'Send an email using the configured mail adapter.',
        }),
        ApiBody({ type: SendEmailDto }),
        ApiResponse({ status: 201, description: 'Email sent successfully' }),
        ApiResponse({
            status: 400,
            description: 'Bad Request - Validation or sending errors',
        }),
        ApiResponse({ status: 500, description: 'Internal server error' }),
    );
}
