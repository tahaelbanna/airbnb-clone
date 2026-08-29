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
import { CurrenciesService } from './currencies.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { GetAllCurrenciesDto } from './dto/get-all-currencies.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id.pipe';
@Controller('currencies')
export class CurrenciesController {
    constructor(private readonly currenciesService: CurrenciesService) {}

    @Post()
    createCurrency(@Body() body: CreateCurrencyDto) {
        return this.currenciesService.createCurrency(body);
    }

    @Get(':id')
    getCurrencyById(@Param('id', new ParseMongoIdPipe()) id: string) {
        return this.currenciesService.getCurrencyById(id);
    }

    @Delete(':id')
    softDeleteCurrency(@Param('id', new ParseMongoIdPipe()) id: string) {
        return this.currenciesService.softDeleteCurrency(id);
    }

    @Get()
    getAllCurrencies(@Query() query: GetAllCurrenciesDto) {
        return this.currenciesService.getAllCurrencies(query);
    }

    @Patch(':id')
    updateCurrency(
        @Param('id', new ParseMongoIdPipe()) id: string,
        @Body() body: UpdateCurrencyDto,
    ) {
        return this.currenciesService.updateCurrency(id, body);
    }
}
