import { Injectable } from '@nestjs/common';
import { QueryFilter } from 'mongoose';
import { UnitCategoryResponseDto } from '../dto/unit-category-response.dto';
import { plainToInstance } from 'class-transformer';
import { getAllUnitCategoriesDto } from '../dto/get-all-unit-categories.dto';
import { UnitCategoriesRepository } from '../repository/unit-category.repository';
import { PaginatedResult } from '../../common/data-access';
import { UnitCategories } from '../Schemas/unit-category.schema';

@Injectable()
export class GetAllUnitCategoriesUsecase {
    constructor(
        private readonly unitCategoriesRepository: UnitCategoriesRepository,
    ) {}

    async execute(
        query: getAllUnitCategoriesDto,
    ): Promise<PaginatedResult<UnitCategoryResponseDto>> {
        const matchQuery: QueryFilter<UnitCategories> = {
            isDeleted: { $ne: true },
        };
        if (query?.unit_categories_name)
            matchQuery.name = {
                $regex: query.unit_categories_name,
                $options: 'i',
            };

        const result = await this.unitCategoriesRepository.findPaginated(
            matchQuery,
            {
                page: query?.page,
                limit: query?.limit,
                ignoreLimit: query?.ignoreLimit,
                lean: true,
            },
        );

        return plainToInstance(
            PaginatedResult<UnitCategoryResponseDto>,
            result,
        );
    }
}
