import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDto } from './dtos/register.dto';
import { loginDto } from './dtos/login.dto';
import { refreshTokenDto } from './dtos/refresh-token.dto';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerRegister } from './swagger/register.swagger';
import { API_TAGS } from '../common/swagger/constants';
import { LoginSwagger } from './swagger/login.swagger';
import { RefreshTokenSwagger } from './swagger/refresh-token.swagger';
import { AuthResponseDto } from './dtos/auth-response.dto';
import { Public } from './decorators/public.decorator';
import { CurrentUser, Principal } from './decorators/current-user.decorator';

@ApiTags(API_TAGS.AUTH)
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @SwaggerRegister()
    @Post('register')
    @Public()
    register(@Body() body: registerDto): Promise<AuthResponseDto> {
        return this.authService.register(body);
    }

    @LoginSwagger()
    @Post('login')
    @Public()
    login(@Body() body: loginDto): Promise<AuthResponseDto> {
        return this.authService.login(body);
    }

    @RefreshTokenSwagger()
    @Post('refresh-token')
    @Public()
    refreshToken(@Body() body: refreshTokenDto): Promise<AuthResponseDto> {
        return this.authService.refreshToken(body);
    }

    @Get('me')
    getCurrentUser(@CurrentUser() principal: Principal) {
        return principal;
    }
}
