import { Injectable } from '@nestjs/common';
import { CreateUnitCategoryUsecase } from './use-cases/create-unit-category.usecase';
import { CreateUnitCategoryDto } from './dtos/create-unit-category.dto';
import { UnitCategoryResponseDto } from './dtos/unit-category-response.dto';
import { GetUnitCategoryByIdUsecase } from './use-cases/get-unit-category.usecase';
import { GetAllUnitCategoriesUsecase } from './use-cases/get-all-unit-categories.usecase';
import { SoftDeleteUnitCategoryUsecase } from './use-cases/delete-unit-category.usecase';
import { UpdateUnitCategoryUsecase } from './use-cases/update-unit-category.dto';
import { UpdateUnitCategoryDto } from './dtos/update-unit-category.dto';
import { getAllUnitCategoriesDto } from './dtos/get-all-unit-categories.dto';
import { PaginatedResult } from '../common/data-access';

@Injectable()
export class UnitCategoriesService {
    constructor(
        private readonly createUnitCategoryUsecase: CreateUnitCategoryUsecase,
        private readonly getUnitCategoryByIdUsecase: GetUnitCategoryByIdUsecase,
        private readonly getAllUnitCategoriesUsecase: GetAllUnitCategoriesUsecase,
        private readonly softDeleteUnitCategoryUsecase: SoftDeleteUnitCategoryUsecase,
        private readonly updateUnitCategoryUsecase: UpdateUnitCategoryUsecase,
    ) {}

    async create(
        body: CreateUnitCategoryDto,
    ): Promise<UnitCategoryResponseDto> {
        return this.createUnitCategoryUsecase.execute(body);
    }

    async getUnitCategoryById(id: string): Promise<UnitCategoryResponseDto> {
        return this.getUnitCategoryByIdUsecase.execute(id);
    }

    async findAll(
        query: getAllUnitCategoriesDto,
    ): Promise<PaginatedResult<UnitCategoryResponseDto>> {
        return this.getAllUnitCategoriesUsecase.execute(query);
    }

    async deleteById(id: string): Promise<void> {
        return this.softDeleteUnitCategoryUsecase.execute(id);
    }

    async updateById(
        id: string,
        body: UpdateUnitCategoryDto,
    ): Promise<UnitCategoryResponseDto> {
        return this.updateUnitCategoryUsecase.execute(id, body);
    }
}
