import { Injectable } from '@nestjs/common';
import { UnitReviewsRepository } from '../repositories/unit-reviews.repository';
import { GetUnitReviewDto } from '../dtos/get-unit-reviews.dto';
import { GetUnitReviewResponseDto } from '../dtos//get-unit-reviews-response.dto';
import { PaginatedResult } from 'src/common/data-access/base-repository';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class GetUnitReviewsUseCase {
    constructor(
        private readonly unitReviewsRepository: UnitReviewsRepository,
    ) {}

    async execute(
        query: GetUnitReviewDto,
    ): Promise<PaginatedResult<GetUnitReviewResponseDto>> {
        const result = await this.unitReviewsRepository.findPaginated(
            {
                unit_id: query.unit_id,
            },
            {
                page: query?.page,
                limit: query?.limit,
                ignoreLimit: query?.ignoreLimit,
                lean: true,

                populate: [{ path: 'guest', select: 'name' }],
            },
        );
        const transformedData = plainToInstance(
            GetUnitReviewResponseDto,
            result.data,
            {
                excludeExtraneousValues: true,
            },
        );

        return new PaginatedResult<GetUnitReviewResponseDto>(
            transformedData,
            result.pageCount,
            result.limit,
            result.totalCount,
        );
    }
}
