import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { SendEmailDto } from './dtos/send-email.dto';

@Controller('email-service')
export class EmailServiceController {
    constructor(private readonly emailService: EmailService) {}

    @Public()
    @Post('/send')
    async sendEmail(@Body() dto: SendEmailDto): Promise<void> {
        await this.emailService.sendEmail(dto);
    }
}
