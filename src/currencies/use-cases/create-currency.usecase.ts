import { Injectable } from '@nestjs/common';
import { CreateCurrencyDto } from '../dtos/create-currency.dto';
import { CurrencyResponseDto } from '../dtos/currency-response.dto';
import { CurrencyRepository } from '../repositories/currency.repository';
import { BadRequestException } from 'src/common/error-handling/custom-exceptions/bad-request.exception';
import { I18nService } from 'nestjs-i18n';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CreateCurrencyUseCase {
    constructor(
        private readonly currencyRepository: CurrencyRepository,
        private readonly i18nService: I18nService,
    ) {}

    async execute(body: CreateCurrencyDto): Promise<CurrencyResponseDto> {
        const existingCurrency = await this.currencyRepository.findOne({
            currency_name: body.currency_name,
            isDeleted: { $ne: true },
        });

        if (existingCurrency) {
            throw new BadRequestException(
                this.i18nService.translate('currency.CURRENCY_ALREADY_EXISTS'),
            );
        }

        const newCurrency = await this.currencyRepository.create(body);
        return plainToInstance(CurrencyResponseDto, newCurrency.toObject());
    }
}
