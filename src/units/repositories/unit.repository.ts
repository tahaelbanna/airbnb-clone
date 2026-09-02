import { Injectable } from '@nestjs/common';
import { BaseRepository, ModelNames } from '../../common/data-access';
import { Units } from '../schemas/units.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UnitsRepository extends BaseRepository<Units> {
    constructor(
        @InjectModel(ModelNames.UNITS)
        private readonly unitsModel: Model<Units>,
    ) {
        super(unitsModel);
    }
}
