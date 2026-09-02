import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { NotFoundException } from 'src/common/error-handling/custom-exceptions/not-found.exception';
import { CityRepository } from '../repositories/city.repository';
@Injectable()
export class SoftDeleteOneCityUseCase {
    constructor(
        private readonly cityRepository: CityRepository,
        private readonly i18nService: I18nService,
    ) {}

    async execute(id: string): Promise<void> {
        const existingCity = await this.cityRepository.findOne({
            _id: id,
            isDeleted: { $ne: true },
        });

        if (!existingCity) {
            throw new NotFoundException(
                this.i18nService.translate('city.City_NOT_FOUND'),
            );
        }

        await this.cityRepository.findByIdAndUpdate(id, {
            isDeleted: true,
            deletedAt: new Date(),
        });
    }
}
