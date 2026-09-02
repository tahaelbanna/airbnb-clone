import { Injectable } from '@nestjs/common';
import { CreateCityDto } from './dtos/create-city.dto';
import { CityResponseDto } from './dtos/city-response.dto';
import { CreateCityUseCase } from './use-cases/create-city.usecase';
import { GetAllCitiesUseCase } from './use-cases/get-all-cities.usecase';
import { GetCityUseCase } from './use-cases/get-city.usecase';
import { SoftDeleteOneCityUseCase } from './use-cases/delete-city.usecase';
import { UpdateCityUsecase } from './use-cases/update-city.dto';
import { UpdateCityDto } from './dtos/update-city.dto';
import { PaginatedResult } from '../common/data-access';
import { GetAllCitiesDto } from './dtos/get-all-cities.dto';
@Injectable()
export class CitiesService {
    constructor(
        private readonly createCityUseCase: CreateCityUseCase,
        private readonly getAllCitiesUseCase: GetAllCitiesUseCase,
        private readonly getCityUseCase: GetCityUseCase,
        private readonly softDeleteOneCityUseCase: SoftDeleteOneCityUseCase,
        private readonly updateCityUsecase: UpdateCityUsecase,
    ) {}

    async createCity(body: CreateCityDto): Promise<CityResponseDto> {
        return this.createCityUseCase.execute(body);
    }

    async getCityById(id: string): Promise<CityResponseDto> {
        return this.getCityUseCase.execute(id);
    }

    async getAllCities(
        query: GetAllCitiesDto,
    ): Promise<PaginatedResult<CityResponseDto>> {
        return this.getAllCitiesUseCase.execute(query);
    }

    async softDeleteCity(id: string): Promise<void> {
        return this.softDeleteOneCityUseCase.execute(id);
    }

    async updateCity(
        id: string,
        body: UpdateCityDto,
    ): Promise<CityResponseDto> {
        return this.updateCityUsecase.execute(id, body);
    }
}
