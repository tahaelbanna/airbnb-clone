import { Injectable } from '@nestjs/common';
import { CreateCityDto } from '../dtos/create-city.dto';
import { CityResponseDto } from '../dtos/city-response.dto';
import { BadRequestException } from 'src/common/error-handling/custom-exceptions/bad-request.exception';
import { I18nService } from 'nestjs-i18n';
import { plainToInstance } from 'class-transformer';
import { CityRepository } from '../repositories/city.repository';
import { CountriesService } from '../../countries/countries.service';

@Injectable()
export class CreateCityUseCase {
    constructor(
        private readonly cityRepository: CityRepository,
        private readonly countriesService: CountriesService,
        private readonly i18nService: I18nService,
    ) {}

    async execute(body: CreateCityDto): Promise<CityResponseDto> {
        const existingCity = await this.cityRepository.findOne({
            city_name: body.city_name,
            country_id: body.country_id,
            isDeleted: { $ne: true },
        });
        if (existingCity) {
            throw new BadRequestException(
                this.i18nService.translate('city.CITY_ALREADY_EXISTS'),
            );
        }

        await this.countriesService.getCountryById(body.country_id);

        const newCity = await this.cityRepository.create(body);
        return plainToInstance(CityResponseDto, newCity.toObject());
    }
}
