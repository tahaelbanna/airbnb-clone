import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { Roles } from 'src/common/constants/roles.constans';

export class loginDto {
    @ApiProperty({
        description: 'Email address of the user',
        example: 'user@example.com',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Password of the user',
        example: 'password123',
    })
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        type: 'string',
        enum: Roles,
        description: 'actor role',
        example: Roles.USER,
    })
    @IsNotEmpty()
    @IsEnum(Roles)
    role: Roles;
}
