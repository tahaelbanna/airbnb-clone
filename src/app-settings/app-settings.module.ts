import { Module } from '@nestjs/common';
import { AppSettingsService } from './app-settings.service';
import { AppSettingsController } from './app-settings.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppSettingsSchema } from './schemas/app-settings.schema';
import { ModelNames } from '../common/data-access';
import { AppSettingsRepository } from './repositories/app-settings.repository';
import { UpsertAppSettingsUseCase } from './use-cases/upsert-app-settings.usecase';
import { GetAppSettingsUseCase } from './use-cases/get-app-settings.usecase';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                schema: AppSettingsSchema,
                name: ModelNames.APP_SETTINGS,
            },
        ]),
    ],
    providers: [
        AppSettingsService,
        AppSettingsRepository,
        UpsertAppSettingsUseCase,
        GetAppSettingsUseCase,
    ],
    controllers: [AppSettingsController],
    exports: [AppSettingsService],
})
export class AppSettingsModule {}
