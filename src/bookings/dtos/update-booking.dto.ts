import { IsOptional, IsString } from 'class-validator';

export class UpdateBookingRequestDto {
    @IsOptional()
    check_in?: number | Date;

    @IsOptional()
    check_out?: number | Date;

    @IsOptional()
    adults_count?: number;

    @IsOptional()
    kids_count?: number;

    @IsOptional()
    @IsString()
    notes?: string;
}
