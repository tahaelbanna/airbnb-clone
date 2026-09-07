import {
    IsNotEmpty,
    IsOptional,
    IsString,
    Max,
    MaxLength,
    Min,
    MinLength,
    IsMongoId,
} from 'class-validator';

export class CreateUnitReviewDto {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    booking_id: string;

    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    unit_id: string;

    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    guest_id: string;

    @IsNotEmpty()
    @Min(1)
    @Max(5)
    rating: number;

    @IsOptional()
    @IsString()
    @MinLength(5)
    @MaxLength(1000)
    comment: string;
}
