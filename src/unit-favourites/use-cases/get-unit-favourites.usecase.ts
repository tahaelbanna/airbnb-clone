import { Injectable } from '@nestjs/common';
import { UnitFavouritesRepository } from '../repositories/unit-favourites.repository';
import { CurrentUserData } from '../../auth/interfaces/principal.interface';
import { GetUnitFavouritesDto } from '../dtos/get-unit-favourites.dto';
import { PipelineStage } from 'mongoose';
import { ModelNames, PaginatedResult } from '../../common/data-access';
import { UnitFavouritesResponseDto } from '../dtos/unit-favourites-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class GetUnitFavoritesUseCase {
    constructor(
        private readonly unitFavouritesRepository: UnitFavouritesRepository,
    ) {}

    async execute(
        query: GetUnitFavouritesDto,
        currentUser: CurrentUserData,
    ): Promise<PaginatedResult<UnitFavouritesResponseDto>> {
        const pipeline: PipelineStage[] = [
            {
                $match: {
                    user_id: currentUser._id.toString(),
                },
            },
            { $sort: { createdAt: -1 } },
            {
                $addFields: {
                    unitObjectId: { $toObjectId: '$unit_id' },
                },
            },
            {
                $lookup: {
                    from: ModelNames.UNITS,
                    localField: 'unitObjectId',
                    foreignField: '_id',
                    as: 'unit',
                },
            },
            { $unwind: '$unit' },
            { $replaceRoot: { newRoot: '$unit' } },
            {
                $match: {
                    isDeleted: { $ne: true },
                    isActive: { $ne: false },
                },
            },
            {
                $project: {
                    _id: 1,
                    unit_title: 1,
                    unit_cost_per_night: 1,
                    unit_photos: 1,
                },
            },
        ];
        const result =
            await this.unitFavouritesRepository.paginatedAggregation<UnitFavouritesResponseDto>(
                pipeline,
                {
                    page: query?.page,
                    limit: query?.limit,
                    ignoreLimit: query?.ignoreLimit,
                },
            );
        return plainToInstance(
            PaginatedResult<UnitFavouritesResponseDto>,
            result,
        );
    }
}
