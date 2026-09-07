import { Module } from '@nestjs/common';
import { UnitReviewsService } from './unit-reviews.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelNames } from '../common/data-access';
import { UnitReviewsSchema } from './schemas/unit-reviews.schema';
import { UnitReviewsRepository } from './repositories/unit-reviews.repository';
import { CreateUnitReviewUseCase } from './use-cases/create-unit-review.usecase';
import { CalculateRatingAvgUseCase } from './use-cases/calculate-rating-avg.usecase';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: ModelNames.UNIT_REVIEWS, schema: UnitReviewsSchema },
        ]),
    ],
    providers: [
        UnitReviewsService,
        UnitReviewsRepository,
        CreateUnitReviewUseCase,
        CalculateRatingAvgUseCase,
    ],
    exports: [UnitReviewsService],
})
export class UnitReviewsModule {}
