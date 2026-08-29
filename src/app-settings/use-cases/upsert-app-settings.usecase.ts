import { Injectable } from '@nestjs/common';
import { AppSettingsRepository } from '../Repository/app-settings.repository';
import { UpsertAppSettingsDto } from '../dto/upsert-app-settings.dto';
import { AppSettingsResponseDto } from '../dto/app-settings-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UpsertAppSettingsUseCase {
    constructor(
        private readonly appSettingsRepository: AppSettingsRepository,
    ) {}

    async execute(body: UpsertAppSettingsDto): Promise<AppSettingsResponseDto> {
        const appSettings = await this.appSettingsRepository.findOneAndUpdate(
            {},
            { $set: body },
            { upsert: true, returnDocument: 'after', lean: true },
        );

        return plainToInstance(AppSettingsResponseDto, appSettings);
    }
}
