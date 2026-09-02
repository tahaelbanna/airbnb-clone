import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { NotFoundException } from 'src/common/error-handling/custom-exceptions/not-found.exception';
import { CountryRepository } from '../repositories/country.repository';
@Injectable()
export class SoftDeleteOneCountryUseCase {
    constructor(
        private readonly countryRepository: CountryRepository,
        private readonly i18nService: I18nService,
    ) {}

    async execute(id: string): Promise<void> {
        const existingCountry = await this.countryRepository.findOne({
            _id: id,
            isDeleted: { $ne: true },
        });

        if (!existingCountry) {
            throw new NotFoundException(
                this.i18nService.translate('country.COUNTRY_NOT_FOUND'),
            );
        }

        await this.countryRepository.findByIdAndUpdate(id, {
            isDeleted: true,
            deletedAt: new Date(),
        });
    }
}
