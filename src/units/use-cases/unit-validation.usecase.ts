import { CreateUnitDto } from '../dtos/create-unit.dto';
import { UnitCategoriesService } from '../../unit-categories/unit-categories.service';
import { CitiesService } from '../../cities/cities.service';
import { CountriesService } from '../../countries/countries.service';
import { AppSettingsService } from '../../app-settings/app-settings.service';
import { I18nService } from 'nestjs-i18n/dist/services/i18n.service';
import { BadRequestException } from 'src/common/error-handling/custom-exceptions/bad-request.exception';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UnitValidationUseCase {
    constructor(
        private readonly unitCategoriesService: UnitCategoriesService,
        private readonly citiesService: CitiesService,
        private readonly countriesService: CountriesService,
        private readonly appSettingsService: AppSettingsService,
        private readonly i18nService: I18nService,
    ) {}

    async execute(body: CreateUnitDto): Promise<void> {
        const appSettings = await this.appSettingsService.get();
        if (body.unit_cost_per_night < appSettings.min_price) {
            throw new BadRequestException(
                this.i18nService.translate('units.UNIT_COST_TOO_LOW'),
            );
        }

        await this.unitCategoriesService.getUnitCategoryById(
            body.unit_category_id,
        );

        const city = await this.citiesService.getCityById(body.unit_city_id);

        const country = await this.countriesService.getCountryById(
            body.unit_country_id,
        );

        if (city.country_id.toString() !== country._id.toString()) {
            throw new BadRequestException(
                this.i18nService.translate('units.COUNTRY_CITY_MISMATCH'),
            );
        }
    }
}
