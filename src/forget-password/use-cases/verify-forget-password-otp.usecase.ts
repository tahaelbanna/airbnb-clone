import { Injectable } from '@nestjs/common';
import { ForgetPasswordRepository } from '../repositories/forget-password.repository';
import { VerifyForgetPasswordOtpDto } from '../dtos/verify-forget-password-otp.dto';
import { BadRequestException } from 'src/common/error-handling/custom-exceptions/bad-request.exception';
import { I18nService } from 'nestjs-i18n/dist/services/i18n.service';

@Injectable()
export class VerifyForgetPasswordOtpUseCase {
    constructor(
        private readonly forgetPasswordRepository: ForgetPasswordRepository,
        private readonly i18nService: I18nService,
    ) {}

    async execute(body: VerifyForgetPasswordOtpDto): Promise<void> {
        const forgetPassword = await this.forgetPasswordRepository.findOne({
            email: body.email,
        });
        if (!forgetPassword)
            throw new BadRequestException(
                this.i18nService.translate(
                    'email.EMAIL_NOT_FOUND_FOR_OTP_VERIFICATION',
                ),
            );

        if (forgetPassword.code !== body.code)
            throw new BadRequestException(
                this.i18nService.translate('email.INVALID_OTP'),
            );

        if (new Date() > new Date(forgetPassword.expiresAt))
            throw new BadRequestException(
                this.i18nService.translate('email.OTP_EXPIRED'),
            );

        if (forgetPassword.isVerified)
            throw new BadRequestException(
                this.i18nService.translate('email.OTP_ALREADY_USED'),
            );

        await this.forgetPasswordRepository.findOneAndUpdate(
            {
                email: body.email,
            },
            { isVerified: true },
        );
    }
}
