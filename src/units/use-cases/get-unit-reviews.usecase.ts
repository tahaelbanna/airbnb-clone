import { Injectable } from '@nestjs/common';
import { PaginatedResult } from '../../common/data-access';
import { UnitReviewsService } from '../../unit-reviews/unit-reviews.service';
import { PaginationDto } from '../../common/dtos/pagination.dto';
import { plainToInstance } from 'class-transformer';
import { GetUnitReviewResponseDto } from '../dtos/get-unit-reviews-response.dto';
@Injectable()
export class GetUnitReviewsUsecase {
    constructor(private readonly unitReviewsService: UnitReviewsService) {}

    async execute(
        unitId: string,
        query: PaginationDto,
    ): Promise<PaginatedResult<GetUnitReviewResponseDto>> {
        const result = await this.unitReviewsService.getUnitReviews({
            unit_id: unitId,
            ...query,
        });
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
