import { Injectable } from '@nestjs/common';
import { BaseRepository, ModelNames } from '../../common/data-access';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UnitReviews } from '../schemas/unit-reviews.schema';

@Injectable()
export class UnitReviewsRepository extends BaseRepository<UnitReviews> {
    constructor(
        @InjectModel(ModelNames.UNIT_REVIEWS)
        private readonly unitReviewsModel: Model<UnitReviews>,
    ) {
        super(unitReviewsModel);
    }
}
