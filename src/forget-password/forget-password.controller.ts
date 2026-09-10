import { Body, Controller, Post } from '@nestjs/common';
import { Public } from '../auth/decorators/public.decorator';
import { SendForgetPasswordOtpDto } from './dtos/send-forget-password-otp.dto';
import { VerifyForgetPasswordOtpDto } from './dtos/verify-forget-password-otp.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { ForgetPasswordService } from './forget-password.service';
import { ApiTags } from '@nestjs/swagger';
import { API_TAGS } from '../common/swagger';
import { SendForgetPasswordOtpSwagger, VerifyForgetPasswordOtpSwagger, ResetPasswordSwagger } from './swagger';

@ApiTags(API_TAGS.FORGET_PASSWORD)
@Controller('forget-password')
@Public()
export class ForgetPasswordController {
    constructor(
        private readonly forgetPasswordService: ForgetPasswordService,
    ) {}

    @Post('/send')
    @SendForgetPasswordOtpSwagger()
    async sendForgetPasswordOtp(
        @Body() body: SendForgetPasswordOtpDto,
    ): Promise<void> {
        await this.forgetPasswordService.sendForgetPasswordOtp(body.email);
    }

    @Post('/verify')
    @VerifyForgetPasswordOtpSwagger()
    async verifyForgetPasswordOtp(
        @Body() dto: VerifyForgetPasswordOtpDto,
    ): Promise<void> {
        await this.forgetPasswordService.verifyForgetPasswordOtp(dto);
    }

    @Post('/reset')
    @ResetPasswordSwagger()
    async resetPassword(@Body() dto: ResetPasswordDto): Promise<void> {
        await this.forgetPasswordService.resetPassword(dto);
    }
}
