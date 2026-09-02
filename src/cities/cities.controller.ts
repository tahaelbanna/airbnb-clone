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
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dtos/create-city.dto';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id.pipe';
import { UpdateCityDto } from './dtos/update-city.dto';
import { GetAllCitiesDto } from './dtos/get-all-cities.dto';
import { ApiTags } from '@nestjs/swagger';
import { API_TAGS } from '../common/swagger';
import {
    CreateCitySwagger,
    DeleteCitySwagger,
    GetAllCitiesSwagger,
    GetCityByIdSwagger,
    UpdateCitySwagger,
} from './swagger';
import { Roles } from '../common/constants/roles.constans';
import { AllowRoles } from '../auth/decorators/roles.decorator';

@ApiTags(API_TAGS.CITIES)
@Controller('cities')
export class CitiesController {
    constructor(private readonly citiesService: CitiesService) {}

    @CreateCitySwagger()
    @Post()
    @AllowRoles(Roles.SYSTEM_ADMIN)
    createCity(@Body() body: CreateCityDto) {
        return this.citiesService.createCity(body);
    }

    @GetCityByIdSwagger()
    @Get(':id')
    getCityById(@Param('id', new ParseMongoIdPipe()) id: string) {
        return this.citiesService.getCityById(id);
    }

    @DeleteCitySwagger()
    @Delete(':id')
    @AllowRoles(Roles.SYSTEM_ADMIN)
    softDeleteCity(@Param('id', new ParseMongoIdPipe()) id: string) {
        return this.citiesService.softDeleteCity(id);
    }

    @GetAllCitiesSwagger()
    @Get()
    getAllCities(@Query() query: GetAllCitiesDto) {
        return this.citiesService.getAllCities(query);
    }

    @UpdateCitySwagger()
    @Patch(':id')
    @AllowRoles(Roles.SYSTEM_ADMIN)
    updateCity(
        @Param('id', new ParseMongoIdPipe()) id: string,
        @Body() body: UpdateCityDto,
    ) {
        return this.citiesService.updateCity(id, body);
    }
}
