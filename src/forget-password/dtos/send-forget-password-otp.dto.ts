import { IsEmail, IsNotEmpty } from 'class-validator';

export class SendForgetPasswordOtpDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;
}
