import { Injectable, Inject } from '@nestjs/common';
import { BadRequestException } from 'src/common/error-handling/custom-exceptions/bad-request.exception';
import type { EmailAdapterInterface } from './interfaces/email-adapter.interface';
import { EMAIL_ADAPTER } from './constants/mail.constant';
import { SendEmailDto } from './dtos/send-email.dto';
import { I18nService } from 'nestjs-i18n/dist/services/i18n.service';

@Injectable()
export class EmailService {
    constructor(
        @Inject(EMAIL_ADAPTER)
        private readonly emailAdapter: EmailAdapterInterface,
        private readonly i18nService: I18nService,
    ) {}

    async sendEmail(dto: SendEmailDto): Promise<void> {
        try {
            await this.emailAdapter.sendEmail(dto);
        } catch (error) {
            console.log('--- MAIL ERROR ---', error);
            throw new BadRequestException(
                this.i18nService.translate('email.EMAIL_NOT_SENT'),
            );
        }
    }
}
