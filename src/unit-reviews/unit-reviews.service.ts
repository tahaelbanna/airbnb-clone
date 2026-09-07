import { Injectable } from '@nestjs/common';
import { CreateUnitReviewUseCase } from './use-cases/create-unit-review.usecase';
import { CreateUnitReviewDto } from './dtos/create-unit-review.dto';
import { CalculateRatingAvgUseCase } from './use-cases/calculate-rating-avg.usecase';
import { CalculateRatingAvgAndCountDto } from './dtos/calculate-rating-avg-and-count.dto';
import { ClientSession } from 'mongoose';
import { GetUnitReviewsUseCase } from './use-cases/get-unit-reviews.usecase';
import { GetUnitReviewResponseDto } from './dtos/get-unit-reviews-response.dto';
import { PaginatedResult } from 'src/common/data-access/base-repository';
import { GetUnitReviewDto } from './dtos/get-unit-reviews.dto';

@Injectable()
export class UnitReviewsService {
    constructor(
        private readonly createUnitReviewUseCase: CreateUnitReviewUseCase,
        private readonly calculateRatingAvgUseCase: CalculateRatingAvgUseCase,
        private readonly getUnitReviewsUseCase: GetUnitReviewsUseCase,
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

    async getUnitReviews(
        query: GetUnitReviewDto,
    ): Promise<PaginatedResult<GetUnitReviewResponseDto>> {
        return this.getUnitReviewsUseCase.execute(query);
    }
}
