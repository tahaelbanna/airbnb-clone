import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EnvironmentInterface } from 'src/common/configuration/environment.interface';
import { RefreshTokenSchema } from './schemas/refresh-token.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { GenerateTokensUsecase } from './use-cases/generate-token.usecase';
import { RegisterUsecase } from './use-cases/register.usecase';
import { LoginUsecase } from './use-cases/login.usecase';
import { RefreshTokenUsecase } from './use-cases/refresh-token.usecase';
import { ModelNames } from '../common/data-access';
import { RefreshTokenRepository } from './repositories/refresh-token.repository';
import { LoginAsUserUsecase } from './use-cases/login-as-user.usecase';
import { LoginAsAdminUsecase } from './use-cases/login-as-admin.usecase';
import { SystemAdminModule } from 'src/system-admin/system-admin.module';

@Module({
    exports: [JwtModule, UsersModule, SystemAdminModule],
    providers: [
        AuthService,
        GenerateTokensUsecase,
        RegisterUsecase,
        LoginUsecase,
        RefreshTokenUsecase,
        RefreshTokenRepository,
        LoginAsUserUsecase,
        LoginAsAdminUsecase,
    ],
    controllers: [AuthController],
    imports: [
        UsersModule,
        SystemAdminModule,
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
            { name: ModelNames.REFRESH_TOKENS, schema: RefreshTokenSchema },
        ]),
    ],
})
export class AuthModule {}
