import { Injectable } from '@nestjs/common';
import { CreateUnitCategoryDto } from '../dto/create-unit-category.dto';
import { UnitCategoryResponseDto } from '../dto/unit-category-response.dto';
import { BadRequestException } from '../../common/error-handling/custom-exceptions/bad-request.exception';
import { plainToInstance } from 'class-transformer';
import { UnitCategoriesRepository } from '../repository/unit-category.repository';
import { I18nService } from 'nestjs-i18n/dist/services/i18n.service';

@Injectable()
export class CreateUnitCategoryUsecase {
    constructor(
        private readonly unitCategoriesRepository: UnitCategoriesRepository,
        private readonly i18nService: I18nService,
    ) {}

    async execute(
        body: CreateUnitCategoryDto,
    ): Promise<UnitCategoryResponseDto> {
        const existingUnitCategory =
            await this.unitCategoriesRepository.findOne({
                name: body.unit_categories_name,
                isDeleted: { $ne: true },
            });

        if (existingUnitCategory)
            throw new BadRequestException(
                this.i18nService.translate(
                    'unit-categories.UNIT_CATEGORY_ALREADY_EXISTS',
                ),
            );

        const createdUnitCategory =
            await this.unitCategoriesRepository.create(body);
        return plainToInstance(
            UnitCategoryResponseDto,
            createdUnitCategory.toObject(),
        );
    }
}
