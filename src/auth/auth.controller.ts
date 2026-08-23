import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import { refreshTokenDto } from './dto/refresh-token.dto';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerRegister } from './Swagger/register.swagger';
import { API_TAGS } from '../common/Swagger/constants';
import { LoginSwagger } from './Swagger/login.swagger';
import { RefreshTokenSwagger } from './Swagger/refresh-token.swagger';

@ApiTags(API_TAGS.AUTH)
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @SwaggerRegister()
    @Post('register')
    register(@Body() body: registerDto) {
        return this.authService.register(body);
    }

    @LoginSwagger()
    @Post('login')
    login(@Body() body: loginDto) {
        return this.authService.login(body);
    }

    @RefreshTokenSwagger()
    @Post('refresh-token')
    refreshToken(@Body() body: refreshTokenDto) {
        return this.authService.refreshToken(body);
    }
}
