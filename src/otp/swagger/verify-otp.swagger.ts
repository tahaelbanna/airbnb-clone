import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { VerifyOtpDto } from '../dtos/verify-otp.dto';

export function VerifyOtpSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Verify OTP',
      description: 'Verify an OTP code for an email address.',
    }),
    ApiBody({ type: VerifyOtpDto }),
    ApiResponse({ status: 204, description: 'OTP verified successfully' }),
    ApiResponse({ status: 400, description: 'Bad Request - Invalid OTP' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
}
