import { Injectable } from '@nestjs/common';
import { UnitReviewsRepository } from '../repositories/unit-reviews.repository';
import { CalculateRatingAvgAndCountDto } from '../dtos/calculate-rating-avg-and-count.dto';
import { ClientSession, Types } from 'mongoose';

@Injectable()
export class CalculateRatingAvgUseCase {
    constructor(
        private readonly unitReviewsRepository: UnitReviewsRepository,
    ) {}
    async execute(
        unitId: string,
        session?: ClientSession,
    ): Promise<CalculateRatingAvgAndCountDto> {
        const result = await this.unitReviewsRepository.aggregate<{
            rating_avg: number;
            rating_count: number;
        }>(
            [
                {
                    $match: {
                        $or: [
                            { unit_id: unitId },
                            { unit_id: new Types.ObjectId(unitId) },
                        ],
                    },
                },
                {
                    $group: {
                        _id: '$unit_id',
                        rating_avg: { $avg: '$rating' },
                        rating_count: { $sum: 1 },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        rating_avg: 1,
                        rating_count: 1,
                    },
                },
            ],
            { session },
        );

        if (result.length === 0) {
            return { rating_avg: 0, rating_count: 0 };
        }

        const { rating_avg, rating_count } = result[0];

        return { rating_avg, rating_count };
    }
}
