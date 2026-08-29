import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { API_TAGS } from './constants';

export class SwaggerSetup {
    static setup(app: INestApplication) {
        const config = new DocumentBuilder()
            .setTitle('Airbnb Clone API')
            .setDescription('The Airbnb Clone API description')
            .setVersion('1.0')
            .addTag(API_TAGS.AUTH)
            .addTag(API_TAGS.COUNTRIES)
            .addTag(API_TAGS.CITIES)
            .addTag(API_TAGS.APP_SETTINGS)
            .addTag(API_TAGS.CURRENCIES)
            .addTag(API_TAGS.UNIT_CATEGORIES)
            .addTag(API_TAGS.SYSTEM_ADMINS)
            .build();

        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('api/docs', app, document, {
            useGlobalPrefix: false,
            swaggerOptions: {
                filter: true,
                displayRequestDuration: true,
            },
        });
    }
}
