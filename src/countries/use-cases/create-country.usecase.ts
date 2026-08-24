import { Injectable } from '@nestjs/common';
import { CreateCountryDto } from '../dto/create-country.dto';
import { CountryResponseDto } from '../dto/create-country-response.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country } from '../Schemas/country.schema';
import { BadRequestException } from 'src/common/error-handling/custom-exceptions/bad-request.exception';
import { I18nService } from 'nestjs-i18n';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CreateCountryUseCase {
    constructor(
        @InjectModel('Country') private readonly CountryModel: Model<Country>,
        private readonly i18nService: I18nService,
    ) {}

    async execute(body: CreateCountryDto): Promise<CountryResponseDto> {
        const existingCountry = await this.CountryModel.findOne({
            country_name: body.country_name,
            isDeleted: { $ne: true },
        });

        if (existingCountry) {
            throw new BadRequestException(
                this.i18nService.translate('country.COUNTRY_ALREADY_EXISTS'),
            );
        }

        const newCountry = await this.CountryModel.create(body);
        return plainToInstance(CountryResponseDto, newCountry.toObject());
    }
}
