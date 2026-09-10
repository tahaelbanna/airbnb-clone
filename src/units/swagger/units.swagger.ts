import { applyDecorators } from '@nestjs/common';
import {
    ApiBody,
    ApiConsumes,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiResponse,
} from '@nestjs/swagger';
import { CreateUnitDto } from '../dtos/create-unit.dto';
import { UpdateUnitDto } from '../dtos/update-unit.dto';
import { GetAllUnitsDto } from '../dtos/get-all.usecase.dto';
import { DeleteUnitPhotosDto } from '../dtos/delete-unit-photos.dto';
import { PaginationDto } from '../../common/dtos/pagination.dto';
import { UnitResponseDto } from '../dtos/unit-response.dto';
const basic = (summary: string, ...decorators: MethodDecorator[]) =>
    applyDecorators(
        ApiOperation({ summary }),
        ...decorators,
        ApiResponse({ status: 200, type: UnitResponseDto }),
    );
export const CreateUnitSwagger = () =>
    applyDecorators(
        ApiOperation({ summary: 'Create a unit' }),
        ApiConsumes('multipart/form-data'),
        ApiBody({ type: CreateUnitDto }),
        ApiResponse({ status: 201, type: UnitResponseDto }),
    );
export const UpdateUnitSwagger = () =>
    basic(
        'Update a unit',
        ApiParam({ name: 'id' }),
        ApiBody({ type: UpdateUnitDto }),
    );
export const GetAllUnitsSwagger = () =>
    applyDecorators(
        ApiOperation({ summary: 'Get all units' }),
        ApiQuery({ type: GetAllUnitsDto }),
        ApiResponse({ status: 200 }),
    );
export const GetAllByUserSwagger = () =>
    applyDecorators(
        ApiOperation({ summary: 'Get units by current user' }),
        ApiQuery({ type: GetAllUnitsDto }),
        ApiResponse({ status: 200 }),
    );
export const GetUnitByIdSwagger = () =>
    basic('Get unit by ID', ApiParam({ name: 'id' }));
export const SoftDeleteUnitSwagger = () =>
    basic('Soft-delete a unit', ApiParam({ name: 'id' }));
export const DeactivateUnitSwagger = () =>
    basic('Deactivate a unit', ApiParam({ name: 'id' }));
export const ActivateUnitSwagger = () =>
    basic('Activate a unit', ApiParam({ name: 'id' }));
export const DeleteUnitPhotosSwagger = () =>
    applyDecorators(
        ApiOperation({ summary: 'Delete unit photos' }),
        ApiParam({ name: 'id' }),
        ApiBody({ type: DeleteUnitPhotosDto }),
        ApiResponse({ status: 200 }),
    );
export const UpdateUnitPhotosSwagger = () =>
    applyDecorators(
        ApiOperation({ summary: 'Update unit photos' }),
        ApiParam({ name: 'id' }),
        ApiConsumes('multipart/form-data'),
        ApiResponse({ status: 200, type: UnitResponseDto }),
    );
export const GetUnitReviewsSwagger = () =>
    applyDecorators(
        ApiOperation({ summary: 'Get unit reviews' }),
        ApiParam({ name: 'id' }),
        ApiQuery({ type: PaginationDto }),
        ApiResponse({ status: 200 }),
    );
