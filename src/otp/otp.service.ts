import { Injectable } from '@nestjs/common';
import { SendOtpUseCase } from './use-cases/send-otp.usecase';
import { VerifyOtpDto } from './dtos/verify-otp.dto';
import { VerifyOtpUseCase } from './use-cases/verify-otp.usecase';
import { ResendOtpUseCase } from './use-cases/resend-otp.usecase';
import { GetOtpRawUsecase } from './use-cases/get-otp-raw.usecase';
import { Otp } from './schemas/otp.schema';
import { QueryFilter } from 'mongoose';
import { OtpRawResponseDto } from './dtos/otp-raw-response.dto';

@Injectable()
export class OtpService {
    constructor(
        private readonly sendOtpUseCase: SendOtpUseCase,
        private readonly verifyOtpUseCase: VerifyOtpUseCase,
        private readonly resendOtpUseCase: ResendOtpUseCase,
        private readonly getOtpRawUsecase: GetOtpRawUsecase,
    ) {}

    async sendOtp(email: string): Promise<void> {
        await this.sendOtpUseCase.execute(email);
    }

    async reSendOtp(email: string): Promise<void> {
        await this.resendOtpUseCase.execute(email);
    }

    async verifyOtp(body: VerifyOtpDto): Promise<void> {
        await this.verifyOtpUseCase.execute(body);
    }

    async getOtpRaw(query: QueryFilter<Otp>): Promise<OtpRawResponseDto> {
        return await this.getOtpRawUsecase.execute(query);
    }
}
