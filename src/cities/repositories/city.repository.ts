import { Injectable } from '@nestjs/common';
import { BaseRepository, ModelNames } from '../../common/data-access';
import { City } from '../schemas/city.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CityRepository extends BaseRepository<City> {
    constructor(
        @InjectModel(ModelNames.CITIES)
        private readonly cityModel: Model<City>,
    ) {
        super(cityModel);
    }
}
