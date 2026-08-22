import { Injectable } from '@nestjs/common';
import { refreshTokenDto } from '../dto/refresh-token.dto';
import { ForbiddenException } from 'src/common/error-handling/custom-exceptions/forbidden.exception';
import { JwtService } from '@nestjs/jwt';
import { I18nService } from 'nestjs-i18n';
import { BadRequestException } from 'src/common/error-handling/custom-exceptions/bad-request.exception';
import { InjectModel } from '@nestjs/mongoose';
import { RefreshToken } from '../Schemas/refresh-token.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { GenerateTokensUsecase } from './generate-token.usecase';

@Injectable()
export class RefreshTokenUsecase {
    constructor(
        private readonly jwtService: JwtService,
        private readonly i18nService: I18nService,
        @InjectModel('RefreshToken')
        private readonly refreshTokenModel: Model<RefreshToken>,
        private readonly generateTokensUsecase: GenerateTokensUsecase,
    ) {}
    async execute(body: refreshTokenDto) {
        type RefreshTokenPayload = {
            userId: string;
            type: string;
        };
        let decoded: RefreshTokenPayload;
        try {
            decoded = await this.jwtService.verifyAsync<RefreshTokenPayload>(
                body.refreshToken,
            );
        } catch {
            throw new ForbiddenException(
                this.i18nService.translate('auth.INVALID_REFRESH_TOKEN'),
            );
        }
        if (decoded.type !== 'refresh') {
            throw new BadRequestException(
                this.i18nService.translate('auth.INVALID_REFRESH_TOKEN'),
            );
        }
        const isRefreshTokenExists = await this.refreshTokenModel.findOne({
            userId: decoded.userId,
        });
        if (!isRefreshTokenExists) {
            throw new ForbiddenException(
                this.i18nService.translate('auth.INVALID_REFRESH_TOKEN'),
            );
        }
        const isRefreshTokenMatched = await bcrypt.compare(
            body.refreshToken,
            isRefreshTokenExists.refreshToken,
        );
        if (!isRefreshTokenMatched) {
            throw new ForbiddenException(
                this.i18nService.translate('auth.INVALID_REFRESH_TOKEN'),
            );
        }
        const token = await this.generateTokensUsecase.execute(
            isRefreshTokenExists.userId,
        );
        return token;
    }
}
