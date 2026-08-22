/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { registerDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { loginDto } from './dto/login.dto';
import { BadRequestException } from 'src/common/error-handling/custom-exceptions/bad-request.exception';
import { I18nService } from 'nestjs-i18n';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { RefreshToken } from './Schemas/refresh-token.schema';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { EnvironmentInterface } from 'src/common/configuration/environment.interface';
import { refreshTokenDto } from './dto/refresh-token.dto';
import { ForbiddenException } from 'src/common/error-handling/custom-exceptions/forbidden.exception';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly i18nService: I18nService,
        @InjectModel('RefreshToken')
        private readonly refreshTokenModel: Model<RefreshToken>,
        private readonly configService: ConfigService<EnvironmentInterface>,
    ) {}

    async register(body: registerDto) {
        // create a new user using the UsersService
        const user = await this.usersService.createUser(body);
        // generate a JWT token for the user
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const token = await this.generateToken((user as any)._id.toString());
        // return the user and the token
        return { user, token };
    }

    async login(body: loginDto) {
        const user = await this.usersService.findOne({ email: body.email });
        if (!user) {
            throw new BadRequestException(
                this.i18nService.translate('auth.INVALID_CREDENTIALS'),
            );
        }
        const isPasswordMatched = await bcrypt.compare(
            body.password,
            user.password,
        );
        if (!isPasswordMatched) {
            throw new BadRequestException(
                this.i18nService.translate('auth.INVALID_CREDENTIALS'),
            );
        }
        const token = await this.generateToken(user._id.toString());
        return { token };
    }

    private async generateToken(userId: string) {
        // generate a JWT token for the user
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

    async refreshToken(body: refreshTokenDto) {
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
        const token = await this.generateToken(isRefreshTokenExists.userId);
        return token;
    }
}
