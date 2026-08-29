import { Injectable } from '@nestjs/common';
import { refreshTokenDto } from '../dto/refresh-token.dto';
import { ForbiddenException } from 'src/common/error-handling/custom-exceptions/forbidden.exception';
import { JwtService } from '@nestjs/jwt';
import { I18nService } from 'nestjs-i18n';
import { BadRequestException } from 'src/common/error-handling/custom-exceptions/bad-request.exception';
import * as bcrypt from 'bcrypt';
import { GenerateTokensUsecase } from './generate-token.usecase';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { plainToInstance } from 'class-transformer';
import { RefreshTokenRepository } from '../repository/refresh-token.repository';
import { Roles } from '../../common/constants/roles.constans';
@Injectable()
export class RefreshTokenUsecase {
    constructor(
        private readonly jwtService: JwtService,
        private readonly i18nService: I18nService,
        private readonly refreshTokenRepository: RefreshTokenRepository,
        private readonly generateTokensUsecase: GenerateTokensUsecase,
    ) {}
    async execute(body: refreshTokenDto): Promise<AuthResponseDto> {
        type RefreshTokenPayload = {
            payload: { id: string; role: string };
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
        const isRefreshTokenExists = await this.refreshTokenRepository.findOne({
            userId: decoded.payload.id,
            role: decoded.payload.role,
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
        const { accessToken, refreshToken } =
            await this.generateTokensUsecase.execute({
                id: isRefreshTokenExists.userId,
                role: decoded.payload.role as Roles,
            });
        return plainToInstance(AuthResponseDto, { accessToken, refreshToken });
    }
}
