import { Injectable } from '@nestjs/common';
import { registerDto } from './dtos/register.dto';
import { loginDto } from './dtos/login.dto';
import { RegisterUsecase } from './use-cases/register.usecase';
import { LoginAsUserUsecase } from './use-cases/login-as-user.usecase';
import { LoginAsAdminUsecase } from './use-cases/login-as-admin.usecase';
import { RefreshTokenUsecase } from './use-cases/refresh-token.usecase';
import { refreshTokenDto } from './dtos/refresh-token.dto';
import { AuthResponseDto } from './dtos/auth-response.dto';
import { RegisterResponseDto } from './dtos/register-response.dto';
@Injectable()
export class AuthService {
    constructor(
        private readonly registerUsecase: RegisterUsecase,
        private readonly loginAsUserUsecase: LoginAsUserUsecase,
        private readonly loginAsAdminUsecase: LoginAsAdminUsecase,
        private readonly refreshTokenUsecase: RefreshTokenUsecase,
    ) {}

    async register(body: registerDto): Promise<RegisterResponseDto> {
        return this.registerUsecase.execute(body);
    }

    async login(body: loginDto): Promise<AuthResponseDto> {
        return this.loginAsUserUsecase.execute(body);
    }

    async adminLogin(body: loginDto): Promise<AuthResponseDto> {
        return this.loginAsAdminUsecase.execute(body);
    }

    async refreshToken(body: refreshTokenDto): Promise<AuthResponseDto> {
        return this.refreshTokenUsecase.execute(body);
    }
}
