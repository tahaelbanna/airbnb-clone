import { Injectable } from '@nestjs/common';
import { CreateCountryDto } from '../dtos/create-country.dto';
import { CountryResponseDto } from '../dtos/country-response.dto';
import { BadRequestException } from 'src/common/error-handling/custom-exceptions/bad-request.exception';
import { I18nService } from 'nestjs-i18n';
import { plainToInstance } from 'class-transformer';
import { CountryRepository } from '../repositories/country.repository';

@Injectable()
export class CreateCountryUseCase {
    constructor(
        private readonly countryRepository: CountryRepository,
        private readonly i18nService: I18nService,
    ) {}

    async execute(body: CreateCountryDto): Promise<CountryResponseDto> {
        const existingCountry = await this.countryRepository.findOne({
            country_name: body.country_name,
            isDeleted: { $ne: true },
        });

        if (existingCountry) {
            throw new BadRequestException(
                this.i18nService.translate('country.COUNTRY_ALREADY_EXISTS'),
            );
        }

        const newCountry = await this.countryRepository.create(body);
        return plainToInstance(CountryResponseDto, newCountry.toObject());
    }
}
