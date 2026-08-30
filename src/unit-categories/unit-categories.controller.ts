import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { UnitCategoriesService } from './unit-categories.service';
import { UnitCategoryResponseDto } from './dto/unit-category-response.dto';
import { CreateUnitCategoryDto } from './dto/create-unit-category.dto';
import { UpdateUnitCategoryDto } from './dto/update-unit-category.dto';
import { PaginatedResult } from '../common/data-access';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id.pipe';
import { getAllUnitCategoriesDto } from './dto/get-all-unit-categories.dto';
import { ApiTags } from '@nestjs/swagger';
import { API_TAGS } from '../common/Swagger';
import {
    CreateUnitCategorySwagger,
    DeleteUnitCategorySwagger,
    GetAllUnitCategoriesSwagger,
    GetUnitCategoryByIdSwagger,
    UpdateUnitCategorySwagger,
} from './swagger';
import { Roles } from '../common/constants/roles.constans';
import { AllowRoles } from '../auth/decorators/roles.decorator';

@ApiTags(API_TAGS.UNIT_CATEGORIES)
@Controller('unit-categories')
export class UnitCategoriesController {
    constructor(
        private readonly unitCategoriesService: UnitCategoriesService,
    ) {}

    @CreateUnitCategorySwagger()
    @Post()
    @AllowRoles(Roles.SYSTEM_ADMIN)
    async create(
        @Body() body: CreateUnitCategoryDto,
    ): Promise<UnitCategoryResponseDto> {
        return this.unitCategoriesService.create(body);
    }

    @GetUnitCategoryByIdSwagger()
    @Get('/:id')
    async getUnitCategoryById(
        @Param('id', new ParseMongoIdPipe()) id: string,
    ): Promise<UnitCategoryResponseDto> {
        return this.unitCategoriesService.getCurrencyById(id);
    }

    @Get()
    @GetAllUnitCategoriesSwagger()
    async getAll(
        @Query() query: getAllUnitCategoriesDto,
    ): Promise<PaginatedResult<UnitCategoryResponseDto>> {
        return this.unitCategoriesService.findAll(query);
    }

    @Delete('/:id')
    @DeleteUnitCategorySwagger()
    @AllowRoles(Roles.SYSTEM_ADMIN)
    async deleteUnitCategoryById(
        @Param('id', new ParseMongoIdPipe()) id: string,
    ): Promise<void> {
        return this.unitCategoriesService.deleteById(id);
    }

    @Patch('/:id')
    @UpdateUnitCategorySwagger()
    @AllowRoles(Roles.SYSTEM_ADMIN)
    async update(
        @Param('id', new ParseMongoIdPipe()) id: string,
        @Body() body: UpdateUnitCategoryDto,
    ): Promise<UnitCategoryResponseDto> {
        return this.unitCategoriesService.updateById(id, body);
    }
}
