import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class UserResponseDto {
    @ApiProperty({
        description: 'The unique identifier of the user',
        example: '64b8f9e2c3a4f5d6e7f8g9h0',
    })
    @Expose()
    _id: string;

    @ApiProperty({
        description: 'The name of the user',
        example: 'John Doe',
    })
    @Expose()
    name: string;

    @ApiProperty({
        description: 'The email address of the user',
        example: 'john.doe@example.com',
    })
    @Expose()
    email: string;

    @ApiProperty({
        description: 'The phone number of the user',
        example: '+1 (555) 123-4567',
    })
    @Expose()
    phoneNumber: string;

    @Expose()
    password: string;

    @Exclude()
    __v: number;
}
