import { Module } from '@nestjs/common';
import { EmailServiceController } from './email-service.controller';
import { EmailService } from './email.service';
import { NodemailerEmailAdapter } from './adapters/nodemailer-email.adapter';
import { EMAIL_ADAPTER } from './constants/mail.constant';

@Module({
    controllers: [EmailServiceController],
    providers: [
        EmailService,
        {
            provide: EMAIL_ADAPTER,
            useClass: NodemailerEmailAdapter,
        },
    ],
    exports: [EmailService],
})
export class EmailServiceModule {}
