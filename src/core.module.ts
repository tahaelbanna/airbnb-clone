import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { envSchema } from './common/configuration/env-valdiation-schema';
import configMapping from './common/configuration/config-mapping';
import {
    AcceptLanguageResolver,
    HeaderResolver,
    I18nModule,
    QueryResolver,
} from 'nestjs-i18n';
import path from 'node:path';
import { EnvironmentInterface } from './common/configuration/environment.interface';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_FILTER } from '@nestjs/core';
import { CustomExceptionFilter } from './common/error-handling/filters/custom-exception.filter';
import { LoggerInterceptor } from './common/interceptors';
import { TransformResponseInterceptor } from './common/interceptors/transform-response.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: envSchema,
            load: [configMapping],
        }),

        I18nModule.forRootAsync({
            useFactory: (
                configService: ConfigService<EnvironmentInterface>,
            ) => ({
                fallbackLanguage: configService.getOrThrow('fallbackLanguage'),
                loaderOptions: {
                    path: path.join(process.cwd(), 'src/i18n'),
                    watch: true,
                },
            }),

            resolvers: [
                { use: QueryResolver, options: ['lang'] },
                AcceptLanguageResolver,
                new HeaderResolver(['x-lang']),
            ],
            inject: [ConfigService],
        }),

        MongooseModule.forRootAsync({
            useFactory: (
                configService: ConfigService<EnvironmentInterface>,
            ) => ({
                uri: configService.getOrThrow<string>('mongoUri'),
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [
        { provide: APP_FILTER, useClass: CustomExceptionFilter },
        { provide: APP_INTERCEPTOR, useClass: LoggerInterceptor },
        { provide: APP_INTERCEPTOR, useClass: TransformResponseInterceptor },
    ],
})
export class CoreModule {}
