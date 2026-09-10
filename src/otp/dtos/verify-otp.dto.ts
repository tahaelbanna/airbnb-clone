import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyOtpDto {
    @ApiProperty({
        description: 'The email address associated with the OTP',
        example: 'user@example.com',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'The OTP code to verify',
        example: '123456',
    })
    @IsNotEmpty()
    @IsString()
    code: string;
}
