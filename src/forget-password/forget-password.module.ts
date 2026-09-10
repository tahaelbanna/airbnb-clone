import { Module } from '@nestjs/common';
import { ForgetPasswordRepository } from './repositories/forget-password.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelNames } from '../common/data-access';
import { ForgetPasswordSchema } from './schemas/forget-password.schema';
import { ForgetPasswordController } from './forget-password.controller';
import { ForgetPasswordService } from './forget-password.service';
import { ResetPasswordUseCase } from './use-cases/reset-password.usecase';
import { SendForgetPasswordOtpUseCase } from './use-cases/send-forget-password-otp.usecase';
import { VerifyForgetPasswordOtpUseCase } from './use-cases/verify-forget-password-otp.usecase';
import { UsersModule } from '../users/users.module';
import { EmailServiceModule } from '../email-service/email-service.module';
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: ModelNames.FORGET_PASSWORD, schema: ForgetPasswordSchema },
        ]),
        UsersModule,
        EmailServiceModule,
    ],
    providers: [
        ForgetPasswordRepository,
        ForgetPasswordService,
        ResetPasswordUseCase,
        SendForgetPasswordOtpUseCase,
        VerifyForgetPasswordOtpUseCase,
    ],
    controllers: [ForgetPasswordController],
})
export class ForgetPasswordModule {}
