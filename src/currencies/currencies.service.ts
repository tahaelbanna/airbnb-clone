import { Injectable } from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { CurrencyResponseDto } from './dto/currency-response.dto';
import { GetAllCurrenciesDto } from './dto/get-all-currencies.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { CreateCurrencyUseCase } from './use-cases/create-currency.usecase';
import { GetAllCurrenciesUseCase } from './use-cases/get-all-currencies.usecase';
import { GetCurrencyUseCase } from './use-cases/get-currency.usecase';
import { SoftDeleteOneCurrencyUseCase } from './use-cases/delete-currency.usecase';
import { UpdateCurrencyUsecase } from './use-cases/update-currency.dto';
import { PaginatedResult } from '../common/data-access';
@Injectable()
export class CurrenciesService {
    constructor(
        private readonly createCurrencyUseCase: CreateCurrencyUseCase,
        private readonly getAllCurrenciesUseCase: GetAllCurrenciesUseCase,
        private readonly getCurrencyUseCase: GetCurrencyUseCase,
        private readonly softDeleteOneCurrencyUseCase: SoftDeleteOneCurrencyUseCase,
        private readonly updateCurrencyUsecase: UpdateCurrencyUsecase,
    ) {}

    async createCurrency(
        body: CreateCurrencyDto,
    ): Promise<CurrencyResponseDto> {
        return this.createCurrencyUseCase.execute(body);
    }

    async getCurrencyById(id: string): Promise<CurrencyResponseDto> {
        return this.getCurrencyUseCase.execute(id);
    }

    async getAllCurrencies(
        query: GetAllCurrenciesDto,
    ): Promise<PaginatedResult<CurrencyResponseDto>> {
        return this.getAllCurrenciesUseCase.execute(query);
    }

    async softDeleteCurrency(id: string): Promise<void> {
        return this.softDeleteOneCurrencyUseCase.execute(id);
    }

    async updateCurrency(
        id: string,
        body: UpdateCurrencyDto,
    ): Promise<CurrencyResponseDto> {
        return this.updateCurrencyUsecase.execute(id, body);
    }
}
