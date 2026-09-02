import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class refreshTokenDto {
    @ApiProperty({
        description:
            'Refresh token used to generate new access and refresh tokens',
        example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg4NzQyMDAwLCJleHAiOjE2ODg3NDY4MDB9.abc123def456ghi789jkl012mno345pqr678stu901vwx234yz567890',
    })
    @IsNotEmpty()
    @IsString()
    refreshToken: string;
}
