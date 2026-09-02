import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { CountrySchema } from './schemas/country.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateCountryUseCase } from './use-cases/create-country.usecase';
import { GetCountryUseCase } from './use-cases/get-country.usecase';
import { GetAllCountriesUseCase } from './use-cases/get-all-countries.usecase';
import { SoftDeleteOneCountryUseCase } from './use-cases/delete-country.usecase';
import { UpdateCountryUsecase } from './use-cases/update-country.dto';
import { ModelNames } from '../common/data-access';
import { CountryRepository } from './repositories/country.repository';

@Module({
    providers: [
        CountriesService,
        CreateCountryUseCase,
        CountryRepository,
        GetAllCountriesUseCase,
        GetCountryUseCase,
        SoftDeleteOneCountryUseCase,
        UpdateCountryUsecase,
    ],
    controllers: [CountriesController],
    imports: [
        MongooseModule.forFeature([
            { name: ModelNames.COUNTRIES, schema: CountrySchema },
        ]),
    ],
    exports: [CountriesService],
})
export class CountriesModule {}
