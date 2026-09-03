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
import { CheckUnitOwnerUseCase } from './use-cases/check-unit-owner.usecase';
import { GetUnitUseCase } from './use-cases/get-unit.usecase';
import { UpdateUnitUseCase } from './use-cases/update-unit.usecase';
import { GetUnitByIdUseCase } from './use-cases/git-unit-by-id.usecase';
import { GetAllUnitsUseCase } from './use-cases/get-all-units.usecase';
import { GetAllUnitsByUserUseCase } from './use-cases/get-all-by-user.usecase';
import { SoftDeleteOneUnitUseCase } from './use-cases/delete-unit.usecase';
import { DeActivateUnitUseCase } from './use-cases/de-activate.usecase';
import { ActivateUnitUseCase } from './use-cases/activate-unit.usecase';
import { FilesUploadModule } from 'src/files-upload/files-upload.module';
import { DeleteUnitPhotosUseCase } from './use-cases/delete-unit-photos.usecase';

@Module({
    providers: [
        UnitsService,
        UnitValidationUseCase,
        CreateUnitUseCase,
        UnitsRepository,
        CheckUnitOwnerUseCase,
        GetUnitUseCase,
        UpdateUnitUseCase,
        GetUnitByIdUseCase,
        GetAllUnitsUseCase,
        GetAllUnitsByUserUseCase,
        SoftDeleteOneUnitUseCase,
        ActivateUnitUseCase,
        DeActivateUnitUseCase,
        DeleteUnitPhotosUseCase,
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
        FilesUploadModule,
    ],
})
export class UnitsModule {}
