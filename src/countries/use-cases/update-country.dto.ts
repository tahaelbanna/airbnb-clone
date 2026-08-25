import { Injectable } from '@nestjs/common';
import { UpdateCountryDto } from '../dto/update-country.dto';
import { CountryResponseDto } from '../dto/country-response.dto';
import { BadRequestException } from '../../common/error-handling/custom-exceptions/bad-request.exception';
import { plainToInstance } from 'class-transformer';
import { I18nService } from 'nestjs-i18n/dist/services/i18n.service';
import { CountryRepository } from '../repository/country.repository';

@Injectable()
export class UpdateCountryUsecase {
    constructor(
        private readonly countryRepository: CountryRepository,
        private readonly i18nService: I18nService,
    ) {}

    async execute(
        countryId: string,
        body: UpdateCountryDto,
    ): Promise<CountryResponseDto> {
        const country = await this.countryRepository.findOne({
            _id: countryId,
            isDeleted: { $ne: true },
        });

        if (!country)
            throw new BadRequestException(
                this.i18nService.translate('country.COUNTRY_NOT_FOUND'),
            );

        if (body?.country_name) {
            const existingCountry = await this.countryRepository.findOne({
                country_name: body.country_name,
                isDeleted: { $ne: true },
                _id: { $ne: countryId },
            });

            if (existingCountry)
                throw new BadRequestException(
                    this.i18nService.translate(
                        'country.COUNTRY_NAME_ALREADY_EXISTS',
                    ),
                );
        }

        const updatedCountry = await this.countryRepository.findByIdAndUpdate(
            countryId,
            body,
            { returnDocument: 'after' },
        );
        return plainToInstance(CountryResponseDto, updatedCountry?.toObject());
    }
}
