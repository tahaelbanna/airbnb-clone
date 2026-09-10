import { Injectable } from '@nestjs/common';
import { ForgetPasswordRepository } from '../repositories/forget-password.repository';
import { UsersService } from 'src/users/users.service';
import { EmailService } from 'src/email-service/email.service';
import { BadRequestException } from 'src/common/error-handling/custom-exceptions/bad-request.exception';
import { I18nService } from 'nestjs-i18n/dist/services/i18n.service';

@Injectable()
export class SendForgetPasswordOtpUseCase {
    constructor(
        private readonly forgetPasswordRepository: ForgetPasswordRepository,
        private readonly usersService: UsersService,
        private readonly emailService: EmailService,
        private readonly i18nService: I18nService,
    ) {}

    async execute(email: string): Promise<void> {
        const user = await this.usersService.findOne({ email });
        if (!user)
            throw new BadRequestException(
                this.i18nService.translate('user.USER_NOT_FOUND'),
            );

        const code = this.generateOtp();
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 10);

        await this.forgetPasswordRepository.findOneAndUpdate(
            { email },
            { expiresAt, code, isVerified: false },
            { upsert: true },
        );

        await this.emailService.sendEmail({
            to: email,
            subject: 'Forget Password OTP',
            text: `Your OTP is ${code}`,
        });
    }

    private generateOtp(): number {
        return Math.floor(100000 + Math.random() * 900000);
    }
}
