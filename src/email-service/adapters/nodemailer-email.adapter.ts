import { Injectable } from '@nestjs/common';
import { EmailAdapterInterface } from '../interfaces/email-adapter.interface';
import { SendEmailDto } from '../dtos/send-email.dto';
import * as nodemailer from 'nodemailer';
import {
    EnvironmentInterface,
    ISMTPConfig,
} from '../../common/configuration/environment.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NodemailerEmailAdapter implements EmailAdapterInterface {
    private readonly transporter: nodemailer.Transporter;

    constructor(
        private readonly configService: ConfigService<EnvironmentInterface>,
    ) {
        const smtp = this.configService.getOrThrow<ISMTPConfig>('smtp');
        this.transporter = nodemailer.createTransport({
            host: smtp.smtpHost,
            port: smtp.smtpPort,
            secure: smtp.smtpSecure,
            auth: smtp.auth?.user && smtp.auth?.pass ? smtp.auth : undefined,
        });
    }

    async sendEmail(dto: SendEmailDto): Promise<void> {
        await this.transporter.sendMail({
            from: dto.from,
            to: dto.to,
            subject: dto.subject,
            text: dto.text,
        });
    }
}
