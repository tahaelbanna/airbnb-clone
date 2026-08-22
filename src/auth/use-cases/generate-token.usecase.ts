import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EnvironmentInterface } from 'src/common/configuration/environment.interface';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RefreshToken } from '../Schemas/refresh-token.schema';

@Injectable()
export class GenerateTokensUsecase {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService<EnvironmentInterface>,
        @InjectModel('RefreshToken')
        private readonly refreshTokenModel: Model<RefreshToken>,
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
        await this.refreshTokenModel.findOneAndUpdate(
            { userId },
            { refreshToken: hashedRefreshToken },
            { returnDocument: 'after', upsert: true },
        );
        return { accessToken, refreshToken };
    }
}
