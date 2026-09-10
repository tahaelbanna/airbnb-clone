import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SendForgetPasswordOtpDto } from '../dtos/send-forget-password-otp.dto';

export function SendForgetPasswordOtpSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Send forget-password OTP',
      description:
        'Send a forget-password OTP code to the provided email address.',
    }),
    ApiBody({ type: SendForgetPasswordOtpDto }),
    ApiResponse({
      status: 204,
      description: 'Forget-password OTP sent successfully',
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request - Validation or sending errors',
    }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
}
