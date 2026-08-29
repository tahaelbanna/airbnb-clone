import { Injectable } from '@nestjs/common';
import { BaseRepository, ModelNames } from '../../common/data-access';
import { Currency } from '../Schemas/currency.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CurrencyRepository extends BaseRepository<Currency> {
    constructor(
        @InjectModel(ModelNames.CURRENCIES)
        private readonly currencyModel: Model<Currency>,
    ) {
        super(currencyModel);
    }
}
