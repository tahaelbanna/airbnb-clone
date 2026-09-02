import { Injectable } from '@nestjs/common';
import { UpdateUnitCategoryDto } from '../dtos/update-unit-category.dto';
import { UnitCategoryResponseDto } from '../dtos/unit-category-response.dto';
import { BadRequestException } from '../../common/error-handling/custom-exceptions/bad-request.exception';
import { plainToInstance } from 'class-transformer';
import { UnitCategoriesRepository } from '../repositories/unit-category.repository';
import { I18nService } from 'nestjs-i18n/dist/services/i18n.service';

@Injectable()
export class UpdateUnitCategoryUsecase {
    constructor(
        private readonly unitCategoriesRepository: UnitCategoriesRepository,
        private readonly i18nService: I18nService,
    ) {}

    async execute(
        unitCategoryId: string,
        body: UpdateUnitCategoryDto,
    ): Promise<UnitCategoryResponseDto> {
        const unitCategory = await this.unitCategoriesRepository.findOne({
            _id: unitCategoryId,
            isDeleted: { $ne: true },
        });

        if (!unitCategory)
            throw new BadRequestException(
                this.i18nService.translate(
                    'unit-categories.UNIT_CATEGORY_NOT_FOUND',
                ),
            );

        if (body?.unit_categories_name) {
            const existingUnitCategory =
                await this.unitCategoriesRepository.findOne({
                    name: body.unit_categories_name,
                    isDeleted: { $ne: true },
                    _id: { $ne: unitCategoryId },
                });

            if (existingUnitCategory)
                throw new BadRequestException(
                    this.i18nService.translate(
                        'unit-categories.UNIT_CATEGORY_NAME_ALREADY_EXISTS',
                    ),
                );
        }

        const updatedUnitCategory =
            await this.unitCategoriesRepository.findByIdAndUpdate(
                unitCategoryId,
                body,
                {
                    returnDocument: 'after',
                },
            );

        return plainToInstance(
            UnitCategoryResponseDto,
            updatedUnitCategory?.toObject(),
        );
    }
}
