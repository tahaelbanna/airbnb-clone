import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { CitySchema } from './schemas/city.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateCityUseCase } from './use-cases/create-city.usecase';
import { GetCityUseCase } from './use-cases/get-city.usecase';
import { GetAllCitiesUseCase } from './use-cases/get-all-cities.usecase';
import { SoftDeleteOneCityUseCase } from './use-cases/delete-city.usecase';
import { UpdateCityUsecase } from './use-cases/update-city.dto';
import { ModelNames } from '../common/data-access';
import { CityRepository } from './repositories/city.repository';
import { CountriesModule } from 'src/countries/countries.module';

@Module({
    providers: [
        CitiesService,
        CreateCityUseCase,
        CityRepository,
        GetAllCitiesUseCase,
        GetCityUseCase,
        SoftDeleteOneCityUseCase,
        UpdateCityUsecase,
    ],
    controllers: [CitiesController],
    imports: [
        MongooseModule.forFeature([
            { name: ModelNames.CITIES, schema: CitySchema },
        ]),
        CountriesModule,
    ],
    exports: [CitiesService],
})
export class CitiesModule {}
