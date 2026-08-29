import { Injectable } from '@nestjs/common';
import { CurrencyResponseDto } from '../dto/currency-response.dto';
import { QueryFilter } from 'mongoose';
import { Currency } from '../Schemas/currency.schema';
import { plainToInstance } from 'class-transformer';
import { CurrencyRepository } from '../repository/currency.repository';
import { PaginatedResult } from '../../common/data-access';
import { GetAllCurrenciesDto } from '../dto/get-all-currencies.dto';

@Injectable()
export class GetAllCurrenciesUseCase {
    constructor(private readonly currencyRepository: CurrencyRepository) {}
    async execute(
        query: GetAllCurrenciesDto,
    ): Promise<PaginatedResult<CurrencyResponseDto>> {
        const matchQuery: QueryFilter<Currency> = { isDeleted: { $ne: true } };
        if (query?.currency_name)
            matchQuery.currency_name = {
                $regex: query.currency_name,
                $options: 'i',
            };
        if (query?.currency_code)
            matchQuery.currency_code = query.currency_code;
        const result = await this.currencyRepository.findPaginated(matchQuery, {
            page: query?.page,
            limit: query?.limit,
            ignoreLimit: query?.ignoreLimit,
            lean: true,
        });

        return plainToInstance(PaginatedResult<CurrencyResponseDto>, result);
    }
}
