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
import { ApiTags } from '@nestjs/swagger';
import { API_TAGS } from '../common/Swagger';
import {
    CreateCountrySwagger,
    DeleteCountrySwagger,
    GetAllCountriesSwagger,
    GetCountryByIdSwagger,
    UpdateCountrySwagger,
} from './swagger';
import { Roles } from '../common/constants/roles.constans';
import { AllowRoles } from '../auth/decorators/roles.decorator';

@ApiTags(API_TAGS.COUNTRIES)
@Controller('countries')
export class CountriesController {
    constructor(private readonly countriesService: CountriesService) {}

    @CreateCountrySwagger()
    @Post()
    @AllowRoles(Roles.SYSTEM_ADMIN)
    createCountry(@Body() body: CreateCountryDto) {
        return this.countriesService.createCountry(body);
    }

    @GetCountryByIdSwagger()
    @Get(':id')
    getCountryById(@Param('id', new ParseMongoIdPipe()) id: string) {
        return this.countriesService.getCountryById(id);
    }

    @DeleteCountrySwagger()
    @Delete(':id')
    @AllowRoles(Roles.SYSTEM_ADMIN)
    softDeleteCountry(@Param('id', new ParseMongoIdPipe()) id: string) {
        return this.countriesService.softDeleteCountry(id);
    }

    @GetAllCountriesSwagger()
    @Get()
    getAllCountries(@Query() query: GetAllCountriesDto) {
        return this.countriesService.getAllCountries(query);
    }

    @UpdateCountrySwagger()
    @Patch(':id')
    @AllowRoles(Roles.SYSTEM_ADMIN)
    updateCountry(
        @Param('id', new ParseMongoIdPipe()) id: string,
        @Body() body: UpdateCountryDto,
    ) {
        return this.countriesService.updateCountry(id, body);
    }
}
