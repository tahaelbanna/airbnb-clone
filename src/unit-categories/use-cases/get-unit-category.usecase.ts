import { Injectable } from '@nestjs/common';
import { UnitCategoryResponseDto } from '../dto/unit-category-response.dto';
import { NotFoundException } from '../../common/error-handling/custom-exceptions/not-found.exception';
import { plainToInstance } from 'class-transformer';
import { UnitCategoriesRepository } from '../repository/unit-category.repository';
import { I18nService } from 'nestjs-i18n/dist/services/i18n.service';

@Injectable()
export class GetUnitCategoryByIdUsecase {
    constructor(
        private readonly unitCategoriesRepository: UnitCategoriesRepository,
        private readonly i18nService: I18nService,
    ) {}

    async execute(id: string): Promise<UnitCategoryResponseDto> {
        const unitCategory = await this.unitCategoriesRepository.findOne({
            _id: id,
            isDeleted: { $ne: true },
        });
        if (!unitCategory)
            throw new NotFoundException(
                this.i18nService.translate(
                    'unit-categories.UNIT_CATEGORY_NOT_FOUND',
                ),
            );

        return plainToInstance(
            UnitCategoryResponseDto,
            unitCategory.toObject(),
        );
    }
}
