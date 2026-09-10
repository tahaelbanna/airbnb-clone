import { Body, Controller, Post } from '@nestjs/common';
import { Public } from '../auth/decorators/public.decorator';
import { SendForgetPasswordOtpDto } from './dtos/send-forget-password-otp.dto';
import { VerifyForgetPasswordOtpDto } from './dtos/verify-forget-password-otp.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { ForgetPasswordService } from './forget-password.service';

@Controller('forget-password')
@Public()
export class ForgetPasswordController {
    constructor(
        private readonly forgetPasswordService: ForgetPasswordService,
    ) {}

    @Post('/send')
    async sendForgetPasswordOtp(
        @Body() body: SendForgetPasswordOtpDto,
    ): Promise<void> {
        await this.forgetPasswordService.sendForgetPasswordOtp(body.email);
    }

    @Post('/verify')
    async verifyForgetPasswordOtp(
        @Body() dto: VerifyForgetPasswordOtpDto,
    ): Promise<void> {
        await this.forgetPasswordService.verifyForgetPasswordOtp(dto);
    }

    @Post('/reset')
    async resetPassword(@Body() dto: ResetPasswordDto): Promise<void> {
        await this.forgetPasswordService.resetPassword(dto);
    }
}
