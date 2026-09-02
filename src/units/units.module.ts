import { Module } from '@nestjs/common';
import { UnitsService } from './units.service';
import { UnitsController } from './units.controller';
import { CitiesModule } from '../cities/cities.module';
import { AuthModule } from '../auth/auth.module';
import { CountriesModule } from '../countries/countries.module';
import { UnitCategoriesModule } from '../unit-categories/unit-categories.module';
import { UnitValidationUseCase } from './use-cases/unit-validation.usecase';
import { AppSettingsModule } from '../app-settings/app-settings.module';
import { CreateUnitUseCase } from './use-cases/create-unit.usecase';
import { UnitsRepository } from './repositories/unit.repository';
import { ModelNames } from '../common/data-access/model-names.enum';
import { UnitSchema } from './schemas/units.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    providers: [
        UnitsService,
        UnitValidationUseCase,
        CreateUnitUseCase,
        UnitsRepository,
    ],
    controllers: [UnitsController],
    imports: [
        MongooseModule.forFeature([
            { name: ModelNames.UNITS, schema: UnitSchema },
        ]),
        CitiesModule,
        AuthModule,
        CountriesModule,
        UnitCategoriesModule,
        AppSettingsModule,
    ],
})
export class UnitsModule {}
