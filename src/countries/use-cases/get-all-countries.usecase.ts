import { Injectable } from '@nestjs/common';
import { CountryResponseDto } from '../dtos/country-response.dto';
import { QueryFilter } from 'mongoose';
import { Country } from '../schemas/country.schema';
import { plainToInstance } from 'class-transformer';
import { CountryRepository } from '../repositories/country.repository';
import { PaginatedResult } from '../../common/data-access';
import { GetAllCountriesDto } from '../dtos/get-all-countries.dto';
@Injectable()
export class GetAllCountriesUseCase {
    constructor(private readonly countryRepository: CountryRepository) {}
    async execute(
        query: GetAllCountriesDto,
    ): Promise<PaginatedResult<CountryResponseDto>> {
        const matchQuery: QueryFilter<Country> = { isDeleted: { $ne: true } };
        if (query?.country_name)
            matchQuery.country_name = {
                $regex: query.country_name,
                $options: 'i',
            };
        if (query?.country_code) matchQuery.country_code = query.country_code;
        const result = await this.countryRepository.findPaginated(matchQuery, {
            page: query?.page,
            limit: query?.limit,
            ignoreLimit: query?.ignoreLimit,
            lean: true,
        });

        return plainToInstance(PaginatedResult<CountryResponseDto>, result);
    }
}
