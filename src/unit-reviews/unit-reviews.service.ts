import { Injectable } from '@nestjs/common';
import { CreateUnitReviewUseCase } from './use-cases/create-unit-review.usecase';
import { CreateUnitReviewDto } from './dtos/create-unit-review.dto';
import { CalculateRatingAvgUseCase } from './use-cases/calculate-rating-avg.usecase';
import { CalculateRatingAvgAndCountDto } from './dtos/calculate-rating-avg-and-count.dto';
import { ClientSession } from 'mongoose';

@Injectable()
export class UnitReviewsService {
    constructor(
        private readonly createUnitReviewUseCase: CreateUnitReviewUseCase,
        private readonly calculateRatingAvgUseCase: CalculateRatingAvgUseCase,
    ) {}

    async createUnitReview(
        body: CreateUnitReviewDto,
        session?: ClientSession,
    ): Promise<void> {
        await this.createUnitReviewUseCase.execute(body, session);
    }

    async calculateRatingAvg(
        unitId: string,
        session?: ClientSession,
    ): Promise<CalculateRatingAvgAndCountDto> {
        return this.calculateRatingAvgUseCase.execute(unitId, session);
    }
}
