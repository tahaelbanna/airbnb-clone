import { Body, Controller, Post } from '@nestjs/common';
import { OtpService } from './otp.service';
import { Public } from '../auth/decorators/public.decorator';
import { SendOtpDto } from './dtos/send-otp.dto';
import { VerifyOtpDto } from './dtos/verify-otp.dto';
import { ApiTags } from '@nestjs/swagger';
import { API_TAGS } from '../common/swagger';
import { SendOtpSwagger, VerifyOtpSwagger, ResendOtpSwagger } from './swagger';
@Controller('otp')
@Public()
@ApiTags(API_TAGS.OTP)
export class OtpController {
    constructor(private readonly otpService: OtpService) {}

    @Post('/send')
    @SendOtpSwagger()
    async sendOtp(@Body() body: SendOtpDto): Promise<void> {
        await this.otpService.sendOtp(body.email);
    }

    @Post('/resend')
    @ResendOtpSwagger()
    async reSendOtp(@Body() body: SendOtpDto): Promise<void> {
        await this.otpService.reSendOtp(body.email);
    }

    @Post('/verify')
    @VerifyOtpSwagger()
    async verifyOtp(@Body() body: VerifyOtpDto): Promise<void> {
        await this.otpService.verifyOtp(body);
    }
}
