import { Injectable } from '@nestjs/common';
import { CountryResponseDto } from '../dto/create-country-response.dto';
import { I18nService } from 'nestjs-i18n';
import { plainToInstance } from 'class-transformer';
import { NotFoundException } from 'src/common/error-handling/custom-exceptions/not-found.exception';
import { CountryRepository } from '../repository/country.repository';
@Injectable()
export class GetCountryUseCase {
    constructor(
        private readonly countryRepository: CountryRepository,
        private readonly i18nService: I18nService,
    ) {}

    async execute(id: string): Promise<CountryResponseDto> {
        const existingCountry = await this.countryRepository.findOne({
            _id: id,
            isDeleted: { $ne: true },
        });

        if (!existingCountry) {
            throw new NotFoundException(
                this.i18nService.translate('country.COUNTRY_NOT_FOUND'),
            );
        }
        return plainToInstance(CountryResponseDto, existingCountry.toObject());
    }
}
