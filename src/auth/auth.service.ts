import { Injectable } from '@nestjs/common';
import { registerDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import { RegisterUsecase } from './use-cases/register.usecase';
import { LoginUsecase } from './use-cases/login.usecase';
import { RefreshTokenUsecase } from './use-cases/refresh-token.usecase';
import { refreshTokenDto } from './dto/refresh-token.dto';
@Injectable()
export class AuthService {
    constructor(
        private readonly registerUsecase: RegisterUsecase,
        private readonly loginUsecase: LoginUsecase,
        private readonly refreshTokenUsecase: RefreshTokenUsecase,
    ) {}

    async register(body: registerDto) {
        return this.registerUsecase.execute(body);
    }

    async login(body: loginDto) {
        return this.loginUsecase.execute(body);
    }

    async refreshToken(body: refreshTokenDto) {
        return this.refreshTokenUsecase.execute(body);
    }
}
