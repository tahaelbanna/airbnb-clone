import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EnvironmentInterface } from 'src/common/configuration/environment.interface';
import * as bcrypt from 'bcrypt';
import { RefreshTokenRepository } from '../repository/refresh-token.repository';
import { JwtPayload } from '../interface/jwt-payload.interface';
@Injectable()
export class GenerateTokensUsecase {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService<EnvironmentInterface>,
        private readonly refreshTokenRepository: RefreshTokenRepository,
    ) {}
    async execute(payload: JwtPayload) {
        const accessToken = await this.jwtService.signAsync(payload);
        const refreshToken = await this.jwtService.signAsync(
            { payload, type: 'refresh' },
            {
                expiresIn: this.configService.getOrThrow(
                    'refreshTokenExpireIn',
                ),
            },
        );
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        await this.refreshTokenRepository.findOneAndUpdate(
            { userId: payload.id, role: payload.role },
            { refreshToken: hashedRefreshToken },
            { returnDocument: 'after', upsert: true },
        );
        return { accessToken, refreshToken };
    }
}
