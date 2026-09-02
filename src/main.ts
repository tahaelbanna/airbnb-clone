import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { EnvironmentInterface } from './common/configuration/environment.interface';
import { Logger } from '@nestjs/common';
import { I18nValidationPipe } from 'nestjs-i18n';
import { SwaggerSetup } from './common/swagger';
import { ConsoleLogger } from '@nestjs/common';
import { INestApplication } from '@nestjs/common';
async function bootstrap() {
    const app = await NestFactory.create<INestApplication>(AppModule, {
        logger: new ConsoleLogger({
            json: process.env.NODE_ENV === 'production',
        }),
    });

    app.useGlobalPipes(
        new I18nValidationPipe({
            whitelist: true,
            transform: true,
            forbidNonWhitelisted: true,
        }),
    );

    const logger = new Logger('Bootstrap');
    const configService = app.get(ConfigService<EnvironmentInterface>);
    const port = configService.getOrThrow<number>('port');

    SwaggerSetup.setup(app);

    await app.listen(port);
    logger.log(`Application is running on: http://localhost:${port}`);
}

void bootstrap();
