import { Injectable } from '@nestjs/common';
import { CountryResponseDto } from '../dto/create-country-response.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country } from '../Schemas/country.schema';
import { I18nService } from 'nestjs-i18n';
import { plainToInstance } from 'class-transformer';
import { NotFoundException } from 'src/common/error-handling/custom-exceptions/not-found.exception';
@Injectable()
export class GetCountryUseCase {
    constructor(
        @InjectModel('Country') private readonly CountryModel: Model<Country>,
        private readonly i18nService: I18nService,
    ) {}

    async execute(id: string): Promise<CountryResponseDto> {
        const existingCountry = await this.CountryModel.findOne({
            _id: id,
            isDeleted: { $ne: true },
        }).exec();

        if (!existingCountry) {
            throw new NotFoundException(
                this.i18nService.translate('country.COUNTRY_NOT_FOUND'),
            );
        }
        return plainToInstance(CountryResponseDto, existingCountry.toObject());
    }
}
