import { Expose, Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SystemAdminResponseDto {
    @ApiProperty({
        description: 'System admin ID',
        example: '60d21b4967d0d8992e610c85',
    })
    @Expose()
    _id: string;

    @ApiProperty({ description: 'System admin name', example: 'Super Admin' })
    @Expose()
    name: string;

    @ApiProperty({
        description: 'System admin email',
        example: 'admin@example.com',
    })
    @Expose()
    email: string;

    @ApiProperty({
        description: 'System admin password (hashed)',
        example: '$2b$10$...',
    })
    @Expose()
    password: string;

    @ApiProperty({
        description: 'Whether this admin has super admin privileges',
        example: true,
    })
    @Expose()
    isSuperAdmin: boolean;

    @Exclude()
    _v: number;
}
