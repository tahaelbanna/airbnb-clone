import { Injectable } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { CountryResponseDto } from './dto/country-response.dto';
import { CreateCountryUseCase } from './use-cases/create-country.usecase';
import { GetAllCountriesUseCase } from './use-cases/get-all-countries.usecase';
import { GetCountryUseCase } from './use-cases/get-country.usecase';
import { SoftDeleteOneCountryUseCase } from './use-cases/delete-country.usecase';
import { UpdateCountryUsecase } from './use-cases/update-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { PaginatedResult } from '../common/data-access';
import { GetAllCountriesDto } from './dto/get-all-countries.dto';
@Injectable()
export class CountriesService {
    constructor(
        private readonly createCountryUseCase: CreateCountryUseCase,
        private readonly getAllCountriesUseCase: GetAllCountriesUseCase,
        private readonly getCountryUseCase: GetCountryUseCase,
        private readonly softDeleteOneCountryUseCase: SoftDeleteOneCountryUseCase,
        private readonly updateCountryUsecase: UpdateCountryUsecase,
    ) {}

    async createCountry(body: CreateCountryDto): Promise<CountryResponseDto> {
        return this.createCountryUseCase.execute(body);
    }

    async getCountryById(id: string): Promise<CountryResponseDto> {
        return this.getCountryUseCase.execute(id);
    }

    async getAllCountries(
        query: GetAllCountriesDto,
    ): Promise<PaginatedResult<CountryResponseDto>> {
        return this.getAllCountriesUseCase.execute(query);
    }

    async softDeleteCountry(id: string): Promise<void> {
        return this.softDeleteOneCountryUseCase.execute(id);
    }

    async updateCountry(
        id: string,
        body: UpdateCountryDto,
    ): Promise<CountryResponseDto> {
        return this.updateCountryUsecase.execute(id, body);
    }
}
