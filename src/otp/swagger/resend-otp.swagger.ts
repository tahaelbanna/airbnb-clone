import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SendOtpDto } from '../dtos/send-otp.dto';

export function ResendOtpSwagger() {
    return applyDecorators(
        ApiOperation({
            summary: 'Resend OTP',
            description:
                'Resend a new OTP code to the specified email address.',
        }),

        ApiBody({
            type: SendOtpDto,
        }),

        ApiResponse({
            status: 201,
            description: 'OTP resent successfully',
        }),

        ApiResponse({
            status: 400,
            description:
                'Bad Request - OTP not found, already verified, cooldown active, or validation error',
        }),

        ApiResponse({
            status: 500,
            description: 'Internal server error',
        }),
    );
}
