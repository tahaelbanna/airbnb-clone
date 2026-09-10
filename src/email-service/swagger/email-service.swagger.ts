import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SendEmailDto } from '../dtos/send-email.dto';
export const SendEmailSwagger = () =>
    applyDecorators(
        ApiOperation({ summary: 'Send an email' }),
        ApiBody({ type: SendEmailDto }),
        ApiResponse({ status: 201 }),
    );
