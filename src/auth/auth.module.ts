import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EnvironmentInterface } from 'src/common/configuration/environment.interface';
import {
    RefreshToken,
    RefreshTokenSchema,
} from './Schemas/refresh-token.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { GenerateTokensUsecase } from './use-cases/generate-token.usecase';
import { RegisterUsecase } from './use-cases/register.usecase';
import { LoginUsecase } from './use-cases/login.usecase';
import { RefreshTokenUsecase } from './use-cases/refresh-token.usecase';
@Module({
    providers: [
        AuthService,
        GenerateTokensUsecase,
        RegisterUsecase,
        LoginUsecase,
        RefreshTokenUsecase,
    ],
    controllers: [AuthController],
    imports: [
        UsersModule,
        JwtModule.registerAsync({
            useFactory: (
                configService: ConfigService<EnvironmentInterface>,
            ) => ({
                secret: configService.getOrThrow('jwtSecret'),
                signOptions: {
                    expiresIn: configService.getOrThrow('accessTokenExpireIn'),
                },
            }),
            inject: [ConfigService],
        }),
        MongooseModule.forFeature([
            { name: RefreshToken.name, schema: RefreshTokenSchema },
        ]),
    ],
})
export class AuthModule {}
