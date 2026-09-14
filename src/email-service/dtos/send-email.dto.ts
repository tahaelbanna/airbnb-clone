import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendEmailDto {
    @ApiProperty({
        description: 'The email address of the recipient',
        example: 'user@example.com',
    })
    @IsString()
    @IsEmail()
    to: string;

    @ApiProperty({
        description: 'The subject of the email',
        example: 'Welcome to our service',
    })
    @IsString()
    subject: string;

    @ApiProperty({
        description: 'The text content of the email',
        example: 'Thank you for joining our community!',
    })
    @IsString()
    text: string;

    @ApiProperty({
        description: 'The HTML content of the email',
        example: '<h1>Welcome</h1><p>Thank you for joining!</p>',
        required: false,
    })
    @IsString()
    @IsOptional()
    html?: string;
}
