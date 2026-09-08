import { Injectable } from '@nestjs/common';
import { BaseRepository, ModelNames } from '../../common/data-access';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UnitFavourites } from '../schemas/unit-favourites.schema';

@Injectable()
export class UnitFavouritesRepository extends BaseRepository<UnitFavourites> {
    constructor(
        @InjectModel(ModelNames.UNIT_FAVOURITES)
        private readonly unitFavoritesModel: Model<UnitFavourites>,
    ) {
        super(unitFavoritesModel);
    }
}
