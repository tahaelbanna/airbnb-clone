import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SendOtpDto } from '../dtos/send-otp.dto';
import { VerifyOtpDto } from '../dtos/verify-otp.dto';
export const SendOtpSwagger = () =>
    applyDecorators(
        ApiOperation({ summary: 'Send OTP' }),
        ApiBody({ type: SendOtpDto }),
        ApiResponse({ status: 201 }),
    );
export const ResendOtpSwagger = () =>
    applyDecorators(
        ApiOperation({ summary: 'Resend OTP' }),
        ApiBody({ type: SendOtpDto }),
        ApiResponse({ status: 201 }),
    );
export const VerifyOtpSwagger = () =>
    applyDecorators(
        ApiOperation({ summary: 'Verify OTP' }),
        ApiBody({ type: VerifyOtpDto }),
        ApiResponse({ status: 201 }),
    );
