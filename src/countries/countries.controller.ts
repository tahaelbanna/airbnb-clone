import {
    Body,
    Controller,
    Post,
    Param,
    Get,
    Delete,
    Patch,
    Query,
} from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id.pipe';
import { UpdateCountryDto } from './dto/update-country.dto';
import { GetAllCountriesDto } from './dto/get-all-countries.dto';
@Controller('countries')
export class CountriesController {
    constructor(private readonly countriesService: CountriesService) {}

    @Post()
    createCountry(@Body() body: CreateCountryDto) {
        return this.countriesService.createCountry(body);
    }

    @Get(':id')
    getCountryById(@Param('id', new ParseMongoIdPipe()) id: string) {
        return this.countriesService.getCountryById(id);
    }

    @Delete(':id')
    softDeleteCountry(@Param('id', new ParseMongoIdPipe()) id: string) {
        return this.countriesService.softDeleteCountry(id);
    }

    @Get()
    getAllCountries(@Query() query: GetAllCountriesDto) {
        return this.countriesService.getAllCountries(query);
    }

    @Patch(':id')
    updateCountry(
        @Param('id', new ParseMongoIdPipe()) id: string,
        @Body() body: UpdateCountryDto,
    ) {
        return this.countriesService.updateCountry(id, body);
    }
}
