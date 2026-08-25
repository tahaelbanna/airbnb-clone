import { Injectable } from '@nestjs/common';
import { CityResponseDto } from '../dto/city-response.dto';
import { QueryFilter } from 'mongoose';
import { City } from '../Schemas/city.schema';
import { plainToInstance } from 'class-transformer';
import { CityRepository } from '../repository/city.repository';
import { PaginatedResult } from '../../common/data-access';
import { GetAllCitiesDto } from '../dto/get-all-cities.dto';

@Injectable()
export class GetAllCitiesUseCase {
    constructor(private readonly cityRepository: CityRepository) {}
    async execute(
        query: GetAllCitiesDto,
    ): Promise<PaginatedResult<CityResponseDto>> {
        const matchQuery: QueryFilter<City> = { isDeleted: { $ne: true } };

        if (query?.city_name)
            matchQuery.city_name = { $regex: query.city_name, $options: 'i' };

        if (query?.country_id) matchQuery.country_id = query.country_id;

        const result = await this.cityRepository.findPaginated(matchQuery, {
            page: query?.page,
            limit: query?.limit,
            ignoreLimit: query?.ignoreLimit,
            populate: [{ path: 'country_id', select: 'country_name' }],
            lean: true,
        });

        return plainToInstance(PaginatedResult<CityResponseDto>, result);
    }
}
