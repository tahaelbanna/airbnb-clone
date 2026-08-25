/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { CountryResponseDto } from '../dto/create-country-response.dto';
import { QueryFilter } from 'mongoose';
import { Country } from '../Schemas/country.schema';
import { plainToInstance } from 'class-transformer';
import { CountryRepository } from '../repository/country.repository';
import { PaginatedResult } from '../../common/data-access';
import { GetAllCountriesDto } from '../dto/get-all-countries.dto';
@Injectable()
export class GetAllCountriesUseCase {
    constructor(private readonly countryRepository: CountryRepository) {}
    async execute(
        query: GetAllCountriesDto,
    ): Promise<PaginatedResult<CountryResponseDto>> {
        const matchQuery: QueryFilter<Country> = { isDeleted: { $ne: true } };
        if (query?.country_name)
            matchQuery.name = { $regex: query.country_name, $options: 'i' };
        if (query?.country_code) matchQuery.country_code = query.country_code;
        const result = await this.countryRepository.findPaginated(matchQuery, {
            page: query?.page,
            limit: query?.limit,
            ignoreLimit: query?.ignoreLimit,
        });

        const cleanedData = result.data.map((doc: any) =>
            typeof doc.toObject === 'function' ? doc.toObject() : doc,
        );

        const countries = plainToInstance(CountryResponseDto, cleanedData);

        return new PaginatedResult(
            countries,
            result.totalCount,
            result.page,
            result.limit,
        );
    }
}
