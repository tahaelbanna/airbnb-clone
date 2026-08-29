import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EnvironmentInterface } from 'src/common/configuration/environment.interface';
import * as bcrypt from 'bcrypt';
import { RefreshTokenRepository } from '../repository/refresh-token.repository';

@Injectable()
export class GenerateTokensUsecase {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService<EnvironmentInterface>,
        private readonly refreshTokenRepository: RefreshTokenRepository,
    ) {}
    async execute(userId: string) {
        const accessToken = await this.jwtService.signAsync({ userId });
        const refreshToken = await this.jwtService.signAsync(
            { userId, type: 'refresh' },
            {
                expiresIn: this.configService.getOrThrow(
                    'refreshTokenExpireIn',
                ),
            },
        );
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        await this.refreshTokenRepository.findOneAndUpdate(
            { userId },
            { refreshToken: hashedRefreshToken },
            { returnDocument: 'after', upsert: true },
        );
        return { accessToken, refreshToken };
    }
}
