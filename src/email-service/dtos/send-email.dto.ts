import { IsEmail, IsString } from 'class-validator';

export class SendEmailDto {
    @IsString()
    @IsEmail()
    from: string;

    @IsString()
    @IsEmail()
    to: string;

    @IsString()
    subject: string;

    @IsString()
    text: string;
}
