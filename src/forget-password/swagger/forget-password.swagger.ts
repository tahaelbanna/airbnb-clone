import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SendForgetPasswordOtpDto } from '../dtos/send-forget-password-otp.dto';
import { VerifyForgetPasswordOtpDto } from '../dtos/verify-forget-password-otp.dto';
import { ResetPasswordDto } from '../dtos/reset-password.dto';
export const SendForgetPasswordOtpSwagger = () =>
    applyDecorators(
        ApiOperation({ summary: 'Send password reset OTP' }),
        ApiBody({ type: SendForgetPasswordOtpDto }),
        ApiResponse({ status: 201 }),
    );
export const VerifyForgetPasswordOtpSwagger = () =>
    applyDecorators(
        ApiOperation({ summary: 'Verify password reset OTP' }),
        ApiBody({ type: VerifyForgetPasswordOtpDto }),
        ApiResponse({ status: 201 }),
    );
export const ResetPasswordSwagger = () =>
    applyDecorators(
        ApiOperation({ summary: 'Reset password' }),
        ApiBody({ type: ResetPasswordDto }),
        ApiResponse({ status: 201 }),
    );
