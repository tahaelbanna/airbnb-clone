import { Injectable } from '@nestjs/common';
import { NotFoundException } from '../../common/error-handling/custom-exceptions/not-found.exception';
import { UnitCategoriesRepository } from '../repositories/unit-category.repository';
import { I18nService } from 'nestjs-i18n/dist/services/i18n.service';

@Injectable()
export class SoftDeleteUnitCategoryUsecase {
    constructor(
        private readonly unitCategoriesRepository: UnitCategoriesRepository,
        private readonly i18nService: I18nService,
    ) {}

    async execute(id: string): Promise<void> {
        const existingUnitCategories =
            await this.unitCategoriesRepository.findOne({
                _id: id,
                isDeleted: { $ne: true },
            });

        if (!existingUnitCategories)
            throw new NotFoundException(
                this.i18nService.translate(
                    'unit-categories.UNIT_CATEGORY_NOT_FOUND',
                ),
            );

        await this.unitCategoriesRepository.findByIdAndUpdate(id, {
            isDeleted: true,
            deletedAt: new Date(),
        });
    }
}
