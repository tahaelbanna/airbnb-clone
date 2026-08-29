import { Expose, Exclude } from 'class-transformer';
export class SystemAdminResponseDto {
    @Expose()
    _id: string;

    @Expose()
    name: string;

    @Expose()
    email: string;

    @Expose()
    password: string;

    @Expose()
    isSuperAdmin: boolean;

    @Exclude()
    _v: number;
}
