import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class registerDto {
    @ApiProperty({
        description: 'Name of the user',
        example: 'John Doe',
    })
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Email of the user',
        example: 'john.doe@example.com',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Password of the user',
        example: 'SecurePass123',
    })
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        description: 'Phone number of the user',
        example: '+1234567890',
    })
    @IsNotEmpty()
    phone: string;
}
