import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EmailAdapterInterface } from '../interfaces/email-adapter.interface';
import { SendEmailDto } from '../dtos/send-email.dto';
import { EnvironmentInterface } from '../../common/configuration/environment.interface';

@Injectable()
export class BrevoEmailAdapter implements EmailAdapterInterface {
    constructor(
        private readonly configService: ConfigService<EnvironmentInterface>,
    ) {}

    async sendEmail(dto: SendEmailDto): Promise<void> {
        const apiKey = this.configService.getOrThrow<string>('brevo.brevoApiKey', {infer: true});
        const senderEmail =
            this.configService.getOrThrow<string>('brevo.brevoSenderEmail', {infer: true});
        const senderName =
            this.configService.getOrThrow<string>('brevo.brevoSenderName', {infer: true});

        const response = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'api-key': apiKey,
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                sender: {
                    name: senderName,
                    email: senderEmail,
                },
                to: [
                    {
                        email: dto.to,
                    },
                ],
                subject: dto.subject,
                textContent: dto.text,
                ...(dto.html && {
                    htmlContent: dto.html,
                }),
            }),
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Brevo API error: ${response.status} ${error}`);
        }
    }
}