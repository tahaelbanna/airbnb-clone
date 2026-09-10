import { SendEmailDto } from '../dtos/send-email.dto';

export interface EmailAdapterInterface {
    sendEmail(dto: SendEmailDto): Promise<void>;
}
