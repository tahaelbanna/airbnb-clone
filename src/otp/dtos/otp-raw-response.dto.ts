import { ApiProperty } from '@nestjs/swagger';

export class OtpRawResponseDto {
    @ApiProperty({
        description: 'The OTP code sent to the user',
        example: '123456',
    })
    code: string;

    @ApiProperty({
        description: 'The date and time when the OTP expires',
        example: '2023-10-10T12:00:00.000Z',
    })
    expiresAt: Date;

    @ApiProperty({
        description: 'Indicates if the OTP has been verified',
        example: false,
    })
    isVerified: boolean;
}
