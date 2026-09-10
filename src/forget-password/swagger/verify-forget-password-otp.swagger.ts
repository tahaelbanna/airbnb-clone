import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { VerifyForgetPasswordOtpDto } from '../dtos/verify-forget-password-otp.dto';

export function VerifyForgetPasswordOtpSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Verify forget-password OTP',
      description: 'Verify a forget-password OTP code for an email address.',
    }),
    ApiBody({ type: VerifyForgetPasswordOtpDto }),
    ApiResponse({
      status: 204,
      description: 'Forget-password OTP verified successfully',
    }),
    ApiResponse({ status: 400, description: 'Bad Request - Invalid OTP' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
}
