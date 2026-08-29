import { Module } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CurrenciesController } from './currencies.controller';
import { CurrencySchema } from './Schemas/currency.schema';
import { CurrencyRepository } from './repository/currency.repository';
import { CreateCurrencyUseCase } from './use-cases/create-currency.usecase';
import { GetCurrencyUseCase } from './use-cases/get-currency.usecase';
import { GetAllCurrenciesUseCase } from './use-cases/get-all-currencies.usecase';
import { SoftDeleteOneCurrencyUseCase } from './use-cases/delete-currency.usecase';
import { UpdateCurrencyUsecase } from './use-cases/update-currency.dto';
import { ModelNames } from '../common/data-access';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    providers: [
        CurrenciesService,
        CreateCurrencyUseCase,
        CurrencyRepository,
        GetAllCurrenciesUseCase,
        GetCurrencyUseCase,
        SoftDeleteOneCurrencyUseCase,
        UpdateCurrencyUsecase,
    ],
    controllers: [CurrenciesController],
    imports: [
        MongooseModule.forFeature([
            { name: ModelNames.CURRENCIES, schema: CurrencySchema },
        ]),
    ],
    exports: [CurrenciesService],
})
export class CurrenciesModule {}
