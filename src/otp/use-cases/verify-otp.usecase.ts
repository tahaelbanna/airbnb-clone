import { Injectable } from '@nestjs/common';
import { VerifyOtpDto } from '../dtos/verify-otp.dto';
import { OtpRepository } from '../repositories/otp.repository';
import { GetOtpRawUsecase } from './get-otp-raw.usecase';
import { OtpRawResponseDto } from '../dtos/otp-raw-response.dto';
import { BadRequestException } from '../../common/error-handling/custom-exceptions/bad-request.exception';
import { I18nService } from 'nestjs-i18n/dist/services/i18n.service';
@Injectable()
export class VerifyOtpUseCase {
    constructor(
        private readonly otpRepository: OtpRepository,
        private readonly getOtpRawUsecase: GetOtpRawUsecase,
        private readonly i18nService: I18nService,
    ) {}

    async execute(body: VerifyOtpDto): Promise<void> {
        const otp = await this.getOtpRawUsecase.execute({ email: body.email });
        this.validateOtpBeforeVerify(otp, body);

        await this.otpRepository.findOneAndUpdate(
            { email: body.email },
            { isVerified: true },
        );
    }

    private validateOtpBeforeVerify(
        otp: OtpRawResponseDto,
        body: VerifyOtpDto,
    ) {
        if (!otp)
            throw new BadRequestException(
                this.i18nService.translate('email.OTP_NOT_FOUND_FOR_EMAIL'),
            );
        if (otp.code !== body.code)
            throw new BadRequestException(
                this.i18nService.translate('email.INVALID_OTP'),
            );
        if (new Date() > otp.expiresAt)
            throw new BadRequestException(
                this.i18nService.translate('email.OTP_EXPIRED'),
            );
        if (otp.isVerified)
            throw new BadRequestException(
                this.i18nService.translate('email.OTP_ALREADY_VERIFIED'),
            );
    }
}
