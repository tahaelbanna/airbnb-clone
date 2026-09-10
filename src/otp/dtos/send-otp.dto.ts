import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendOtpDto {
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({
        description: 'The email address to send the OTP to',
        example: 'user@example.com',
    })
    email: string;
}
