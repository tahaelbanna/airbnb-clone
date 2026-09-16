import { Injectable } from '@nestjs/common';
import { OtpRepository } from '../repositories/otp.repository';
import { UsersService } from '../../users/users.service';
import { BadRequestException } from '../../common/error-handling/custom-exceptions/bad-request.exception';
import { EmailService } from '../../email-service/email.service';
import { I18nService } from 'nestjs-i18n/dist/services/i18n.service';
import { otpEmailTemplate } from '../../email-service/templates/otp-email.template';

@Injectable()
export class SendOtpUseCase {
    constructor(
        private readonly otpRepository: OtpRepository,
        private readonly usersService: UsersService,
        private readonly emailService: EmailService,
        private readonly i18nService: I18nService,
    ) {}

    async execute(email: string): Promise<void> {
        await this.validateBeforeSendOtp(email);

        const code = this.generateOtp();
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 10);

        await this.otpRepository.findOneAndUpdate(
            { email },
            { code, expiresAt, isVerified: false },
            { upsert: true },
        );
        const { html, text } = otpEmailTemplate({
            code,
            expiresInMinutes: 10,
        });

        await this.emailService.sendEmail({
            to: email,
            subject: 'Your ESQOUN verification code',
            text,
            html,
        });
    }

    private async validateBeforeSendOtp(email: string) {
        const otpExistenceAndVerified = await this.otpRepository.findOne({
            email,
            isVerified: true,
        });

        if (otpExistenceAndVerified) {
            const existingUser = await this.usersService.findOne({ email });
            if (existingUser)
                throw new BadRequestException(
                    this.i18nService.translate('email.OTP_ALREADY_VERIFIED'),
                );
        }
    }

    private generateOtp(): number {
        return Math.floor(100000 + Math.random() * 900000);
    }
}
