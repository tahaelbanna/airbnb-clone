import { Injectable } from '@nestjs/common';
import { UpdateCurrencyDto } from '../dto/update-currency.dto';
import { CurrencyResponseDto } from '../dto/currency-response.dto';
import { BadRequestException } from '../../common/error-handling/custom-exceptions/bad-request.exception';
import { plainToInstance } from 'class-transformer';
import { I18nService } from 'nestjs-i18n/dist/services/i18n.service';
import { CurrencyRepository } from '../repository/currency.repository';

@Injectable()
export class UpdateCurrencyUsecase {
    constructor(
        private readonly currencyRepository: CurrencyRepository,
        private readonly i18nService: I18nService,
    ) {}

    async execute(
        currencyId: string,
        body: UpdateCurrencyDto,
    ): Promise<CurrencyResponseDto> {
        const currency = await this.currencyRepository.findOne({
            _id: currencyId,
            isDeleted: { $ne: true },
        });

        if (!currency)
            throw new BadRequestException(
                this.i18nService.translate('currency.CURRENCY_NOT_FOUND'),
            );

        if (body?.currency_name) {
            const existingCurrency = await this.currencyRepository.findOne({
                currency_name: body.currency_name,
                isDeleted: { $ne: true },
                _id: { $ne: currencyId },
            });

            if (existingCurrency)
                throw new BadRequestException(
                    this.i18nService.translate(
                        'currency.CURRENCY_NAME_ALREADY_EXISTS',
                    ),
                );
        }

        const updatedCurrency = await this.currencyRepository.findByIdAndUpdate(
            currencyId,
            body,
            { returnDocument: 'after' },
        );
        return plainToInstance(
            CurrencyResponseDto,
            updatedCurrency?.toObject(),
        );
    }
}
