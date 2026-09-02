import { Injectable } from '@nestjs/common';
import { UpsertAppSettingsUseCase } from './use-cases/upsert-app-settings.usecase';
import { UpsertAppSettingsDto } from './dtos/upsert-app-settings.dto';
import { AppSettingsResponseDto } from './dtos/app-settings-response.dto';
import { GetAppSettingsUseCase } from './use-cases/get-app-settings.usecase';

@Injectable()
export class AppSettingsService {
    constructor(
        private readonly upsertAppSettingsUseCase: UpsertAppSettingsUseCase,
        private readonly getAppSettingsUseCase: GetAppSettingsUseCase,
    ) {}

    async upsert(body: UpsertAppSettingsDto): Promise<AppSettingsResponseDto> {
        return this.upsertAppSettingsUseCase.execute(body);
    }

    async get(): Promise<AppSettingsResponseDto> {
        return this.getAppSettingsUseCase.execute();
    }
}
