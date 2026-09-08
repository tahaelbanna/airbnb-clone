import { Module } from '@nestjs/common';
import { UnitFavouritesService } from './unit-favourites.service';
import { UnitFavouritesController } from './unit-favourites.controller';
import { UnitsModule } from 'src/units/units.module';
import { UnitFavouritesRepository } from './repositories/unit-favourites.repository';
import { UnitFavouritesSchema } from './schemas/unit-favourites.schema';
import { ModelNames } from 'src/common/data-access/model-names.enum';
import { MongooseModule } from '@nestjs/mongoose';
import { GetUnitFavoritesUseCase } from './use-cases/get-unit-favourites.usecase';
import { RemoveUnitFavoriteUseCase } from './use-cases/remove-unit-from-favourites.usecase';
import { AddUnitToFavouritesUseCase } from './use-cases/add-unit-to-favourites.usecase';
import { CheckUserUseCase } from './use-cases/check-user.usecase';

@Module({
    providers: [
        UnitFavouritesService,
        UnitFavouritesRepository,
        AddUnitToFavouritesUseCase,
        RemoveUnitFavoriteUseCase,
        GetUnitFavoritesUseCase,
        CheckUserUseCase,
    ],
    controllers: [UnitFavouritesController],
    imports: [
        UnitsModule,
        MongooseModule.forFeature([
            { name: ModelNames.UNIT_FAVOURITES, schema: UnitFavouritesSchema },
        ]),
    ],
})
export class UnitFavouritesModule {}
