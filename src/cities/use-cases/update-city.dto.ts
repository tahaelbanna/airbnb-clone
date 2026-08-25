import { Injectable } from '@nestjs/common';
import { UpdateCityDto } from '../dto/update-city.dto';
import { CityResponseDto } from '../dto/city-response.dto';
import { BadRequestException } from '../../common/error-handling/custom-exceptions/bad-request.exception';
import { plainToInstance } from 'class-transformer';
import { I18nService } from 'nestjs-i18n/dist/services/i18n.service';
import { CityRepository } from '../repository/city.repository';

@Injectable()
export class UpdateCityUsecase {
    constructor(
        private readonly cityRepository: CityRepository,
        private readonly i18nService: I18nService,
    ) {}

    async execute(
        cityId: string,
        body: UpdateCityDto,
    ): Promise<CityResponseDto> {
        const city = await this.cityRepository.findOne({
            _id: cityId,
            isDeleted: { $ne: true },
        });

        if (!city)
            throw new BadRequestException(
                this.i18nService.translate('city.CITY_NOT_FOUND'),
            );

        const existingCityByName = await this.cityRepository.findOne({
            city_name: body.city_name,
            country_id: city.country_id,
            isDeleted: false,
            _id: { $ne: cityId },
        });

        if (existingCityByName)
            throw new BadRequestException(
                this.i18nService.translate('city.CITY_ALREADY_EXISTS'),
            );

        const updatedCity = await this.cityRepository.findByIdAndUpdate(
            cityId,
            body,
        );

        return plainToInstance(CityResponseDto, updatedCity?.toObject());
    }
}
