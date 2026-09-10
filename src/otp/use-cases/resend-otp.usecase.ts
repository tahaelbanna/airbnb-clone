import { Injectable } from '@nestjs/common';
import { OtpRepository } from '../repositories/otp.repository';
import { BadRequestException } from '../../common/error-handling/custom-exceptions/bad-request.exception';
import { EmailService } from '../../email-service/email.service';
import { I18nService } from 'nestjs-i18n/dist/services/i18n.service';
@Injectable()
export class ResendOtpUseCase {
    constructor(
        private readonly otpRepository: OtpRepository,
        private readonly emailService: EmailService,
        private readonly i18nService: I18nService,
    ) {}

    async execute(email: string): Promise<void> {
        const existingOtp = await this.otpRepository.findOne({ email });

        if (!existingOtp) {
            throw new BadRequestException(
                this.i18nService.translate('email.OTP_NOT_FOUND_FOR_EMAIL'),
            );
        }

        if (existingOtp.isVerified) {
            throw new BadRequestException(
                this.i18nService.translate('email.OTP_ALREADY_VERIFIED'),
            );
        }

        const cooldownTimeInSeconds = 60;
        const lastRequestTime = new Date(existingOtp.updatedAt).getTime();
        const currentTime = new Date().getTime();
        const differenceInSeconds = (currentTime - lastRequestTime) / 1000;

        if (differenceInSeconds < cooldownTimeInSeconds) {
            throw new BadRequestException(
                this.i18nService.translate('email.OTP_COOLDOWN'),
            );
        }

        const code = this.generateOtp();
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 10);

        await this.otpRepository.findOneAndUpdate(
            { email },
            { code, expiresAt, isVerified: false },
        );

        await this.emailService.sendEmail({
            to: email,
            subject: 'Resend OTP Verification',
            text: `Your new OTP code is ${code}`,
        });
    }

    private generateOtp(): number {
        return Math.floor(100000 + Math.random() * 900000);
    }
}
