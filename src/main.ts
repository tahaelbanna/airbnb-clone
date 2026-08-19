import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { EnvironmentInterface } from './common/configuration/environment.interface';
import { Logger } from '@nestjs/common';
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const logger = new Logger('Bootstrap');
    const configService = app.get(ConfigService<EnvironmentInterface>);
    const port = configService.getOrThrow<number>('port');
    await app.listen(port);
    logger.log(`Application is running on: http://localhost:${port}`);
}
void bootstrap();
