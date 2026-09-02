import { Expose, Type } from 'class-transformer';
import { UserResponseDto } from '../../users/dtos/user-response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterResponseDto {
    @ApiProperty({
        description: 'The user object',
        type: UserResponseDto,
    })
    @Expose()
    @Type(() => UserResponseDto)
    user: UserResponseDto;

    @ApiProperty({
        description: 'The access token',
        example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwiaWF0IjoxNjE3MzQ1NjAwLCJleHAiOjE2MTczNDkxMDAsInN1YiI6IjEifQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    })
    @Expose()
    accessToken: string;

    @ApiProperty({
        description: 'The refresh token',
        example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwiaWF0IjoxNjE3MzQ1NjAwLCJleHAiOjE2MTczNDkxMDAsInN1YiI6IjEifQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    })
    @Expose()
    refreshToken: string;
}
