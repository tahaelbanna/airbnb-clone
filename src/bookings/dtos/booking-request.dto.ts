import {
    IsString,
    IsMongoId,
    IsNumber,
    IsOptional,
    IsNotEmpty,
} from 'class-validator';

export class BookingRequestDto {
    @IsMongoId()
    unit_id: string;

    @IsNotEmpty()
    check_in: number | Date;

    @IsNotEmpty()
    check_out: number | Date;

    @IsNumber()
    @IsOptional()
    adults_count?: number;

    @IsNumber()
    @IsOptional()
    kids_count?: number;

    @IsString()
    @IsOptional()
    notes?: string;
}
