import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelNames } from '../common/data-access';
import { OtpSchema } from './schemas/otp.schema';
import { OtpRepository } from './repositories/otp.repository';
import { OtpController } from './otp.controller';
import { OtpService } from './otp.service';
import { SendOtpUseCase } from './use-cases/send-otp.usecase';
import { VerifyOtpUseCase } from './use-cases/verify-otp.usecase';
import { UsersModule } from '../users/users.module';
import { EmailServiceModule } from '../email-service/email-service.module';
import { ResendOtpUseCase } from './use-cases/resend-otp.usecase';
import { GetOtpRawUsecase } from './use-cases/get-otp-raw.usecase';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: ModelNames.OTP, schema: OtpSchema },
        ]),
        UsersModule,
        EmailServiceModule,
    ],
    providers: [
        OtpRepository,
        OtpService,
        SendOtpUseCase,
        VerifyOtpUseCase,
        ResendOtpUseCase,
        GetOtpRawUsecase,
    ],
    controllers: [OtpController],
    exports: [OtpService],
})
export class OtpModule {}
