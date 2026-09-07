import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class CheckAvailabilityDto {
    @IsMongoId()
    unit_id: string;

    @IsNotEmpty()
    check_in: number | Date;

    @IsNotEmpty()
    check_out: number | Date;

    @IsOptional()
    adults_count?: number;

    @IsOptional()
    kids_count?: number;
}
