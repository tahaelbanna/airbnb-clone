import { Injectable } from '@nestjs/common';
import { CityResponseDto } from '../dtos/city-response.dto';
import { I18nService } from 'nestjs-i18n';
import { plainToInstance } from 'class-transformer';
import { NotFoundException } from 'src/common/error-handling/custom-exceptions/not-found.exception';
import { CityRepository } from '../repositories/city.repository';
@Injectable()
export class GetCityUseCase {
    constructor(
        private readonly cityRepository: CityRepository,
        private readonly i18nService: I18nService,
    ) {}

    async execute(id: string): Promise<CityResponseDto> {
        const existingCity = await this.cityRepository.findOne({
            _id: id,
            isDeleted: { $ne: true },
        });

        if (!existingCity) {
            throw new NotFoundException(
                this.i18nService.translate('city.City_NOT_FOUND'),
            );
        }
        return plainToInstance(CityResponseDto, existingCity);
    }
}
