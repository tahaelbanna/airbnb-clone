import { Injectable } from '@nestjs/common';
import { CurrencyResponseDto } from '../dtos/currency-response.dto';
import { I18nService } from 'nestjs-i18n';
import { plainToInstance } from 'class-transformer';
import { NotFoundException } from 'src/common/error-handling/custom-exceptions/not-found.exception';
import { CurrencyRepository } from '../repositories/currency.repository';
@Injectable()
export class GetCurrencyUseCase {
    constructor(
        private readonly currencyRepository: CurrencyRepository,
        private readonly i18nService: I18nService,
    ) {}

    async execute(id: string): Promise<CurrencyResponseDto> {
        const existingCurrency = await this.currencyRepository.findOne({
            _id: id,
            isDeleted: { $ne: true },
        });

        if (!existingCurrency) {
            throw new NotFoundException(
                this.i18nService.translate('currency.CURRENCY_NOT_FOUND'),
            );
        }
        return plainToInstance(CurrencyResponseDto, existingCurrency);
    }
}
