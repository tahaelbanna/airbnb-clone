import { Injectable } from '@nestjs/common';
import { AppSettingsRepository } from '../Repository/app-settings.repository';
import { AppSettingsResponseDto } from '../dto/app-settings-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class GetAppSettingsUseCase {
    constructor(
        private readonly appSettingsRepository: AppSettingsRepository,
    ) {}

    async execute(): Promise<AppSettingsResponseDto> {
        const appSettings = await this.appSettingsRepository.findOne({});
        return plainToInstance(AppSettingsResponseDto, appSettings);
    }
}
