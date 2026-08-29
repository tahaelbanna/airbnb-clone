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
import { CreateCityDto } from './dto/create-city.dto';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id.pipe';
import { UpdateCityDto } from './dto/update-city.dto';
import { GetAllCitiesDto } from './dto/get-all-cities.dto';
@Controller('cities')
export class CitiesController {
    constructor(private readonly citiesService: CitiesService) {}

    @Post()
    createCity(@Body() body: CreateCityDto) {
        return this.citiesService.createCity(body);
    }

    @Get(':id')
    getCityById(@Param('id', new ParseMongoIdPipe()) id: string) {
        return this.citiesService.getCityById(id);
    }

    @Delete(':id')
    softDeleteCity(@Param('id', new ParseMongoIdPipe()) id: string) {
        return this.citiesService.softDeleteCity(id);
    }

    @Get()
    getAllCities(@Query() query: GetAllCitiesDto) {
        return this.citiesService.getAllCities(query);
    }

    @Patch(':id')
    updateCity(
        @Param('id', new ParseMongoIdPipe()) id: string,
        @Body() body: UpdateCityDto,
    ) {
        return this.citiesService.updateCity(id, body);
    }
}
