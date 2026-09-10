import { Body, Controller, Post } from '@nestjs/common';
import { OtpService } from './otp.service';
import { Public } from '../auth/decorators/public.decorator';
import { SendOtpDto } from './dtos/send-otp.dto';
import { VerifyOtpDto } from './dtos/verify-otp.dto';

@Controller('otp')
@Public()
export class OtpController {
    constructor(private readonly otpService: OtpService) {}

    @Post('/send')
    async sendOtp(@Body() body: SendOtpDto): Promise<void> {
        await this.otpService.sendOtp(body.email);
    }

    @Post('/resend')
    async reSendOtp(@Body() body: SendOtpDto): Promise<void> {
        await this.otpService.reSendOtp(body.email);
    }

    @Post('/verify')
    async verifyOtp(@Body() body: VerifyOtpDto): Promise<void> {
        await this.otpService.verifyOtp(body);
    }
}
