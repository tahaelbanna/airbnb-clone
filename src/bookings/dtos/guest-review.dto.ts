import {
    IsNotEmpty,
    IsOptional,
    IsString,
    Max,
    MaxLength,
    Min,
    MinLength,
} from 'class-validator';

export class GuestReviewDto {
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
