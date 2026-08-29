import { Body, Controller, Put, Get } from '@nestjs/common';
import { AppSettingsService } from './app-settings.service';
import { UpsertAppSettingsDto } from './dto/upsert-app-settings.dto';
import { ApiTags } from '@nestjs/swagger';
import { API_TAGS } from '../common/Swagger';
import { GetAppSettingsSwagger, UpsertAppSettingsSwagger } from './swagger';

@ApiTags(API_TAGS.APP_SETTINGS)
@Controller('app-settings')
export class AppSettingsController {
    constructor(private readonly appSettingsService: AppSettingsService) {}

    @UpsertAppSettingsSwagger()
    @Put()
    async upsertAppSettings(
        @Body() body: UpsertAppSettingsDto,
    ): Promise<UpsertAppSettingsDto> {
        return this.appSettingsService.upsert(body);
    }

    @GetAppSettingsSwagger()
    @Get()
    async getAppSettings(): Promise<UpsertAppSettingsDto> {
        return this.appSettingsService.get();
    }
}
