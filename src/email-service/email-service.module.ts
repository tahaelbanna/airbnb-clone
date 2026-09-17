import { Module } from '@nestjs/common';
import { EmailServiceController } from './email-service.controller';
import { EmailService } from './email.service';
// import { NodemailerEmailAdapter } from './adapters/nodemailer-email.adapter';
import { EMAIL_ADAPTER } from './constants/mail.constant';
import { BrevoEmailAdapter } from './adapters/brevoapi-email.adapter';

@Module({
    controllers: [EmailServiceController],
    providers: [
        EmailService,
        {
            provide: EMAIL_ADAPTER,
            useClass: BrevoEmailAdapter,
        },
    ],
    exports: [EmailService],
})
export class EmailServiceModule {}
