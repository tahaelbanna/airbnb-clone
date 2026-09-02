import { Injectable } from '@nestjs/common';
import { UnitResponseDto } from '../dtos/unit-response.dto';
import { QueryFilter } from 'mongoose';
import { Units } from '../schemas/units.schema';
import { plainToInstance } from 'class-transformer';
import { UnitsRepository } from '../repositories/unit.repository';
import { PaginatedResult } from '../../common/data-access';
import { GetAllUnitsDto } from '../dtos/get-all.usecase.dto';

@Injectable()
export class GetAllUnitsUseCase {
    constructor(private readonly unitsRepository: UnitsRepository) {}
    async execute(
        query: GetAllUnitsDto,
    ): Promise<PaginatedResult<UnitResponseDto>> {
        const matchQuery: QueryFilter<Units> = { isDeleted: { $ne: true } };
        if (query?.unit_title)
            matchQuery.unit_title = {
                $regex: query.unit_title,
                $options: 'i',
            };

        if (query?.unit_country_id)
            matchQuery.unit_country_id = query.unit_country_id;

        if (query?.unit_city_id) matchQuery.unit_city_id = query.unit_city_id;

        const result = await this.unitsRepository.findPaginated(matchQuery, {
            page: query?.page,
            limit: query?.limit,
            ignoreLimit: query?.ignoreLimit,
            lean: true,
        });

        return plainToInstance(PaginatedResult<UnitResponseDto>, result);
    }
}
