import { Injectable } from '@nestjs/common';
import { CountryResponseDto } from '../dto/create-country-response.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country } from '../Schemas/country.schema';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class GetAllCountriesUseCase {
    constructor(
        @InjectModel('Country') private readonly CountryModel: Model<Country>,
    ) {}

    async execute(): Promise<CountryResponseDto[]> {
        const existingCountries = await this.CountryModel.find({
            isDeleted: { $ne: true },
        }).exec();
        return existingCountries.map((country) =>
            plainToInstance(CountryResponseDto, country.toObject()),
        );
    }
}
