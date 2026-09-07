import { IsNotEmpty } from 'class-validator';

export class UpdateUnitAvgRateAndCountDto {
    @IsNotEmpty()
    unit_id: string;

    @IsNotEmpty()
    unit_reviews_count: number;

    @IsNotEmpty()
    unit_avg_rate: number;
}
