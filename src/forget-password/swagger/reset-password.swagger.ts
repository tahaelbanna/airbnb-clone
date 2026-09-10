import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResetPasswordDto } from '../dtos/reset-password.dto';

export function ResetPasswordSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Reset password',
      description: 'Reset a user password after OTP verification.',
    }),
    ApiBody({ type: ResetPasswordDto }),
    ApiResponse({ status: 204, description: 'Password reset successfully' }),
    ApiResponse({
      status: 400,
      description: 'Bad Request - Validation or reset errors',
    }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
}
