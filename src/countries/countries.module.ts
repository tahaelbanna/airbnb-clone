import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { Country, CountrySchema } from './Schemas/country.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateCountryUseCase } from './use-cases/create-country.usecase';
import { GetCountryUseCase } from './use-cases/get-country.usecase';
import { GetAllCountriesUseCase } from './use-cases/get-all-countries.usecase';
import { SoftDeleteOneCountryUseCase } from './use-cases/delete-country.usecase';
import { UpdateCountryUsecase } from './use-cases/update-country.dto';

@Module({
    providers: [
        CountriesService,
        CreateCountryUseCase,
        GetAllCountriesUseCase,
        GetCountryUseCase,
        SoftDeleteOneCountryUseCase,
        UpdateCountryUsecase,
    ],
    controllers: [CountriesController],
    imports: [
        MongooseModule.forFeature([
            { name: Country.name, schema: CountrySchema },
        ]),
    ],
})
export class CountriesModule {}
