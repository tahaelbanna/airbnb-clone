import { Module } from '@nestjs/common';
import { UnitCategoriesController } from './unit-categories.controller';
import { UnitCategoriesService } from './unit-categories.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UnitCategoriesSchema } from './schemas/unit-category.schema';
import { CreateUnitCategoryUsecase } from './use-cases/create-unit-category.usecase';
import { GetUnitCategoryByIdUsecase } from './use-cases/get-unit-category.usecase';
import { GetAllUnitCategoriesUsecase } from './use-cases/get-all-unit-categories.usecase';
import { SoftDeleteUnitCategoryUsecase } from './use-cases/delete-unit-category.usecase';
import { UpdateUnitCategoryUsecase } from './use-cases/update-unit-category.dto';
import { ModelNames } from '../common/data-access';
import { UnitCategoriesRepository } from './repositories/unit-category.repository';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: ModelNames.UNIT_CATEGORIES, schema: UnitCategoriesSchema },
        ]),
    ],
    controllers: [UnitCategoriesController],
    providers: [
        UnitCategoriesService,
        CreateUnitCategoryUsecase,
        GetUnitCategoryByIdUsecase,
        GetAllUnitCategoriesUsecase,
        SoftDeleteUnitCategoryUsecase,
        UpdateUnitCategoryUsecase,
        UnitCategoriesRepository,
    ],
    exports: [UnitCategoriesService],
})
export class UnitCategoriesModule {}
