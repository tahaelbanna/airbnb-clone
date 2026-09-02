import { Injectable } from '@nestjs/common';
import { BaseRepository, ModelNames } from '../../common/data-access';
import { UnitCategories } from '../schemas/unit-category.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UnitCategoriesRepository extends BaseRepository<UnitCategories> {
    constructor(
        @InjectModel(ModelNames.UNIT_CATEGORIES)
        private readonly unitCategoriesModel: Model<UnitCategories>,
    ) {
        super(unitCategoriesModel);
    }
}
