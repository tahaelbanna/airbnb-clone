import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EnvironmentInterface } from 'src/common/configuration/environment.interface';
@Module({
    providers: [AuthService],
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
    ],
})
export class AuthModule {}
